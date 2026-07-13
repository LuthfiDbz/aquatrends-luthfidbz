import { query } from "./_generated/server";
import { v } from "convex/values";

export const getPrices = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("fish_prices").collect();
  },
});

export const getFilteredPrices = query({
  args: {
    region: v.optional(v.string()),
    commodities: v.optional(v.array(v.string())),
    timeRange: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db.query("fish_prices").collect();

    if (args.region && args.region !== "Semua Wilayah") {
      results = results.filter((r) => r.region_province === args.region);
    }

    if (args.commodities && args.commodities.length > 0) {
      results = results.filter((r) =>
        args.commodities!.includes(r.commodity_name)
      );
    }

    if (args.timeRange) {
      const now = new Date("2026-06-01");
      const monthsMap: Record<string, number> = { "3M": 3, "6M": 6, "1Y": 12 };
      const monthsBack = monthsMap[args.timeRange] ?? 6;
      const cutoff = new Date(now);
      cutoff.setMonth(cutoff.getMonth() - monthsBack);

      results = results.filter((r) => {
        const rowDate = new Date(r.recorded_at);
        return rowDate >= cutoff;
      });
    }

    return results;
  },
});
