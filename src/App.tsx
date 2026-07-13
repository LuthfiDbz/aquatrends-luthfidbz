import { useMemo } from "react";
import { useDashboardStore } from "./store/dashboardStore";
import { useLocaleStore } from "./i18n";
import { translateRegion } from "./i18n/domainNames";
import { COMMODITIES, REGIONS } from "./data/constants";
import { filterData, buildChartData, computeSummary } from "./data/transforms";

import DashboardHeader from "./components/dashboard/DashboardHeader";
import FilterPanel from "./components/dashboard/FilterPanel";
import SummaryCards from "./components/dashboard/SummaryCards";
import PriceChart from "./components/charts/PriceChart";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function App() {
  const { filters } = useDashboardStore();
  const { t, locale } = useLocaleStore();
  const fishPrices = useQuery(api.fishPrices.getPrices);

  const filteredData = useMemo(
    () =>
      fishPrices
        ? filterData(fishPrices, filters.region, filters.commodities, filters.timeRange)
        : [],
    [fishPrices, filters]
  );

  const chartData = useMemo(
    () => buildChartData(filteredData, filters.commodities),
    [filteredData, filters.commodities]
  );

  const summary = useMemo(
    () => computeSummary(filteredData, filters.timeRange),
    [filteredData, filters.timeRange]
  );

  const regionDisplay =
    filters.region === "Semua Wilayah"
      ? t.filter.allRegions
      : translateRegion(filters.region, locale);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <FilterPanel regions={["Semua Wilayah", ...REGIONS]} commodities={COMMODITIES} />
        <SummaryCards summary={summary} />

        <section>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-slate-800">{t.chart.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t.chart.subtitle} · {regionDisplay}
                </p>
              </div>
            </div>
            {fishPrices != undefined ? (
              <PriceChart data={chartData} commodities={filters.commodities} />
            ) : (
              <div className="h-72 flex items-center justify-center">
                <p className="text-sm text-slate-400">Loading...</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <p className="text-center text-xs text-slate-400">
          AquaTrends Dashboard · {t.footer.note}
        </p>
      </footer>
    </div>
  );
}
