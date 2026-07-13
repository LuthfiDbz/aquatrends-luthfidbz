import { useDashboardStore } from "../../store/dashboardStore";
import { useLocaleStore } from "../../i18n";
import { translateCommodity, translateRegion } from "../../i18n/domainNames";
import type { TimeRange } from "../../types";
import { SlidersHorizontal } from "lucide-react";

const COMMODITY_COLOR_PALETTES = [
  { bg: "bg-sky-50 hover:bg-sky-100 border-sky-200", active: "bg-sky-500 border-sky-500 text-white hover:bg-sky-600", dot: "bg-sky-500" },
  { bg: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200", active: "bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600", dot: "bg-emerald-500" },
  { bg: "bg-amber-50 hover:bg-amber-100 border-amber-200", active: "bg-amber-500 border-amber-500 text-white hover:bg-amber-600", dot: "bg-amber-500" },
  { bg: "bg-violet-50 hover:bg-violet-100 border-violet-200", active: "bg-violet-500 border-violet-500 text-white hover:bg-violet-600", dot: "bg-violet-500" },
  { bg: "bg-pink-50 hover:bg-pink-100 border-pink-200", active: "bg-pink-500 border-pink-500 text-white hover:bg-pink-600", dot: "bg-pink-500" },
  { bg: "bg-teal-50 hover:bg-teal-100 border-teal-200", active: "bg-teal-500 border-teal-500 text-white hover:bg-teal-600", dot: "bg-teal-500" },
  { bg: "bg-orange-50 hover:bg-orange-100 border-orange-200", active: "bg-orange-500 border-orange-500 text-white hover:bg-orange-600", dot: "bg-orange-500" },
  { bg: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200", active: "bg-indigo-500 border-indigo-500 text-white hover:bg-indigo-600", dot: "bg-indigo-500" },
];

function getCommodityColors(index: number) {
  return COMMODITY_COLOR_PALETTES[index % COMMODITY_COLOR_PALETTES.length];
}

interface FilterPanelProps {
  regions: string[];
  commodities: string[];
}

export default function FilterPanel({ regions, commodities }: FilterPanelProps) {
  const { filters, setRegion, toggleCommodity, setTimeRange } = useDashboardStore();
  const { t, locale } = useLocaleStore();

  function regionLabel(r: string): string {
    if (r === "Semua Wilayah") return t.filter.allRegions;
    return translateRegion(r, locale);
  }

  return (
    <section className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-4 h-4 text-slate-400" strokeWidth={2} />
        <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
          {t.filter.sectionLabel}
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 sm:items-end">
        <div className="flex-1 min-w-0">
          <label htmlFor="region-select" className="block text-xs font-medium text-slate-500 mb-1.5">
            {t.filter.regionLabel}
          </label>
          <div className="relative">
            <select
              id="region-select"
              value={filters.region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 pr-8 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors cursor-pointer"
            >
              {regions.map((r) => (
                <option key={r} value={r}>{regionLabel(r)}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-[2]">
          <p className="text-xs font-medium text-slate-500 mb-1.5">{t.filter.commodityLabel}</p>
          <div className="flex flex-wrap gap-2">
            {commodities.map((commodity, index) => {
              const isActive = filters.commodities.includes(commodity);
              const colors = getCommodityColors(index);
              return (
                <button
                  key={commodity}
                  onClick={() => toggleCommodity(commodity)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-150 ${
                    isActive ? colors.active : `${colors.bg} text-slate-600`
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? "bg-white/70" : colors.dot}`} />
                  {translateCommodity(commodity, locale)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-shrink-0">
          <p className="text-xs font-medium text-slate-500 mb-1.5">{t.filter.timeRangeLabel}</p>
          <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
            {(["3M", "6M", "1Y"] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-xs font-medium transition-all duration-150 border-r border-slate-200 last:border-r-0 ${
                  filters.timeRange === range
                    ? "bg-[#0A2540] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t.filter.timeRange[range]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
