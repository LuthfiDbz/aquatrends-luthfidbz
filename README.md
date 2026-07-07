# AquaTrends — FishPrice Dashboard

A dashboard for monitoring Indonesian fishery commodity price trends, built on BPS (Statistics Indonesia) snapshot data. Designed for internal business use — clean, functional, and no-frills.

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Build tool | Vite 5 |
| UI framework | React 18 + TypeScript (strict) |
| Styling | Tailwind CSS 3 |
| Charting | Recharts 2 |
| Global state | Zustand 4 |
| Server state | TanStack Query 5 |
| Database | Neon Serverless Postgres |
| Icons | Lucide React |

---

## Features (Step 1)

- **Header** — AquaTrends branding, BPS data source badge, EN/ID language toggle
- **Filter Panel** — region/province dropdown, multi-commodity toggle buttons, time range group (3 Months / 6 Months / 1 Year)
- **Summary Cards** — average price, highest & lowest with month labels, trend indicator vs. previous month
- **Multi-line Chart** — Recharts with custom tooltip and custom legend, fully responsive
- **Dual Language (EN/ID)** — all UI labels switch on toggle; commodity names and region names always stay in Indonesian (official BPS data nomenclature); language preference persists via `localStorage`

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

```bash
# Production build
npm run build

# Preview the build
npm run preview
```

---

## Color Palette

| Token | Hex | Used for |
|---|---|---|
| Ocean Blue (primary) | `#0A2540` | Header, active time range |
| Sky / Cyan (accent) | `#0ea5e9` | Ikan Nila line, active states, badges |
| Emerald | `#10b981` | Ikan Lele line, upward trend, highest price |
| Amber | `#f59e0b` | Ikan Mas line |
| Violet | `#8b5cf6` | Ikan Bandeng line, high/low card |
| Background | `#f8fafc` | Page background |
| Surface | `#ffffff` | Cards, panels |

---
