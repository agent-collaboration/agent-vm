# B1-C Implementer handback

Status: implementation and local focused proof complete; remote integration, full gates, six exhaustiveness receipts, HTTP/browser wrong builds, CI and paired observation remain open. This is not Lead acceptance.

## Target

- Public repository: `agent-collaboration/switchboard`.
- Worktree: `/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished`.
- Branch: `b1c/organizations-finished`; base `b03d35ffeea00f79061353dce1db6231a670c62f`.
- Draft PR: https://github.com/agent-collaboration/switchboard/pull/1.
- First frozen head: `91bfdc5a3bf1632f0ffc70f22a2c34f3a9b469b5`; tree `32225ad42586237dee4fdf3eb538e430db1a2ec0`. Source held unchanged for first remote/paired observation. No merge, tag or deployment.
- Commit contains an SSH signature. Local signature verification could not run because Git's allowed-signers file is not configured; no signing configuration was changed.
- Work home: `no-home` per commission. Only Lead writes the trace; this return and Router messages carry this Implementer's material record.

## Source-backed corrections and implementation decisions

1. Lead correction `247884282`: Better Auth 1.7.11 `getSessionFromCtx` re-acquires when the stored session is null. New endpoints parse `ctx.context.session` directly; the before-hook alone acquires natively with refresh and cookie cache off. Native expired-cookie headers are forwarded.
2. Lead correction `4d23dd7d6`: there is no bot credential producer. Bearer refusal scenarios use real-produced Person, agent and Fleet CLI tokens; no fabricated bot token.
3. Lead correction `425346ced`: native expired-session deletion advances existing retained person authorization fences and queues their existing drain. The expiry fixture requires exact revision increments, exact acknowledged pushes/fields, cookie clearing and session deletion; all other rows/fields/tables remain unchanged. Live reads and held mid-read expiry retain their full no-write assertions.
4. Facts/page schemas live with the pure checked-read machine, so M2 never imports the Drizzle store. The store imports those parsed shapes. `ReadSession`'s schema lives in the portable context module so the root export's declaration graph remains free of Better Auth; the provider adapter consumes that single shape.
5. Necessary caller/export wiring beyond the named leaf files: private package import alias for the `.ts` lifecycle module (the existing pages wildcard targets `.tsx`); precise native organization-plugin return/options type so `hasPermission` retains the already-configured `organization:view`; existing shared UI exports; owner-page document island mount; served classic-script fixture selects Continue by its own form ID and runs the chooser branch only when selection was explicitly requested.
6. New read hook failures are normalized to the design's closed unavailable response at the existing response-release boundary. The existing outer page-error path remains the page's 503.
7. Chooser remains visible beside pending factor controls. Choose-specific step copy is suppressed while the existing factor task is pending, so it does not imply that switching itself requires a fresh factor. Continue protection and enrollment order remain intact.
8. Scope addition from Lead `d0607a47c`: verify-auth's body/reference and the existing journey file inventory include all four new host files, self-context, person-membership and people-list, and move chooser proof to real Chrome. The existing unknown-case refusal and source/build/host/readiness comparisons remain unchanged. No new check script or CI gate.

Native work was divided into disjoint contract/machine, storage, UI and lasting-test tasks under the Implementer's role skill. Parent inspected decisive current source, integrated the work, and retained combined proof ownership. No helper has acceptance authority.

## Local receipts inspected

Node `26.13.1`, pnpm `10.33.0`; installed Better Auth `1.7.11`, Drizzle `0.45.2`, Vitest `4.1.5`, oxfmt `0.75.0`. Local runs below are focused proof; the required pinned Node24.7.0 host/full runs belong on Sunclaw.

Raw local evidence root: `/private/tmp/2026-11-b1c-implementer/` (private temporary storage; retain until Lead/Verifier finish).

