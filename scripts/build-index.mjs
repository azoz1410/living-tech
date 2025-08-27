#!/usr/bin/env node
// يبني ملف JSON (docs-index.json) من ملفات الوحدات
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const docsDir = join(process.cwd(), 'docs');
const outPath = join(process.cwd(), 'docs-index.json');

const units = readdirSync(docsDir)
  .filter(f => /^\d+-.+\.md$/.test(f))
  .sort((a,b) => a.localeCompare(b, 'en', { numeric: true }))
  .map(f => {
    const content = readFileSync(join(docsDir, f), 'utf-8');
    const title = (content.match(/^#\s+(.+)/m) || [null, f])[1].trim();
    const num = f.split('-')[0];
    return { file: f, title, num };
  });

writeFileSync(outPath, JSON.stringify(units, null, 2));
console.log('docs-index.json generated.');
