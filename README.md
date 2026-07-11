# 3D Printing World Inc

A complete, zero-overhead 3D printing business: strategy, storefront, and back
office in one repo. Built around one structural advantage — **material cost is
$0** — so pricing, product selection, and marketing all exploit it.

**Read [`BUSINESS_PLAN.md`](BUSINESS_PLAN.md) first.** It explains the economics
everything else implements: price machine time (the only scarce resource), sell
digital STL files to escape the single-printer capacity ceiling, keep fixed
costs at literally zero, and never let the printer idle.

## What's here

| Path | What it is |
|---|---|
| `index.html` / `styles.css` / `app.js` | The storefront: instant quote calculator, print-on-demand catalog, STL file shop, services, FAQ. Static, self-contained, no external dependencies, dark-mode aware. |
| `BUSINESS_PLAN.md` | Revenue tiers, pricing engine spec, expense structure, unit economics, risk controls, daily operating loop. |
| `tools/invoicing/` | Offline-capable invoicing PWA (back office). Log jobs, track paid/unpaid, generate and share invoices — see its own README. |

## The quote calculator

Implements the plan's pricing engine exactly (`app.js`, `PRICING`):

```
price = max($15 minimum, hours × $8/hr × quality × quantity-discount × rush)
        + shipping ($6 flat, free over $60)
```

Materials are always shown as **$0.00** on every quote — the business's core
selling point, rendered as a line item.

Orders open a pre-filled email to `3dprintingworldinc@gmail.com` — no payment
processor fees, no storefront SaaS. The upgrade path (Stripe Payment Links,
per-transaction pricing only) is in the plan for when volume justifies it.

## Deploy (free)

1. Push to GitHub → **Settings → Pages** → deploy from branch, `/ (root)`.
2. The storefront is live at `https://<user>.github.io/<repo>/`.
3. The invoicing back office is at `.../tools/invoicing/` — open it on your
   phone and "Add to Home Screen".

No build step, no server, no monthly bill.

## Local preview

```bash
python3 -m http.server 8000
# storefront:  http://localhost:8000/
# back office: http://localhost:8000/tools/invoicing/
```
