import { create } from "zustand";
import type {
  DashboardFilters,
  FishPrice,
  CommodityName,
  RegionProvince,
  TimeRange,
} from "../types";

// ============================================================
// Dashboard store — UI state + data slot (ready for Neon later)
// ============================================================

interface DashboardStore {
  // ── Filter state ─────────────────────────────────────────
  filters: DashboardFilters;
  setRegion: (region: RegionProvince | "Semua Wilayah") => void;
  toggleCommodity: (commodity: CommodityName) => void;
  setTimeRange: (range: TimeRange) => void;

  // ── Data state ───────────────────────────────────────────
  /** Populated from mock data now; will come from Neon fetcher later */
  priceData: FishPrice[];
  setPriceData: (data: FishPrice[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  // ── Default filter state ─────────────────────────────────
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
      // Guard: at least one commodity must stay selected
      if (next.length === 0) return s;
      return { filters: { ...s.filters, commodities: next } };
    }),

  setTimeRange: (timeRange) =>
    set((s) => ({ filters: { ...s.filters, timeRange } })),

  // ── Data state ───────────────────────────────────────────
  priceData: [],
  setPriceData: (data) => set({ priceData: data }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  error: null,
  setError: (error) => set({ error }),
}));

// ============================================================
// Fetcher stub — swap body for real Neon API call in Step 2
// ============================================================

/**
 * Placeholder fetcher. In Step 2, replace with:
 * `const res = await fetch('/api/fish-prices?...')`
 * and pipe results into `setPriceData`.
 */
export async function fetchPriceData(
  _filters: DashboardFilters
): Promise<FishPrice[]> {
  // TODO (Step 2): call Neon serverless endpoint
  return [];
}
