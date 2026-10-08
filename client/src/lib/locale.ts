export type Locale = "fa" | "en";

export function getLocale(): Locale {
  // Preserve the language of old links while their query string is removed.
  const legacy = new URLSearchParams(window.location.search).get("lang");
  if (legacy === "en" || legacy === "fa") return legacy;
  try {
    return localStorage.getItem("pimxsupport-locale") === "en" ? "en" : "fa";
  } catch {
    return "fa";
  }
}

export function saveLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  try {
    localStorage.setItem("pimxsupport-locale", locale);
  } catch {
    /* Language switching also works without storage. */
  }
}
