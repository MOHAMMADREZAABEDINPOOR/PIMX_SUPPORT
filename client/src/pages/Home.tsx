import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Globe2,
  Heart,
  Moon,
  Sun,
  Pause,
  Play,
  Plus,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import QRCode from "qrcode";
import { WALLETS, type Wallet } from "@/lib/wallets";
import { useTheme } from "@/contexts/ThemeContext";
import { getLocale, saveLocale, type Locale } from "@/lib/locale";

const SupportSculpture = lazy(() => import("@/components/SupportSculpture"));
type Filter = "all" | Wallet["group"];
const SYMBOLS: Record<string, string> = {
  btc: "₿",
  eth: "Ξ",
  "usdt-e": "₮",
  bnb: "◇",
  "usdt-t": "₮",
  trx: "△",
  sol: "≋",
  ton: "▽",
  doge: "Ð",
};
const TEXT = {
  fa: {
    navSupport: "حمایت",
    navWhy: "چرا حمایت؟",
    navFaq: "سؤال‌ها",
    language: "EN",
    tag: "برای چیزهایی که ارزش ساخته‌شدن دارند",
    heroFirst: "ایده‌های خوب،",
    heroSecond: "با تو ادامه دارند.",
    description:
      "من محمدرضام. می‌سازم، یاد می‌گیرم و دوباره می‌سازم. اگر چیزی که ساخته‌ام به کارت آمده، حمایت تو کمک می‌کند برای ایدهٔ بعدی وقت بیشتری بگذارم.",
    cta: "یه قدم همراه من باش",
    secondary: "داستان این صفحه",
    little: "هر اندازه‌ای. با هر ارزی. از دل.",
    artwork: "یک قلب، کلی انگیزه",
    interact: "نشانگر را حرکت بده",
    edition: "ساخته‌شده با عشق و کمی سماجت",
    ticker: [
      "از آدم‌ها، برای ایده‌ها",
      "مستقیم به کیف‌پول",
      "بدون واسطهٔ پرداخت",
      "یک همراهی کوچک، یک قدم جلوتر",
    ],
    whyLabel: "۰۱ / پشت این صفحه",
    whyTitle: "یه حمایت کوچیک.\nیه فرصت بزرگ‌تر.",
    whyText:
      "پشت هر چیزی که می‌سازم، ساعت‌های آزمون‌وخطا هست. گاهی یک ایده جواب می‌دهد، گاهی باید از اول شروع کنم. حمایت تو یعنی می‌توانم کمی بیشتر به این مسیر ادامه بدهم.",
    signature: "محمدرضا",
    whyFoot: "ممنون که بخشی از این مسیر هستی.",
    walletLabel: "۰۲ / یک قدم همراهی",
    walletTitle: "از اینجا، با هم.",
    walletText:
      "ارز و شبکه‌ات را انتخاب کن. آدرس را بردار و از کیف‌پول خودت بفرست.",
    all: "همه",
    main: "ارزهای اصلی",
    stable: "استیبل‌کوین",
    ecosystem: "اکوسیستم‌ها",
    search: "جست‌وجوی ارز یا شبکه…",
    empty: "ارزی با این نام پیدا نشد.",
    clear: "پاک کردن جست‌وجو",
    choose: "انتخاب ارز",
    detail: "مقصد حمایت تو",
    network: "شبکهٔ انتقال",
    address: "آدرس کیف‌پول",
    copy: "کپی آدرس",
    copied: "آدرس کپی شد",
    copyError: "کپی انجام نشد؛ آدرس را دستی انتخاب کن.",
    qr: "بزرگ‌نمایی QR",
    qrHint: "با کیف‌پولت اسکن کن",
    warning:
      "فقط روی شبکهٔ مشخص‌شده ارسال کن. شبکهٔ اشتباه ممکن است باعث از دست رفتن دارایی شود.",
    direct: "انتقال مستقیم به کیف‌پول",
    fee: "این صفحه کارمزدی نمی‌گیرد؛ کارمزد شبکه جداست.",
    steps: [
      ["انتخاب کن", "ارز و شبکه‌ای که در کیف‌پولت داری."],
      ["آدرس را بردار", "با کپی یا اسکن QR؛ هر کدام راحت‌تری."],
      ["با خیال جمع بفرست", "آدرس و شبکه را در کیف‌پولت دوباره بررسی کن."],
    ],
    faqLabel: "۰۳ / قبل از ارسال",
    faqTitle: "چیزی توی ذهنت هست؟",
    faqs: [
      [
        "چقدر باید دونیت کنم؟",
        "مبلغ مشخصی وجود ندارد. هر مقداری که برایت راحت است ارزش دارد. فقط کارمزد انتقال شبکه را هم در نظر بگیر.",
      ],
      [
        "لازم است کیف‌پولم را به سایت وصل کنم؟",
        "نه. سایت فقط آدرس مقصد را به تو نشان می‌دهد. ارسال را از اپلیکیشن کیف‌پول خودت انجام می‌دهی و نیازی به اتصال یا وارد کردن اطلاعات خصوصی نیست.",
      ],
      [
        "برای تتر کدام شبکه را انتخاب کنم؟",
        "اینجا تتر روی دو شبکهٔ Ethereum (ERC-20) و TRON (TRC-20) در دسترس است. کارت مربوط به همان شبکه‌ای را انتخاب کن که در کیف‌پولت استفاده می‌کنی.",
      ],
      [
        "می‌توانم بعد از ارسال، تراکنش را لغو کنم؟",
        "انتقال تأییدشدهٔ رمزارز معمولاً برگشت‌پذیر نیست. قبل از ارسال، آدرس کامل و شبکهٔ مقصد را بررسی کن. وضعیت تراکنش را در کیف‌پولت ببین؛ این صفحه پرداخت را تأیید نمی‌کند.",
      ],
    ],
    footerTitle: "همین که اینجایی،\nیعنی خیلی.",
    footerText:
      "چه حمایت کنی، چه فقط سری بزنی؛ ممنون که برای کار من وقت گذاشتی.",
    footerLink: "ببین چه می‌سازم",
    top: "برگردیم بالا",
    close: "بستن",
    pause: "توقف حرکت",
    play: "ادامهٔ حرکت",
  },
  en: {
    navSupport: "Support",
    navWhy: "The story",
    navFaq: "Questions",
    language: "فا",
    tag: "FOR IDEAS WORTH MAKING REAL",
    heroFirst: "Good things",
    heroSecond: "take a little heart.",
    description:
      "I'm Mohammadreza. I build, learn, and build again. If something I've made has helped you, your support gives the next idea a little more room to grow.",
    cta: "Be part of the next thing",
    secondary: "A little backstory",
    little: "Any amount. Your choice. From the heart.",
    artwork: "A little heart. A lot of possibility.",
    interact: "MOVE YOUR CURSOR / FEEL IT",
    edition: "Made with heart. And a little stubbornness.",
    ticker: [
      "GOOD PEOPLE. GOOD IDEAS.",
      "STRAIGHT TO THE WALLET",
      "NO PAYMENT MIDDLEMAN",
      "A LITTLE SUPPORT GOES A LONG WAY",
    ],
    whyLabel: "01 / THE HUMAN BIT",
    whyTitle: "A small gesture.\nA little more room to build.",
    whyText:
      "Behind the things I make are hours of trying, breaking, and starting over. Some ideas work. Others need another go. Your support helps me keep making space for both.",
    signature: "Mohammadreza",
    whyFoot: "Thanks for being part of that.",
    walletLabel: "02 / MAKE IT PERSONAL",
    walletTitle: "Let's keep things moving.",
    walletText:
      "Pick your asset and network. Grab the address. Send from your own wallet.",
    all: "All assets",
    main: "Major coins",
    stable: "Stablecoins",
    ecosystem: "Ecosystems",
    search: "Find an asset or network…",
    empty: "No assets match that search.",
    clear: "Clear search",
    choose: "Choose asset",
    detail: "YOUR SUPPORT LANDS HERE",
    network: "Transfer network",
    address: "WALLET ADDRESS",
    copy: "Copy address",
    copied: "Address copied",
    copyError: "Couldn't copy. Please select the address manually.",
    qr: "Enlarge QR",
    qrHint: "Scan with your wallet app",
    warning:
      "Send only on the network shown. Using the wrong network can result in a loss of funds.",
    direct: "Straight to my wallet",
    fee: "This page adds no fees. Network fees still apply.",
    steps: [
      ["Pick your asset", "Choose the asset and network in your wallet."],
      ["Grab the address", "Copy it or scan the QR. Whatever works for you."],
      [
        "Give it one last look",
        "Check the full address and network before sending.",
      ],
    ],
    faqLabel: "03 / GOOD TO KNOW",
    faqTitle: "Before you send a little love.",
    faqs: [
      [
        "How much should I donate?",
        "There is no set amount. Whatever feels comfortable for you means something. Just keep your network's transaction fee in mind.",
      ],
      [
        "Do I need to connect my wallet?",
        "No. This page only provides the destination address. You send from your own wallet app. No wallet connection or private information is needed.",
      ],
      [
        "Which network should I use for Tether?",
        "Tether is available here on Ethereum (ERC-20) and TRON (TRC-20). Choose the card that matches the network you use in your wallet.",
      ],
      [
        "Can I cancel a donation after sending?",
        "Confirmed cryptocurrency transfers are generally irreversible. Check the complete address and network before sending. Track the transaction in your wallet; this page does not verify payments.",
      ],
    ],
    footerTitle: "You're here.\nThat already means a lot.",
    footerText:
      "Whether you send a little support or just stop by, thanks for giving my work a moment of your day.",
    footerLink: "See what I'm building",
    top: "Back to the top",
    close: "Close",
    pause: "Pause animation",
    play: "Resume animation",
  },
} as const;

