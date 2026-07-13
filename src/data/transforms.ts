import type {
  FishPrice,
  TimeRange,
  ChartDataPoint,
  PriceSummary,
} from "../types";

// ============================================================
// Date helpers
// ============================================================

const MONTH_LABELS = [
  "Jan","Feb","Mar","Apr","Mei","Jun",
  "Jul","Agu","Sep","Okt","Nov","Des",
];

export function formatMonthLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return `${MONTH_LABELS[d.getMonth()]} ${d.getFullYear()}`;
}

function getMonthsBack(n: number): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - n);
  return d;
}

export function getCutoffDate(timeRange: TimeRange): Date {
  const map: Record<TimeRange, number> = { "3M": 3, "6M": 6, "1Y": 12 };
  return getMonthsBack(map[timeRange]);
}

// ============================================================
// Filter pipeline
// ============================================================

export function filterData(
  data: FishPrice[],
  region: string,
  commodities: string[],
  timeRange: TimeRange
): FishPrice[] {
  const cutoff = getCutoffDate(timeRange);

  return data.filter((row) => {
    const rowDate = new Date(row.recorded_at);
    if (rowDate < cutoff) return false;
    if (region !== "Semua Wilayah" && row.region_province !== region)
      return false;
    if (!commodities.includes(row.commodity_name)) return false;
    return true;
  });
}

// ============================================================
// Chart transformation
// ============================================================

export function buildChartData(
  filtered: FishPrice[],
  commodities: string[]
): ChartDataPoint[] {
  const byMonth = new Map<string, Map<string, number[]>>();

  for (const row of filtered) {
    const monthKey = row.recorded_at.slice(0, 7);
    if (!byMonth.has(monthKey)) byMonth.set(monthKey, new Map());
    const commodityMap = byMonth.get(monthKey)!;
    if (!commodityMap.has(row.commodity_name))
      commodityMap.set(row.commodity_name, []);
    commodityMap.get(row.commodity_name)!.push(row.price);
  }

  const sortedMonths = Array.from(byMonth.keys()).sort();

  return sortedMonths.map((monthKey) => {
    const commodityMap = byMonth.get(monthKey)!;
    const point: ChartDataPoint = {
      month: formatMonthLabel(`${monthKey}-01`),
      date: monthKey,
    };
    for (const c of commodities) {
      const prices = commodityMap.get(c);
      if (prices && prices.length > 0) {
        point[c] = Math.round(
          prices.reduce((a, b) => a + b, 0) / prices.length
        );
      }
    }
    return point;
  });
}

// ============================================================
// Summary card computation
// ============================================================

export function computeSummary(
  filtered: FishPrice[],
  _timeRange: TimeRange
): PriceSummary {
  if (filtered.length === 0) {
    return {
      averagePrice: 0,
      highestPrice: 0,
      highestMonth: "-",
      lowestPrice: 0,
      lowestMonth: "-",
      trendPercent: 0,
    };
  }

  const avg =
    filtered.reduce((sum, r) => sum + r.price, 0) / filtered.length;

  const byMonth = new Map<string, number[]>();
  for (const row of filtered) {
    const key = row.recorded_at.slice(0, 7);
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(row.price);
  }

  let highestPrice = -Infinity;
  let highestMonth = "-";
  let lowestPrice = Infinity;
  let lowestMonth = "-";

  byMonth.forEach((prices, key) => {
    const monthAvg = prices.reduce((a, b) => a + b, 0) / prices.length;
    if (monthAvg > highestPrice) {
      highestPrice = monthAvg;
      highestMonth = formatMonthLabel(`${key}-01`);
    }
    if (monthAvg < lowestPrice) {
      lowestPrice = monthAvg;
      lowestMonth = formatMonthLabel(`${key}-01`);
    }
  });

  const sortedKeys = Array.from(byMonth.keys()).sort();
  let trendPercent = 0;
  if (sortedKeys.length >= 2) {
    const lastKey = sortedKeys[sortedKeys.length - 1];
    const prevKey = sortedKeys[sortedKeys.length - 2];
    const lastPrices = byMonth.get(lastKey)!;
    const prevPrices = byMonth.get(prevKey)!;
    const lastAvg = lastPrices.reduce((a, b) => a + b, 0) / lastPrices.length;
    const prevAvg = prevPrices.reduce((a, b) => a + b, 0) / prevPrices.length;
    trendPercent = ((lastAvg - prevAvg) / prevAvg) * 100;
  }

  return {
    averagePrice: Math.round(avg),
    highestPrice: Math.round(highestPrice),
    highestMonth,
    lowestPrice: Math.round(lowestPrice),
    lowestMonth,
    trendPercent: parseFloat(trendPercent.toFixed(2)),
  };
}

// ============================================================
// Number formatting
// ============================================================

export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
