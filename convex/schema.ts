import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  fish_prices: defineTable({
    commodity_name: v.string(),
    region_province: v.string(),
    price: v.number(),
    recorded_at: v.string(),
  }),
});
