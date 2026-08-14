<div align="center">
<h1>PIMXSUPPORT</h1>
<p><strong>Bilingual Direct Cryptocurrency Support Page for the PIMX Ecosystem</strong></p>
</div>

[![Persian Description](https://img.shields.io/badge/Read-Persian%20Description-0A66C2?style=for-the-badge)](#persian-description)
[![Website](https://img.shields.io/badge/Live-pimxsupport.pages.dev-0ea5e9?style=for-the-badge)](https://pimxsupport.pages.dev/)

---

## 🌐 Live Website

**Production URL:** [https://pimxsupport.pages.dev/](https://pimxsupport.pages.dev/)

---

## 💙 What is PIMXSUPPORT?

PIMXSUPPORT is a modern, **bilingual (EN/FA)** cryptocurrency donation page for directly supporting Mohammad Reza Abedinpoor and the wider PIMX project ecosystem. It presents verified destination addresses as tactile receipt-style objects, making it easy to select an asset, confirm its network, copy the address, or scan a QR code.

The application is intentionally account-free and sends donations directly from the visitor's wallet to the displayed destination address. It does not process payments, hold funds, or act as an intermediary.

### ✨ Key Capabilities

- 🌍 **Bilingual Interface** with complete English and Persian content
- ↔️ **Native RTL/LTR Support** with instant language switching
- 💰 **Nine Donation Options** across major, stablecoin, and ecosystem assets
- 🧾 **Receipt-Inspired Editorial Interface** with print textures and hard graphic details
- 📱 **Fully Responsive Layout** for desktop, tablet, and mobile
- 📋 **One-Click Address Copying** with visible success and failure feedback
- 📷 **QR Code Generation** for scanning destination addresses in wallet apps
- 🛡️ **Network Verification Prompts** to reduce incorrect-network transfers

---

## 🚀 Core Features

### 💳 Donation Wallets

- Direct wallet addresses with no account or payment processor
- Bitcoin, Ethereum, BNB, TRON, Solana, TON, Dogecoin, and Tether support
- Separate Tether destinations for ERC-20 and TRC-20
- Clear asset, network, reference, and destination labels
- Compact address previews with access to the complete address

### 🔄 Donation Workflow

- Select the asset and matching blockchain network
- Copy the destination address with one click
- Open a receipt-style modal containing the complete address
- Scan a dynamically generated QR code from a mobile wallet
- Review the network warning before approving the transfer

### 🎨 Visual Experience

- Warm paper-inspired canvas with print texture
- Transfer-blue accents, black ink, registration marks, and receipt cuts
- Editorial typography and responsive motion
- Independent color identity for each cryptocurrency
- Animated entry, modal, toast, and layout transitions
- Reduced-motion handling through the browser's accessibility preference

### 🌍 Multilingual Support

- Complete English and Persian interface copy
- Automatic document direction updates between `ltr` and `rtl`
- Persian-friendly typography using IBM Plex Sans Arabic
- English display typography using Space Grotesk and IBM Plex Mono
- Language switch available directly from the page header

### ♿ Reliability & Accessibility

- React error boundary for graceful failure handling
- Semantic buttons, headings, sections, and dialog roles
- Accessible labels for QR and close controls
- Keyboard support for closing the QR dialog with `Escape`
- Clipboard fallback for browsers without the modern Clipboard API
- Client-side fallback page for unknown routes

---

## 🪙 Supported Assets

| No. | Asset | Network | Symbol |
|-----|-------|---------|--------|
| **01** | **Bitcoin** | Native SegWit | BTC |
| **02** | **Ethereum** | Ethereum Mainnet | ETH |
| **03** | **Tether** | ERC-20 / Ethereum | USDT |
| **04** | **BNB** | BNB Smart Chain | BNB |
| **05** | **Tether** | TRC-20 / TRON | USDT |
| **06** | **TRON** | TRON Network | TRX |
| **07** | **Solana** | Solana Network | SOL |
| **08** | **TON** | The Open Network | TON |
| **09** | **Dogecoin** | Dogecoin Network | DOGE |

Always confirm that the selected asset and network in your wallet exactly match the destination shown on the website before sending funds.

---

## 🔐 Data & Privacy Model

PIMXSUPPORT is primarily a static donation interface and does not require a user account, form submission, backend database, or payment processor.

### 💻 Used Only During the Current Visit

- Selected interface language (`en` or `fa`)
- Selected wallet while the QR dialog is open
- Temporary copy-status notifications

### 🚫 Not Collected by the Core Application

- Personal information
- Passwords or authentication credentials
- Wallet private keys or seed phrases
- Uploaded files
- Donation amounts or transaction history
- Browser payment details

QR images are generated from the public destination address through an external QR service. Cryptocurrency icons and selected visual assets are also served through external public CDNs.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Component-based user interface |
| **TypeScript** | Type-safe application development |
| **Vite 7** | Build tool and development server |
| **Tailwind CSS 4** | Utility styling foundation |
| **Radix UI** | Accessible UI primitives |
| **Lucide React** | Interface icons |
| **Wouter** | Lightweight client-side routing |
| **Framer Motion** | Motion, transitions, and dialog animation |
| **Express** | Optional production static server |
| **pnpm** | Dependency and workspace management |
| **Cloudflare Pages** | Static hosting and deployment |

---

## 💻 Local Development

### 📋 Prerequisites

- Node.js **20.19+** or **22.12+**
- pnpm **10+**

### ⚙️ Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_SUPPORT.git
   cd PIMX_SUPPORT
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

   Open your browser at [http://localhost:3000](http://localhost:3000).

4. **Run the TypeScript check:**

   ```bash
   pnpm check
   ```

5. **Build for production:**

   ```bash
   pnpm build
   ```

6. **Run the production server:**

   ```bash
   pnpm start
   ```

---

## ☁️ Cloudflare Pages Deployment

### 🔗 Git Integration Settings

Connect this repository to Cloudflare Pages and use the following build configuration:

| Setting | Value |
|---------|-------|
| **Framework preset** | Vite |
| **Build command** | `pnpm build` |
| **Build output directory** | `dist/public` |
| **Root directory** | `/` |
| **Node.js version** | `20.19+` recommended |

The Cloudflare Pages deployment is fully static. The Express bundle generated at `dist/index.js` is intended for conventional Node.js hosting and is not included in the Pages output directory.

### 🚀 Direct Upload

```bash
pnpm exec wrangler pages deploy dist/public --project-name=pimxsupport
```

---

## 📁 Project Structure

```text
PIMX_SUPPORT/
├── client/
│   ├── index.html                 # HTML document and page metadata
│   ├── public/                    # Static public assets
│   └── src/
│       ├── App.tsx                # Application shell and routes
│       ├── main.tsx               # React entry point
│       ├── index.css              # Visual and responsive design system
│       ├── pages/
│       │   ├── Home.tsx           # Bilingual donation experience
│       │   └── NotFound.tsx       # Fallback route
│       ├── components/            # Shared and accessible UI components
│       ├── contexts/              # Theme context
│       ├── hooks/                 # Reusable React hooks
│       └── lib/                   # Shared client utilities
├── server/
│   └── index.ts                   # Optional Express static server
├── shared/                        # Shared application code
├── patches/
│   └── wouter@3.7.1.patch         # Routing dependency patch
├── vite.config.ts                 # Vite, Tailwind, aliases, and output
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Scripts and dependencies
└── pnpm-lock.yaml                 # Reproducible dependency lockfile
```

---

## 🎨 Design Direction

**Movement:** Experimental editorial print design translated into a direct-donation ledger.

**Core visual language:**

- Warm paper canvas with visible print texture
- Transfer blue, ink black, asset colors, and high-contrast white
- Receipt cuts, reference numbers, stamps, registration lines, and barcode details
- Large editorial typography with compact technical labels
- Tactile wallet receipts instead of conventional dashboard cards
- Responsive composition that becomes a clear vertical ledger on mobile

The interface is designed to feel like a verified printed donation register rather than a conventional checkout or exchange screen.

---

## ✅ Validation

Before deployment, run:

```bash
pnpm check
pnpm build
```

Both commands must finish successfully before publishing a production deployment.

---

## 🛡️ Security Notice

- Never share a private key, seed phrase, password, or wallet backup with this website or anyone claiming to represent it.
- Verify the full destination address and blockchain network before confirming a transaction.
- Blockchain transactions are generally irreversible.
- PIMXSUPPORT displays public destination addresses only and never requests wallet access.

---

## 📄 License

This project is released under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m "Add amazing feature"`)
4. Push the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 💙 Support & Contact

For issues, questions, or suggestions, open an issue in this repository. To directly support Mohammad Reza and future PIMX projects, visit [pimxsupport.pages.dev](https://pimxsupport.pages.dev/).

---

<a id="persian-description"></a>

# PIMXSUPPORT

## 🇮🇷 توضیحات فارسی

PIMXSUPPORT یک صفحه مدرن و **دوزبانه فارسی و انگلیسی** برای حمایت مستقیم رمزارزی از محمدرضا عابدین‌پور و اکوسیستم پروژه‌های PIMX است. این وب‌سایت آدرس‌های مقصد را به‌شکل رسیدهای گرافیکی مستقل نمایش می‌دهد تا بتوانید دارایی و شبکه را انتخاب کنید، آدرس را کپی کنید یا کد QR را با کیف‌پول خود اسکن کنید.

این برنامه به حساب کاربری نیاز ندارد و کمک مالی را مستقیماً از کیف‌پول فرستنده به آدرس مقصد نمایش‌داده‌شده منتقل می‌کند. PIMXSUPPORT پردازشگر پرداخت، صرافی یا نگهدارنده دارایی نیست.

### ✨ ویژگی‌های اصلی

- 🌍 **رابط کامل دوزبانه** به زبان فارسی و انگلیسی
- ↔️ **پشتیبانی واقعی از RTL و LTR** با تغییر سریع زبان
- 💰 **۹ گزینه حمایت مالی** در شبکه‌ها و دارایی‌های مختلف
- 🧾 **رابط ادیتوریال شبیه رسید چاپی** با جزئیات گرافیکی سخت
- 📱 **طراحی کاملاً واکنش‌پذیر** برای دسکتاپ، تبلت و موبایل
- 📋 **کپی آدرس با یک کلیک** همراه با پیام موفقیت یا خطا
- 📷 **تولید کد QR** برای اسکن آدرس مقصد در اپلیکیشن کیف‌پول
- 🛡️ **هشدار تطبیق شبکه** برای کاهش احتمال انتقال روی شبکه اشتباه

### 💳 کیف‌پول‌های حمایت

- آدرس‌های مستقیم بدون حساب کاربری یا واسطه پرداخت
- پشتیبانی از Bitcoin، Ethereum، BNB، TRON، Solana، TON، Dogecoin و Tether
- مقصد جداگانه Tether برای شبکه‌های ERC-20 و TRC-20
- نمایش واضح نام دارایی، شبکه، شناسه و آدرس مقصد
- نمایش خلاصه آدرس همراه با دسترسی به آدرس کامل

### 🔄 روند حمایت مالی

- دارایی و شبکه بلاکچین متناظر را انتخاب کنید
- آدرس مقصد را با یک کلیک کپی کنید
- رسید شامل آدرس کامل و کد QR را باز کنید
- کد QR را با اپلیکیشن کیف‌پول موبایل اسکن کنید
- پیش از تأیید انتقال، هشدار شبکه را بررسی کنید

### 🎨 تجربه بصری

- پس‌زمینه کاغذی گرم با بافت چاپی
- رنگ آبی انتقال، جوهر مشکی و جزئیات شبیه رسید
- تایپوگرافی ادیتوریال و حرکت‌های واکنش‌گرا
- هویت رنگی مستقل برای هر رمزارز
- انیمیشن ورود، مودال، اعلان و تغییر چیدمان
- احترام به تنظیم کاهش حرکت مرورگر

### 🌍 پشتیبانی چندزبانه

- متن کامل رابط به فارسی و انگلیسی
- تغییر خودکار جهت سند بین `rtl` و `ltr`
- استفاده از IBM Plex Sans Arabic برای متن فارسی
- استفاده از Space Grotesk و IBM Plex Mono برای تایپوگرافی انگلیسی
- کنترل تغییر زبان در هدر صفحه

### ♿ پایداری و دسترس‌پذیری

- Error Boundary برای مدیریت خطاهای رابط
- ساختار معنایی برای دکمه‌ها، عنوان‌ها، بخش‌ها و دیالوگ
- برچسب دسترس‌پذیر برای کنترل‌های QR و بستن مودال
- امکان بستن پنجره QR با کلید `Escape`
- روش جایگزین کپی برای مرورگرهای فاقد Clipboard API
- صفحه جایگزین برای مسیرهای ناشناخته

---

## 🪙 دارایی‌های پشتیبانی‌شده

| شماره | دارایی | شبکه | نماد |
|-------|--------|------|------|
| **۰۱** | **Bitcoin** | Native SegWit | BTC |
| **۰۲** | **Ethereum** | Ethereum Mainnet | ETH |
| **۰۳** | **Tether** | ERC-20 / Ethereum | USDT |
| **۰۴** | **BNB** | BNB Smart Chain | BNB |
| **۰۵** | **Tether** | TRC-20 / TRON | USDT |
| **۰۶** | **TRON** | TRON Network | TRX |
| **۰۷** | **Solana** | Solana Network | SOL |
| **۰۸** | **TON** | The Open Network | TON |
| **۰۹** | **Dogecoin** | Dogecoin Network | DOGE |

پیش از ارسال، حتماً دارایی و شبکه انتخاب‌شده در کیف‌پول خود را با مقصد نمایش‌داده‌شده در سایت تطبیق دهید.

---

## 🔐 مدل داده و حریم خصوصی

PIMXSUPPORT یک رابط استاتیک حمایت مالی است و برای استفاده از آن به حساب کاربری، ارسال فرم، دیتابیس سمت سرور یا پردازشگر پرداخت نیازی نیست.

### 💻 اطلاعات موقت در زمان بازدید

- زبان انتخاب‌شده رابط (`fa` یا `en`)
- کیف‌پول انتخاب‌شده هنگام بازبودن پنجره QR
- پیام موقت وضعیت کپی آدرس

### 🚫 اطلاعاتی که برنامه اصلی جمع‌آوری نمی‌کند

- اطلاعات شخصی
- رمز عبور یا اطلاعات ورود
- کلید خصوصی یا عبارت بازیابی کیف‌پول
- فایل‌های آپلودشده
- مبلغ حمایت یا تاریخچه تراکنش‌ها
- اطلاعات پرداخت مرورگر

تصویر QR از آدرس عمومی مقصد و با استفاده از یک سرویس خارجی تولید می‌شود. آیکون رمزارزها و بعضی دارایی‌های بصری نیز از CDNهای عمومی خارجی بارگذاری می‌شوند.

---

## 🛠️ پشته تکنولوژی

| تکنولوژی | کاربرد |
|----------|--------|
| **React 19** | ساخت رابط مبتنی بر کامپوننت |
| **TypeScript** | توسعه با تایپ ایمن |
| **Vite 7** | ابزار build و سرور توسعه |
| **Tailwind CSS 4** | زیرساخت استایل‌دهی |
| **Radix UI** | کامپوننت‌های پایه دسترس‌پذیر |
| **Lucide React** | آیکون‌های رابط |
| **Wouter** | مسیریابی سبک سمت کلاینت |
| **Framer Motion** | حرکت و انیمیشن رابط |
| **Express** | سرور استاتیک اختیاری برای Node.js |
| **pnpm** | مدیریت وابستگی‌ها |
| **Cloudflare Pages** | میزبانی و انتشار استاتیک |

---

## 💻 راه‌اندازی محلی

### 📋 پیش‌نیازها

- Node.js نسخه **20.19+** یا **22.12+**
- pnpm نسخه **10+**

### ⚙️ مراحل اجرا

1. **دریافت پروژه:**

   ```bash
   git clone https://github.com/MOHAMMADREZAABEDINPOOR/PIMX_SUPPORT.git
   cd PIMX_SUPPORT
   ```

2. **نصب وابستگی‌ها:**

   ```bash
   pnpm install
   ```

3. **اجرای سرور توسعه:**

   ```bash
   pnpm dev
   ```

   آدرس محلی: [http://localhost:3000](http://localhost:3000)

4. **بررسی TypeScript:**

   ```bash
   pnpm check
   ```

5. **ساخت نسخه production:**

   ```bash
   pnpm build
   ```

6. **اجرای نسخه production:**

   ```bash
   pnpm start
   ```

---

## ☁️ انتشار روی Cloudflare Pages

تنظیمات اتصال GitHub به Cloudflare Pages:

| تنظیم | مقدار |
|-------|-------|
| **Framework preset** | Vite |
| **Build command** | `pnpm build` |
| **Build output directory** | `dist/public` |
| **Root directory** | `/` |
| **Node.js version** | `20.19+` توصیه می‌شود |

نسخه Cloudflare Pages کاملاً استاتیک است. فایل `dist/index.js` برای میزبانی معمولی Node.js ساخته می‌شود و بخشی از خروجی Pages نیست.

برای انتشار مستقیم:

```bash
pnpm exec wrangler pages deploy dist/public --project-name=pimxsupport
```

---

## 🛡️ نکات امنیتی

- هرگز کلید خصوصی، عبارت بازیابی، رمز عبور یا نسخه پشتیبان کیف‌پول را در این سایت یا در اختیار فرد دیگری قرار ندهید.
- پیش از تأیید تراکنش، آدرس کامل مقصد و شبکه بلاکچین را بررسی کنید.
- تراکنش‌های بلاکچین معمولاً برگشت‌ناپذیر هستند.
- PIMXSUPPORT فقط آدرس‌های عمومی مقصد را نمایش می‌دهد و هرگز دسترسی به کیف‌پول درخواست نمی‌کند.

---

## 📄 مجوز

این پروژه تحت [مجوز MIT](LICENSE) منتشر شده است.

---

## 🤝 مشارکت

برای مشارکت در پروژه:

1. ریپو را Fork کنید
2. یک branch جدید بسازید
3. تغییرات را commit کنید
4. branch را push کنید
5. یک Pull Request باز کنید

---

## 💙 پشتیبانی و ارتباط

برای گزارش مشکل یا پیشنهاد، یک Issue در همین ریپو ثبت کنید. برای حمایت مستقیم از محمدرضا و پروژه‌های آینده PIMX به [pimxsupport.pages.dev](https://pimxsupport.pages.dev/) مراجعه کنید.

---

**Made with care by [Mohammad Reza Abedinpoor](https://github.com/MOHAMMADREZAABEDINPOOR)**
