# US-1.1 - Browse the catalog

**Story:** As a shopper, I want to see a list of available products, so that I can browse what's for sale.
**Source:** SprintMart repo, docs/PHASE_1_USER_STORIES.md
**Test data:** Staging is reseeded on every deploy with 15 products (Camping 4, Hiking 4, Apparel 4, Accessories 3), 5 per page, "Featured" order = seed order.

| ID | Title | Preconditions | Steps | Expected result | Priority | Automate? |
|----|-------|---------------|-------|-----------------|----------|-----------|
| TC-1.1.1 | Catalog page loads with heading and product count | Staging is running | 1. Open `/products` | Page heading is "Shop". Text "15 products found" is shown. Exactly 5 product cards are displayed. | High | Yes (Smoke) |
| TC-1.1.2 | Each product card shows name, category and price | On `/products` | 1. Look at the first product card | Card shows "2-Person Tent", category "Camping" and price "$129.99" (two decimals, dollar sign). | High | Yes |
| TC-1.1.3 | Default order on page 1 is the Featured order | On `/products`, no filters | 1. Read the names of the 5 cards from top to bottom | Order is: 2-Person Tent, Sleeping Bag (20°F), Compact Camp Stove, LED Camp Lantern, Trail Hiking Boots. | Medium | Yes |
| TC-1.1.4 | Site root redirects to the catalog | Staging is running | 1. Open `/` (the site root with no path) | Browser lands on `/products` and the "Shop" page is shown. | Medium | Yes |
| TC-1.1.5 | Clicking a product opens its detail page | On `/products` | 1. Click the "2-Person Tent" card | Detail page opens with heading "2-Person Tent", category "Camping", price "$129.99", description "Lightweight freestanding tent with rainfly." and "In stock: 14". | Medium | Yes |
| TC-1.1.6 | Back link returns to the catalog | On the detail page of any product | 1. Click "Back to shop" | Browser returns to `/products` and the catalog is shown. | Low | Yes |
| TC-1.1.7 | Unknown product id shows a not-found page | Staging is running | 1. Open `/products/999999` | Page shows "404 - Not Found". No server error or stack trace. | Low | Yes |
| TC-1.1.8 | Empty-state message when the catalog has no products (AC 2) | Catalog is empty (all products removed) | 1. Open `/products` | A clear empty-state message is shown instead of a blank grid. | Medium | No - cannot be set up through the UI on seeded data. The same message is checked by TC-1.2.5. |

**Automation notes**
- Product cards are links whose accessible name contains the emoji, name, category and price (e.g. "⛺ 2-Person Tent Camping $129.99"). Match on the product name with a regex rather than the whole string.
- Product ids change on every reseed, so never hard-code `/products/<id>`. Reach the detail page by clicking the card.
