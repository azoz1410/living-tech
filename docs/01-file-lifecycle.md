---
title: "01 - دورة حياة الملف في Git"
slug: 01-file-lifecycle
lang: ar
summary: فهم المراحل الثلاث للملف في Git وكيفية الانتقال بينها مع أوامر أساسية.
tags: [git, staging, commits]
level: beginner
time: 10m
---

# 01 - دورة حياة الملف في Git

## الهدف
إدراك أن كل تعديل يمر بثلاث مناطق: منطقة العمل، منطقة الإعداد (Staging)، وسجل التاريخ (Repository).

## المفاهيم الأساسية
| الطبقة | الاسم | الوصف |
|--------|-------|-------|
| 1 | Working Directory | ملفاتك القابلة للتعديل الآن |
| 2 | Staging Area (Index) | لقطة انتقائية تنتظر التثبيت |
| 3 | Repository (Commits) | تاريخ غير قابل للتغيير عملياً |

## لماذا وجود Staging مفيد؟
يسمح بتجميع تعديلات مترابطة، وتأجيل أجزاء غير مكتملة دون تعطيل الباقي.

## أوامر أساسية
```bash
git status                               # نظرة عامة
git add file.txt                         # إدخال ملف للـ Staging
git restore --staged file.txt            # إخراجه من Staging
git commit -m "feat: رسالة"             # إنشاء commit
git log --oneline --graph --decorate     # عرض مبسط للتاريخ
```

## التدفق العملي القياسي
1. تعدل أو تضيف ملفاً.
2. تضيف الملفات المراد تثبيتها: `git add`.
3. تنشئ commit يمثل لقطة متناسقة.
4. تدفع إلى GitHub: `git push`.

## مثال انتقائي
```bash
git add src/a.js          # أضف فقط الملف الجاهز
# اترك src/b.js للتعديل لاحقاً
git commit -m "feat: إضافة الدالة A"
```

## مقارنة الفروق
```bash
git diff                  # فروق غير مضافة
git diff --staged         # فروق مضافة تنتظر commit
```

## تغيير أسماء / حذف
```bash
git mv old.txt new.txt    # إعادة تسمية مع تتبع
git rm unused.txt         # حذف الملف وتتبع الحذف
```

## أخطاء شائعة
| الحالة | السبب | الحل |
|--------|-------|------|
| commit فارغ | لا شيء في Staging | أضف ملفات قبل الالتزام |
| نسيان ملف | لم تتم إضافته | git add <file> |
| تعديل بعد add | التعديل بعد الإدخال | أعد git add |
| تضمنت ملفات غير جاهزة | add شامل للمجلد | استخدم add انتقائي أو git restore --staged |

## تمرين تطبيقي
1. أنشئ ثلاثة ملفات: `a.txt`, `b.txt`, `c.txt`.
2. أضف فقط `a.txt` و `b.txt`.
3. أنشئ commit: `feat: إضافة ملفات A و B`.
4. عدل `b.txt` واعرض الفرقين (`diff` و `diff --staged`).

## مصادر إضافية
- كتاب Pro Git الفصل 2.

---
التالي: `02-good-commit-messages.md`
