# Delta-X logo asset

The mockup loads `delta-x-logo.svg` from this folder for every wordmark
(header, footer, capstone PDF preview, executive one-slide, admin
"Course branding" panel, and the certificate template).

The file currently committed here is a **typographic placeholder** — just
the words "DELTA-X" set in the brand colors. To use the real Delta-X
mark:

## Option A — SVG (preferred)

Overwrite `delta-x-logo.svg` with the official vector file:

```
git checkout claude/dfam-course-mockup-Uiteq
cp /path/to/your/delta-x-logo.svg dfam/assets/delta-x-logo.svg
git add dfam/assets/delta-x-logo.svg
git commit -m "Add official Delta-X logo asset"
git push
```

No other code changes are needed — every `<img>` in the mockup picks
it up automatically.

## Option B — PNG

If only a raster file is available, drop it in as `delta-x-logo.png`
and run one find-and-replace across the HTML:

```
git checkout claude/dfam-course-mockup-Uiteq
cp /path/to/your/delta-x-logo.png dfam/assets/delta-x-logo.png
sed -i 's|delta-x-logo\.svg|delta-x-logo.png|g' dfam/index.html
git add dfam/assets/delta-x-logo.png dfam/index.html
git commit -m "Use PNG Delta-X logo asset"
git push
```

A transparent-background PNG at 600–1000 px wide will render cleanly
at every size used in the mockup (small in the header / footer / PDF
strips, larger in the certificate header).
