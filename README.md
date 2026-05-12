# Work Hours & Invoicing

A simple Progressive Web App for logging work hours, tracking paid/unpaid status, and generating invoices. Installs to your iPhone home screen like a native app — no App Store, no Xcode, no developer account required.

## Features

- Log entries with date, start/end time, hours, hourly rate, and a description
- Auto-calculates hours from start/end time (you can override)
- Mark each entry as paid/unpaid; outstanding and paid totals shown at the top
- Filter entries (All / Unpaid / Paid)
- Edit or delete any entry
- Generate an invoice for every outstanding entry — share via iOS share sheet (AirDrop, Mail, Messages, "Save to Files" as PDF) or print
- "Mark all as paid" button to clear outstanding after sending an invoice
- Works offline (service worker caches all assets)
- Data is stored locally on your device (localStorage); nothing is sent to a server

## Getting it on your iPhone

You need to host the files somewhere your iPhone can reach. Two easy options:

### Option A — GitHub Pages (recommended, free, permanent)

1. Push this repo to GitHub (already done if you're reading this from there).
2. In your repo on github.com → **Settings → Pages**.
3. Under **Source**, choose `Deploy from a branch`, pick the branch (`claude/work-hours-invoice-app-EtnSJ` or `main` after you merge), folder `/ (root)`, and **Save**.
4. Wait ~1 minute. GitHub shows you a URL like `https://<your-user>.github.io/<repo>/`.
5. Open that URL in Safari on your iPhone.
6. Tap the **Share** button → **Add to Home Screen** → **Add**.
7. Launch it from your home screen — it runs full-screen like a native app.

### Option B — Quick local test from your laptop

If your iPhone is on the same Wi-Fi network as your computer:

```bash
cd /path/to/this/repo
python3 -m http.server 8000
```

Find your computer's local IP (e.g. `192.168.1.42`), then in Safari on your iPhone visit `http://192.168.1.42:8000`. Add to home screen as above.

> Note: Service workers require HTTPS in most browsers. Offline mode will work fully on the GitHub Pages URL; on `http://` local serving the app still works, just without offline caching.

## Tech

- Plain HTML/CSS/JavaScript — no build step, no framework
- Service worker for offline use
- `localStorage` for persistence
- Uses Web Share API where available (iOS Safari supports it for the share sheet)

## Files

- `index.html` — markup
- `styles.css` — iOS-styled UI with dark mode support
- `app.js` — application logic
- `manifest.json` — PWA manifest
- `sw.js` — service worker for offline caching
- `icon-180.png`, `icon-192.png`, `icon-512.png` — app icons

## Data & privacy

All entries are stored in your browser's `localStorage` on your device. If you clear Safari data or delete the home screen app, your entries will be lost. Consider tapping "Share / Save PDF" after each invoice to keep an archive.
