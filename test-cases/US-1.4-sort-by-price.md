# US-1.4 - Sort by price

**Story:** As a shopper, I want to sort products by price, so that I can find the cheapest or priciest items.
**Source:** SprintMart repo, docs/PHASE_1_USER_STORIES.md
**Test data:** Staging reseeded with the standard 15 products. Prices from lowest to highest: $14.99 Baseplate Compass, $16.99 Merino Hiking Socks, $19.99 Wide-Brim Sun Hat, $21.99 15-in-1 Multi-tool, $25.99 LED Camp Lantern, $28.99 Rechargeable Headlamp, $34.99 Trekking Poles (Pair), $39.99 Water Filter Bottle, $42.99 Compact Camp Stove, $45.99 Fleece Jacket, $59.99 Packable Rain Shell, $74.99 Sleeping Bag (20°F), $89.99 Trail Hiking Boots, $99.99 45L Hiking Backpack, $129.99 2-Person Tent.

| ID | Title | Preconditions | Steps | Expected result | Priority | Automate? |
|----|-------|---------------|-------|-----------------|----------|-----------|
| TC-1.4.1 | Sort: Price Low to High | On `/products` | 1. Select "Price: Low to High" in the Sort dropdown | The page reloads by itself. Page 1 shows, in order: Baseplate Compass $14.99, Merino Hiking Socks $16.99, Wide-Brim Sun Hat $19.99, 15-in-1 Multi-tool $21.99, LED Camp Lantern $25.99. | High | Yes (Smoke) |
| TC-1.4.2 | Sort: Price High to Low | On `/products` | 1. Select "Price: High to Low" | Page 1 shows, in order: 2-Person Tent $129.99, 45L Hiking Backpack $99.99, Trail Hiking Boots $89.99, Sleeping Bag (20°F) $74.99, Packable Rain Shell $59.99. | High | Yes (Smoke) |
| TC-1.4.3 | Sort order continues across pages | After TC-1.4.1 | 1. Go to page 2<br>2. Go to page 3 | Page 2: $28.99, $34.99, $39.99, $42.99, $45.99. Page 3: $59.99, $74.99, $89.99, $99.99, $129.99. Prices increase continuously over all 15 products. | High | Yes |
| TC-1.4.4 | Sorting keeps the search term | On `/products` | 1. Search `hiking` (3 results)<br>2. Select "Price: Low to High" | Search box still contains `hiking`. "3 products found" in order: Merino Hiking Socks $16.99, Trail Hiking Boots $89.99, 45L Hiking Backpack $99.99. | High | Yes |
| TC-1.4.5 | Sorting keeps the category filter | On `/products` | 1. Select category "Camping" (4 results)<br>2. Select "Price: High to Low" | Category dropdown still shows "Camping". "4 products found" in order: 2-Person Tent $129.99, Sleeping Bag (20°F) $74.99, Compact Camp Stove $42.99, LED Camp Lantern $25.99. | High | Yes |
| TC-1.4.6 | Sorting keeps both category and search | On `/products` | 1. Select "Hiking"<br>2. Search `pack`<br>3. Select "Price: Low to High" | Category still "Hiking", search box still `pack`, sort shows "Price: Low to High". "1 product found": 45L Hiking Backpack. | Medium | Yes |
| TC-1.4.7 | Sort selection stays selected after reload | On `/products` | 1. Select "Price: High to Low" | After the reload the Sort dropdown shows "Price: High to Low". | Medium | Yes |
| TC-1.4.8 | "Featured" restores the default order | After TC-1.4.1 | 1. Select "Featured" in the Sort dropdown | Page 1 shows the default order: 2-Person Tent, Sleeping Bag (20°F), Compact Camp Stove, LED Camp Lantern, Trail Hiking Boots. | Medium | Yes |
| TC-1.4.9 | Sort: Name A to Z (present in the UI, not in the acceptance criteria) | On `/products` | 1. Select "Name: A to Z" | Page 1 shows, in order: 15-in-1 Multi-tool, 2-Person Tent, 45L Hiking Backpack, Baseplate Compass, Compact Camp Stove (names starting with digits come first). | Low | Yes |

**Automation notes**
- Dropdown: `getByLabel('Sort')` with `selectOption`. It submits on change.
- To assert order, read the prices (or names) of all cards on the page into an array and compare with the expected array, rather than checking single cards.
- Convert "$129.99" to a number before comparing if you write a generic "is sorted ascending" check.
