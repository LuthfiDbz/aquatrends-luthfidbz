import { TrendingUp, TrendingDown, Minus, BarChart3, ArrowUpDown } from "lucide-react";
import type { PriceSummary } from "../../types";
import { formatIDR } from "../../data/transforms";
import { useLocaleStore } from "../../i18n";

interface SummaryCardsProps {
  summary: PriceSummary;
}

export default function SummaryCards({ summary }: SummaryCardsProps) {
  const { t } = useLocaleStore();
  const tc = t.cards;

  const trendUp   = summary.trendPercent > 0;
  const trendFlat = summary.trendPercent === 0;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Card 1: Average Price */}
      <MetricCard
        title={tc.avgPrice.title}
        subtitle={tc.avgPrice.subtitle}
        icon={<BarChart3 className="w-4 h-4" />}
        iconBg="bg-sky-500/10 text-sky-600"
        accent="border-t-sky-500"
      >
        <p className="text-2xl font-bold text-slate-800 tracking-tight mt-1">
          {summary.averagePrice > 0 ? formatIDR(summary.averagePrice) : "—"}
        </p>
        <p className="text-xs text-slate-400 mt-1">{tc.avgPrice.hint}</p>
      </MetricCard>

      {/* Card 2: High / Low */}
      <MetricCard
        title={tc.highLow.title}
        subtitle={tc.highLow.subtitle}
        icon={<ArrowUpDown className="w-4 h-4" />}
        iconBg="bg-violet-500/10 text-violet-600"
        accent="border-t-violet-500"
      >
        <div className="mt-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-500">{tc.highLow.highest}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-emerald-600">
                {summary.highestPrice > 0 ? formatIDR(summary.highestPrice) : "—"}
              </span>
              {summary.highestMonth !== "-" && (
                <span className="text-xs text-slate-400 ml-1.5">· {summary.highestMonth}</span>
              )}
            </div>
          </div>
          <div className="h-px bg-slate-100" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="text-xs text-slate-500">{tc.highLow.lowest}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold text-rose-500">
                {summary.lowestPrice < Infinity ? formatIDR(summary.lowestPrice) : "—"}
              </span>
              {summary.lowestMonth !== "-" && (
                <span className="text-xs text-slate-400 ml-1.5">· {summary.lowestMonth}</span>
              )}
            </div>
          </div>
        </div>
      </MetricCard>

      {/* Card 3: Trend */}
      <MetricCard
        title={tc.trend.title}
        subtitle={tc.trend.subtitle}
        icon={trendFlat ? <Minus className="w-4 h-4" /> : trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        iconBg={trendFlat ? "bg-slate-100 text-slate-500" : trendUp ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}
        accent={trendFlat ? "border-t-slate-300" : trendUp ? "border-t-emerald-500" : "border-t-rose-500"}
      >
        <div className={`flex items-center gap-1.5 mt-1 ${trendFlat ? "text-slate-500" : trendUp ? "text-emerald-600" : "text-rose-500"}`}>
          {trendFlat
            ? <Minus className="w-7 h-7" strokeWidth={2.5} />
            : trendUp
            ? <TrendingUp className="w-7 h-7" strokeWidth={2.5} />
            : <TrendingDown className="w-7 h-7" strokeWidth={2.5} />}
          <span className="text-2xl font-bold tracking-tight">
            {summary.trendPercent !== 0
              ? `${trendUp ? "+" : ""}${summary.trendPercent.toFixed(1)}%`
              : "0.0%"}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          {trendFlat ? tc.trend.flat : trendUp ? tc.trend.up : tc.trend.down}
        </p>
      </MetricCard>
    </section>
  );
}

interface MetricCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  accent: string;
  children: React.ReactNode;
}

function MetricCard({ title, subtitle, icon, iconBg, accent, children }: MetricCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm border-t-2 ${accent} px-5 py-4`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700">{title}</p>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>
        <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${iconBg}`}>{icon}</div>
      </div>
      {children}
    </div>
  );
}
