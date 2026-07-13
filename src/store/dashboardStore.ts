import { create } from "zustand";
import type {
  DashboardFilters,
  CommodityName,
  RegionProvince,
  TimeRange,
} from "../types";

// ============================================================
// Dashboard store — UI filter state only
// Data now comes from Convex via useQuery
// ============================================================

interface DashboardStore {
  filters: DashboardFilters;
  setRegion: (region: RegionProvince | "Semua Wilayah") => void;
  toggleCommodity: (commodity: CommodityName) => void;
  setTimeRange: (range: TimeRange) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  filters: {
    region: "Semua Wilayah",
    commodities: ["Ikan Nila", "Ikan Lele", "Ikan Mas", "Ikan Bandeng"],
    timeRange: "6M",
  },

  setRegion: (region) =>
    set((s) => ({ filters: { ...s.filters, region } })),

  toggleCommodity: (commodity) =>
    set((s) => {
      const current = s.filters.commodities;
      const next = current.includes(commodity)
        ? current.filter((c) => c !== commodity)
        : [...current, commodity];
      if (next.length === 0) return s;
      return { filters: { ...s.filters, commodities: next } };
    }),

  setTimeRange: (timeRange) =>
    set((s) => ({ filters: { ...s.filters, timeRange } })),
}));