| Check | Result | Raw receipt |
| --- | --- | --- |
| `pnpm install --frozen-lockfile` | exit 0; 735 packages; expected missing prebuild workspace bins reported | original terminal result; no raw file was retained |
| `pnpm build` | exit 0; lightweight prerequisite build, explicitly allowed by Lead | `build.log` |
| final source rebuild | `pnpm build`, exit 0 | `build-final.log` |
| all changed unit files | 14 files, 99 passed, exit 0 | `changed-unit-final.log` |
| journey-inventory and architecture units | 2 files, 72 passed, exit 0 | `inventory-architecture-unit.log` |
| complete changed code/config format and type-aware lint | 65 files, both exit 0; zero errors and four baseline warnings | `changed-format.log`, `changed-lint.log` |
| portal architecture audit | exit 0 | `architecture.log` |
| route policy/inventory focused units | 2 files, 25 passed, exit 0 | `routes-unit.log` |
| reader/session/plugin focused units | 3 files, 18 passed, exit 0 | `mutations/endpoint-units.log` |
| UI/M3 focused units | 7 files, 46 passed, exit 0 | `ui-focused-unit.log` |
| fixture controls units | 1 file, 7 passed, exit 0 | `storage-fixture-unit.log` |
| real Node decorator integration | 1 file, 1 passed, exit 0; successful literal facts/page values and generated-query matcher checks | `storage-node-decorator-integration-generated-sql.log` |
| scoped core typecheck | exit 0 | `typecheck-core-final.log`, `ui-core-typecheck.log` |
| scoped support typecheck | exit 0 | `typecheck-support.log`, `expiry-proof/typecheck.log` |
| root TypeScript program | exit 0; its exclusions mean it does not replace package checks | `typecheck-root.log` |
| scoped UI lint/format | exit 0; two pre-existing warnings retained | `ui-scoped-lint.log`, `ui-scoped-format.log` |
| expiry fixture lint/format | exit 0, zero diagnostics | `expiry-proof/lint.log`, `expiry-proof/format-check.log` |

The fresh checkout's initial repository-configured focused tests stopped before discovery because the existing global setup requires built workspace artifacts. Those are setup failures, not semantic reds. Initial M1/M2 source-only temporary-config passes were superseded by normal repository-configured checks after the lightweight build. No pre-fix semantic red was observed.

## Semantic mutation receipts

All original M1/M2 source bytes were restored, and each named semantic wrong build produced assertion failures followed by a restored green. Patches and logs are in `mutations/` under the evidence root. M3 has five `m3-*-red.log` / `m3-*-restored-green.log` pairs and diagnostic event prefixes.

Verifier inspection found an M3 retention gap: original scripts ran inline, and exact patches were not saved during those runs. A new five-control collection is commissioned in a separate private clone at exact `91bfdc5`, retaining each patch before its run. It must be reported as new collection, never as historical patch recovery. The primary observed worktree remains unchanged.

The new collection completed under `/private/tmp/2026-11-b1c-implementer/m3-retention-new/`; five exact pre-run patches, metadata, red/green logs and hashes are retained, and the paired Verifier inspected all 28 artifact hashes and controls. Each red had 2 failures (exit 1); each restoration 2 passes (exit 0). Separately, `component-projection/retain-prior-success-after-refusal.patch` makes the React projection retain a prior successful answer; the existing unchanged component test failed with expected `Lookup refused.` / received `Member · Owner` (1 failure, 6 filtered, exit 1), then restored green (1 pass, 6 filtered, exit 0). That latter proof belongs to the React projection, not pure-M3 Hegel.

The paired Verifier inspected the component patch, both complete logs and all five artifact/source/test hashes, supporting that S9 control. Lead correction `bac2235a2`, reopened at Verification Design line 194, assigns rendered old-answer retention to this component control and pure closed-state/no-payload invariants to Hegel. The paired Verifier closed that layer disposition; six exhaustiveness and real host proof remain open.

- M1: inclusive expiry; sticky expiry; clock incorrectly changes an accepted state.
- M2: early answer; first invitation only; second-check failure ignored; expired list invitation retained; inclusive next-page boundary; wrong-kind facts accepted.
- M3: generation check removed; navigation refused while pending; duplicate submit allowed; refused state carries answer payload; settlement after disposal.

