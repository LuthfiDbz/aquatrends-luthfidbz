import { useEffect, useMemo } from "react";
import { useDashboardStore } from "./store/dashboardStore";
import { useLocaleStore } from "./i18n";
import { MOCK_FISH_PRICES, COMMODITIES, REGIONS } from "./data/mockData";
import { filterData, buildChartData, computeSummary } from "./data/transforms";

import DashboardHeader from "./components/dashboard/DashboardHeader";
import FilterPanel from "./components/dashboard/FilterPanel";
import SummaryCards from "./components/dashboard/SummaryCards";
import PriceChart from "./components/charts/PriceChart";

export default function App() {
  const { filters, priceData, setPriceData } = useDashboardStore();
  const { t } = useLocaleStore();

  useEffect(() => {
    setPriceData(MOCK_FISH_PRICES);
  }, [setPriceData]);

  const filteredData = useMemo(
    () => filterData(priceData, filters.region, filters.commodities, filters.timeRange),
    [priceData, filters]
  );

  const chartData = useMemo(
    () => buildChartData(filteredData, filters.commodities),
    [filteredData, filters.commodities]
  );

  const summary = useMemo(
    () => computeSummary(filteredData, filters.timeRange),
    [filteredData, filters.timeRange]
  );

  // Display label for the chart subtitle — region name stays ID
  const regionDisplay =
    filters.region === "Semua Wilayah"
      ? t.filter.allRegions
      : filters.region;

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
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-medium border border-sky-100">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                {t.chart.mockBadge}
              </span>
            </div>
            <PriceChart data={chartData} commodities={filters.commodities} />
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <p className="text-center text-xs text-slate-400">
          AquaTrends Dashboard · {t.footer.note} ·{" "}
          <span className="text-slate-500">{t.footer.step}</span>
        </p>
      </footer>
    </div>
  );
}
