# Lead acceptance: handler input errors (switchboard PR #6, e3b312c4)

1. **Required** (from `handler-input-errors-commission.md` and its Lead rulings): client-input errors in `sign-in-http-handler.ts` must get native Better Auth 4xx parity, not 503.
   - **L1, link-social parse stage:**
     - JSON that fails to parse gets 400;
     - a non-JSON, missing or vendor+json content type gets 415;
     - after a successful parse, the signed-out 403 stays as it is (an explicit non-goal).
   - **O3a, Basic header:** an undecodable Basic header reaches native, which answers 401 `invalid_client` with a Basic challenge.
   - **O3b, owner authorize resume:** a malformed `authorize` value gets 400 `invalid-request`, before any effect. It is never turned into "none".

2. **Observed:**
   - **Diff, read by me.**
     - `provider-router-body.ts` mirrors Better Call 1.4.2 `getBody` and cites its source lines as the drift anchor.
     - `basicClientId` returns nothing for an undecodable header, so native refuses it.
     - `ownerAuthorizationResume` returns `absent | resume | refused`, and both call sites map `refused` to the handler's existing `invalid-request` shape.
     - Fixture repair: the relay now forwards body bytes.
     - 9 files.
   - **Sunclaw** (packet `43c9afbc` plus addendum `26e089ad`; pinned Node 24.7.0 and pnpm 10.33.0; the builds for each step differ).
     - Main product overlay: 3 pass and 4 intended failures on **each** host, all for the intended reasons.
     - Fixed: 7/7 on each host.
     - Full suite, Keychain only omitted: Cloudflare 482/0/19 and Node 481/0/20, with 501 registered tests in 84 files.
     - All 6 root audits and 4 native-child audits are 0.
     - Node: 225/225 root pairs by id.
     - 34 readiness:none receipts per full root are recorded with no credit, under the B1-B rule.
   - **CI** on `e3b312c4`: green on all three checks.

3. **Boundary exercised:** the real host HTTP entry, the real Better Auth and oauth-provider, and the real stores, on workerd and Node.

4. **Uncertain:**
   - Hosted Cloudflare's delivery of a null body (unit-proven only).
   - Real providers.
   - Main has since moved (`ac497e46`, `8e7c4416`). The new commits touch only tool-* and oauth-* packages, plus a lock entry adding the hegel devDependency, with no sign-in file. The branch must merge main and pass CI again before merge.

5. **Decision:** accepted, conditional on that merge and CI. Next: a fresh Opus review, then merge after telling Lead A.

## Update, 17 Nov evening: final head `34fb46d1` (review finding F1 closed)

- **Main merged** (`f363ff21`, main `8e7c4416`). The merge brought no sign-in file change.
- **The F1 fix, which I read myself.** `basicClientId` now calls `@better-auth/core` 1.7.11 `decodeBasicCredentials` (`basic-credentials.mjs:48-62`). It is the same installed copy that oauth-provider's `basicToClientCredentials` uses (`utils-vIo_wPv5.mjs:607-621`), so the wrapper and the provider can't disagree about which client a header names.
- **Test.** A new host case uses a real agent and extra `==` padding.
- **Sunclaw red and green** (packet `395d7cec`):
  - red: 1 pass and 1 intended failure on each host (400 vs 200 at `:91`);
  - fixed: 2/0 on each host;
  - all 4 retention audits are 0.

  The Verifier's independent audit is SUPPORTED (`work/handler-input-errors-f1-verifier.md`). The Implementer also checked the raw archive.
- **CI** run 44176566607 on `34fb46d1`: all three jobs passed. I checked this myself.
- **Delta review** by the same reviewer: READY with no findings (`tmp/2026-11-17-pr6-review/delta-report.md`). D-O1 (form `client_id` precedence; old behaviour that fails closed) is logged as a follow-up.
- **Not covered.** The full host suite was not repeated at `34fb46d1`. The delta reaches only `tokenClientId`, whose sole consumer is the agent claims branch, and CI's workerd host lane ran the whole suite at this head (485 passed).

**Decision:** accepted at `34fb46d1`. Merge after telling Lead A.
