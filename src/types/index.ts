// ============================================================
// Core domain types for AquaTrends / FishPrice Dashboard
// ============================================================

export type CommodityName =
  | "Ikan Nila"
  | "Ikan Lele"
  | "Ikan Mas"
  | "Ikan Bandeng";

export type RegionProvince =
  | "Jawa Barat"
  | "Jawa Tengah"
  | "Jawa Timur"
  | "DKI Jakarta"
  | "Sumatera Utara"
  | "Sulawesi Selatan"
  | "Kalimantan Timur"
  | "Bali";

export interface FishPrice {
  id: string;
  commodity_name: CommodityName;
  region_province: RegionProvince;
  /** Price in IDR per kilogram */
  price: number;
  /** ISO 8601 date string, e.g. "2026-01-01" */
  recorded_at: string;
}

// ============================================================
// Filter / UI state types
// ============================================================

export type TimeRange = "3M" | "6M" | "1Y";

export interface DashboardFilters {
  region: RegionProvince | "Semua Wilayah";
  commodities: CommodityName[];
  timeRange: TimeRange;
}

// ============================================================
// Derived metric types (computed from raw FishPrice data)
// ============================================================

export interface PriceSummary {
  averagePrice: number;
  highestPrice: number;
  highestMonth: string;
  lowestPrice: number;
  lowestMonth: string;
  /** Percentage change vs. previous month (positive = up, negative = down) */
  trendPercent: number;
}

// ============================================================
// Chart data types (transformed for Recharts)
// ============================================================

export interface ChartDataPoint {
  /** Display label, e.g. "Jan 2026" */
  month: string;
  /** Raw date string for sorting */
  date: string;
  "Ikan Nila"?: number;
  "Ikan Lele"?: number;
  "Ikan Mas"?: number;
  "Ikan Bandeng"?: number;
}
