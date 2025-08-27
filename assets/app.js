// المجلس التقني - التطبيق الرئيسي

class TechCouncilApp {
  constructor() {
    this.init();
  }

  async init() {
    await this.loadUnits();
    this.setupNavigation();
    this.updateStats();
  }

  async loadUnits() {
    try {
      const response = await fetch('docs-index.json');
      if (!response.ok) return;
      
      const units = await response.json();
      this.renderNavigation(units);
      
      // Update units count
      const unitsCountEl = document.getElementById('units-count');
      if (unitsCountEl) {
        unitsCountEl.textContent = units.length;
      }
      
    } catch (error) {
      console.warn('Could not load units:', error);
    }
  }

  renderNavigation(units) {
    const navList = document.getElementById('nav-list');
    if (!navList) return;

    // Keep only the home link - remove all units from navigation
    // Units will be added manually as instructed by the user
    
    // Update units count
    const unitsCountEl = document.getElementById('units-count');
    if (unitsCountEl) {
      unitsCountEl.textContent = units.length;
    }
  }

  setupNavigation() {
    // Highlight current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === 'index.html' && 
          (currentPath.endsWith('index.html') || currentPath.endsWith('/'))) {
        link.classList.add('active');
      }
    });
  }

  updateStats() {
    // يمكن إضافة منطق لحساب الإحصائيات ديناميكياً
    // مثل عدد التحديات المكتملة، الوقت المقدر، إلخ
  }
}

// تشغيل التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  new TechCouncilApp();
});

// دعم التنقل عبر لوحة المفاتيح
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === '/') {
    e.preventDefault();
    // يمكن إضافة بحث سريع لاحقاً
  }
});
