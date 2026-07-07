import type { FishPrice, CommodityName, RegionProvince } from "../types";

// ============================================================
// Static mock data — replace fetcher with real Neon queries later
// ============================================================

const COMMODITIES: CommodityName[] = [
  "Ikan Nila",
  "Ikan Lele",
  "Ikan Mas",
  "Ikan Bandeng",
];

const REGIONS: RegionProvince[] = [
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "DKI Jakarta",
  "Sumatera Utara",
  "Sulawesi Selatan",
  "Kalimantan Timur",
  "Bali",
];

// Base prices per commodity (IDR/kg)
const BASE_PRICES: Record<CommodityName, number> = {
  "Ikan Nila": 28000,
  "Ikan Lele": 22000,
  "Ikan Mas": 32000,
  "Ikan Bandeng": 26000,
};

// Monthly drift factors — simulates realistic seasonal price movement
const MONTHLY_FACTORS: Record<CommodityName, number[]> = {
  "Ikan Nila":    [1.00, 1.02, 1.05, 1.03, 0.98, 0.96, 0.99, 1.04, 1.07, 1.05, 1.02, 1.08],
  "Ikan Lele":    [1.00, 0.98, 1.01, 1.04, 1.06, 1.03, 0.99, 0.97, 1.02, 1.05, 1.07, 1.04],
  "Ikan Mas":     [1.00, 1.03, 1.06, 1.02, 0.97, 0.95, 0.98, 1.01, 1.04, 1.08, 1.06, 1.10],
  "Ikan Bandeng": [1.00, 1.01, 0.99, 1.03, 1.05, 1.02, 1.00, 0.98, 1.03, 1.06, 1.04, 1.07],
};

// Regional price modifiers
const REGION_MODIFIERS: Record<RegionProvince, number> = {
  "DKI Jakarta":      1.12,
  "Jawa Barat":       1.00,
  "Jawa Tengah":      0.97,
  "Jawa Timur":       0.98,
  "Sumatera Utara":   0.94,
  "Sulawesi Selatan": 0.91,
  "Kalimantan Timur": 1.05,
  "Bali":             1.08,
};

let idCounter = 1;

function generateId(): string {
  return `fp_${String(idCounter++).padStart(4, "0")}`;
}

function formatDate(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, "0")}-01`;
}

function randomVariance(base: number, pct = 0.03): number {
  const delta = base * pct * (Math.random() * 2 - 1);
  return Math.round(base + delta);
}

// Generate 13 months of data: Jun 2025 → Jun 2026
function generateMockData(): FishPrice[] {
  const records: FishPrice[] = [];

  const months: Array<{ year: number; month: number }> = [];
  for (let m = 6; m <= 12; m++) months.push({ year: 2025, month: m });
  for (let m = 1; m <= 6; m++) months.push({ year: 2026, month: m });

  for (const region of REGIONS) {
    for (const commodity of COMMODITIES) {
      months.forEach(({ year, month }, idx) => {
        const base = BASE_PRICES[commodity];
        const seasonal = MONTHLY_FACTORS[commodity][(month - 1) % 12];
        const regional = REGION_MODIFIERS[region];
        const rawPrice = base * seasonal * regional;
        const price = randomVariance(rawPrice, 0.025);

        records.push({
          id: generateId(),
          commodity_name: commodity,
          region_province: region,
          price,
          recorded_at: formatDate(year, month),
        });
      });
    }
  }

  return records;
}

export const MOCK_FISH_PRICES: FishPrice[] = generateMockData();

// Convenience exports
export { COMMODITIES, REGIONS };
