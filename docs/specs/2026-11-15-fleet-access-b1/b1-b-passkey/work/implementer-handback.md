# B1-B implementation record

Status: in progress. No PR target declared; no feature completion claimed.

- Working tree: `/Users/shravansunder/code/projects/switchboard.b1b-passkey-sign-in`, branch `b1b/passkey-sign-in`, base `7bee7182d1a87073cdc9795270aaa994c28e21ef` (clean at entry).
- Authority: commission.md and all seven B1-B design pages; Packet 1 governs the slice. Writes stay in the B1-B worktree and this return file. No design-page writes.
- Record: no-home per commission; Lead owns the trace. This file and Router reports preserve my evidence.
- Pair: Verifier `codex-local/01a1e709-8628-73d2-98a1-b8995fe5db2d`; startup sent at Router push `01a1e736-ee75-79e3-bbe5-1f91d50a2da2`. Same-lineage limit recorded by commission.
- Standards: Lead confirmed repository's own standards at Router push `01a1e737-ac58-76e3-bb99-6a708541b10b`: AGENTS.md, .cursor/rules/ts-rules.md and existing test taxonomy, with commission rules and governing design on top.
- Verification route: V1/V4 completion/hook/V7 queue and DOM unit tests locally; V2–V6/V7 served page through both real hosts on Sunclaw; V8 real Chrome virtual authenticator plus CLI on both hosts on Sunclaw. Required whole gates on Sunclaw; CI unavailable (Actions billing). Physical authenticators, real Turnstile and staging remain outside local proof.

## Evidence

- Initial route-test attempt: `pnpm exec vitest run --project unit packages/sign-in-core/src/response-release/second-factor-public-routes.unit.test.ts`, exit 254, no tests run: worktree dependencies absent (`Command "vitest" not found`). Receipt `tmp/b1b-evidence/routes-before.log`. This is setup failure, not a pre-fix product red. Installing frozen lockfile before retry.

## Open

All implementation and gates remain pending. Guidance setup finding from Verifier: old paths and no passkey journey in verify-auth; inspect and update only authorized passkey passages.

## Implementation checkpoint (before remote proof)

- Product wiring and permanent tests written for the named routes, hook, completion, queue/DOM runner, shipped button and served island; test-only hostname, insert recorder and one-shot user-read fault added to both fixture hosts. Browser scenario adds virtual WebAuthn, click-only load observation, API-via-browser invite readback, no-UV refusal, CLI continuation and failed Turnstile script. None of those host/browser claims is verified yet.
- Lead rulings: completion test beside its internal core module (`01a1e73c-05b3-7a61-8199-7b7b683ec532`); V8 uses API-via-browser invitation and cookie clearing (`01a1e744-870b-7160-8c21-6a54e6510a1c`, design correction `c48620c4963f1b8cc05ce8cd1a978929fcd143ff`); exactly one journey inventory entry and reference line authorized (`01a1e747-fa08-7a23-a15c-d65507ce7a05`); copied button permits explicit return type/type-only React import and provenance notice (`01a1e748-75b0-72f0-803c-28c2772b5e76`). Verifier notified directly.
- Two exact internal package import mappings are added for the design's `.ts` queue/runner modules: the existing broad pages mapping resolves `.tsx`. No public/test-only export was added.
- The upstream button is fetched from better-auth-ui/better-auth-ui at `2b028ec5`, with imports mapped, a return annotation and provenance notice. Hooks and markup remain shipped behavior.
- Queue and completion tests were first run after their modules were written. No pre-fix red was observed for those modules; the required deliberate-break sensitivity is still owed by the Verifier.
- Current local proof: focused route pre-fix red 2 failed/15 passed, exit 1; restored route green 17 passed, exit 0. Expanded targeted unit command across the B1-B tests, existing island test and journey-observation tests: 8 files, 55 passed, exit 0 (`tmp/b1b-evidence/targeted-unit.log`). Targeted real HTTP composition integration: 1 file, 11 passed, exit 0 (`targeted-integration.log`). Package typechecks for sign-in-core and sign-in-test-support pass, exit 0. Build passes, exit 0. Taxonomy audit passes, exit 0.
- Retained diagnostics: initial missing Vitest dependency (254), missing base build (1), initial auth-ui export typecheck before rebuilding auth-ui (2), and transient browser-fixture variable rename typecheck (2) were setup/implementation diagnostics, not feature sensitivity reds; the latter was corrected at the existing fixture boundary. Full gates remain owed on Sunclaw.
- verify-auth updates document passkey sign-in and the existing real-browser route, preserve stand-in limits, and add the authorized inventory reference. Skill rules: not run, because repository instructions name no sunstack lint config; this is not a skill-behavior proof claim.

## First committed candidate

- Draft PR: https://github.com/agent-collaboration/switchboard/pull/19
- Head: `1f6bc41c75b8d297a2bac87a3b44ff87bfbfdc0e`; clean working tree after commit/push. SSH signature is present in the commit. Git's local signature verification is unavailable because `gpg.ssh.allowedSignersFile` is not configured; no signing fallback was needed.
- Sunclaw packet remote item `01a1e750-588d-7f32-9353-85f3201d4d43` has queued custody. Requested isolated root `/tmp/2026-11-b1b-1f6bc41c`, focused V2–V8/old passkey/limit/CSP checks first, then full check/unit/integration/both host sweeps only if focused green. This is not an execution receipt. No paired-Verifier target declared yet.
- Required host/browser/full gates and verify-auth journey runs remain pending. CI not run (billing).

