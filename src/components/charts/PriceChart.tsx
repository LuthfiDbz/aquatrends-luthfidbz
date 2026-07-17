import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, type TooltipProps,
} from "recharts";
import type { ChartDataPoint } from "../../types";
import { formatIDR } from "../../data/transforms";
import { COMMODITIES } from "../../data/constants";
import { useLocaleStore } from "../../i18n";
import { translateCommodity } from "../../i18n/domainNames";

const CHART_COLORS = [
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#6366f1",
];

function getColor(commodity: string): string {
  const index = COMMODITIES.indexOf(commodity);
  return CHART_COLORS[index >= 0 ? index % CHART_COLORS.length : 0];
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  const { t, locale } = useLocaleStore();
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 min-w-[200px]">
      <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">{label}</p>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
              <span className="text-xs text-slate-600">{translateCommodity(entry.name ?? "", locale)}</span>
            </div>
            <span className="text-xs font-semibold text-slate-800">
              {entry.value != null ? formatIDR(entry.value) : "\u2014"}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
        {t.chart.tooltipHint}
      </p>
    </div>
  );
}

function CustomLegend({ payload, locale }: { payload?: Array<{ value: string; color: string }>; locale: "en" | "id" }) {
  if (!payload) return null;
  return (
    <div className="flex flex-wrap justify-center gap-4 pt-2">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
          <span className="text-xs text-slate-500">{translateCommodity(entry.value, locale as "en" | "id")}</span>
        </div>
      ))}
    </div>
  );
}

function formatYAxis(value: number): string {
  return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`;
}

interface PriceChartProps {
  data: ChartDataPoint[];
  commodities: string[];
}

export default function PriceChart({ data, commodities }: PriceChartProps) {
  const { t, locale } = useLocaleStore();

  if (data.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center">
        <p className="text-sm text-slate-400">{t.chart.noData}</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={340}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} dy={6} />
        <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} axisLine={false} dx={-4} width={44} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#cbd5e1", strokeWidth: 1, strokeDasharray: "4 2" }} />
        <Legend content={<CustomLegend locale={locale} />} />
        {commodities.map((commodity) => (
          <Line
            key={commodity}
            type="monotone"
            dataKey={commodity}
            stroke={getColor(commodity)}
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 0, fill: getColor(commodity) }}
            activeDot={{ r: 5, strokeWidth: 2, stroke: "#ffffff", fill: getColor(commodity) }}
            connectNulls={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
