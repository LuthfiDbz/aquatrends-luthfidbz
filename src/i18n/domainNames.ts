import type { Locale } from "./translations";

// ============================================================
// Commodity & Region name translations
// Database stores ID names, UI displays based on locale
// ============================================================

const COMMODITY_NAMES: Record<string, Record<Locale, string>> = {
  "Ikan Nila":    { id: "Ikan Nila",    en: "Tilapia" },
  "Ikan Lele":    { id: "Ikan Lele",    en: "Catfish" },
  "Ikan Mas":     { id: "Ikan Mas",     en: "Carp" },
  "Ikan Bandeng": { id: "Ikan Bandeng", en: "Milkfish" },
};

const REGION_NAMES: Record<string, Record<Locale, string>> = {
  "Jawa Barat":       { id: "Jawa Barat",       en: "West Java" },
  "Jawa Tengah":      { id: "Jawa Tengah",      en: "Central Java" },
  "Jawa Timur":       { id: "Jawa Timur",       en: "East Java" },
  "DKI Jakarta":      { id: "DKI Jakarta",      en: "Jakarta" },
  "Sumatera Utara":   { id: "Sumatera Utara",   en: "North Sumatera" },
  "Sulawesi Selatan": { id: "Sulawesi Selatan", en: "South Sulawesi" },
  "Kalimantan Timur": { id: "Kalimantan Timur", en: "East Kalimantan" },
  "Bali":             { id: "Bali",             en: "Bali" },
};

export function translateCommodity(name: string, locale: Locale): string {
  return COMMODITY_NAMES[name]?.[locale] ?? name;
}

export function translateRegion(name: string, locale: Locale): string {
  return REGION_NAMES[name]?.[locale] ?? name;
}
