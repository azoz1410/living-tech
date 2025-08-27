---
title: "03 - الفروع (Branches)"
slug: 03-branches
lang: ar
summary: إنشاء وإدارة الفروع، الدمج والحذف واستراتيجية تسمية بسيطة.
tags: [git, branches, workflow]
level: beginner
time: 12m
---

# 03 - الفروع (Branches)

## الهدف
فهم دور الفروع في عزل التطوير وتنظيم العمل وتدفق المزايا.

## لماذا نستخدم الفروع؟
| السبب | الفائدة |
|-------|---------|
| عزل الميزة | يمنع كسر الفرع الرئيسي |
| التجربة | إمكانية رمي الفرع دون أثر |
| تصحيح عاجل | إنشاء hotfix سريع |

## إنشاء واستعراض
```bash
git branch                      # عرض الفروع
git branch feature/login        # إنشاء فقط
git switch feature/login        # (Git >= 2.23) انتقال
git checkout feature/login      # (أقدم)
git checkout -b feature/login   # إنشاء + انتقال
```

## الدمج إلى main
```bash
git switch main
git merge feature/login
```
ينشئ merge commit إن لزم، أو دمج سريع (fast-forward) إن كان خطياً.

## حذف الفروع بعد الدمج
```bash
git branch -d feature/login   # حذف آمن (مُدمج)
git branch -D feature/login   # فرضي (غير مدمج)
```

## استراتيجية مبسطة للأسماء
| نوع | نمط | مثال |
|-----|-----|------|
| رئيسي | main | main |
| ميزة | feature/<اسم> | feature/auth-flow |
| إصلاح عاجل | hotfix/<وصف> | hotfix/login-null |

## تحديث الفرع
```bash
git switch feature/login
git fetch origin
git merge origin/main   # دمج
# أو
git rebase origin/main  # تاريخ خطي (حذر عند مشاركته)
```

## Rebase مقابل Merge (ملخص)
- merge: يحافظ على البنية المتفرعة.
- rebase: يعيد التطبيق لتاريخ خطي أنظف، لكنه يغير SHAs.

## معالجة تعارض بسيط
1. افتح الملف المتعارض.
2. اختر الأسطر الصحيحة وحذف علامات `<<<<<<<` و `=======` و `>>>>>>>`.
3. أضف الملف ثم أكمل (`git add` ثم `git commit` أو `git merge --continue`).

## تمرين
1. أنشئ فرعاً: `feature/banner`.
2. عدل `README.md` وأضف سطر مميز.
3. أنشئ commit وادفع الفرع.
4. افتح Pull Request.

## نصائح
- لا تبقِ الفروع لفترات طويلة.
- ادفع مبكراً لتأمين نسخة احتياطية.

---
التالي: `04-github-basics.md`