Actual Hegel shrinks can be smaller than the design's narrative predictions. Accepted-state clock failure shrank to a clock move before expiry, still violating the invariant that clocks never change a nonpending status. Wrong-kind facts shrank to lookup receiving list facts (the opposite direction). M3 stale/disposed traces also shrink earlier. Refusal-payload sensitivity proves the no-payload invariant; component cases separately prove clearing a prior successful result. These are sensitivity runs after implementation, not pre-fix reds. The extra fixture-specific `m1-expire-accepted-after-expiry` mutation is retained for honesty and excluded from proof.

Six state/event exhaustiveness typecheck failures remain NOT RUN. HTTP/browser wrong-build sensitivity remains NOT RUN. Both are required before a complete handback.

## Open proof and risks

- Run the declared frozen public head on Sunclaw: check/full unit/integration/Python gates; every host file on workerd and Node; real Chrome; verify-auth people twice and agent on its supported target; six exhaustiveness mutations and the named architecture/HTTP/browser wrong builds.
- Sunclaw preflight checked public repository access, pinned Node24.7.0/pnpm10.33.0, Chrome157 and capacity. Phase A packet `01a1e95b-1565-7293-b750-d76dbe35a183` was admitted at a free serial slot: public-only fresh root `/tmp/2026-11-b1c-91bfdc5`, exact head/tree, install/build plus explicit existing Worker/Node/storage manifests, 34 selected dual-storage cases, then 55 new HTTP/Chrome cases per sign-in host. It stops and returns the first setup or semantic failure. Full sweeps and further mutations are not yet admitted.
- Remote setup: install, Python sync and build were reported exit 0. The one-off preparation finished all three awaited builders/manifest writes but its process did not exit naturally, with owned esbuild children still present. This is a packet-apparatus lifecycle problem, not product proof. Disposition `01a1e962-cf1f-7682-be83-58eee565f344` permits only verified-owned-group cleanup, preserves the interrupted result, and requires a separate built-in Node manifest/file-hash/source comparison before the original smoke resumes; no builder retry or weakened runtime identity checks. Cause remains unconfirmed. Raw transfer/inspection is pending.
- GitHub Validation passed at `91bfdc5`; the E2E host job was still pending at the last blocking-watch output. Neither replaces Sunclaw's missing observations.
- Remote early runtime results, not yet raw-transfer inspected: 34 dual-storage cases passed and the emitted three-module map matched. Workerd smoke has reported four failures in self-context/expiry and bearer scenarios; the chooser remained pending. An authorized one-time read-only attach at the exact owned Chrome showed `/sign-in`, title `Sign-in`, readyState `complete`, zero chooser controls/mounted islands. Source confirms the browser fixture incorrectly waits for a chooser immediately after the CLI's `/sign-in` entry. This is a fixture-entry defect, not evidence that a rendered chooser failed. Current invocation retains its natural runner deadline; Node and later gates are held. Raw HTTP failures and complete smoke outcome remain pending; no repair has changed the frozen source.
- Browser source diagnosis confirms the bounded fixture repair: preserve the original CLI entry's origin/query, assert its `/sign-in` path, and enter `/owner-ready` using the native session already arranged. The nested original continuation/state/PKCE/loopback parameters remain intact; the fixture never navigates to the saved native authorization URL. This is signed-in fixture entry, not a claim about real sign-in-page navigation. The delivered chooser and Continue path remain under test. Repair is proposed but not applied while the first batch owns the frozen source.
- No deployment, staging, real provider, physical authenticator, BG account-page/sole-cleared-membership case, or release sign-in is claimed. List pagination remains a snapshot; removals after the second permission check are outside the promise.
- Worst merge risk: leaking a roster/subject across an organization boundary or releasing a candidate after stale authorization. Pure/unit proof does not close that risk; held real reads, both hosts, Chrome and paired observation remain required.
- Skill-rule engine: not run; the public repository names no sunstack lint configuration. Structural recipe/inventory proof and the Verifier's independent check remain required; no fresh-agent behavior improvement claim is made for the documentation edit.

