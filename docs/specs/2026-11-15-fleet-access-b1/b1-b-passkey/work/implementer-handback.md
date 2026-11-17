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

Sunclaw setup report: exact-head clone, install and build succeeded (runner-attributed, receipts pending); installed Chrome reports 157.0.8103.79. The relative Keychain exclusion was ineffective in Vitest inventory, which still listed that exact real-Keychain case. No Keychain execution occurred. Operator is retaining the original inventory mismatch and using an additional inventory-verified `**/macos-keychain-proof-key-store.host.e2e.test.ts` exclusion before full sweeps, with no other case omitted or source changed (Router push `01a1e756-ed8b-72c0-950c-8bcd1eb28234`).

Lead confirmed proof scope at `01a1e756-ff05-7102-8f71-be3d550aef73`: verify-auth wrappers are “not run (not required for B1-B; covered by the host sweeps)”. Required check/unit/integration/both-host/V8 gates and Verifier's independent V-row observations are unchanged. Host-sweep coverage remains pending, so the wrapper statement is not yet a claim that those cases passed.

## First runtime red and correction batch pending

- Ran by Sunclaw Operator, Focus A/workerd: 25 passed, 1 failed, 0 skipped, exit 1. New removed-member case stops at its `remove-member` setup (line 324): expected 200, received 401. Later passkey refusal not reached. Decisive raw assertion excerpt inspected through Router `01a1e757-d3b7-7d81-b6a5-2ed16492f05a`; raw private log `/private/tmp/2026-11-b1b-1f6bc41c-evidence/logs/07-focused-A.log`, 602678 bytes, SHA256 `0721cd75011abe6ade2f685d536ca6403d5f296c5fa7ffa3685dcd8b035da2f6`. Full sweeps held; independent focused B/C continue.
- Cause source-inspected: `createLocalAuthBrowser` has one jar; `createProofBrowserAddresses.useBrowser` changes only transport/address. The test still sends the member cookie when attempting removal. Existing `people-record-faults.host.e2e.test.ts` saves the owner cookie before member login and explicitly supplies it to `peoplePost`. Next batch will apply that fixture repair; production admission behavior is not changed.
- Paired Verifier finding accepted after opening test: overlap test awaits possibly orphaned promises, so a lost resolver mutant can only fail at runner timeout. Next batch will observe promise outcomes after microtasks and assert settlement before awaiting originals, retaining FIFO/two-token checks, also for queued failure rejection.
- Frozen source unchanged pending current paired observation handback.
- Exclusion diagnosis: Vitest 4.1.5 `resolveProjects` forwards an explicit `cliOverrides` list to inline projects; `exclude` is absent. This explains both ineffective CLI spellings. Command correction proposed: complete positive e2e-host file list from offered inventory, omit exactly authorized Keychain file, verify selected file/test set equals original minus only that file, keep original exclude flag and exact argv. No config/script edits or weakened assertions.

- Sunclaw Focus B/node: 25 pass/1 fail/0 skip, exit 1, same remove-member setup assertion. Decisive excerpt inspected at `01a1e759-dfb7-7d52-8f99-9319b3bc09ed`; log `/private/tmp/2026-11-b1b-1f6bc41c-evidence/logs/09-focused-B.log`, 686505 bytes, SHA256 `9b9c8abd4cd1f58ac89b40f7d22d13b748170883e829d63a34f83beea8434c7c`.
- Sunclaw Focus C/real Chrome both hosts: 0 pass/2 fail/0 skip, exit 1. Both reach 13 passing step entries through passkey registration, then `Network.getResponseBody: No resource with given identifier found`. Challenge, verify and owner-ready all recorded HTTP 200; later body/invitation/noUV/CLI/script-failure proof is not established. Log `/private/tmp/2026-11-b1b-1f6bc41c-evidence/logs/10-focused-C.log`, 92159 bytes, SHA256 `861bc438c6e36a12dc49368f5633c4694c473284b19af571281285495df025a9`. Both cleanupFailure null. Excerpts inspected in `01a1e75b-3da1-78b0-bbcb-b50af5b94a36` and `01a1e75d-4c8b-7c33-a7dc-3e0ffda4150a`.
- Browser cause remains unresolved: existing stack points only to protocol callback, not which scenario read. Next batch adds bounded error context to distinguish explicit verify-body read after navigation from a previous asynchronous capture rejection. No missing-body error or no-token assertion will be ignored, and no driver edit is authorized by this diagnostic step.