## Frozen target and current proof

- Full batch target `1f6bc41c75b8d297a2bac87a3b44ff87bfbfdc0e` declared to paired Verifier. Source/build will stay unchanged until its observation is reported. My earlier intent to await runtime proof before declaring the batch target was an unnecessary sequencing assumption; removed it so independent unit/source observations can start while Sunclaw runs.
- Local toolchain clarification: original focused runs used Node `26.13.1`, pnpm `10.33.0`. Repeated focused tests on the already-installed pinned Node `24.7.0`, pnpm `10.33.0`: 55 unit pass/0 fail, exit 0 (`pinned-unit.log`), 11 integration pass/0 fail, exit 0 (`pinned-integration.log`). No full sweep repeated locally.
- `pnpm exec oxlint --type-aware <the 29 changed TS/TSX files>` exits 0. Four warnings: existing handler `pathname` shadow, existing D1 post-read serial loop, existing required unassigned zod-JIT import; new serial rate-budget loop intentionally awaits each real response to identify exactly the eleventh request. No suppression added.
- PR checks display failure, but all three GitHub job annotations state: “The job was not started because recent account payments have failed or your spending limit needs to be increased.” Run `44002408795`; no job steps executed. This is CI not run, not a product test failure.

## Exhaustive switches

- `pages/islands/sign-in-pages-island.tsx`: state.kind switch at 64, `state satisfies never` at 127.
- `pages/islands/passkey-sign-in-turnstile.ts`: effect.kind switch at 41, `effect satisfies never` at 74.
- `pages/islands/passkey-sign-in-turnstile-queue.ts`: event.kind switch at 39, `event satisfies never` at 73.
- Hegel independent model: event.kind 32/89; effect.kind 121/140; generated kind 150/172. Each pair is switch/exhaustive line. Completion uses the design's explicit cardinality/response conditions and has no switch.
- Existing owner-page factor switch retains its inline `factorPage satisfies never`.

## Changed files at first candidate
.agents/skills/verify-auth/SKILL.md
.agents/skills/verify-auth/references/agent-bootstrap.md
.agents/skills/verify-auth/references/native-browser.md
packages/auth-ui/src/components/auth/passkey/passkey-button.tsx
packages/auth-ui/src/index.ts
packages/sign-in-core/package.json
packages/sign-in-core/src/better-auth/owner-page-script.ts
packages/sign-in-core/src/better-auth/owner-page-turnstile.unit.test.ts
packages/sign-in-core/src/better-auth/passkey-sign-in-completion.ts
packages/sign-in-core/src/better-auth/passkey-sign-in-completion.unit.test.ts
packages/sign-in-core/src/better-auth/provider-configuration.ts
packages/sign-in-core/src/better-auth/provider-passkey-session.unit.test.ts
packages/sign-in-core/src/better-auth/sign-in-http-handler.ts
packages/sign-in-core/src/pages/islands/passkey-sign-in-turnstile-queue.hegel.unit.test.ts
packages/sign-in-core/src/pages/islands/passkey-sign-in-turnstile-queue.ts
packages/sign-in-core/src/pages/islands/passkey-sign-in-turnstile.ts
packages/sign-in-core/src/pages/islands/passkey-sign-in-turnstile.unit.test.ts
packages/sign-in-core/src/pages/islands/sign-in-island-state.tsx
packages/sign-in-core/src/pages/islands/sign-in-pages-island.tsx
packages/sign-in-core/src/pages/owner-page-document.tsx
packages/sign-in-core/src/pages/owner-page.tsx
packages/sign-in-core/src/response-release/second-factor-public-routes.unit.test.ts
packages/sign-in-core/src/response-release/sign-in-request-handler.ts
packages/sign-in-test-support/src/people-passkey-confirmation.host.e2e.test.ts
packages/sign-in-test-support/src/people-passkey-sign-in.host.e2e.test.ts
packages/sign-in-test-support/src/people-request-limits.host.e2e.test.ts
packages/sign-in-test-support/src/test-fixtures/auth-proof-rate-limit-bindings.ts
packages/sign-in-test-support/src/test-fixtures/auth-verification-journeys.ts
packages/sign-in-test-support/src/test-fixtures/local-auth-harness.ts
packages/sign-in-test-support/src/test-fixtures/native-browser-protocol.ts
packages/sign-in-test-support/src/test-fixtures/native-browser-scenario.ts
packages/sign-in-test-support/src/test-fixtures/node-auth-proof-host.ts
packages/sign-in-test-support/src/test-fixtures/recording-d1-database.ts
pnpm-lock.yaml

Proof-scope correction: the earlier statement that additional verify-auth wrapper journey runs were a required gate was my inference from commission logistics. Packet 1 names check/unit/integration/both-host sweeps and V8's standard browser test; Verification Design explicitly says no new verify-auth journey. Those design gates remain required and pending. Existing wrapper runs are not run, with any additional named requirement left to Lead's ruling; no required design gate is removed.
