// ============================================================
// AquaTrends — i18n locale definitions
// Brand names (AquaTrends, FishPrice Dashboard) are always EN.
// Data domain values (commodity names, province names) are
// always ID — they are NOT translated.
// ============================================================

export type Locale = "en" | "id";

export interface LocaleStrings {
  // ── Header ─────────────────────────────────────────────
  header: {
    dataSource: string;
    lastUpdated: string;
    langToggleLabel: string;
  };

  // ── Filter panel ────────────────────────────────────────
  filter: {
    sectionLabel: string;
    regionLabel: string;
    regionAll: string;
    commodityLabel: string;
    timeRangeLabel: string;
    timeRange: {
      "3M": string;
      "6M": string;
      "1Y": string;
    };
  };

  // ── Summary cards ────────────────────────────────────────
  cards: {
    avgTitle: string;
    avgSub: string;
    avgUnit: string;
    hiloTitle: string;
    hiloSub: string;
    highest: string;
    lowest: string;
    trendTitle: string;
    trendSub: string;
    trendUp: string;
    trendDown: string;
    trendFlat: string;
  };

  // ── Chart section ────────────────────────────────────────
  chart: {
    title: string;
    subPrefix: string;   // "Average price per kilogram (IDR) ·"
    mockBadge: string;
    tooltipFooter: string;
    noData: string;
  };

  // ── Footer ───────────────────────────────────────────────
  footer: {
    note: string;
    step: string;
  };
}

export const locales: Record<Locale, LocaleStrings> = {
  en: {
    header: {
      dataSource: "Data Source: BPS Snapshot",
      lastUpdated: "Last Updated: June 2026",
      langToggleLabel: "Switch to Indonesian",
    },
    filter: {
      sectionLabel: "Filters",
      regionLabel: "Region / Province",
      regionAll: "All Regions",
      commodityLabel: "Commodity",
      timeRangeLabel: "Time Range",
      timeRange: {
        "3M": "3 Months",
        "6M": "6 Months",
        "1Y": "1 Year",
      },
    },
    cards: {
      avgTitle: "Average Price",
      avgSub: "All selected commodities",
      avgUnit: "per kilogram",
      hiloTitle: "Highest & Lowest",
      hiloSub: "Within selected period",
      highest: "Highest",
      lowest: "Lowest",
      trendTitle: "Trend Indicator",
      trendSub: "Change vs. last month",
      trendUp: "Price rose vs. last month",
      trendDown: "Price fell vs. last month",
      trendFlat: "Price stable vs. last month",
    },
    chart: {
      title: "Monthly Price Trend",
      subPrefix: "Average price per kilogram (IDR) ·",
      mockBadge: "Mock Data",
      tooltipFooter: "Average price / kg",
      noData: "No data for the selected filters.",
    },
    footer: {
      note: "AquaTrends Dashboard · Simulation data for development ·",
      step: "Step 1 UI Slicing",
    },
  },

  id: {
    header: {
      dataSource: "Sumber Data: Hasil Snapshot BPS",
      lastUpdated: "Terakhir Diperbarui: Juni 2026",
      langToggleLabel: "Ganti ke Bahasa Inggris",
    },
    filter: {
      sectionLabel: "Filter Data",
      regionLabel: "Wilayah / Provinsi",
      regionAll: "Semua Wilayah",
      commodityLabel: "Komoditas",
      timeRangeLabel: "Rentang Waktu",
      timeRange: {
        "3M": "3 Bulan",
        "6M": "6 Bulan",
        "1Y": "1 Tahun",
      },
    },
    cards: {
      avgTitle: "Harga Rata-rata",
      avgSub: "Semua komoditas terpilih",
      avgUnit: "per kilogram",
      hiloTitle: "Tertinggi & Terendah",
      hiloSub: "Dalam periode terpilih",
      highest: "Tertinggi",
      lowest: "Terendah",
      trendTitle: "Indikator Tren",
      trendSub: "Perubahan vs. bulan lalu",
      trendUp: "Harga naik dibanding bulan lalu",
      trendDown: "Harga turun dibanding bulan lalu",
      trendFlat: "Harga stabil dibanding bulan lalu",
    },
    chart: {
      title: "Tren Harga Bulanan",
      subPrefix: "Rata-rata harga per kilogram (IDR) ·",
      mockBadge: "Mock Data",
      tooltipFooter: "Rata-rata harga / kg",
      noData: "Tidak ada data untuk filter ini.",
    },
    footer: {
      note: "AquaTrends Dashboard · Data simulasi untuk keperluan pengembangan ·",
      step: "Step 1 UI Slicing",
    },
  },
};
