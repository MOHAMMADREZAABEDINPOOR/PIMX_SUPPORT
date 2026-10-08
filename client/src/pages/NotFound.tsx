import { ArrowUpRight, Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import { getLocale, saveLocale } from "@/lib/locale";

export default function NotFound() {
  const { theme, toggleTheme } = useTheme();
  const [locale] = useState(getLocale);
  const english = locale === "en";
  useEffect(() => {
    saveLocale(locale);
  }, [locale]);
  return (
    <main className="missing-page" dir={english ? "ltr" : "rtl"}>
      <button
        className="theme-toggle missing-theme-toggle"
        onClick={toggleTheme}
        aria-label={
          english
            ? theme === "dark"
              ? "Switch to light theme"
              : "Switch to dark theme"
            : theme === "dark"
              ? "تم روشن"
              : "تم دارک"
        }
      >
        {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
      </button>
      <Heart size={45} strokeWidth={1.1} />
      <p className="section-label">PIMX SUPPORT / 404</p>
      <h1>{english ? "A little off the path." : "یه کم از مسیر دور شدیم."}</h1>
      <p>
        {english
          ? "This page isn't here. The good things are back home."
          : "این صفحه اینجا نیست. بیا برگردیم جایی که ایده‌ها ادامه دارند."}
      </p>
      <a className="primary-button" href="/">
        {english ? "Back to the good things" : "برگردیم به صفحهٔ اصلی"}
        <ArrowUpRight size={19} />
      </a>
    </main>
  );
}
