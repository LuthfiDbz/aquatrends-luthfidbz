import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "./translations";
import { translations } from "./translations";

interface LocaleStore {
  locale: Locale;
  t: typeof translations.en;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set, get) => ({
      locale: "id",
      t: translations.id,
      setLocale: (locale) => set({ locale, t: translations[locale] }),
      toggleLocale: () => {
        const next: Locale = get().locale === "id" ? "en" : "id";
        set({ locale: next, t: translations[next] });
      },
    }),
    {
      name: "aquatrends-locale",
    }
  )
);
