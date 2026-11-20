# Spike: Vitest browser mode vs Playwright for Switchboard sign-in browser tests

Role: 🐒 Implementer (throwaway spike, Designed Outcome). Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30
on service 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89. Runs on Sunclaw only.

## Question
Which tool should replace our hand-written Chrome DevTools client
(`packages/sign-in-test-support/src/test-fixtures/native-browser-*.ts`) for sign-in browser tests?
- A: **Vitest browser mode** (`@vitest/browser`, Playwright provider, Chromium) — one tool with our existing Vitest 4.
- B: **Playwright** driven from ordinary Vitest node tests (`playwright` library, not `@playwright/test`), or
  `@playwright/test` as a second runner if that is clearly better. Say which.

## The journey to build in each (both hosts if time allows; Node host first)
Passkey sign-in on the sign-in app started by the existing local harness (`startLocalAuthHarness` in
`packages/sign-in-test-support/src/test-fixtures/local-auth-harness.ts`):
1. Open the public sign-in page (full-page navigation to the harness origin).
2. Register a passkey via a virtual authenticator (CDP `WebAuthn.addVirtualAuthenticator`, user verification on).
3. Sign out, sign back in with the passkey; follow the redirects to "Your account".
4. Assert the account page shows the passkey, AND the session row exists in the database.
5. One negative: authenticator without user verification -> refused, no session created.
Use the existing equivalent test as the reference for what to assert:
`packages/sign-in-test-support/src/people-passkey-sign-in.host.e2e.test.ts`.

## Hard rules
- **No wall-clock waits.** No sleep, no polling loops, no timeouts as the wait mechanism: wait on events
  (navigation/load events, `waitForResponse`, `waitForEvent`, DOM-ready signals) with the library timeout
  disabled (0) or only as a hang guard you name explicitly in the report. Report exactly how each wait works.
- Start Chromium and close it through the library; no process-group code of ours.
- Throwaway: work in a fresh clone of `agent-collaboration/switchboard` main `7e32e00e993af5ecfcdb8ce366c5f0dea47bf335`
  under `/Users/shravansunder/code/projects/fleet-access-runner/spike-browser-tools/`. No push, no PR,
  no edits to any other checkout. TypeScript only. Pinned Node 24.7.0 / pnpm 10.33.0 via mise.
- Sunclaw is serial: check nothing else of ours is running first.

## Specifically settle for A (Vitest browser mode)
- Can a test follow a full-page navigation + redirects to the harness origin? Test code runs inside
  Vitest's iframe — does navigating it kill the test? If yes, does a custom `BrowserCommand` using the
  Playwright `context` (opening a separate page) work cleanly? Cite the Vitest docs/source you relied on.
- Does `cdp()` from `vitest/browser` drive the virtual authenticator?
- How does the harness (a Node server) get started — globalSetup / provide-inject? Does that work?

## Report (write `REPORT.md` in the spike folder and message the Lead with it inline)
For A and B: works yes/no per step, the actual code (short), how each wait works, lines of code,
run time, flake (run each 5x), what was awkward, and your recommendation with reasons. Separate what
you ran from what you read. Include exact versions installed.

## Seated 2026-11-20T11:16Z
Spike Implementer: codex-local 01a1f8ab-875f-70a1-9979-d1e51577f11b on Sunclaw service 8b61218b (created by Operator 01a1eda9). Packet on Sunclaw: fleet-access-runner/packets/browser-tool-spike.md.