Next: inspect Sunclaw/CI failures or receipts at the frozen head, then complete bounded repairs and required full/negative-control gates until paired observation closes. The PR remains draft.


## Changed files at first frozen head

67 files, 6438 additions and 204 deletions.

```text
.agents/skills/verify-auth/SKILL.md
.agents/skills/verify-auth/references/agent-bootstrap.md
packages/sign-in-core/package.json
packages/sign-in-core/src/better-auth/organization-admin-page.ts
packages/sign-in-core/src/better-auth/organization-admin-page.unit.test.ts
packages/sign-in-core/src/better-auth/organization-membership-read-plugin.ts
packages/sign-in-core/src/better-auth/organization-membership-read-plugin.unit.test.ts
packages/sign-in-core/src/better-auth/organization-provider-options.ts
packages/sign-in-core/src/better-auth/organization-read-session.ts
packages/sign-in-core/src/better-auth/organization-read-session.unit.test.ts
packages/sign-in-core/src/better-auth/organization-route-inventory.unit.test.ts
packages/sign-in-core/src/better-auth/owner-page-script.ts
packages/sign-in-core/src/better-auth/provider-configuration.ts
packages/sign-in-core/src/better-auth/served-page-appearance.unit.test.ts
packages/sign-in-core/src/better-auth/sign-in-http-handler.ts
packages/sign-in-core/src/contracts/organization-membership.ts
packages/sign-in-core/src/index.ts
packages/sign-in-core/src/organizations/checked-read-transitions.ts
packages/sign-in-core/src/organizations/invitation-view.ts
packages/sign-in-core/src/organizations/person-organization-context.ts
packages/sign-in-core/src/organizations/person-organization-context.unit.test.ts
packages/sign-in-core/src/pages/islands/organization-people.tsx
packages/sign-in-core/src/pages/islands/organization-people.unit.test.ts
packages/sign-in-core/src/pages/islands/person-organization-choice.tsx
packages/sign-in-core/src/pages/islands/person-organization-choice.unit.test.ts
packages/sign-in-core/src/pages/islands/request-lifecycle-transitions.ts
packages/sign-in-core/src/pages/islands/request-lifecycle-transitions.unit.test.ts
packages/sign-in-core/src/pages/islands/sign-in-island-state.tsx
packages/sign-in-core/src/pages/islands/sign-in-pages-island.tsx
packages/sign-in-core/src/pages/organization-people-page.tsx
packages/sign-in-core/src/pages/owner-page-document.tsx
packages/sign-in-core/src/pages/owner-page.tsx
packages/sign-in-core/src/pages/person-organization-choice.tsx
packages/sign-in-core/src/response-release/organization-public-routes.unit.test.ts
packages/sign-in-core/src/response-release/organization-request-errors.ts
packages/sign-in-core/src/response-release/sign-in-request-handler.ts
packages/sign-in-core/src/storage/models/person-session-records.ts
packages/sign-in-core/src/storage/organization-membership-store.ts
packages/sign-in-test-support/src/core-tests/checked-read-transitions.hegel.unit.test.ts
packages/sign-in-test-support/src/core-tests/invitation-view.hegel.unit.test.ts
packages/sign-in-test-support/src/core-tests/request-lifecycle-transitions.hegel.unit.test.ts
packages/sign-in-test-support/src/node-proof-store.integration.test.ts
packages/sign-in-test-support/src/people-membership-lookup.host.e2e.test.ts
packages/sign-in-test-support/src/people-organization-browser.host.e2e.test.ts
packages/sign-in-test-support/src/people-organization-context.host.e2e.test.ts
packages/sign-in-test-support/src/people-organization-list.host.e2e.test.ts
packages/sign-in-test-support/src/people-owner-page.host.e2e.test.ts
packages/sign-in-test-support/src/storage-cases/organization-membership-read-cases.ts
packages/sign-in-test-support/src/storage-cases/storage-case-registry.ts
packages/sign-in-test-support/src/test-fixtures/auth-proof-application.ts
packages/sign-in-test-support/src/test-fixtures/auth-verification-journeys.ts
packages/sign-in-test-support/src/test-fixtures/database-fault-identity.ts
packages/sign-in-test-support/src/test-fixtures/database-proof-holds.ts
packages/sign-in-test-support/src/test-fixtures/expired-session-cleanup-proof.ts
packages/sign-in-test-support/src/test-fixtures/node-auth-proof-host.ts
packages/sign-in-test-support/src/test-fixtures/node-proof-store.ts
packages/sign-in-test-support/src/test-fixtures/organization-browser-chooser.ts
packages/sign-in-test-support/src/test-fixtures/organization-browser-people.ts
packages/sign-in-test-support/src/test-fixtures/organization-browser-scenario.ts
packages/sign-in-test-support/src/test-fixtures/organization-browser-transport.ts
packages/sign-in-test-support/src/test-fixtures/organization-read-bearer-scenario.ts
packages/sign-in-test-support/src/test-fixtures/organization-read-proof.ts
packages/sign-in-test-support/src/test-fixtures/organization-read-proof.unit.test.ts
packages/sign-in-test-support/src/test-fixtures/organization-read-scenario.ts
packages/sign-in-test-support/src/test-fixtures/recording-d1-database.ts
packages/sign-in-test-support/src/test-fixtures/served-owner-browser.ts
packages/tool-access-ui/src/server.ts
```


