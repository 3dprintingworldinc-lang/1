# 3D Printing World Inc — Business Plan

**Assets:** one 3D printer · unlimited filament · this website
**Objective:** maximize profit, minimize expenses.

---

## 1. The core insight

With unlimited free filament, **material cost is $0**. That inverts the economics of
the entire 3D-printing industry:

- Every competitor prices by **weight** (grams of filament) plus machine time.
- Our only scarce resource is **printer-hours** (one machine ≈ 650–700 usable
  hours/month running 24/7 with maintenance windows).

Therefore every business decision follows two rules:

1. **Price machine time, never material.** Sell the products where material is the
   dominant cost for competitors — big, heavy, solid objects — because they cannot
   match our price without losing money, and we lose nothing.
2. **Escape the capacity ceiling with digital goods.** One printer caps physical
   revenue. Digital STL files have zero marginal cost, consume zero printer-hours,
   and scale infinitely. They are the profit engine; the printer is the marketing
   engine and the premium-service engine.

## 2. Revenue ladder (sorted by $ per printer-hour)

| Tier | Offer | Effective $/printer-hr | Role |
|---|---|---|---|
| 1 | **Digital STL files** ($7–$19, commercial license $49) | ∞ (uses no printer time) | Unbounded scale; sells while we sleep |
| 2 | **Custom prototyping & replacement parts** (B2B/B2C, from $25; CAD design $60/hr) | $25–$45 | Highest-value machine time; rush jobs ×1.75 |
| 3 | **Catalog products** (print-on-demand, $29–$149) | $4–$12 | Steady demand; showcases quality; feeds tiers 1–2 |
| 4 | **Overnight batch runs** of best-sellers | $3–$6 | The printer never idles — idle hours are the only true waste |

Scheduling rule: rush/custom jobs get daytime slots; catalog and batch jobs fill
nights and weekends. **Target duty cycle: >90%.**

## 3. Pricing engine (implemented in the site's quote calculator)

```
price = max($15 minimum, hours × $8/hr × quality × quantity-discount × rush)
        + shipping ($6 flat, free over $60)

quality:  draft ×0.85 · standard ×1.00 · fine ×1.35
quantity: 5+ units −10% · 20+ units −20%   (plates batch efficiently)
rush:     48-hour turnaround ×1.75
materials: $0.00 — always, printed on every quote (the marketing hook)
```

The visible "$0 materials" line is deliberate: it converts our structural advantage
into a selling point no competitor can copy.

## 4. Expense structure (target: ≈ $0 fixed costs)

| Expense | Strategy | Monthly cost |
|---|---|---|
| Hosting | GitHub Pages, static site, no build step | $0 |
| Storefront software | This repo (hand-built, no SaaS) | $0 |
| Inventory | Print-on-demand only — nothing printed before it's sold | $0 |
| Payments | Email invoicing via bundled tool (`tools/invoicing/`); upgrade path: Stripe Payment Links (no monthly fee, per-transaction only) when volume justifies | $0 |
| Marketing | SEO on static pages + posting print photos/timelapses organically | $0 |
| Filament | Unlimited (given) | $0 |
| Electricity | ~0.12 kWh × running hours | ~$15–25 |
| Wear parts | Nozzles, belts, sheets, amortized (~$0.03/print-hr) | ~$20 |
| Shipping | Charged to customer at cost | $0 net |

**Total fixed overhead: under $50/month. Gross margin: ~97%.**

## 5. Unit economics — illustrative steady state

Physical (printer at 90% duty ≈ 600 hrs/mo, blended ~$7/hr effective):
**≈ $4,200/mo revenue**, ~$45 direct costs.

Digital (no ceiling): 100 file sales/mo × $12 average = **$1,200/mo at 100% margin**,
growing with catalog size — every custom job's design can be generalized and
re-sold as an STL, so tier-2 work continuously feeds tier-1 inventory.

**Illustrative month: ≈ $5,400 revenue, ≈ $50 expenses, ≈ $5,350 profit.**
Digital share grows over time without any new hardware.

## 6. Risk controls

- **No inventory risk** — nothing is printed unsold except overnight batch items
  with proven sell-through.
- **No platform lock-in** — the site is plain HTML/CSS/JS in this repo; it can be
  hosted anywhere in minutes.
- **Failed prints** — cost only time and $0 material; quality settings in the
  calculator (draft/standard/fine) let customers self-select the risk/price point.
- **Single-machine failure** — wear parts kept on hand (see expenses); the digital
  tier keeps revenue flowing during downtime.
- **Demand concentration** — four independent revenue tiers; no single customer
  or channel exceeds the printer's replacement cost in monthly exposure.

## 7. Operating loop (daily)

1. Morning: check orders (email), invoice completed jobs via `tools/invoicing/`.
2. Load daytime slots with custom/rush work; queue overnight batch before leaving.
3. Photograph finished prints → post organically → link to site.
4. Any custom design worth generalizing → clean up → publish as a paid STL.

## 8. Deployment

Repo → GitHub → Settings → Pages → deploy from branch, root folder. The site is
fully static and self-contained (no external fonts, scripts, or trackers — nothing
to pay for, nothing to break, nothing slowing it down).

- Storefront: `index.html` + `styles.css` + `app.js`
- Back office: `tools/invoicing/` (offline-capable invoicing PWA)
- Contact/orders: 3dprintingworldinc@gmail.com