function WalletQR({ address, label }: { address: string; label: string }) {
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    setImage("");
    setError(false);
    QRCode.toDataURL(address, {
      width: 440,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#20372d", light: "#ffffff" },
    })
      .then(url => {
        if (active) setImage(url);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [address]);
  return image ? (
    <img className="wallet-qr" src={image} alt={label} />
  ) : (
    <div className="qr-placeholder" role="status">
      {error ? "QR unavailable / آدرس را کپی کن" : "···"}
    </div>
  );
}

function Coin({ wallet }: { wallet: Wallet }) {
  return (
    <span
      className="coin-symbol"
      style={{ "--coin-color": wallet.color } as CSSProperties}
      aria-hidden="true"
    >
      {SYMBOLS[wallet.key]}
    </span>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [locale, setLocale] = useState<Locale>(getLocale);
  const t = TEXT[locale];
  const reducedMotion = !!useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState(WALLETS[0]);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState("");
  const [notice, setNotice] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [qrOpen, setQrOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wallets = WALLETS.filter(
    wallet =>
      (filter === "all" || wallet.group === filter) &&
      `${wallet.name} ${wallet.network} ${wallet.key}`
        .toLowerCase()
        .includes(search.toLowerCase().trim())
  );
  useEffect(() => {
    saveLocale(locale);
  }, [locale]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );
  const copyAddress = async () => {
    try {
      if (navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(selected.address);
      else {
        const area = document.createElement("textarea");
        area.value = selected.address;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        const success = document.execCommand("copy");
        area.remove();
        if (!success) throw new Error("Clipboard unavailable");
      }
      setCopied(selected.key);
      setNotice(t.copied);
    } catch {
      setNotice(t.copyError);
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied("");
      setNotice("");
    }, 2800);
  };
  const reveal = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.65 },
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`support-site ${locale} ${paused ? "motion-paused" : ""}`}
      >
        <a className="skip-link" href="#wallets">
          {t.navSupport}
        </a>
        <header className="site-header">
          <a className="brand" href="#top" aria-label="PIMX Support">
            <span className="brand-mark">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>
              PIMX<span className="brand-suffix">/ support</span>
            </span>
          </a>
          <nav aria-label={locale === "fa" ? "منوی اصلی" : "Main navigation"}>
            <a href="#story">{t.navWhy}</a>
            <a href="#wallets">{t.navSupport}</a>
            <a href="#questions">{t.navFaq}</a>
          </nav>
          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                locale === "fa"
                  ? theme === "dark"
                    ? "تم روشن"
                    : "تم دارک"
                  : theme === "dark"
                    ? "Switch to light theme"
                    : "Switch to dark theme"
              }
              title={
                locale === "fa"
                  ? theme === "dark"
                    ? "تم روشن"
                    : "تم دارک"
                  : theme === "dark"
                    ? "Light theme"
                    : "Dark theme"
              }
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              className="language-button"
              onClick={() => setLocale(locale === "fa" ? "en" : "fa")}
              aria-label={
                locale === "fa" ? "Switch to English" : "تغییر به فارسی"
              }
            >
              <Globe2 size={14} />
              <span>{t.language}</span>
            </button>
            <a className="header-donate" href="#wallets">
              <Heart size={14} />
              <span>{t.navSupport}</span>
            </a>
          </div>
        </header>
        <main id="top">
          <section className="hero">
            <div className="hero-copy">
              <motion.div
                className="eyebrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <span className="live-dot" />
                {t.tag}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: reducedMotion ? 0 : 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.1 }}
              >
                {t.heroFirst}
                <br />
                <span>
                  {t.heroSecond}
                  <svg
                    viewBox="0 0 420 20"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M5 13 Q140 0 410 9 M90 17 Q245 4 370 12" />
                  </svg>
                </span>
                <i className="title-spark" aria-hidden="true">
                  ✳
                </i>
              </motion.h1>
              <motion.p
                className="hero-description"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.25 }}
              >
                {t.description}
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                <a className="primary-button" href="#wallets">
                  {t.cta}
                  <span>
                    <ArrowUpRight size={22} />
                  </span>
                </a>
                <a className="text-link" href="#story">
                  {t.secondary}
                  <ArrowDown size={14} />
                </a>
              </motion.div>
              <div className="hero-footnote">
                <span className="tiny-heart">♡</span>
                {t.little}
              </div>
            </div>
            <div className="hero-art">
              <div className="art-topline">
                <span>THE SUPPORT OBJECT</span>
                <span>FIG. 001 ↗</span>
              </div>
              <div className="art-coordinate" aria-hidden="true">
                +
              </div>
              <div className="art-grid" aria-hidden="true" />
              <div className="sculpture-shadow" aria-hidden="true" />
              <Suspense
                fallback={
                  <div className="sculpture-loading" aria-hidden="true">
                    ♡
                  </div>
                }
              >
                <SupportSculpture
                  dark={theme === "dark"}
                  paused={paused}
                  reducedMotion={reducedMotion}
                />
              </Suspense>
              <div className="art-note">
                <span>with love,</span>
                <strong>MR.</strong>
                <svg viewBox="0 0 65 45" aria-hidden="true">
                  <path d="M4 8 Q50 5 47 29 L36 21 M47 29 L55 16" />
                </svg>
              </div>
              <div className="art-caption">
                <div>
                  <span className="caption-line" />
                  <p>
                    {t.artwork}
                    <small>{t.interact}</small>
                  </p>
                </div>
                <button
                  className="animation-toggle"
                  onClick={() => setPaused(!paused)}
                  aria-label={paused ? t.play : t.pause}
                  aria-pressed={paused}
                >
                  {paused ? <Play size={15} /> : <Pause size={15} />}
                </button>
              </div>
            </div>
          </section>
          <div className="hero-bottom">
            <span>PIMX / INDEPENDENT CREATOR</span>
            <span>{t.edition}</span>
            <a href="#story" aria-label={t.secondary}>
              <ArrowDown size={18} />
            </a>
          </div>
          <div className="ticker" aria-hidden="true">
            <div className="ticker-track">
              {[0, 1].map(repeat => (
                <div key={repeat}>
                  {t.ticker.map(item => (
                    <span key={item}>
                      {item}
                      <span className="ticker-flower">✳</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <section className="story section-shell" id="story">
            <motion.div {...reveal} className="story-title">
              <p className="section-label">{t.whyLabel}</p>
              <h2>{t.whyTitle}</h2>
              <div className="story-doodle" aria-hidden="true">
                <Heart size={34} strokeWidth={1.3} />
                <span>ideas need people.</span>
              </div>
            </motion.div>
            <motion.div {...reveal} className="story-letter">
              <span className="letter-pin" aria-hidden="true" />
              <p>{t.whyText}</p>
              <p className="letter-thanks">{t.whyFoot}</p>
              <div className="letter-signature">
                <span>{t.signature}</span>
                <span className="signature-star" aria-hidden="true">
                  ✳
                </span>
              </div>
            </motion.div>
          </section>
          <section className="donation-section" id="wallets">
            <div className="section-shell">
              <motion.div {...reveal} className="donation-heading">
                <div>
                  <p className="section-label">{t.walletLabel}</p>
                  <h2>{t.walletTitle}</h2>
                </div>
                <p>{t.walletText}</p>
              </motion.div>
              <div className="donation-workspace">
                <div className="asset-picker">
                  <div className="picker-topline">
                    <span>{t.choose}</span>
                    <span dir="ltr">09 ASSETS / 08 COINS</span>
                  </div>
                  <label className="asset-search">
                    <Search size={17} />
                    <input
                      type="search"
                      value={search}
                      onChange={event => setSearch(event.target.value)}
                      placeholder={t.search}
                      aria-label={t.search}
                    />
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        aria-label={t.clear}
                      >
                        <X size={15} />
                      </button>
                    )}
                  </label>
                  <div
                    className="asset-filters"
                    role="group"
                    aria-label={t.choose}
                  >
                    {(["all", "main", "stable", "ecosystem"] as Filter[]).map(
                      value => (
                        <button
                          key={value}
                          onClick={() => setFilter(value)}
                          aria-pressed={filter === value}
                          className={filter === value ? "active" : ""}
                        >
                          {t[value]}
                        </button>
                      )
                    )}
                  </div>
                  <div
                    className="asset-grid"
                    role="group"
                    aria-label={t.choose}
                  >
                    {wallets.map(wallet => (
                      <button
                        key={wallet.key}
                        className={`asset-card ${selected.key === wallet.key ? "selected" : ""}`}
                        onClick={() => {
                          setSelected(wallet);
                          setCopied("");
                        }}
                        aria-pressed={selected.key === wallet.key}
                        aria-label={`${wallet.name} — ${wallet.network}`}
                      >
                        <div className="asset-card-top">
                          <Coin wallet={wallet} />
                          <span className="asset-check">
                            {selected.key === wallet.key ? (
                              <Check size={13} />
                            ) : (
                              <Plus size={13} />
                            )}
                          </span>
                        </div>
                        <strong>{wallet.name}</strong>
                        <span className="asset-network" dir="ltr">
                          {wallet.network}
                        </span>
                        <span className="asset-code" dir="ltr">
                          {wallet.key.startsWith("usdt")
                            ? "USDT"
                            : wallet.key.toUpperCase()}
                          <ArrowUpRight size={13} />
                        </span>
                      </button>
                    ))}
                  </div>
                  {!wallets.length && (
                    <div className="empty-assets">
                      <Search size={28} />
                      <p>{t.empty}</p>
                      <button
                        onClick={() => {
                          setSearch("");
                          setFilter("all");
                        }}
                      >
                        {t.clear}
                      </button>
                    </div>
                  )}
                  <p className="picker-footnote">
                    <ShieldCheck size={15} />
                    {t.direct}
                  </p>
                </div>
                <div className="wallet-detail">
                  <div className="detail-eyebrow">
                    <span>{t.detail}</span>
                    <span className="detail-dot" />
                  </div>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      className="detail-content"
                      key={selected.key}
                      initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="detail-asset">
                        <Coin wallet={selected} />
                        <div>
                          <h3>{selected.name}</h3>
                          <span dir="ltr">
                            {selected.key.startsWith("usdt")
                              ? "USDT"
                              : selected.key.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="network-line">
                        <span>{t.network}</span>
                        <strong dir="ltr">{selected.network}</strong>
                      </div>
                      <Dialog.Root open={qrOpen} onOpenChange={setQrOpen}>
                        <Dialog.Trigger asChild>
                          <button className="qr-button" aria-label={t.qr}>
                            <WalletQR
                              address={selected.address}
                              label={`QR: ${selected.name} / ${selected.network}`}
                            />
                            <span className="qr-corner">
                              <ArrowUpRight size={14} />
                            </span>
                          </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                          <Dialog.Overlay className="qr-overlay" />
                          <Dialog.Content
                            className="qr-dialog"
                            dir={locale === "fa" ? "rtl" : "ltr"}
                          >
                            <Dialog.Title>{selected.name}</Dialog.Title>
                            <Dialog.Description>
                              {selected.network} · {t.qrHint}
                            </Dialog.Description>
                            <WalletQR
                              address={selected.address}
                              label={`QR: ${selected.address}`}
                            />
                            <code dir="ltr">{selected.address}</code>
                            <button
                              className="primary-button"
                              onClick={copyAddress}
                            >
                              {copied === selected.key ? t.copied : t.copy}
                              <Copy size={17} />
                            </button>
                            <Dialog.Close
                              className="qr-close"
                              aria-label={t.close}
                            >
                              <X size={20} />
                            </Dialog.Close>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                      <p className="qr-hint">{t.qrHint}</p>
                      <label className="address-label" htmlFor="wallet-address">
                        {t.address}
                      </label>
                      <textarea
                        id="wallet-address"
                        className="wallet-address"
                        readOnly
                        value={selected.address}
                        dir="ltr"
                        rows={2}
                        onFocus={event => event.target.select()}
                      />
                      <button
                        className={`copy-button ${copied === selected.key ? "copied" : ""}`}
                        onClick={copyAddress}
                      >
                        {copied === selected.key ? (
                          <Check size={18} />
                        ) : (
                          <Copy size={17} />
                        )}
                        {copied === selected.key ? t.copied : t.copy}
                        <ArrowRight size={18} />
                      </button>
                      <p className="network-warning">
                        <ShieldCheck size={16} />
                        <span>{t.warning}</span>
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="detail-footer">
                    <span>PIMX / DIRECT SUPPORT</span>
                    <Heart size={13} />
                  </div>
                </div>
              </div>
              <p className="fee-note">{t.fee}</p>
              <div className="donation-steps">
                {t.steps.map(([title, description], index) => (
                  <div key={title}>
                    <span className="step-number">0{index + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                    {index < 2 && (
                      <ArrowUpRight size={20} className="step-arrow" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="faq-section section-shell" id="questions">
            <motion.div {...reveal}>
              <p className="section-label">{t.faqLabel}</p>
              <h2>{t.faqTitle}</h2>
              <span className="faq-asterisk" aria-hidden="true">
                ✳
              </span>
            </motion.div>
            <div className="faq-list">
              {t.faqs.map(([question, answer], index) => (
                <div
                  className={`faq-item ${openFaq === index ? "open" : ""}`}
                  key={index}
                >
                  <h3>
                    <button
                      aria-expanded={openFaq === index}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                    >
                      <span className="faq-number">0{index + 1}</span>
                      <span>{question}</span>
                      <ChevronDown size={18} />
                    </button>
                  </h3>
                  <div
                    className="faq-answer"
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    hidden={openFaq !== index}
                  >
                    <p>{answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <div className="section-shell footer-main">
            <div>
              <p className="section-label">A NOTE BEFORE YOU GO</p>
              <h2>{t.footerTitle}</h2>
              <p className="footer-description">{t.footerText}</p>
              <a
                className="text-link"
                href="https://github.com/MOHAMMADREZAABEDINPOOR"
                target="_blank"
                rel="noreferrer"
              >
                {t.footerLink}
                <ExternalLink size={15} />
              </a>
            </div>
            <div className="footer-art" aria-hidden="true">
              <span>thank</span>
              <span>
                you<span className="footer-heart">♡</span>
              </span>
              <i>from the heart.</i>
            </div>
          </div>
          <div className="footer-bottom section-shell">
            <a className="brand" href="#top">
              <span className="brand-mark">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span>
                PIMX<span className="brand-suffix">/ support</span>
              </span>
            </a>
            <span>INDEPENDENT BY CHOICE. HUMAN AT HEART.</span>
            <a href="#top">
              {t.top}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </footer>
        <div className="announcement" aria-live="polite" aria-atomic="true">
          <AnimatePresence>
            {notice && (
              <motion.div
                className="notice-toast"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Check size={17} />
                {notice}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