## First remote batch, raw receipt inspected

Target remains the immutable first head `91bfdc5`. Complete transferred safe JSON is `/private/tmp/2026-11-b1c-implementer/phase-a-safe-report.json`, 993120 bytes, SHA256 `a181de2edddc753c44851eeffccc6fbeb344a912ee056f0225c1aba0dafa10af`. All part/base64/gzip/whole hashes checked. PNG `/private/tmp/2026-11-b1c-implementer/phase-a-people-dark-400.png`, 38683 bytes, SHA256 `560cad075106092154e4919647d835e6b710ba795c186cda69de6ec93e74abfb`, actually 400 by 844; parent viewed the full synthetic-only image. It is an intermediate capture from a failed People journey, not browser acceptance.

Parent and paired Verifier matched all 278 source input hashes against immutable first-head Git objects. Retained remote before/after records agree on 103 built artifacts, 16 prepared references and three manifests. All 55 Worker identities match; zero Node runtime receipts. Exact offered/executed multiplicities and the emitted storage map match. Storage: 34 selected passes (17 each D1 and SQLite), 149 unrelated name-filter skips, exit 0. Workerd HTTP/Chrome: 49 passed, six failed, zero skipped, natural exit 1. Node and all broader gates remain NOT RUN.

Actual six failures, preserving original assertions:

1. First signed-out snapshot changed only `oauthResource` from zero to the two configured resources. Opened native oauthProvider init seeds these rows. Fixture now warms public JWKS and asserts exact configured resources plus empty membership/session tables before taking the unchanged-read snapshot.
2. Expired self-context returned 200 where 401 was required.
3. Expired lookup returned the refusal but failed the cleared-cookie predicate.
4. Expired list likewise failed the cleared-cookie predicate. Complete cookie headers were not retained; do not infer the exact header contents from that predicate failure.
5. Chooser hit the existing 900000 ms deadline, with the one-time safe CDP snapshot showing `/sign-in` and no chooser. Fixture now enters signed-in `/owner-ready` with the original CLI query intact.
6. People browser's final native login hit `People provider callback refused`. Source shows the seeded member had no provider account while implicit linking is disabled. Fixture now uses native invite/sign-in/accept for that one member, then 99 seeded members, preserving the 101-member page-100 scenario and unchanged read snapshots.

Earlier shorthand calling the lookup/list failures bearer-scenario failures was inaccurate; their real bearer cases passed. The failures are the pre-first-check expiry cases.

