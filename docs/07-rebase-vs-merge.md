# 07 - Rebase vs Merge

## الهدف
معرفة الفروق العملية لاختيار الأنسب.

## Merge
- يحافظ على تاريخ متشعب.
- بسيط ذهنيًا.
- قد يُنتج شجرة معقدة بمرور الوقت.

## Rebase
- يعيد كتابة تسلسل commits فوق قاعدة جديدة.
- تاريخ خطي أنظف.
- يغير الـ SHAs (لا تعِد rebase على فروع منشورة يتشاركها آخرون).

## مثال Rebase
```bash
git switch feature/x
git fetch origin
git rebase origin/main  # يعيد تطبيق Commits feature/x فوق آخر main
# أثناء التعارض: حل ثم
git add <files>
git rebase --continue
```

## متى أستخدم أيهما؟
| الحالة | الأفضل غالباً |
|--------|----------------|
| فريق مبتدئ | Merge |
| تاريخ طويل متشابك | Rebase تفاعلي لتنظيف |
| إصلاح سريع منشور | Merge |
| قبل فتح PR | Rebase لتحديث ثم Push force-with-lease |

## Squash + Rebase؟
ممكن: تنظف التاريخ ثم squash عند الدمج.

## تمرين
1. أنشئ فرعاً بــ 3 commits.
2. أضف commit جديد إلى main.
3. نفذ rebase للفروع.
4. استعرض `git log --oneline --graph`.

---
التالي: `08-branch-protection.md`.
