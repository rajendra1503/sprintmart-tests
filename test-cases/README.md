# Manual test cases

Write manual test cases here, one file per user story, named after the story:

    US-1.1-browse-catalog.md
    US-1.2-search-by-name.md
    ...

Use `TEMPLATE.md` as the starting point. Every automated test in `tests/`
should trace back to a manual test case ID (put the ID in the test title,
e.g. `TC-1.2.3 search with no match shows empty state`).
