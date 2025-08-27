// عارض الوحدات - تحميل وعرض محتوى الوحدات الفردية

class UnitViewer {
  constructor() {
    this.currentUnitId = this.getUnitIdFromURL();
    this.units = [];
    this.init();
  }

  getUnitIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || '00';
  }

  async init() {
    await this.loadUnitsIndex();
    await this.loadCurrentUnit();
    this.setupNavigation();
  }

  async loadUnitsIndex() {
    try {
      const response = await fetch('docs-index.json');
      if (response.ok) {
        this.units = await response.json();
      }
    } catch (error) {
      console.warn('Could not load units index:', error);
    }
  }

  async loadCurrentUnit() {
    const unit = this.units.find(u => u.num === this.currentUnitId);
    if (!unit) {
      this.showError('الوحدة غير موجودة');
      return;
    }

    try {
      // Load markdown content
      const response = await fetch(`docs/${unit.file}`);
      if (!response.ok) {
        throw new Error('Could not load unit content');
      }

      const markdown = await response.text();
      this.renderUnit(unit, markdown);
      
    } catch (error) {
      console.error('Error loading unit:', error);
      this.showError('خطأ في تحميل المحتوى');
    }
  }

  renderUnit(unit, markdown) {
    // Update page title
    document.title = `${unit.title} - المجلس التقني`;

    // Parse frontmatter and content
    const { frontmatter, content } = this.parseMarkdown(markdown);

    // Update header
    document.getElementById('unit-title').textContent = unit.title;
    
    // Update meta info
    const metaEl = document.getElementById('unit-meta');
    metaEl.innerHTML = '';
    
    if (frontmatter.time) {
      metaEl.innerHTML += `<span>⏱️ ${frontmatter.time}</span>`;
    }
    if (frontmatter.level) {
      metaEl.innerHTML += `<span>📊 ${this.translateLevel(frontmatter.level)}</span>`;
    }
    if (frontmatter.tags) {
      metaEl.innerHTML += `<span>🏷️ ${frontmatter.tags.join(', ')}</span>`;
    }

    // Convert markdown to HTML (basic conversion)
    const htmlContent = this.markdownToHTML(content);
    document.getElementById('unit-content').innerHTML = htmlContent;

    this.setupUnitNavigation();
  }

  parseMarkdown(markdown) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);
    
    if (match) {
      const frontmatterText = match[1];
      const content = match[2];
      
      // Basic YAML parsing (simplified)
      const frontmatter = {};
      frontmatterText.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          let value = valueParts.join(':').trim();
          
          // Handle arrays
          if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1).split(',').map(s => s.trim());
          }
          // Remove quotes
          else if ((value.startsWith('"') && value.endsWith('"')) || 
                   (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          
          frontmatter[key.trim()] = value;
        }
      });
      
      return { frontmatter, content };
    }
    
    return { frontmatter: {}, content: markdown };
  }

  markdownToHTML(markdown) {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    
    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<pre><code>$2</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Bold
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // Tables (basic)
    html = html.replace(/\|(.+)\|\n\|(-+\|)+\n((?:\|.+\|\n?)*)/g, (match, header, sep, rows) => {
      const headerCells = header.split('|').map(cell => `<th>${cell.trim()}</th>`).join('');
      const rowsHTML = rows.trim().split('\n').map(row => {
        const cells = row.split('|').map(cell => `<td>${cell.trim()}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<table><thead><tr>${headerCells}</tr></thead><tbody>${rowsHTML}</tbody></table>`;
    });
    
    // Lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // Clean up empty paragraphs and fix nested elements
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]|<table|<ul|<pre)/g, '$1');
    html = html.replace(/(<\/h[1-6]>|<\/table>|<\/ul>|<\/pre>)<\/p>/g, '$1');
    
    return html;
  }

  setupUnitNavigation() {
    const currentIndex = this.units.findIndex(u => u.num === this.currentUnitId);
    
    // Previous unit
    if (currentIndex > 0) {
      const prevUnit = this.units[currentIndex - 1];
      const prevBtn = document.getElementById('prev-unit');
      prevBtn.href = `unit.html?id=${prevUnit.num}`;
      prevBtn.textContent = `← ${prevUnit.title.replace(/^\d+\s*-\s*/, '')}`;
      prevBtn.style.display = 'inline-block';
    }
    
    // Next unit
    if (currentIndex < this.units.length - 1) {
      const nextUnit = this.units[currentIndex + 1];
      const nextBtn = document.getElementById('next-unit');
      nextBtn.href = `unit.html?id=${nextUnit.num}`;
      nextBtn.textContent = `${nextUnit.title.replace(/^\d+\s*-\s*/, '')} ←`;
      nextBtn.style.display = 'inline-block';
    }
  }

  setupNavigation() {
    // Highlight current unit in sidebar
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.href.includes(`id=${this.currentUnitId}`)) {
        link.classList.add('active');
      }
    });
  }

  translateLevel(level) {
    const levels = {
      'beginner': 'مبتدئ',
      'intermediate': 'متوسط',
      'advanced': 'متقدم'
    };
    return levels[level] || level;
  }

  showError(message) {
    document.getElementById('unit-title').textContent = 'خطأ';
    document.getElementById('unit-content').innerHTML = `<p class="error">${message}</p>`;
  }
}

// تشغيل عارض الوحدات
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('unit.html')) {
    new UnitViewer();
  }
});
