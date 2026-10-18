# US-1.3 - Filter by category

**Story:** As a shopper, I want to filter products by category, so that I can narrow down what I'm browsing.
**Source:** SprintMart repo, docs/PHASE_1_USER_STORIES.md
**Test data:** Staging reseeded with the standard 15 products. Categories: Accessories 3, Apparel 4, Camping 4, Hiking 4.

| ID | Title | Preconditions | Steps | Expected result | Priority | Automate? |
|----|-------|---------------|-------|-----------------|----------|-----------|
| TC-1.3.1 | Category dropdown lists all categories | On `/products` | 1. Open the Category dropdown | Options in order: All Categories, Accessories, Apparel, Camping, Hiking. | Medium | Yes |
| TC-1.3.2 | Filtering by Camping | On `/products` | 1. Select "Camping" in the Category dropdown | The page reloads by itself (no button click needed). "4 products found": 2-Person Tent, Sleeping Bag (20°F), Compact Camp Stove, LED Camp Lantern. | High | Yes (Smoke) |
| TC-1.3.3 | Filtering by each category shows the right count | On `/products` | 1. Select each category in turn: Accessories, Apparel, Camping, Hiking | Counts shown: Accessories "3 products found", Apparel "4 products found", Camping "4 products found", Hiking "4 products found". Every card shown belongs to the selected category. | High | Yes (data-driven) |
| TC-1.3.4 | Hiking category shows the right products | On `/products` | 1. Select "Hiking" | Products: Trail Hiking Boots, Trekking Poles (Pair), 45L Hiking Backpack, Water Filter Bottle. | Medium | Yes |
| TC-1.3.5 | Selected category stays selected after reload | On `/products` | 1. Select "Apparel" | After the page reloads the dropdown shows "Apparel", not "All Categories". | Medium | Yes |
| TC-1.3.6 | "All Categories" clears the filter | After TC-1.3.2 (Camping selected) | 1. Select "All Categories" | "15 products found" and the first 5 products of the full catalog are shown. | High | Yes |
| TC-1.3.7 | Category and search together | On `/products` | 1. Select "Hiking"<br>2. Type `pack` in the search box and click Search | "1 product found": 45L Hiking Backpack. (Packable Rain Shell also contains "pack" but is in Apparel.) | High | Yes |
| TC-1.3.8 | Category and search with no overlap | On `/products` | 1. Select "Camping"<br>2. Search `pack` | "0 products found" and the message "No products match your filters." | Medium | Yes |
| TC-1.3.9 | Search term is kept when the category changes | On `/products` after searching `pack` (2 results) | 1. Select "Hiking" in the Category dropdown | Search box still contains `pack`. "1 product found": 45L Hiking Backpack. | Medium | Yes |

**Automation notes**
- Dropdown: `getByLabel('Category')` (it is a native select, use `selectOption`). The select submits the form on change, so wait for the new page/URL rather than clicking Search.
- Combining filters in one form is deliberate in this app. If a later phase breaks TC-1.3.9, that is a regression, not a locator change.
