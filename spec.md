# Fyzzyapa

## Current State
Full e-commerce site for Fyzzyapa mocktail bombs. Has product catalog, cart, checkout panel (right-side drawer), and order placement via backend canister. The backend canister is stopped (IC0508 error), blocking all order placements. The checkout panel layout may require scrolling to see form fields and the Place Order button.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- Regenerate backend canister (to fix IC0508 "canister stopped" error — same Motoko logic, fresh canister deployment)
- Checkout panel layout: make all form fields and Place Order button visible without needing to scroll — compact the order summary and use a fixed-height layout that fits on screen

### Remove
- Nothing

## Implementation Plan
1. Regenerate Motoko backend (same logic, fresh canister) to fix IC0508
2. Update CheckoutModal layout so content fits in viewport — reduce padding, compact order summary, ensure the sticky footer with Place Order button is always visible without scrolling
