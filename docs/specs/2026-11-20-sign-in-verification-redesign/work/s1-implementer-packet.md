# S1 Implementer packet: Playwright driver swap + verify-auth recipe

Role: 🐒 Implementer (role-implementer), Designed Outcome, Cross-domain. Model gpt-6.2-sol high. Runs on Sunclaw.
Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30, service 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89.
Paired Verifier: the S1 Verifier seated on Sunclaw alongside you (the Operator gives you its ID). Exchange
directly with it. The Lead may not be able to message you back reliably; record calls in your log.

## Read first, in full
From `ShravanSunder/agent-vm` at commit d0f2eb50 (or later), folder
`docs/specs/2026-11-20-sign-in-verification-redesign/`: `design.html` (all of it, D1–D8), `plan.html`,
`review-report.md`. Also the spike report on Sunclaw:
`/Users/shravansunder/code/projects/fleet-access-runner/spike-browser-tools/REPORT.md` and its code
(`browser-spike-journey.ts`, `browser-spike-capabilities.ts`, `browser-spike-node.host.e2e.test.ts`).

## Build (one PR on public agent-collaboration/switchboard)
Branch `verify/playwright-driver` from main `7e32e00e993af5ecfcdb8ce366c5f0dea47bf335`. Worktree under
`/Users/shravansunder/code/projects/fleet-access-runner/s1/`. Draft PR when the first green proof exists.
- D1: Playwright library (`playwright`, pinned exact) as a test-only dep of `sign-in-test-support`;
  browser adapter in `src/test-fixtures/` exposing launch/context, virtual authenticator, page on a harness
  origin, response hold/release, response body + cookie reads, trusted input.
- D2: delete our DevTools client and page adapter; disposition every importer (removed / ported / kept)
  in the PR description. Keep "first error survives close/evidence failure".
- Move the browser scenarios onto the adapter keeping every assertion; split rows per design table.
  Driver-fixture files `native-browser-click`, `native-cli-keyboard-activation`: port invariants, retire
  old-driver-specific assertions by name.
- D3/D7: new `verify-auth` skill from PR #9's recipe (branch `verify/sign-in-script`, 1f2f039) minus all
  process-group/late-exit/SIGTERM rules; port runner pieces per D7; keep main's B2 selections
  (`organization`, `revision-fence`) routable; agent journey needs no browser.
- D4: security checks keep exact assertion identity (AST anchor + stack reader, or simpler only if it still
  rejects the neighbour at lines 37/38); `pnpm verify:sign-in` = journeys only by default.
- D6: every wait is an event with library timeout 0. No 8 s deadlines, no sleeps, no polling. A missing
  event is cancelled causally (`page.close({ reason })`) and the scenario closes browser, CLI child,
  harness and observers on every exit path. Do not change vitest.config.ts timeouts.
- D8: each browser scenario runs on both hosts explicitly (no env default). Do NOT edit `.github/` —
  write the proposed CI step in `work/ci-proposal.md`; the owner approves gate changes.

## Rules
No wall-clock waits. No SIGKILL. UUIDv7 only. TypeScript only. No new check gates. Follow repo AGENTS.md.
Sunclaw is serial: coordinate heavy runs with the Verifier.

## Done when (your handback)
Both hosts green on Sunclaw for every moved scenario (named per host); each moved test's control red at
its intended assertion then green after restore; the 4 journeys + B2 selections run cold from the skill;
one deliberate failure observed through cleanup; repo checks (lint, typecheck, format, unit, integration)
pass. Handback with commit, commands, counts, exit codes, and a STRUCTURE section (package ownership,
seams, invariants, any implicit state). Message the Lead.
