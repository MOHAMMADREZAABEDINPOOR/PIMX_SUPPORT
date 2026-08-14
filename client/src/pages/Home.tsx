/**
 * Design reminder — رسیدِ آینده: گرافیک چاپیِ تجربی، کاغذ استخوانی، جوهر مشکی و Transfer Blue.
 * کیف‌پول‌ها باید شبیه رسیدهای دونیت مستقیم باشند؛ تمام متن‌ها در هر زبان حول حمایت مالی مستقیم می‌چرخند.
 */
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, ChevronLeft, Copy, Globe2, QrCode, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Locale = "fa" | "en";
type Wallet = { key: string; name: string; network: string; address: string; color: string; logo: string; group: "main" | "stable" | "ecosystem" };

const WALLETS: Wallet[] = [
  { key: "btc", name: "Bitcoin", network: "Native SegWit", address: "bc1q7z986uxkm6tpy9uuem04wx7p5eed4clvvx7778", color: "#f7931a", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/bitcoin.svg", group: "main" },
  { key: "eth", name: "Ethereum", network: "Mainnet", address: "0x3a89f0C03F864D1062d6ad882aAe39eFD1CaF580", color: "#627eea", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/ethereum.svg", group: "ecosystem" },
  { key: "usdt-e", name: "Tether", network: "ERC-20 · Ethereum", address: "0x3a89f0C03F864D1062d6ad882aAe39eFD1CaF580", color: "#26a17b", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/tether.svg", group: "stable" },
  { key: "bnb", name: "BNB", network: "BNB Smart Chain", address: "0x3a89f0C03F864D1062d6ad882aAe39eFD1CaF580", color: "#f3ba2f", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/binance.svg", group: "main" },
  { key: "usdt-t", name: "Tether", network: "TRC-20 · TRON", address: "TBRU8RY3BpCh9DCymSFCi8rRAozStQfExt", color: "#26a17b", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/tether.svg", group: "stable" },
  { key: "trx", name: "TRON", network: "TRON Network", address: "TBRU8RY3BpCh9DCymSFCi8rRAozStQfExt", color: "#ff0013", logo: "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/trx.svg", group: "main" },
  { key: "sol", name: "Solana", network: "Solana Network", address: "56hEupXKzQxUNvA4ziLVvrNiGDJpWwBsPHi2aHFJjL2v", color: "#9945ff", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/solana.svg", group: "ecosystem" },
  { key: "ton", name: "TON", network: "Telegram Open Network", address: "UQDtca3U_vzAtzhf4s_tR7P0nYyXGA1ok-69rDuAjShsXeN6", color: "#0098ea", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/ton.svg", group: "ecosystem" },
  { key: "doge", name: "Dogecoin", network: "Dogecoin Network", address: "D9pHxFrn4JQjVbWGASaCBj9xsATZ2ov4x2", color: "#c2a633", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/dogecoin.svg", group: "main" },
];

const COPY = {
  fa: {
    dir: "rtl", switchLabel: "English", donate: "دونیت", headerCode: "DONATION LEDGER · ISSUE 03", imprint: "DIRECT DONATIONS", overline: "DONATE DIRECTLY / حمایتِ مالی مستقیم", heroFirst: "دونیت کن.", heroAccent: "مستقیم.", heroDescription: "اگر مایل به حمایت مالی هستی، یکی از کیف‌پول‌های پایین را انتخاب کن. آدرس مقصد آماده است و دونیت تو مستقیماً دریافت می‌شود.", walletsButton: "مشاهده کیف‌پول‌ها", verifiedAddresses: "۹ دارایی / آدرس‌های تأییدشده", visualCaption: "DONATE DIRECTLY\nTHANK YOU", heroLine: "MOHAMMADREZA / DIRECT DONATIONS ONLY", walletsOverline: "02 / DONATION WALLETS", walletsTitle: "کیف‌پول‌های", walletsAccent: "دونیت.", walletsDescription: "برای دونیت، یک دارایی و شبکه را انتخاب کن. آدرس را کپی کن یا کد QR را با کیف‌پولت اسکن کن.", all: "همه / ۰۹", main: "اصلی", stable: "استیبل", ecosystem: "اکوسیستم", search: "نام دارایی یا شبکه", walletVerified: "کیف‌پول تأییدشده", destination: "DONATION DESTINATION", copyAddress: "کپی آدرس", qr: "QR", noResults: "نتیجه‌ای برای این جست‌وجو پیدا نشد. نام دارایی یا شبکه را تغییر بده.", processOverline: "03 / HOW TO DONATE", processFirst: "چطور", processAccent: "دونیت کنم؟", processSeal: "DIRECT\nDONATION", stepNumbers: ["۱", "۲", "۳"], stepOneTitle: "دارایی را انتخاب کن", stepOneText: "دارایی و شبکه‌ای را انتخاب کن که در کیف‌پول خودت داری.", stepTwoTitle: "آدرس را بردار", stepTwoText: "آدرس را کپی کن یا کد QR را با اپلیکیشن کیف‌پولت اسکن کن.", stepThreeTitle: "شبکه را بررسی کن", stepThreeText: "با تطبیق شبکه، دونیت را در کیف‌پولت تأیید کن.", footer: "از دونیت و حمایت مالی تو ممنونم.", top: "ابتدای صفحه", modalOverline: "DONATION RECEIPT / READY TO SCAN", modalCopy: "کپی آدرس برای دونیت", modalWarning: "پیش از ارسال، شبکه را با کیف‌پول خودت تطبیق بده.", copied: (name: string) => `آدرس ${name} کپی شد.`, copyError: "کپی انجام نشد؛ لطفاً آدرس را دستی انتخاب کن.", networkValid: "WALLET VERIFIED",
  },
  en: {
    dir: "ltr", switchLabel: "فارسی", donate: "Donate", headerCode: "DONATION LEDGER · ISSUE 03", imprint: "DIRECT DONATIONS", overline: "DIRECT DONATIONS / SUPPORT", heroFirst: "Donate.", heroAccent: "Directly.", heroDescription: "If you would like to support me, choose one of the wallets below. The destination address is ready and your donation is received directly.", walletsButton: "View wallets", verifiedAddresses: "9 assets / verified addresses", visualCaption: "DONATE DIRECTLY\nTHANK YOU", heroLine: "MOHAMMADREZA / DIRECT DONATIONS ONLY", walletsOverline: "02 / DONATION WALLETS", walletsTitle: "Donation", walletsAccent: "wallets.", walletsDescription: "Choose an asset and its network for your donation. Copy the address or scan the QR code with your wallet.", all: "All / 09", main: "Major", stable: "Stable", ecosystem: "Ecosystems", search: "Asset or network", walletVerified: "WALLET VERIFIED", destination: "DONATION DESTINATION", copyAddress: "Copy address", qr: "QR", noResults: "No matching wallet was found. Try another asset or network.", processOverline: "03 / HOW TO DONATE", processFirst: "How to", processAccent: "donate?", processSeal: "DIRECT\nDONATION", stepNumbers: ["1", "2", "3"], stepOneTitle: "Choose your asset", stepOneText: "Select an asset and the network that you hold in your wallet.", stepTwoTitle: "Get the address", stepTwoText: "Copy the destination address or scan the QR code in your wallet app.", stepThreeTitle: "Verify the network", stepThreeText: "Confirm the matching network, then approve your donation.", footer: "Thank you for your direct donation and support.", top: "Back to top", modalOverline: "DONATION RECEIPT / READY TO SCAN", modalCopy: "Copy donation address", modalWarning: "Verify the network before sending your donation.", copied: (name: string) => `${name} address copied.`, copyError: "Could not copy the address. Please select it manually.", networkValid: "WALLET VERIFIED",
  },
} as const;

const shorten = (address: string) => `${address.slice(0, 10)}···${address.slice(-8)}`;

export default function Home() {
  const [locale, setLocale] = useState<Locale>(() => new URLSearchParams(window.location.search).get("lang") === "fa" ? "fa" : "en");
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = COPY[locale];
  const wallets = WALLETS;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = t.dir;
  }, [locale, t.dir]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedWallet(null); };
    window.addEventListener("keydown", closeOnEscape);
    return () => { window.removeEventListener("keydown", closeOnEscape); if (toastTimer.current) clearTimeout(toastTimer.current); };
  }, []);

  const notify = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  };
  const copyAddress = async (wallet: Wallet) => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(wallet.address);
      else { const area = document.createElement("textarea"); area.value = wallet.address; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove(); }
      notify(t.copied(wallet.name));
    } catch { notify(t.copyError); }
  };
  const goToWallets = () => document.getElementById("wallets")?.scrollIntoView({ behavior: "smooth" });
  const languageToggle = () => setLocale((current) => current === "fa" ? "en" : "fa");

  return (
    <div className={`ledger-page ${locale}`} dir={t.dir}>
      <div className="paper-noise" aria-hidden="true" />
      <header className="ledger-header">
        <a className="ledger-brand" href="#top" aria-label="MOHAMMADREZA">
          <span className="brand-name">MOHAMMAD<span>REZA</span><i>{t.imprint}</i></span>
        </a>
        <p className="header-code">{t.headerCode}</p>
        <div className="header-tools"><button type="button" className="language-toggle" onClick={languageToggle}><Globe2 size={14} /> {t.switchLabel}</button><button className="header-cta" type="button" onClick={goToWallets}>{t.donate} <ArrowDown size={16} /></button></div>
      </header>

      <main id="top">
        <section className="print-hero">
          <div className="hero-side-index" aria-hidden="true"><span>001</span><i /><p>DIRECT<br />DONATION</p></div>
          <div className="print-copy">
            <motion.p className="overline" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>{t.overline}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .52, delay: .06, ease: [0.23, 1, 0.32, 1] }}>{t.heroFirst}<br /><span>{t.heroAccent}</span></motion.h1>
            <motion.p className="hero-description" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .46, delay: .13 }}>{t.heroDescription}</motion.p>
            <motion.div className="hero-copy-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: .2 }}><button className="ink-button" type="button" onClick={goToWallets}>{t.walletsButton} <ChevronLeft size={18} /></button><span className="small-detail">{t.verifiedAddresses}</span></motion.div>
          </div>
          <motion.div className="print-visual" initial={{ opacity: 0, rotate: 2, x: 20 }} animate={{ opacity: 1, rotate: 0, x: 0 }} transition={{ duration: .72, ease: [0.23, 1, 0.32, 1] }}>
            <img src="/transfer-print-hero_8811d41f.webp" alt="Abstract poster for direct donations" />
            <div className="blue-stamp"><span>DIRECT DONATION</span><strong>100%</strong><span>TO CREATOR</span></div><div className="scan-stripes" aria-hidden="true" /><p className="visual-caption">{t.visualCaption}</p>
          </motion.div>
          <div className="hero-bottom-line"><span>{t.heroLine}</span><span>→</span></div>
        </section>

        <section className="wallet-ledger" id="wallets">
          <div className="ledger-section-heading"><div><p className="overline">{t.walletsOverline}</p><h2>{t.walletsTitle}<br /><span>{t.walletsAccent}</span></h2></div><p>{t.walletsDescription}</p><div className="edition-imprint"><span>MR</span><p>MOHAMMADREZA<br /><b>{t.imprint}</b></p></div></div>
          <div className="section-registration" aria-hidden="true"><span /><p>DIRECT DONATION · WALLET SERIES / 03</p><span /></div>
          <motion.div className="ledger-grid" layout><AnimatePresence mode="popLayout">{wallets.map((wallet, index) => <motion.article className="ledger-card" key={wallet.key} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .35, delay: Math.min(index * .035, .17) }} style={{ "--coin": wallet.color } as CSSProperties}>
            <div className="receipt-cut" aria-hidden="true" /><div className="ledger-card-head"><span className="route-number">0{WALLETS.indexOf(wallet) + 1}</span><span className="route-code">REF / {wallet.key.toUpperCase()}</span><button type="button" onClick={() => setSelectedWallet(wallet)} aria-label={`Show QR for ${wallet.name}`}><QrCode size={17} /></button></div>
            <div className="asset-line"><div className="asset-glyph"><img src={wallet.logo} alt={`${wallet.name} logo`} /></div><div><h3>{wallet.name}</h3><p>{wallet.network}</p></div></div><div className="network-stamp"><span>{t.networkValid}</span><b>{wallet.key.toUpperCase()}</b><i>●</i></div>
            <div className="receipt-address" dir="ltr"><span>{t.destination}</span><code title={wallet.address}>{shorten(wallet.address)}</code></div><div className="receipt-bars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="receipt-actions"><button type="button" onClick={() => copyAddress(wallet)}><Copy size={15} /> {t.copyAddress}</button><button type="button" onClick={() => setSelectedWallet(wallet)}>{t.qr} <ArrowUpRight size={15} /></button></div>
          </motion.article>)}</AnimatePresence></motion.div>
        </section>

        <section className="process-strip"><div className="process-title"><p className="overline">{t.processOverline}</p><h2>{t.processFirst}<br /><span>{t.processAccent}</span></h2><div className="process-seal">{t.processSeal}</div></div><div className="process-steps"><article><b>{t.stepNumbers[0]}</b><h3>{t.stepOneTitle}</h3><p>{t.stepOneText}</p></article><article><b>{t.stepNumbers[1]}</b><h3>{t.stepTwoTitle}</h3><p>{t.stepTwoText}</p></article><article><b>{t.stepNumbers[2]}</b><h3>{t.stepThreeTitle}</h3><p>{t.stepThreeText}</p></article></div></section>
      </main>

      <footer className="ledger-footer"><div><span className="footer-stamp">MR</span> {t.footer}</div><a href="#top">{t.top} <ArrowDown size={15} /></a></footer>
      <AnimatePresence>{selectedWallet && <motion.div className="receipt-modal-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedWallet(null); }}><motion.div className="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-modal-title" initial={{ opacity: 0, y: 28, rotate: 1.5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: .32, ease: [0.23, 1, 0.32, 1] }} style={{ "--coin": selectedWallet.color } as CSSProperties}>
        <button className="receipt-modal-close" type="button" onClick={() => setSelectedWallet(null)} aria-label="Close"><X size={19} /></button><p className="modal-overline">{t.modalOverline}</p><div className="modal-asset"><div className="asset-glyph"><img src={selectedWallet.logo} alt={`${selectedWallet.name} logo`} /></div><div><h2 id="receipt-modal-title">{selectedWallet.name}</h2><p>{selectedWallet.network}</p></div></div><div className="receipt-qr"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&format=svg&margin=0&data=${encodeURIComponent(selectedWallet.address)}`} alt={`QR code for ${selectedWallet.name} donation wallet`} /></div><div className="modal-full-address" dir="ltr"><span>{t.destination}</span><code>{selectedWallet.address}</code></div><button type="button" className="receipt-copy-button" onClick={() => copyAddress(selectedWallet)}><Copy size={17} /> {t.modalCopy}</button><p className="modal-warning"><Check size={14} /> {t.modalWarning}</p>
      </motion.div></motion.div>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="ledger-toast" initial={{ opacity: 0, y: 20, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 12, x: "-50%" }}><Check size={16} />{toast}</motion.div>}</AnimatePresence>
    </div>
  );
}
