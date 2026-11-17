# Lead acceptance: F2, Hegel on critical systems (switchboard PR #3)

Target: merged head `65b0cf00dc1f47c85edd4e48344b789c1df0a716` (parents `9cb00ca4` and main `d96e9650`). Written 2026-11-17 by the Fleet access Lead.

1. **Required** (F2 requirements and specification, rev 4): Hegel property tests and state machines on the fourteen targets, P1–P9 and M1–M5. Each lives in its package's lane, uses an independent oracle and has `alwaysCheck` invariants. Every test must be able to fail. Test code only: no product change, no new CI gate, and no dependency beyond `@hegeldev/hegel` 0.4.10, which the repo already used.

2. **Observed**, opened by me, not only taken from summaries:
   - **Scope, from my own diff read of `b03d35ff..9cb00ca4`:**
     - 36 files, all `*.hegel.{unit,integration,host.e2e}.test.ts` plus four test-only fixtures:
       - `google-grant-literal-model.ts`
       - `oauth-ceremony-hegel-fixture.ts`
       - `agent-removal-proof-entrypoint.ts`
       - `agent-removal-hegel-model.ts`
     - `git grep` shows those four are imported only by `.hegel.*.test.ts` files and are not in any package `exports`.
     - `package.json` and `pnpm-lock.yaml` add only `@hegeldev/hegel` 0.4.10 as a devDependency.
     - No product source changed.
   - **Sensitivity** (Verifier, `work/verifier-observation.md`): 19 deliberate defects. Each one fails its named property twice with the same shrunk case, and passes again once restored.
     - 17 run locally against `829651c`.
     - 2 run on the real host on Sunclaw against `9cb00ca4`:
       - M4 on the Durable Object: `beginUnlink` then a forbidden admission breaks `pendingRemovalAndDisableRefuseAdmission`.
       - M5 on a real Unix socket: a second `startCall` after a held, cancelled reply.
   - **Baseline:**
     - Local: 38 + 9 new tests pass.
     - Sunclaw at `9cb00ca4`: M4 and M5 each pass at baseline and after restore, with 0 skips.
     - Python: 407 pass at `f1f843b6`.
   - **CI:** green on all three checks at `829651c` and at `f1f843b6` (M4 down from 715 s to 181 s). The run on merged head `65b0cf00` is listed below.
   - **Merge delta** `9cb00ca4..65b0cf00`: only `sign-in-http-handler.ts` and `malformed-link-social.host.e2e.test.ts`, which is PR #2. None of F2's nine packages imports a sign-in package (Implementer and Verifier both checked), so the proofs carry over.

3. **Boundaries exercised:**
   - Pure functions are tested against independent literal tables and vectors.
   - M1–M3 run on process-local stores.
   - M4 runs on a real workerd Durable Object.
   - M5 runs over a real Unix socket.

4. **Uncertain or limited** (my calls, recorded in F2 decisions):
   - M4's Durable Object host test runs 25 cases instead of 100, and suppresses only Hegel's `TooSlow` health check. The core M4 test keeps 100 cases.
   - Proof is sequential only, not concurrent.
   - Hosted Cloudflare, real OAuth providers and deployment are not covered.
   - The old full host sweeps at `f1f843b6` exited 1. The causes were M4 `TooSlow` (since fixed) and the pre-existing B1-A service-page `301 vs 531` flake. That flake is not F2's; B1-B's split fixes it.

5. **Decision:** accepted, conditional on CI being green on `65b0cf00`. If CI is green, the next steps are a fresh independent review, then merge after telling Lead A.

CI on `65b0cf00`: pending at time of writing (run 44149512628).
