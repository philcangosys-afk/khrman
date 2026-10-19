import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ar" | "en";

/** A piece of text in both languages. */
export type L = { ar: string; en: string };

interface LangContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  isAr: boolean;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Pick the text for the current language. */
  t: (text: L) => string;
}

const STORAGE_KEY = "khryman-lang";
const LangContext = createContext<LangContextValue | null>(null);

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "ar";
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "ar" || fromUrl === "en") return fromUrl;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "en") return saved;
  } catch {
    /* storage may be unavailable */
  }
  return "ar";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(() => setLangState((current) => (current === "ar" ? "en" : "ar")), []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      isAr: lang === "ar",
      setLang,
      toggle,
      t: (text: L) => text[lang],
    }),
    [lang, setLang, toggle],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used inside <LangProvider>");
  return context;
}

/** Sets the browser tab title for the current page. */
export function usePageTitle(title: L | null) {
  const { lang } = useLang();
  const text = title ? title[lang] : null;
  useEffect(() => {
    const brand = lang === "ar" ? "كهرمان العالمية" : "Khryman International";
    const other = lang === "ar" ? "Khryman International" : "كهرمان العالمية";
    document.title = text ? `${text} | ${brand}` : `${brand} | ${other}`;
  }, [lang, text]);
}
