// ============================================================
// AquaTrends — UI string translations
// Brand names (AquaTrends, FishPrice Dashboard) stay EN always.
// Commodity names & region names stay ID always (BPS official data).
// ============================================================

export type Locale = "en" | "id";

export interface Translations {
  header: {
    subtitle: string;
    dataSource: string;
    lastUpdated: string;
  };
  filter: {
    sectionLabel: string;
    regionLabel: string;
    allRegions: string;
    commodityLabel: string;
    timeRangeLabel: string;
    timeRange: { "3M": string; "6M": string; "1Y": string };
  };
  cards: {
    avgPrice: { title: string; subtitle: string; hint: string };
    highLow: { title: string; subtitle: string; highest: string; lowest: string };
    trend: { title: string; subtitle: string; up: string; down: string; flat: string };
  };
  chart: {
    title: string;
    subtitle: string;
    tooltipHint: string;
    noData: string;
    mockBadge: string;
  };
  footer: { note: string; step: string };
  langToggle: { label: string };
}

export const translations: Record<Locale, Translations> = {
  en: {
    header: {
      subtitle: "FishPrice Dashboard",
      dataSource: "Data Source: BPS Snapshot",
      lastUpdated: "Last Updated: June 2026",
    },
    filter: {
      sectionLabel: "Filters",
      regionLabel: "Region / Province",
      allRegions: "All Regions",
      commodityLabel: "Commodity",
      timeRangeLabel: "Time Range",
      timeRange: { "3M": "3 Months", "6M": "6 Months", "1Y": "1 Year" },
    },
    cards: {
      avgPrice: { title: "Average Price", subtitle: "All selected commodities", hint: "per kilogram" },
      highLow: { title: "Highest & Lowest", subtitle: "Within selected period", highest: "Highest", lowest: "Lowest" },
      trend: { title: "Trend Indicator", subtitle: "Change vs. last month", up: "Price is up from last month", down: "Price is down from last month", flat: "Price is stable vs. last month" },
    },
    chart: {
      title: "Monthly Price Trend",
      subtitle: "Average price per kilogram (IDR)",
      tooltipHint: "Avg. price / kg",
      noData: "No data available for this filter.",
      mockBadge: "Mock Data",
    },
    footer: { note: "Simulation data for development purposes", step: "Step 1 UI Slicing" },
    langToggle: { label: "EN" },
  },
  id: {
    header: {
      subtitle: "FishPrice Dashboard",
      dataSource: "Sumber Data: Hasil Snapshot BPS",
      lastUpdated: "Terakhir Diperbarui: Juni 2026",
    },
    filter: {
      sectionLabel: "Filter Data",
      regionLabel: "Wilayah / Provinsi",
      allRegions: "Semua Wilayah",
      commodityLabel: "Komoditas",
      timeRangeLabel: "Rentang Waktu",
      timeRange: { "3M": "3 Bulan", "6M": "6 Bulan", "1Y": "1 Tahun" },
    },
    cards: {
      avgPrice: { title: "Harga Rata-rata", subtitle: "Semua komoditas terpilih", hint: "per kilogram" },
      highLow: { title: "Tertinggi & Terendah", subtitle: "Dalam periode terpilih", highest: "Tertinggi", lowest: "Terendah" },
      trend: { title: "Indikator Tren", subtitle: "Perubahan vs. bulan lalu", up: "Harga naik dibanding bulan lalu", down: "Harga turun dibanding bulan lalu", flat: "Harga stabil dibanding bulan lalu" },
    },
    chart: {
      title: "Tren Harga Bulanan",
      subtitle: "Rata-rata harga per kilogram (IDR)",
      tooltipHint: "Rata-rata harga / kg",
      noData: "Tidak ada data untuk filter ini.",
      mockBadge: "Mock Data",
    },
    footer: { note: "Data simulasi untuk keperluan pengembangan", step: "Step 1 UI Slicing" },
    langToggle: { label: "ID" },
  },
};
