# 08 - حماية الفروع (Branch Protection)

## لماذا؟
منع دمج كود غير مراجع أو مكسور إلى الفرع الرئيسي.

## إعداد في GitHub
Settings > Branches > Add rule.

خيارات شائعة:
- Require a pull request before merging
- Require approvals (1 أو أكثر)
- Dismiss stale reviews
- Require status checks to pass (CI)
- Require signed commits (اختياري)

## Code Owners
ملف `CODEOWNERS` في الجذر أو `.github/`:
```
# مثال
/docs/   @docs-maintainers
/scripts/ @devops-team
```
يفرض طلب مراجعة من المالكين.

## نصائح
- ابدأ بقواعد خفيفة (موافقة واحدة + فحص واحد).
- زد القيود تدريجياً.

## تمرين
1. أنشئ ملف CODEOWNERS بسيط.
2. فعّل قاعدة حماية لفرع main مع موافقة واحدة.
3. افتح PR وتحقق من طلب المراجعة.

---
التالي: `09-intro-ci.md`.
