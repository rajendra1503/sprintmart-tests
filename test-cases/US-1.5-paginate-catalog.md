# US-1.5 - Paginate the catalog

**Story:** As a shopper, I want the catalog paginated, so that the page stays usable as the store grows.
**Source:** SprintMart repo, docs/PHASE_1_USER_STORIES.md
**Test data:** Staging reseeded with the standard 15 products, 5 per page = 3 pages. The search `o` returns 8 products (2 pages: 5 + 3).

| ID | Title | Preconditions | Steps | Expected result | Priority | Automate? |
|----|-------|---------------|-------|-----------------|----------|-----------|
| TC-1.5.1 | Page 1 shows at most 5 products and page links | On `/products` | 1. Count the product cards<br>2. Look at the page links below the grid | Exactly 5 cards. Page links "1", "2", "3" are shown, with "1" highlighted as the current page. | High | Yes (Smoke) |
| TC-1.5.2 | Page 2 content | On `/products` | 1. Click page link "2" | "15 products found". 5 cards: Trekking Poles (Pair), 45L Hiking Backpack, Water Filter Bottle, Fleece Jacket, Packable Rain Shell. Link "2" is highlighted. | High | Yes |
| TC-1.5.3 | Page 3 (last page) content | On `/products` | 1. Click page link "3" | 5 cards: Merino Hiking Socks, Wide-Brim Sun Hat, Rechargeable Headlamp, 15-in-1 Multi-tool, Baseplate Compass. Link "3" is highlighted. | High | Yes |
| TC-1.5.4 | Every product is reachable and none is repeated | On `/products` | 1. Visit pages 1, 2 and 3 and note all product names | 15 different product names in total, no duplicates, none missing compared with the full seed list. | High | Yes |
| TC-1.5.5 | Total count does not change between pages | On page 2 | 1. Read the count text | "15 products found" (the total, not 5). | Medium | Yes |
| TC-1.5.6 | Pagination of search results | On `/products` | 1. Search `o` (8 results)<br>2. Note the page links<br>3. Click page "2" | Page 1 shows 5 products, page links "1" and "2" only. Page 2 shows 3 products: Merino Hiking Socks, 15-in-1 Multi-tool, Baseplate Compass. Search box still contains `o` and the count still says "8 products found". | High | Yes |
| TC-1.5.7 | Page links keep the sort order | On `/products` | 1. Select "Price: Low to High"<br>2. Click page "2" | Sort dropdown still shows "Price: Low to High". Page 2 prices: $28.99, $34.99, $39.99, $42.99, $45.99. | High | Yes |
| TC-1.5.8 | Page links keep search, category and sort together | On `/products` | 1. Search `o`<br>2. Select "Price: Low to High"<br>3. Click page "2" | "8 products found". Page 2 shows 3 products in price order: Compact Camp Stove $42.99, Trail Hiking Boots $89.99, 2-Person Tent $129.99. Search box still contains `o` and sort is still "Price: Low to High". | High | Yes |
| TC-1.5.9 | Single-page results show a single page link | On `/products` | 1. Select category "Camping" (4 results) | Only page link "1" is shown. No product cards are missing. | Medium | Yes |
| TC-1.5.10 | Empty results still show a valid page | On `/products` | 1. Search `xyz` | "0 products found", empty-state message, no error. Page link "1" is shown. | Low | Yes |
| TC-1.5.11 | Page number beyond the last page falls back to the last page | Staging is running | 1. Open `/products?page=99` | Page 3 content is shown (page 3 highlighted). No error. | Low | Yes |
| TC-1.5.12 | Invalid page numbers fall back to page 1 | Staging is running | 1. Open `/products?page=0`<br>2. Open `/products?page=-3`<br>3. Open `/products?page=abc` | Each shows page 1 content (page 1 highlighted). No error. | Low | Yes |

**Automation notes**
- Page links are plain links named "1", "2", "3". Use `getByRole('link', { name: '2', exact: true })`.
- The current page has an `active` CSS class, which is an implementation detail. For TC-1.5.1 and TC-1.5.2 decide whether to assert on it (couples the test to markup) or only on the visible page content. This is exactly the sort of choice that causes test maintenance work when the UI changes.
- TC-1.5.4 is a good loop-over-pages test collecting names into one array.
- TC-1.5.11 / 1.5.12 describe the app's current behaviour. The acceptance criteria do not mention them, so treat a change there as something to discuss with Dev, not automatically a defect.
