// ============================================================
// useLocale — lightweight i18n hook
// Locale preference lives in Zustand so any component can
// read or toggle it without prop-drilling.
// ============================================================

import { create } from "zustand";
import { locales, type Locale, type LocaleStrings } from "./locales";

interface LocaleStore {
  locale: Locale;
  toggle: () => void;
  setLocale: (locale: Locale) => void;
}

const useLocaleStore = create<LocaleStore>((set) => ({
  locale: "id", // default: Bahasa Indonesia
  toggle: () =>
    set((s) => ({ locale: s.locale === "id" ? "en" : "id" })),
  setLocale: (locale) => set({ locale }),
}));

/**
 * Primary hook for consuming locale strings.
 *
 * Usage:
 * ```tsx
 * const { t, locale, toggle } = useLocale();
 * <button onClick={toggle}>{t.header.langToggleLabel}</button>
 * ```
 */
export function useLocale(): {
  t: LocaleStrings;
  locale: Locale;
  toggle: () => void;
  setLocale: (locale: Locale) => void;
} {
  const { locale, toggle, setLocale } = useLocaleStore();
  return { t: locales[locale], locale, toggle, setLocale };
}
