---
title: "00 - إعداد البيئة"
slug: 00-setup-environment
lang: ar
summary: تهيئة Git والهوية ومفتاح SSH وضبط البيئة لبدء العمل.
tags: [git, setup, ssh]
level: beginner
time: 15m
---

# 00 - إعداد البيئة

> إعداد صحيح مبكر = تقليل مشاكل لاحقة متعلقة بالهوية والصلاحيات.

## الهدف
تهيئة بيئة عمل Git + محرر + هوية المستخدم + مفاتيح الوصول (SSH) للتحكم بالمستودعات بدون إدخال كلمة المرور كل مرة.

## المتطلبات المسبقة
- اتصال إنترنت.
- صلاحية تثبيت برامج.

## الخطوات التفصيلية
### 1) تثبيت Git
- Windows: https://git-scm.com/download/win (حافظ على الخيارات الافتراضية غالباً).
- macOS: أمر: `xcode-select --install` أو من الموقع.
- Linux (Debian/Ubuntu):
```bash
sudo apt update && sudo apt install -y git
```

### 2) ضبط الهوية العالمية
```bash
git config --global user.name "اسمك"
git config --global user.email "بريدك@example.com"
git config --global core.autocrlf input   # لنهايات أسطر متناسقة (مستحسن على macOS/Linux)
```
تحقق:
```bash
git config --global --get user.name
git config --global --get user.email
```

### 3) توليد مفتاح SSH
```bash
ssh-keygen -t ed25519 -C "بريدك@example.com"
cat ~/.ssh/id_ed25519.pub
```
انسخ الناتج وأضفه في: GitHub > Settings > SSH and GPG keys > New SSH key.

### 4) اختبار الاتصال الآمن
```bash
ssh -T git@github.com
```
يجب أن ترى رسالة ترحيب (قد يطلب تأكيد fingerprint أول مرة).

### 5) إنشاء مجلد عمل منظم
```bash
mkdir -p ~/workspace && cd ~/workspace
```

## التحقق الذاتي (Checklist)
- [ ] يظهر إصدار Git: `git --version`.
- [ ] الأمر `ssh -T git@github.com` يعمل دون طلب كلمة مرور.
- [ ] الاسم والبريد مضبوطان ويطابقان حساب GitHub.

## أخطاء شائعة وحلول
| المشكلة | السبب المحتمل | الحل السريع |
|---------|---------------|-------------|
| Permission denied (publickey) | مفتاح غير مضاف أو وكيل SSH لا يعمل | أضف المفتاح أو أعد تشغيل ssh-agent |
| بريد خاطئ في commits | ضبط email مختلف | عدل email ثم أعد الالتزام (إن لزم) |
| اختلاف نهايات الأسطر | autocrlf غير مناسب | استخدم `core.autocrlf input` أو `false` حسب النظام |
| تكرار طلب كلمة المرور | تستخدم HTTPS بدلاً من SSH | استعمل عنوان clone بصيغة SSH |

## تمرين عملي
1. أنشئ مستودع GitHub جديد باسم `playground` (بدون README).
2. محلياً:
```bash
git clone git@github.com:<اسم-المستخدم>/playground.git
cd playground
echo "Hello Council" > hello.txt
git add hello.txt
git commit -m "feat: إضافة ملف ترحيب"
git push origin main
```
3. افتح المستودع في GitHub وتأكد من ظهور الملف.

## مصادر إضافية
- وثائق Git الرسمية: https://git-scm.com/doc
- مستودع GitHub Docs: https://docs.github.com/

---
التالي: `01-file-lifecycle.md`
   echo "Hello Council" > hello.txt
   git add hello.txt
   git commit -m "feat: إضافة ملف ترحيب"
   git push origin main
   ```
3. تأكد من ظهور الملف في GitHub.

---
انتقل الآن إلى: `01-file-lifecycle.md`.