Sunclaw redacted original receipt extraction is now local at `switchboard.b1b-passkey-sign-in/tmp/b1b-evidence/sunclaw-focused-safe-extraction.json`, 227200 bytes, SHA256 `c9ad545dacf78cca76d12a088a684594aeaad43927703d8e26af9cdee1e92ac0`, decoded from Router `01a1e75e-e54f-7c10-88ff-62907f0f7dff` and hash-verified before opening. Inspected exact commands, clean head/tree admission, assertion/terminal count blocks, both browser step/status lists and cleanup facts. The original private raw logs remain on Sunclaw; local file contains sanitized decisive excerpts, not secret bodies, screenshots or profiles. Both browser cases record challenge200/verify200/owner-ready200, but getResponseBody failure prevents body assertions and subsequent journey proof. All three owned process groups empty and observed PIDs absent at end.

## Correction/diagnostic head

Paired Verifier returned NOT READY and released source freeze at `01a1e762-560a-7181-9b4d-94e148e79ea6`; opened its full report, accepted corrections, retained earlier failures. Head `00c67715a90ed5292ebdfe7655c853e554d0d2c5` (same draft PR19) changes only the owner-cookie fixture, immediate microtask settlement assertions in overlap/queued rejection tests, and scenario error attribution for explicit verify body versus asynchronous capture pathname/phase. Browser diagnosis remains open; this is not an independently declared new target yet.

Local Node24.7.0/pnpm10.33.0: 7 DOM unit tests pass, exit0 (`settlement-unit.log`), support package typecheck pass, exit0 (`support-typecheck-correction.log`). Two 1Password signing attempts each returned “agent returned an error; failed to write commit object”; unsigned commit fallback used per commission. No amend/no-verify/force push.

Sent Sunclaw packet `01a1e764-2cf3-7331-aabc-c02a3caf8e96`: fresh00c root, selected removed-member checks on each host and existing browser case once for error attribution; full sweeps remain held. No silent missing-body handling or weaker token assertion introduced.

Settlement-test sensitivity at00c: deliberately clearing the pending resolver map when a second token request arrives makes the overlap case fail immediately on its `kind: resolved` assertion after microtasks (no wait/timeout); selected1fail,6unselected,exit1. Restored exact source hash then same selected case1pass,6unselected,exit0. Receipts: `overwritten-resolver-red.log`, `overwritten-resolver-restored.log`, `overwritten-resolver-receipt.json` in local b1b-evidence. This is post-change sensitivity, not pre-fix red. Product source remains unchanged/clean after restoration.

## Browser read diagnosis and bounded repair

00c Sunclaw diagnostic extraction locally retained at `tmp/b1b-evidence/sunclaw-diagnostic-00c.json`,145075bytes,SHA256 `53c08c70aea21e2c3dbf06f1ff041122164cd3a38c0ee1d4fa477df4317fc8b7`; transfer hash checked before opening. Selected removed-member case1pass/0fail/12name-filter-unselected,exit0 on each host. Both-host browser0pass/2fail/0skip,exit1: **explicit verify-body read after navigation** fails, caller scenario584/583 and protocol56. This identifies the current deciding read, not just generic protocol failure. Later assertions unobserved. No group/PID leftovers in collector receipts.

Repair head `8d1a442bc6d585b8a9fb32dab86e4ddcd09bebf7`: scenario's existing Network.enable call sets durable messages and explicit16MiB total/8MiB resource buffer before any requests, preserving original body/token assertions across navigation. Primary documentation opened: https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-enable . No native driver file or product behavior changed. Support typecheck passes,exit0. Signed fallback continues for this session after the two observed1Password signing errors. Fresh Sunclaw browser-only validation requested; full gates and integrated new Verifier target still pending.

8d1 progress (not completed case proof): Node passed14steps through passkey journey including body/token/invitation assertions. Next noUV phase has challenge200 and no observed verify request. Single read-only owned Chrome snapshot at02:57:34Z: /sign-in, buttonenabled,0toasts, no relevant error notice; no cookies/keys/bodies read or actions replayed. Source snapshot/receipt remains on Sunclaw (`01a1e770-72b1-7822-81c5-84a3df93b755`).

V8 named-method mismatch sent to Lead. Pinned Chrome157 source at revision `6dc9bc3bdaea5c35ed6d41fceab2f7a3a2227c4f` fetched into local `tmp/b1b-evidence/chromium/157-*`. setUserVerified(false) controls internal UV success; failure returns OperationDenied before an assertion. Proposed response-bit override keeps successful virtual ceremony but clears UV before private-key signature (handler377/395 → virtual_authenticator.h148 → virtual_ctap2_device.cc1753/1772). This preserves valid cryptographic/server rejection proof; awaiting Lead's correction of design's explicitly named method before changing it. Source mechanism confirmed; live uncompleted request ending not yet known.
