# Handler input-errors host packet (Sunclaw)

Authority: [handler-input-errors-commission.md](handler-input-errors-commission.md), Proof section. Fleet access Lead approved push and this packet in Router push `01a1eb0c-ce6c-79d1-9bad-ee73795363a2` (Decision 8 packet path). Author: 🐒 Implementer, claude-local `53bfc6e5-3044-4654-813b-5b9a81316be1`. Paired Verifier: codex-local `01a1e99b-44eb-77f3-b4ff-27d8a1f9339c`.

## Target

- Repository: public `https://github.com/agent-collaboration/switchboard`, branch `fix/handler-input-errors`, draft PR #6.
- Fixed head: `e3b312c47a182110fa32fb3ae73ec8f1c1c31e1d`.
- Comparator: main `d96e9650535316fcb1cb8a7551bd5eccd3a46ffb` (PR #2 merge).
- Toolchain (pinned): Node `24.7.0` (`.node-version`), pnpm `10.33.0` (`packageManager`). Record `node -v` and `pnpm -v`. A mismatch is a setup failure; stop and report it. Do not run on another version.
- Use an isolated checkout on Sunclaw. No credentials are needed. Write nothing to product source or tests and change nothing in CI, except the red overlay in step 2, which step 3 reverts.

Targeted files (`T`):

```
packages/sign-in-test-support/src/malformed-link-social.host.e2e.test.ts
packages/sign-in-test-support/src/malformed-basic-client-authentication.host.e2e.test.ts
packages/sign-in-test-support/src/malformed-owner-authorization-resume.host.e2e.test.ts
```

**Host runs execute the built `dist`, not source.** Run `pnpm build` after every source change, before any host run. A host run without that rebuild is invalid, and a red observed on a stale build counts as a harness failure, not evidence.

## Steps

1. **Prepare.** Canonicalize the checkout path and a private evidence directory with `realpath`. Check out `e3b312c4…` detached and confirm `git rev-parse HEAD` and a clean `git status --porcelain`. Run `pnpm install --frozen-lockfile`. Keep the tool versions and the install exit code.

2. **Red: comparator product, target tests and fixture.** Overlay only the two fixed product files with their main versions:

   ```
   git show d96e9650535316fcb1cb8a7551bd5eccd3a46ffb:packages/sign-in-core/src/better-auth/sign-in-http-handler.ts > packages/sign-in-core/src/better-auth/sign-in-http-handler.ts
   git show d96e9650535316fcb1cb8a7551bd5eccd3a46ffb:packages/sign-in-core/src/better-auth/minimal-owner-pages.ts > packages/sign-in-core/src/better-auth/minimal-owner-pages.ts
   ```

   Expected overlay identities: `sign-in-http-handler.ts` blob `cf4ef07755ced75442b5a41e3a1f7360c474e7a6`, sha256 `52dc990152728d6d34b24deaf2b70f2084168194f884c28507bab69a79e41afd`. `minimal-owner-pages.ts` blob `65f9c0262d23a20c3eb59e0acccbfb6801855918`, sha256 `ffa62474df3afa28abfe9366d0e28b9f3ab95ede695299ac587f5a06a8d91ea7`. Record `git hash-object` for both. Everything else stays at the target, including `provider-router-body.ts`, which main's handler doesn't import.

   Run `pnpm build` and record its exit code. Record build identity as a sorted sha256 listing of `packages/sign-in-core/dist`, `packages/sign-in-host-cloudflare/dist` and `packages/sign-in-host-node/dist` (or whichever sign-in host `dist` directories exist), plus one digest of that listing.

   Then run `SIGN_IN_TEST_HOST=cloudflare pnpm exec vitest run --config vitest.config.ts --project e2e-host <T>`, then the same with `SIGN_IN_TEST_HOST=node`. Expected on each host: 4 failed and 3 passed. The 4 failures must be for these reasons:
   - basic-client: received 503, expected 401;
   - link-social signed out: received 400 Invalid JSON, or 403 `not-allowed` for text/plain with a valid JSON body, where 415 is expected;
   - link-social signed in: received 400 Invalid JSON, where 415 is expected;
   - owner continuation: received 503 `sign-in-unavailable`, where 400 `invalid-request` is expected.

   Any other failure reason is a finding to return as it stands. Do not adjust a test.

3. **Green: fixed head.** Run `git checkout -- packages/sign-in-core/src/better-auth/sign-in-http-handler.ts packages/sign-in-core/src/better-auth/minimal-owner-pages.ts`, then confirm `git status --porcelain` is empty and HEAD is `e3b312c4…`. Run `pnpm build` and record the build identity as in step 2; it must differ from step 2's. Run `<T>` on cloudflare, then node. Expected: 3 files and 7 tests passed on each host.

4. **Full host suite at the fixed head**, with the step 3 build unchanged. This is required because the harness relay change (`local-auth-harness.ts`: request bodies forwarded as bytes) affects every host test's transport.

   **Do not run bare `pnpm test:e2e:host`.** On Sunclaw (Darwin) it selects `packages/sign-in-owner-cli/src/fleet/macos-keychain-proof-key-store.host.e2e.test.ts`, which touches the real macOS Keychain. Every Sunclaw packet omits exactly that file. A CLI `--exclude` on its own has no effect with inline projects, so build an explicit file list instead. For each host (`SIGN_IN_TEST_HOST=cloudflare`, then `node`):

   1. List the offered files: `SIGN_IN_TEST_HOST=<host> pnpm exec vitest list --config vitest.config.ts --project e2e-host --filesOnly --json=<evidence>/offered-<host>.json`.
   2. Derive the complete positive file array: the offered files minus only the Keychain file above. Keep it as `<evidence>/selected-<host>.json`.
   3. Before any runtime, prove the selected set equals the offered set minus that one file: same count minus one, and a set difference of exactly that file. Record the proof output. If the Keychain file isn't in the offered list, record that, and the selected set equals the offered set.
   4. Run `SIGN_IN_TEST_HOST=<host> pnpm exec vitest run --config vitest.config.ts --project e2e-host <file1> <file2> …`, with every selected file as its own argv entry. Keep the exact argv.

   Record pass, fail and skip counts and exit codes per host.

   If any test fails, classify it. In a separate clean checkout of `d96e9650…`, install and build, then run only the failing files on the same host and toolchain. The Keychain file is never among them; build the list with the same offered-minus-Keychain proof, each file as its own argv entry.
   - fails on main too → pre-existing;
   - passes on main → regression from this change.

   Return both raw outputs. Do not re-run for a green result, and do not fix anything.

## Return

Send to the Implementer and the Lead (Decision 8): stable private evidence paths with sha256, exact argv for every command, the source/build/toolchain/host tuple for each run, counts and exit codes, and raw assertion output for every failure. Setup failures are reported as setup failures, not product results. Neither a hosted Cloudflare result nor a live-provider claim follows from this packet.