Native expiry cause is unresolved. A source-confirmed constructor-versus-Date.now split would explain the observed pattern, but the clock mock is intended to drive both together. Direct diagnostic clock reads in ordinary test wrappers made the architecture gate fail; that failed receipt is retained as `correction-architecture.log`. All such instrumentation was removed from the product branch, the gate re-passed (`correction-architecture-restored.log`), and its exact patch is retained privately as `expiry-diagnostic-overlay.patch` (2902 bytes, SHA256 `86f2db7ad28da6fb1bec56b5eb7ab656d1ab6a02fb2ca26f7b7629c54806eb3a`). The queued diagnosis packet `01a1e987-0ca7-7cd1-b13d-95e0068d18f7` uses a separate exact-first-head clone plus only that three-file test-wrapper overlay, unchanged permanent expiry test, and production module bytes required to match the original manifest. This diagnostic overlay deliberately cannot count as a required gate or feature proof. No original source/evidence mutation, checker exception, runtime timeout change, test weakening or product repair is authorized by that packet.

Original one-off preparation was interrupted after completed manifest writes; recorded exit remains null/SIGTERM. The operator's invalid cross-clock artifact comparison and corrected verification are both retained. The failing smoke wrapper exited naturally; its immediate cleanup failed. A later rejected guard sent no signal (the premature short message was corrected), followed by one verified-owned orphan-group SIGTERM; later group and all 268 sampled PID readbacks were absent. Original failed cleanup stays failed.

The first-head GitHub Validation job passed quality, unit, integration and Python steps. Its E2E host step remained in progress for nearly an hour; parent submitted cancellation for superseded run `44077883222` rather than count or spend indefinitely on that obsolete head. Keep its host gate cancelled/unverified, not passed. The next declared source still needs its own CI gates. No repository CI configuration changed.

Current three fixture repairs and explicit stored-expiry readbacks pass changed-file formatting and type-aware lint. The final support typecheck caught that the target's central audience is optional; the readiness fixture now explicitly refuses a missing audience rather than sorting an undefined value. Failed receipt `correction-typecheck-final.log` is retained; corrected support typecheck and type-aware lint passed, exit 0 (`correction-typecheck-restored.log`, `correction-lint-restored.log`). Corrected runtime remains unrun. Temporary clock-reading instrumentation was removed completely from the branch; only the separately declared diagnostic overlay carries it.

Fixture correction head `8b50ec6fda9fc3258b71d034d51bfd8cf3b97863`, tree `adef7ade286d74183283fbed1dc2ad59bafd7258`, committed and pushed to the draft PR. Four files changed, 113 additions and 22 deletions. Two 1Password signing attempts failed with `agent returned an error`; the commissioned unsigned fallback succeeded without skipping hooks. This head is not a passing runtime target yet. The queued clock diagnostic remains exact `91bfdc5` plus its explicit wrapper overlay, not silently retargeted.

Paired Verifier reopened the complete four-file `91→8b` diff, current head/tree/clean status and exact readiness/native-account/CLI-continuation obligations, reporting no source finding. It explicitly left corrected runtime unknown. Sunclaw admitted the isolated expiry diagnosis after its prior serial handback finished; no broader run is admitted by that fact. Current-head GitHub CI started in run `44086466917`, with Validation and E2E host pending at the initial blocking-watch result.

Checkpoint: current-head Validation subsequently passed (4m16s); E2E host remains pending. Sunclaw verified the exact diagnostic overlay and owned dependency/dist/generated reuse, keeping writable caches in the new root; it is preparing the new manifest and will return through the existing Router reply path. That session-delivered reply path remains active. Source stays clean at `8b50ec6`; no owner action is requested. Required work still open: diagnose/repair expiry without weakening assertions, corrected both-host smoke/Chrome, full sweeps/journeys, six exhaustiveness failures, remaining architecture/HTTP/browser controls, CI host/check, paired completed observation and final handback.

