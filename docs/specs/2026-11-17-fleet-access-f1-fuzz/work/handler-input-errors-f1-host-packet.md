# PR #6 review finding F1 host packet (Sunclaw)

Authority: the Fleet access Lead's instruction on review finding F1, Router push `01a1eb48-fd49-7bf1-9f42-e4f0d9d4f539` (fix in this PR; a small packet covering the Basic file red then green on both hosts, with the established retention). Review: `tmp/2026-11-17-pr6-review/report.md`, F1. Author: 🐒 Implementer, claude-local `53bfc6e5-3044-4654-813b-5b9a81316be1`. Paired Verifier: codex-local `01a1e99b-44eb-77f3-b4ff-27d8a1f9339c`.

This packet follows the form of `handler-input-errors-host-packet.md` (sha256 `43c9afbc…`) and its addendum `handler-input-errors-host-packet-addendum.md` (sha256 `26e089ad…`). Where this file says "as in 43c9" or "as in 26e0", apply that text unchanged.

## Target

- Repository: public `https://github.com/agent-collaboration/switchboard`, branch `fix/handler-input-errors`, draft PR #6.
- Fixed head: `34fb46d1fce5b682485a0df8498781f66938ab94`. Its parent is merge head `f363ff219242b3f5d03ebaddc1984a6ac6b62b4f`, which merged main at `8e7c441` into `e3b312c4`.
- Pinned toolchain: Node `24.7.0`, pnpm `10.33.0`, as in 43c9. Use an isolated checkout, with no product, test or CI writes beyond the red overlay.
- Targeted file (one file, two tests): `packages/sign-in-test-support/src/malformed-basic-client-authentication.host.e2e.test.ts`.
- **Host runs execute the built `dist`.** Run `pnpm build` after every source change, as in 43c9.

## Steps

1. **Prepare** as in 43c9 step 1, at `34fb46d…`.

2. **Red: pre-F1 product with the target test.** Overlay only:

   ```
   git show f363ff219242b3f5d03ebaddc1984a6ac6b62b4f:packages/sign-in-core/src/better-auth/sign-in-http-handler.ts > packages/sign-in-core/src/better-auth/sign-in-http-handler.ts
   ```

   Expected overlay identity: blob `a5cfc2b08631931d3452fa857c83b477bab9f72c` (the same blob as at `e3b312c4`), sha256 `22659a09f7f036c75e49ff013992b336fca28205631d5998929699fe893e47ac`.

   Run `pnpm build`, record the build identity as in 43c9 step 2, and prepare the per-leg retention as in 26e0. Run the targeted file with `SIGN_IN_TEST_HOST=cloudflare`, then `node`, using `pnpm exec vitest run --config vitest.config.ts --project e2e-host <file>`. Expected on each host: **1 passed and 1 failed.**
   - Passes: "refuses an undecodable Basic client credential as the native invalid_client". It gives 401 `invalid_client`; native refuses `Basic !!!` with or without the fix.
   - Fails: "names the client of a Basic credential the provider decodes but atob refuses, so its token is issued". Received **400**, expected 200. The wrapper's `atob` refuses the extra-padded header, so `tokenClientId` is absent and `customAccessTokenClaims` throws `invalid_client` (`provider-configuration.ts:403-404`).

   Any other failure reason is a finding to return as it stands.

3. **Green: fixed head.** Run `git checkout -- packages/sign-in-core/src/better-auth/sign-in-http-handler.ts`, and confirm a clean status and HEAD `34fb46d…`. Rebuild; the build identity must differ from red's. Run the retention steps and the file on cloudflare, then node. Expected: **2 passed and 0 failed on each host.**

Retention follows 26e0's rules for **targeted legs**:
- the bundle manifest on every leg;
- the Node manifest on Node legs only;
- after each leg, the harness identity, configuration and client checks;
- on Node legs, same-id Node pairs that must exist, with equal counts and every non-empty pair passing `compareNodeProofReceipts`.

No full suite. As the Lead ruled, F1 changes only `basicClientId` in `sign-in-http-handler.ts`: its import and body now use `@better-auth/core/oauth2` `decodeBasicCredentials`. It also adds this one test. `basicClientId` feeds only `tokenClientId`, whose sole consumer is the agent branch of `customAccessTokenClaims`. The full host suite at `e3b312c4` (packet 43c9) covered everything else, and the main merge in between changed no file this PR changes.

## Return

Return as in 43c9:
- private evidence paths with sha256, exact argv, and the source/build/toolchain/host tuple per leg;
- counts and exit codes;
- raw assertion output for every failure;
- the per-leg retention results.

Send it to the Implementer, the Verifier and the Lead (Decision 8). No hosted, CI or acceptance claim follows.
