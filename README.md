# SprintMart - QA repository

This repository belongs to the **QA team**. It holds the manual test cases and the Playwright automation suite for SprintMart, and nothing else. The application itself lives in a separate repository (`sprintmart`), owned by the Dev team.

## Why a separate repo

In many organisations Dev and QA are different teams with different release rhythms and different access rights. Keeping the test code apart means:

- QA can add, refactor and re-run tests without touching (or waiting on) application releases.
- Devs don't need to understand, or accidentally break, the test framework.
- The suite can later grow to cover several services, not just this one app.
- The two teams meet at one place only: **a deployed environment and its URL**.

## How the two repos work together

```
Dev pushes to sprintmart  ->  Dev pipeline builds Docker image, deploys to staging
                          ->  Dev pipeline triggers the QA job, passing BASE_URL
QA job (this repo)        ->  runs Playwright against BASE_URL  ->  reports results
```

The tests never build or start the app. They only need a URL, supplied through the `BASE_URL` environment variable (default: `http://localhost:3001`, the staging container).

## Running the tests on your machine

Requirements: Node.js 18+ and a running SprintMart environment (staging container on port 3001, or your own `npm start` copy on port 3000).

```bash
npm install
npx playwright install chromium     # one-time

npx playwright test                              # against staging (3001)
BASE_URL=http://localhost:3000 npx playwright test   # macOS/Linux, other URL
```

On Windows PowerShell:

```powershell
$env:BASE_URL="http://localhost:3000"; npx playwright test
```

After a run, open the HTML report with `npm run report`.

## Where things go

```
tests/         Playwright automation (one example test included)
test-cases/    Manual test cases, one file per user story (TEMPLATE.md provided)
Jenkinsfile    QA pipeline - takes BASE_URL as a build parameter
```

## Pipeline

The `Jenkinsfile` has one build parameter, `BASE_URL`. It checks the environment is reachable, runs the suite, and publishes the JUnit results and HTML report. Set up the Jenkins job as described in the SprintMart repo's `docs/DEV_QA_SPLIT.md`.

GitHub Actions is deliberately not used here: GitHub's cloud runners cannot reach a staging environment running on `localhost`. If staging later lives on a public or VPN-reachable URL, a workflow with a `workflow_dispatch` input for the URL would work.

## Conventions

- Use user-facing locators (`getByRole`, `getByLabel`, `getByText`) before CSS selectors.
- Use relative paths (`page.goto('/products')`), never hard-coded hosts.
- Put the manual test case ID in the test title: `TC-1.2.3 search with no match shows empty state`.
- When a test fails, decide: **real defect** (raise it with Dev) or **intentional change** (update the test).
