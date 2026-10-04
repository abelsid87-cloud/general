# Kids Trading Tracker

Single-page web app (no build step). Data is stored on each device (`localStorage`).

## Put it on phones
Serve this folder over HTTPS (needed for "Add to Home Screen" and offline use), e.g.:
- **GitHub Pages**: repo Settings → Pages → deploy from the branch, folder `/kids-trading-tracker`
  (Pages is configured in the GitHub web UI; whether it is available for a private repo depends on your plan — check GitHub's docs).
- **Netlify Drop** (app.netlify.com/drop): drag this folder in.

Open the URL on the phone → browser menu → *Add to Home Screen*.

## Prices (optional)
Free key from twelvedata.com → app menu (⋯) → *Price data API key*. Stored only on that device.
Check Twelve Data's terms for your use. DFM/ADX stocks may not be covered by the free plan.

## Kids → Mom sync (no server)
1. Kid: ⋯ → *Share this child's trades* → send via WhatsApp/AirDrop/etc.
2. Mom: save the file (or copy the message text) → ⋯ → *Merge trades from a child* → choose the file or paste → *Merge*.

Merging is safe to repeat: entries have unique ids, the newest edit wins, and deletions are carried across.
A child is matched by name (case-insensitive), so use the same name on both phones.
Not live: mom sees what the kid last shared. Keep a backup (⋯ → *Backup*) — clearing browser data erases the app's data.

## Method
Cash (what the kids give Mom) is always **AED**. A trade can be priced in another currency such as **USD**; it stores the USD price and the AED-per-USD rate used, so the AED paid is `shares × price × rate (+ fee)`.
The rate is filled from the live market rate when a price key is set, otherwise from the last saved rate or the UAE dirham peg (3.6725 AED per USD, fixed since 1997). Edit it to the rate Mom's broker actually used.
Holdings are valued at current USD price × current rate. All P&L is in AED, so it includes any exchange-rate movement.
Average-cost basis (in AED); buy fees are added to cost, sell fees reduce proceeds. Fees are entered in AED.
