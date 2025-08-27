#!/usr/bin/env node
// توليد فهرس للوحدات في README (مبسط)
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const docsDir = join(process.cwd(), 'docs');
const readmePath = join(process.cwd(), 'README.md');

function collect() {
  const files = readdirSync(docsDir)
    .filter(f => /^\d+-.+\.md$/.test(f))
    .sort((a,b) => a.localeCompare(b, 'en', { numeric: true }));
  return files.map(f => {
    const full = readFileSync(join(docsDir, f), 'utf-8');
    const title = (full.match(/^#\s+(.+)/m) || [null, f])[1].trim();
    const num = f.split('-')[0];
    return { file: f, title, num };
  });
}

function updateReadme(units) {
  const original = readFileSync(readmePath, 'utf-8');
  const markerStart = '<!-- TOC_START -->';
  const markerEnd = '<!-- TOC_END -->';
  const toc = units.map(u => `- [${u.num}] ${u.title} (docs/${u.file})`).join('\n');
  const block = `${markerStart}\n${toc}\n${markerEnd}`;
  let next;
  if (original.includes(markerStart) && original.includes(markerEnd)) {
    next = original.replace(new RegExp(`${markerStart}[\s\S]*?${markerEnd}`), block);
  } else {
    next = original + '\n\n' + block + '\n';
  }
  writeFileSync(readmePath, next);
  console.log('TOC updated.');
}

const units = collect();
updateReadme(units);
