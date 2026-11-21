# Follow-up bug fix: client input that reaches 503 in sign-in-http-handler

Lead: Fleet access Lead (claude-local cd5902e2). Written 2026-11-17 after PR #2 merged as d96e9650.

## Why

PR #2 fixed one case: malformed JSON on link-social returned 503 and now gets Better Call's 400. Its fresh review (`tmp/2026-11-17-pr2-review/report.md`) found three more places where client input in the same file still turns into a 503, or a non-native status. A 503 tells callers and monitors that the server failed when the client sent bad input. That is a confirmed bug against intended behavior, so it is fixed without an owner ask (Lead call, recorded in F1 decisions).

## Scope (public repo `agent-collaboration/switchboard`, a new branch from main d96e9650, one PR)

1. **L1, link-social pre-read.** Run the pre-read only when the content type matches Better Call's JSON regex (`^application\/([a-z0-9.+-]*\+)?json`, Better Call 1.4.2 `dist/utils.mjs:24`). Let a null body and every non-JSON type reach native unchanged, so native returns its own 415 or later 4xx. Keep the `idToken` guard's guarantee intact.
2. **O3a, malformed Basic header.** `sign-in-http-handler.ts:301-303`: `atob` on a non-base64 `Authorization: Basic …` throws inside the catch-all and returns 503. Return the status and body that Better Auth's own token endpoint returns for an unusable client credential. Read that in its source first and cite file:line. Do not invent a body.
3. **O3b, `ownerAuthorizationResume`** (`:189-191`, `:290-294`, `minimal-owner-pages.ts:13`, `:37`). First read whether the 503 on a malformed `authorize` param is a deliberate fail-closed choice: look for a design line, a comment or a test asserting it. If nothing says it is deliberate, propose the 4xx and its body to the Lead before landing. If something does say it, report that and leave it alone.

Out of scope: the invite-member catch-all convention (`sign-in-request-handler.ts:84-97`), body-size limits, and the provider-layer limit (O1).

## Proof

- One permanent host e2e regression per fixed case, on both hosts (workerd and Node), red on main d96e9650 and green after. Each asserts the exact status and body against the cited native source, no `Set-Cookie`, and no row change, like `malformed-link-social.host.e2e.test.ts`.
- Keep the existing store-failure guard: a real session-store fault stays 503.
- `pnpm check`, unit and integration are run locally or on the Sunclaw test agent (heavy runs never on the owner's Mac). No new check gate. No wall clock in tests.
- Show the diff to the Lead before you push. The paired Verifier observes red and green on both hosts independently.

## Seats

- Implementer (from 17 Nov 19:30 UTC): Claude Opus high, claude-local `53bfc6e5-3044-4654-813b-5b9a81316be1`. It replaced the Sol F1 Implementer, which the provider's policy filter blocked twice on this task. Worktree: `/Users/shravansunder/code/projects/switchboard-public.fix-handler-input-errors` (branch `fix/handler-input-errors`, clean at main `d96e9650`).
- Verifier: F1 Verifier, codex-local `01a1e99b-44eb-77f3-b4ff-27d8a1f9339c`.
- Review: a fresh reviewer the Lead picks after the Lead's acceptance.

## Lead rulings since the commission

- **O3b** (`ownerAuthorizationResume`, `minimal-owner-pages.ts:8-38`; callers `sign-in-http-handler.ts:190` and `:290`): the strict check is deliberate, but the 503 is not. Map exactly that refusal at its two call sites to **400**. Use the handler's existing page-level refusal shape (no-store, no Set-Cookie) and cite it. **Not** "invalid => none". Regression on both hosts: a malformed `authorize` (unparsable, wrong client_id, non-loopback redirect_uri) gives 400 with no cookie and no row change; a valid one still resumes.
- The Verifier's native-parity notes are in `work/handler-input-errors-verifier.md`:
  - JSON 400;
  - non-JSON, missing or vendor+json content type 415;
  - a null body skips the parse;
  - a malformed Basic header gives 401 `invalid_client` with a Basic challenge.
- Diff to the Lead before push. Heavy host runs go to Sunclaw; the commission covers it, and packets come to the Lead under Decision 8.
- **L1 scope (Lead, 17 Nov, on Implementer departure 1).** Parity with Better Auth applies to the **parse stage only**. The wrapper's own signed-out 403 (`sign-in-http-handler.ts:312-319`) runs before native, so the wrapper reproduces Better Call 1.4.2's parse stage (`utils.mjs:4-31`, under `allowedMediaTypes ["application/json"]`) itself, before that check. That gives native's exact 415 and 400 bodies.
  - **After a successful parse**, the signed-out 403 policy is unchanged. Native would answer 400 `VALIDATION_ERROR` there; the wrapper answers 403, as main already does. This is an explicit **non-goal**, not a gap.
  - A null body cannot reach the handler through either host; a unit test proves that case.
- **Proof apparatus.** Every host leg (red, green and the full suite) uses the established verify-auth retention:
  - `prepareProofBundles` and `prepareNodeProofArtifacts` run before the leg;
  - `AUTH_PROOF_MANIFEST_FILE` and `AUTH_PROOF_NODE_MANIFEST_FILE` are set;
  - Worker modules, config and client are compared afterwards;
  - initiated and actual Node receipts are paired, with `compareNodeProofReceipts`.

  A dist listing alone is not target proof.

## Delta review of the F1 fix (17 Nov evening)

`tmp/2026-11-17-pr6-review/delta-report.md`: READY, no findings; F1 is closed.

- **D-O1, logged and not fixed here.** The form `client_id` takes precedence over a Basic header (`sign-in-http-handler.ts:306-307`). This is old behaviour, unchanged by the fix. Native authenticates the Basic header first, so for a request native would accept, the wrapper can fail closed with a 400 instead. The release fence still prevents a token for the wrong client. Mirroring native's order (`basicClientId(header) ?? non-empty form client_id`) is a candidate follow-up, not a merge blocker.
- **D-O2, optional, not taken.** Also asserting the issued token's `client_id`.
