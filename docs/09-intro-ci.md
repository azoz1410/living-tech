# 09 - مقدمة التكامل المستمر (CI)

## الهدف
تشغيل فحوصات آلية (اختبارات / تنسيق) على كل Pull Request.

## لماذا؟
- اكتشاف الأعطال مبكراً.
- توحيد جودة الكود.
- تسريع المراجعة.

## GitHub Actions مثال بسيط
ملف: `.github/workflows/ci.yml`
```yaml
name: CI
on:
  pull_request:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci || npm install
      - run: npm test --if-present
      - name: Generate TOC
        run: node scripts/generate-toc.mjs || echo "skip"
```

## تحسينات مستقبلية
- Lint (ESLint).
- تغطية اختبارات.
- نشر صفحة توثيق.

## تمرين
1. أضف workflow أعلاه.
2. افتح PR وشاهد الفحص.

---
انتهى المسار الأساسي. أعد المراجعة أو ابدأ التحديات.
