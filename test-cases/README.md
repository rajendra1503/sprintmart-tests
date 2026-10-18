# Manual test cases

One file per user story, written against the Phase 1 acceptance criteria and verified against the running application. Each automated test in `tests/` should trace back to a test case ID, e.g. `TC-1.2.5 no match shows the empty-state message`.

Use `TEMPLATE.md` when you add test cases for later phases.

## Index

| File | Story | Test cases |
|------|-------|-----------|
| `US-1.1-browse-catalog.md` | Browse the catalog | TC-1.1.1 to TC-1.1.8 |
| `US-1.2-search-by-name.md` | Search by name | TC-1.2.1 to TC-1.2.10 |
| `US-1.3-filter-by-category.md` | Filter by category | TC-1.3.1 to TC-1.3.9 |
| `US-1.4-sort-by-price.md` | Sort by price | TC-1.4.1 to TC-1.4.9 |
| `US-1.5-paginate-catalog.md` | Paginate the catalog | TC-1.5.1 to TC-1.5.12 |

## Suites

Test cases marked **Smoke** form a small, fast suite that proves the main flow of every story. Tag them in Playwright (e.g. `{ tag: '@smoke' }`) so the QA pipeline can run just the smoke suite on every deploy and the full regression suite nightly.

| Smoke test case | What it proves |
|-----------------|----------------|
| TC-1.1.1 | Catalog loads, shows 15 products, 5 per page |
| TC-1.2.1 | Search finds a product |
| TC-1.2.5 | No-result search shows the empty-state message |
| TC-1.3.2 | Category filter works |
| TC-1.4.1 | Price low to high sort works |
| TC-1.4.2 | Price high to low sort works |
| TC-1.5.1 | Pagination shows 5 per page with page links |

## Test data

Staging is reseeded on every deploy with the same 15 products (Camping 4, Hiking 4, Apparel 4, Accessories 3). The catalog is read-only in Phase 1, so tests can run in parallel safely. Expected values in these files come from that seed data. If the seed data changes in a later phase, the expected values change with it.

## Not automatable on seeded data

TC-1.1.8 (empty catalog) needs an empty database. The same empty-state message is covered by TC-1.2.5.
