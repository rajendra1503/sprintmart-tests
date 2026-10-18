# US-1.2 - Search by name

**Story:** As a shopper, I want to search products by name, so that I can quickly find something specific.
**Source:** SprintMart repo, docs/PHASE_1_USER_STORIES.md
**Test data:** Staging reseeded with the standard 15 products. Search matches the product **name** only (not category or description).

| ID | Title | Preconditions | Steps | Expected result | Priority | Automate? |
|----|-------|---------------|-------|-----------------|----------|-----------|
| TC-1.2.1 | Search by a partial name | On `/products` | 1. Type `tent` in the search box<br>2. Click Search | "1 product found". Only "2-Person Tent" is shown. | High | Yes (Smoke) |
| TC-1.2.2 | Search is case-insensitive | On `/products` | 1. Search `TENT`<br>2. Search `tEnT` | Both searches show "1 product found" with "2-Person Tent". | High | Yes |
| TC-1.2.3 | Search matching several products | On `/products` | 1. Search `hiking` | "3 products found": Trail Hiking Boots, 45L Hiking Backpack, Merino Hiking Socks (in this order). | High | Yes |
| TC-1.2.4 | Clearing the search shows the full catalog | After TC-1.2.1 (search box contains `tent`) | 1. Clear the search box<br>2. Click Search | "15 products found" and the first 5 products of the full catalog are shown. | High | Yes |
| TC-1.2.5 | No match shows the empty-state message, not an error | On `/products` | 1. Search `xyz` | "0 products found". Message "No products match your filters." is shown. No product cards, no error page. | High | Yes (Smoke) |
| TC-1.2.6 | Search does not match descriptions | On `/products` | 1. Search `waterproof` (appears in the descriptions of the boots and the rain shell, but in no product name) | "0 products found" and the empty-state message. | Medium | Yes |
| TC-1.2.7 | Search does not match categories | On `/products` | 1. Search `Camping` (a category name, not in any product name) | "0 products found" and the empty-state message. | Medium | Yes |
| TC-1.2.8 | Search term matching the middle of a name | On `/products` | 1. Search `camp` | "2 products found": Compact Camp Stove, LED Camp Lantern. | Medium | Yes |
| TC-1.2.9 | Search can be submitted with the Enter key | On `/products` | 1. Click the search box, type `tent`<br>2. Press Enter | Same result as TC-1.2.1: "1 product found", "2-Person Tent". | Low | Yes |
| TC-1.2.10 | Search term stays visible after searching | On `/products` | 1. Search `hiking` | The search box still contains `hiking` after the page reloads. | Low | Yes |

**Automation notes**
- Search box: placeholder "Search products...". Submit button: "Search".
- The result count line ("N products found") is the quickest assertion for result size. Note the singular form: "1 product found".
- TC-1.2.3 / 1.2.8 are good candidates for a data-driven test (term, expected names).
