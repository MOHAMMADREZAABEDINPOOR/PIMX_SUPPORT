<div align="center">

<img src="assets/readme/hero.gif" width="1200" alt="PIMX SUPPORT — rotating 3D geometry" />

**[English](README.md) · [فارسی](README.fa.md)**

<img src="assets/readme/identity.svg" width="1200" alt="web / English and Persian documentation" />

</div>

# PIMX SUPPORT

صفحه دوزبانه حمایت مالی از PIMX با کارت شبکه‌های رمزارزی، آدرس کیف پول و نمایش جزئیات به شکل رسید.

[GitHub](https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_SUPPORT) · [PIMX / Profile](https://github.com/MOHAMMADREZAABEDINPOOR) · [بنر ثابت](assets/readme/hero.png)

## امکانات

- کارت کیف پول و شبکه و کپی آدرس
- پنجره جزئیات کیف پول با ظاهر رسید
- محتوای فارسی و انگلیسی و چیدمان واکنش‌گرا
- فرانت‌اند React و سرور استاتیک اختیاری Express

## پشته فنی

| ابزار | نسخه یا منبع |
|---|---|
| React | `^19.2.1` |
| Vite | `^7.1.7` |
| TypeScript | `5.6.3` |
| Express | `^4.21.2` |
| Framer Motion | `^12.23.22` |
| Tailwind CSS | `^4.1.14` |

## شروع کار

Node.js 22.12 یا بالاتر و مدیر پکیج مشخص‌شده در package.json. نسخه وابستگی‌ها را مطابق فایل قفل نصب کنید.

```bash
git clone https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_SUPPORT.git
cd PIMX_SUPPORT

pnpm install --frozen-lockfile
pnpm run dev
```

## تنظیمات

کلیدهای زیر از فایل نمونه یا کد استخراج شده‌اند؛ همه الزاماً اجباری نیستند. مقدار و پیش‌فرض را در همان فایل بررسی و اسرار را فقط در محیط محلی یا هاست تنظیم کنید.

| نام | کاربرد |
|---|---|
| `BUILT_IN_FORGE_API_KEY` | اعتبارنامه یا اتصال؛ خصوصی نگه دارید |
| `BUILT_IN_FORGE_API_URL` | تنظیم برنامه؛ تعریف را در منبع بررسی کنید |
| `PORT` | تنظیم برنامه؛ تعریف را در منبع بررسی کنید |

## استفاده

کارت کیف پول را انتخاب، آدرس و شبکه نمایش‌داده‌شده را بررسی و از کپی استفاده کنید. آرایه wallets در client/src/pages/Home.tsx برای تغییر مقصد است.

## ساختار پروژه

| مسیر | نقش |
|---|---|
| [`assets/`](assets/) | فایل برند، رسانه و README |
| [`client/`](client/) | برنامه مرورگر |
| [`server/`](server/) | پیاده‌سازی سرور |
| [`components.json`](components.json) | فایل ورودی یا تنظیم پروژه |
| [`package.json`](package.json) | فایل ورودی یا تنظیم پروژه |
| [`template.json`](template.json) | فایل ورودی یا تنظیم پروژه |
| [`tsconfig.json`](tsconfig.json) | فایل ورودی یا تنظیم پروژه |
| [`tsconfig.node.json`](tsconfig.node.json) | فایل ورودی یا تنظیم پروژه |

## فرمان‌ها و بررسی

```bash
pnpm run dev
pnpm run build
pnpm run start
pnpm run preview
pnpm run check
```

این‌ها فرمان‌های موجود در package.json هستند؛ فهرست بالا گزارش اجرای آزمون نیست. فرمان تست ممکن است مرورگر، سرویس یا دیتابیس آماده بخواهد.

## استقرار

خروجی build را مطابق معماری منتشر کنید: پروژه دارای server به فرایند Node نیاز دارد؛ رابط Vite استاتیک می‌تواند از dist میزبانی شود. توابع Pages، KV یا D1 به تنظیم مستقل نیاز دارند.

## محدودیت‌ها

صفحه مقصد حمایت را نشان می‌دهد و پرداخت را پردازش یا تراکنش را تأیید نمی‌کند. پیش از استفاده مالکیت و شبکه کیف پول را بررسی کنید. بک‌اند ثبت تیکت در این نسخه وجود ندارد.

## رفع مشکل

- پکیج غایب: وابستگی را با مدیر پکیج پروژه نصب کنید.
- خطای API یا شبکه: آدرس، سرویس و اتصال میزبانی را بررسی کنید.
- فایل قدیمی: در صورت وجود اسکریپت ساخت، build و کش مرورگر را تازه کنید.

## مشارکت

برای تغییر، شاخه مستقل بسازید، رفتار فعلی را بررسی کنید و توضیح روشن همراه تغییر بفرستید. اطلاعات خصوصی، خروجی build و دیتابیس محلی را commit نکنید.

## مجوز

فایل مجوز در این نسخه موجود نیست. نمایش عمومی کد به‌تنهایی مجوز استفاده مجدد نیست؛ برای شرایط استفاده با مالک مخزن هماهنگ کنید.

---

ساخته‌شده در مجموعه **PIMX** · مستندات فارسی و انگلیسی.
