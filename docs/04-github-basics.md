# 04 - أساسيات GitHub

## عناصر رئيسية
- Repository: الحاوية الأساسية للكود.
- Issues: تتبع المهام والأخطاء.
- Pull Requests: دمج التغييرات بعد المراجعة.
- Labels: تصنيف (bug, enhancement, question).
- Projects (Boards): تنظيم العمل بصرياً.
- Discussions: حوارات مفتوحة.

## إنشاء مستودع
1. New Repository.
2. اسم واضح (kebab-case).
3. اختر Public (تعليمي).
4. أضف README + .gitignore (اختياري).

## رفع محلي لمستودع جديد فارغ
```bash
git init myrepo
cd myrepo
git add .
git commit -m "feat: أول هيكلة"
git remote add origin git@github.com:<user>/myrepo.git
git push -u origin main
```

## Issue فعّال
```
عنوان: Fix: فشل build في Node 20
الوصف:
- الخطأ يظهر عند تشغيل npm test
- رسالة: ESM module not found
خطوات إعادة الإنتاج...
```

## قوالب Issue / PR
- تقلل الوقت.
- تضمن معلومات كافية.

## Pull Request جيد
- يصف الهدف.
- يذكر Issue مرتبط: Closes #12.
- لقطات شاشة UI (إن وجدت).
- قائمة تحقق (Checklist).

## حماية الفرع
Settings > Branches > Protection rules.
- طلب مراجعة 1+.
- منع الدمج عند فشل الفحص.

## تمرين
1. افتح Issue تحسين README.
2. أنشئ فرعاً مرتبطاً.
3. عدل README.
4. افتح PR يذكر Issue.

---
التالي: `05-pull-requests.md`.