Diagnostic first artifact comparison stopped before the test: rebundling in the isolated clone produced different production/signing/gateway bytes despite unchanged retained source/dist. No numeric clock events were observed and no cause claimed. The failed comparison remains retained. Disposition `01a1e994-2098-7893-aa49-d19627e38f80` requires a separate corrected manifest that uses the original Phase A immutable bytes/paths/hashes for every unchanged module (production Auth/Gateway, gateway proof, signing observer, clock, startup), and only new auth proof wrapper bytes/configuration-source identity for the declared overlay. All old source/dist and every file reference must compare exactly before the one unchanged diagnostic test is admitted. No diff normalization, original artifact edit, or new product build is allowed. This is apparatus recovery, not a proof-gate waiver.

Sunclaw's corrected composition subsequently passed those exact comparisons; retained literal first-difference contexts show source-path annotations from the isolated dependency links. Old 278 source inputs and 253 dist/generated files remain unchanged. The one unchanged diagnostic case is running; no result is inferred from its admission. Six exact exhaustiveness patches were prepared privately in `exhaustiveness-plan/controls.json`, source unchanged; all six remain PLANNED_NOT_RUN.

Diagnosis 1 completed naturally: one selected failure, zero passes and six name-filter skips, exit 1/signal null; owned group/PIDs absent. Safe numeric events at set-time and immediately before/after the expired self request all agree: scalar, Date.now and new Date are `1893456001001`; explicit Date construction also agrees. Response remains 200 and the safe clearing-cookie flag is false. This refutes clock divergence at those sampled points; it is not a diagnosis of the native returned expiry value. No product change follows from it. A second diagnostic overlay is being prepared to retain only numeric session SELECT cells and explicit fixture expiry readbacks, never tokens, IDs, parameters or JSON payload strings. It will require a separate exact packet before execution.

Diagnosis 1 complete transfer is locally decoded/hash-checked at `/private/tmp/2026-11-b1c-implementer/clock-diagnosis-safe-report.json` (745662 bytes; SHA256 `56a6ab92bc3b75d2e6337fbe334ac6d497c0db73e432117354c44bc967e43411`), with original transfer/index and later cleanup supplement retained in `clock-diagnosis-transferred-parts.json`. Parent opened the actual events, seven assertion rows, failed comparison and corrected frozen-module references. Paired Verifier was sent the accessible originals.

Second diagnostic exact combined patch is `expiry-diagnostic2-combined.patch`, 7573 bytes, SHA256 `d96139e94504c69d555945c3276f8305aa183be0d73b6760fb04a42c1e44f274`, read and `git apply --check` verified on the private 91 clone. Packet `01a1e99e-9001-7fb1-9dab-df9f3b4a944b` uses a fresh 91 clone plus five declared diagnostic-only files and original immutable production modules. It adds finite numeric session driver cells and stored-expiry readbacks, keeping all original assertions and returns. Sunclaw has queued it behind previously admitted B1-B work; it has not started. No primary changes or broader runtime are authorized by this queued packet.

The six exact pure-machine exhaustiveness controls are now separately queued after the second diagnostic and earlier serial work, packet `01a1e9a3-ae3d-7222-ad72-dc18290f2576`. It requires a clean 8b baseline `pnpm typecheck`, each single-literal patch retained before execution, an own-machine inline-never failure, exact restoration and the same wrapper green. It runs in an isolated private source copy, no host/browser/product build, and closes no runtime obligation. These six remain NOT RUN until actual receipts arrive. Paired Verifier confirmed diagnosis 1's source/artifact/event limits and gave it no feature-gate credit.

Sunclaw admitted diagnostic 2 after the prior serial handback, verified the exact 7573-byte combined patch on a fresh original-91 source copy, and is preparing its retained composition. No diagnostic 2 outcome is available yet. Parent source remains clean 8b. A source-only check of the permanent machine families reconfirmed frozen inputs, independent reference tables, state/event censuses and deterministic 1000-case settings; no unchanged passing suite was rerun.
