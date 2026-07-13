import { Fish } from "lucide-react";
import { useLocaleStore } from "../../i18n";

export default function DashboardHeader() {
  const { t, locale, toggleLocale } = useLocaleStore();

  return (
    <header className="sticky top-0 z-30 bg-[#0A2540] border-b border-slate-700/60 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand — always EN */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30">
            <Fish className="w-4 h-4 text-sky-400" strokeWidth={2} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-white font-bold text-lg tracking-tight leading-none me-4">
              AquaTrends
            </span>
            <span className="hidden sm:inline text-slate-400 text-xs font-normal">
              {t.header.subtitle}
            </span>
          </div>
        </div>

        {/* Right side: data badge + lang toggle */}
        <div className="flex items-center gap-3">

          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-600 hover:border-sky-500 hover:bg-sky-500/10 transition-all duration-150"
            title="Switch language"
          >
            <span className="text-slate-300 text-xs font-semibold tracking-wider">
              {locale === "id" ? "ID" : "EN"}
            </span>
            <span className="text-slate-600 text-xs">|</span>
            <span className="text-slate-500 text-xs font-medium">
              {locale === "id" ? "EN" : "ID"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
