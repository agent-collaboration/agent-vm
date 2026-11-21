# Lead acceptance: Switchboard PR #10 (Playwright driver, verify-auth recipe, CI background steps)

**Target:** agent-collaboration/switchboard PR #10, head `cb12ec632ebf918a264b3626aca3cc9f0800e4d9` (tree `87ecc3c5`), base main `7e32e00e`.
**Status: ACCEPTED, conditional on one open gate:** the 14 security checks at `cb12ec63`. They need a Claude agent on Sunclaw (claude-local `ac2dd8de`), which only the owner can wake.

## 1. Requirements met (approved design: `design.html`, D1–D8, and `ci-workflow.html`)

- **D1, driver:** the Playwright library is used from Vitest Node tests, as the spike result and the owner's rule require. The library launches and closes Chromium itself.
- **D2:** our DevTools client and page adapter are deleted. Every importer has a disposition in the PR description.
- **D3 and D7:** the new `verify-auth` recipe has four journeys, and main's B2 `organization` and `revision-fence` routes still run (B2 passed on both hosts).
- **D4:** the assertion identity is file, line and column (review B2).
- **D6:** every wait is an event with library timeout 0, and cancellation is causal. I read the diff myself and found no timers.
- **D8:** every browser scenario names its host explicitly and checks the harness's `signInHost` against it (review S3).
- **CI:** `ci.yml` is identical to `ci-workflow.html`. The background-step overlap was observed in job timings.

## 2. Tests pass (first-hand)

- CI run 44764859794 on `cb12ec63`: Validation, E2E (host) and check all passed. 612 passed, 20 skipped. All 21 browser cases plus the version probe ran on Chromium 149.0.7827.55.
- Sunclaw (Implementer, then audited by the Verifier):
  - 12 check gates, 2,917 unit, 333 integration, 407 Python;
  - the browser matrix on both hosts;
  - 5 passkey pairs, 20 passes;
  - B2 on both hosts.

## 3. Proof that the broken versions fail (sensitivity)

- **People stale reply:** a build with the guard removed gives "applied" where "discarded-as-stale" is expected, and fails on both hosts.
- **Refusal title:** hidden fails, and transparent (opacity 0) fails at the visibility assertion.
- **Forced CLI sign-in** with no callback fails.
- **Same-line neighbouring matcher:** the unit test rejects it.
- **The intermittent passkey hang:** its cause, a layout shift, is fixed by a causal readiness wait. A missed trusted click now fails at once.

## 4. Review

- Full independent review: 5 blocking and 4 should-fix findings, all dispositioned and closed.
- Delta review: 2 remaining, closed.
- Final delta review: 1 remaining (opacity), which I fixed and verified myself, ending the loop by the scope rule.
- Notes that don't block are on `follow-up-pr-items.md`:
  - colour-contrast visibility;
  - the People parse-failure path waits for the 15-minute deadline;
  - the version-probe launch runs before cleanup is registered;
  - the B2 collection false fail;
  - one Miniflare D1 flake in an unrelated file (run 44763030570).

## 5. Structure

- **Ownership:** the private `sign-in-test-support` package owns Playwright, the adapter and scoped CDP.
- **Scenarios** own the causal waits and the close order.
- **The runner** owns build and inventory selection.
- **Implicit state turned explicit:** the CLI lifecycle is now a closed union (`waitingForUrl | browserRunning | completed`), and People replies record an explicit committed decision (`applied | discarded-as-stale`).
- **No lifecycle state machine of ours remains for Chrome.**

## Not verified

- The 14 security checks at `cb12ec63`: open, needing the owner.
- Linux CI is only GitHub's `ubuntu-latest`. No staging.

## Merge checklist, once the security checks pass

Tell the central Lead. Mark #10 ready. Merge. Remove the `switchboard-public.verify-sign-in-script` worktree. Merge main into `f1/hegel-fuzz` and rerun its CI.

---
## Gate closed (2026-11-21T01:09Z)

The 14 security checks at `cb12ec63` **PASS**. The run was the Claude Sonnet Operator session claude-local `1f4d23ed` on Sunclaw.
- **Outer result:** exit 0. The private report is `/var/folders/.../verify-sign-in-ryi6pz/report.json`.
- **Each check:** red on cloudflare and node at the exact file:line:col, then green on both.
- **Restore:** every check restored the original bytes exactly. The worktree tree is still `87ecc3c5` and git status is clean.
- **Processes:** none left running.

The 14 checks and where each went red:

| Check | Expected failure location |
|---|---|
| V5 | passkey e2e:337:45 |
| F1 | passkey e2e:371:33 |
| V6-provider | limits e2e:395:49 |
| V6-outer | limits e2e:450:25 |
| B04 | organization-browser-chooser.ts:350:74 |
| HTTP09 | organization-read-scenario.ts:310:62 |
| HTTP10 | organization-read-scenario.ts:389:27 |
| HTTP11 | organization-read-scenario.ts:389:27 |
| HTTP12 | people-membership-lookup e2e:436:28 |
| HTTP13 | organization-read-scenario.ts:210:27 |
| HTTP14 | organization-read-scenario.ts:209:26 |
| HTTP15 | organization-read-scenario.ts:210:27 |
| HTTP16 | people-organization-list e2e:280:29 |
| stale-reply | request-lifecycle-transitions.unit.test.ts:37:4 |

**PR #10 merge state:** head `cb12ec63` unchanged, CI green (Validation, E2E host, check), mergeable CLEAN, main still `7e32e00`.

**ACCEPTED, unconditionally.**
