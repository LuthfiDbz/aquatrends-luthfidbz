import { create } from "zustand";
import { translations, type Locale, type Translations } from "./translations";

// ============================================================
// Locale store — persists language preference in localStorage
// ============================================================

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const getInitialLocale = (): Locale => {
  try {
    const stored = localStorage.getItem("aquatrends_locale");
    if (stored === "en" || stored === "id") return stored;
  } catch {
    // localStorage unavailable (SSR / private mode)
  }
  return "id"; // default to Bahasa Indonesia
};

export const useLocaleStore = create<LocaleStore>((set, get) => ({
  locale: getInitialLocale(),

  setLocale: (locale) => {
    try {
      localStorage.setItem("aquatrends_locale", locale);
    } catch {
      // ignore
    }
    set({ locale });
  },

  toggleLocale: () => {
    const next: Locale = get().locale === "id" ? "en" : "id";
    get().setLocale(next);
  },
}));

// ============================================================
// Hook — returns current translations object + locale helpers
// ============================================================

export function useTranslation(): {
  t: Translations;
  locale: Locale;
  toggleLocale: () => void;
  isEN: boolean;
  isID: boolean;
} {
  const { locale, toggleLocale } = useLocaleStore();
  return {
    t: translations[locale],
    locale,
    toggleLocale,
    isEN: locale === "en",
    isID: locale === "id",
  };
}
