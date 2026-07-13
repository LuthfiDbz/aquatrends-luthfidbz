// ============================================================
// Core domain types for AquaTrends / FishPrice Dashboard
// ============================================================

export type CommodityName = string;
export type RegionProvince = string;

export interface FishPrice {
  _id: string;
  _creationTime: number;
  commodity_name: string;
  region_province: string;
  price: number;
  recorded_at: string;
}

// ============================================================
// Filter / UI state types
// ============================================================

export type TimeRange = "3M" | "6M" | "1Y";

export interface DashboardFilters {
  region: string;
  commodities: string[];
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
  trendPercent: number;
}

// ============================================================
// Chart data types (transformed for Recharts)
// ============================================================

export interface ChartDataPoint {
  month: string;
  date: string;
  [key: string]: string | number;
}
