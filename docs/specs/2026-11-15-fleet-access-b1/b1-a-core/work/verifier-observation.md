# B1-A verification observation

Status: **observation complete; V1–V11 supported within the adopted local proof scope** at delivery head `e2a91f5502944e456c3920ce3ab951b29d8742a9`. Runtime observations retain their actual executed revision, `27d393240b5c31bd1cf7da522de300c0522dd222`. The complete intervening diff changes only the architecture scanner/tests and one verification-recipe paragraph. All product, runtime, fixture, client, browser-driver, package and lockfile inputs are unchanged. F1–F4, F6 and the follow-up F7 are closed. F5 remains the named pre-existing outer-CLI apparatus defect under the Lead's explicit disposition. This is verification, not delivery acceptance, merge, CI or hosted-provider approval.

## Authority and record

- 🔬 Verifier: Router service `0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89`, endpoint `codex-local`, session `01a1e108-8877-7e32-8ce8-889bc694377c`.
- Governing sources: [commission](commission.md), Packet 2 in [plan](../plan.html), Specification S1–S12, Program Design, Verification Design V1–V11, and owner decisions. The six input hashes in [design-inputs.sha256](evidence/design-inputs.sha256) were checked. The commission supplies execution/write authority; design supplies the expected outcomes.
- Duty is delivery observation, including the offered-test check and prescribed wrong-build controls. Product code and permanent product tests were never repaired by this Verifier. Deliberate faults stayed in owned scratch, and each was restored with a green receipt.
- No board home (`no-home`), explicitly resolved by the commission. The Lead alone owns its session-log trace; this return and Router reports are the Verifier's record.
- Heavy whole-suite, host, browser and CLI work ran through the explicitly commissioned Sunclaw Operator, not SSH. This Verifier inspected the transferred literal reports, comparisons and failure assertions. Original private logs stay on Sunclaw; receipt metadata is not a claim to have read every original byte.
- The only host e2e run on the owner's Mac was the explicitly authorized single Keychain test. Targeted unit/integration and static checks also ran locally.

## Targets and reuse

- Base: `f3b2b88b74225359970b0580a290cd34fe1e557b`.
- Initial local target: `574c1d98abc78d73fd4143fc1588822d425ffd37`. Its isolated copy, install/build, relevant tests and controls were inspected. Reads that initially overlapped checkout were discarded and repeated after checkout completed.
- Runtime target: `27d393240b5c31bd1cf7da522de300c0522dd222`, tree `ba93f1eca6a80f847f5a90da0b82151481ff4b1d`. Own clean frozen worktree, pinned install/build exit 0. Remote source/lockfile/host admission match this target. The earlier local nonce, canonical, required-type, proof and Keychain dependencies were compared and unchanged; their evidence is reused explicitly.
- `7a313fc4775450761798c38bf7133c15dee5501a` changes only the stale recipe paragraph (F4).
- `81e150f14b5b544538e0ec72da912d7759f30baa` changes only scanner/tests (F6). Own focused tests: 75 passed, exit 0. The initial attempt stopped before running tests because the new copy lacked build artifacts; full build then exited 0 and the focused run passed. That setup failure is retained, not counted as a product red.
- Final declared head: `e2a91f5502944e456c3920ce3ab951b29d8742a9` (Implementer declaration `01a1e446-d665-7331-8fae-d29b451626bf`). Only scanner/tests change after `81e150f1`. The own clean frozen worktree was advanced to that exact commit; final source and complete diff were inspected. Directory now `tmp/2026-11-15-b1-a-verifier/candidate-e2a91f55/`; earlier logs accurately retain its former directory name.
- [Final source admission and full intervening diff](evidence/local-e2a91f55/source-admission.json) establish reuse for the runtime proof. Observations are not relabelled as runs at the final head. The final whole-suite/check results reported by the Implementer (2642 tests, 12 check groups) are not counted as independently inspected runs here; this Verifier's final-head execution is the focused scanner proof below.

## Per-row conclusions

| Row | Outcome | Deciding evidence and wrong behavior caught |
| --- | --- | --- |
| V1 / S1 | **Supported** | Fixed-byte nonce equals CSP and every script nonce; one draw per rendered page, zero draws for JSON/redirect/pass-through. Eager-mint mutant: 2 failures/3 passes, restored 5 passes, exits 1 then 0. Unchanged nonce/handler/test inputs reused. |
| V2 / S1–S2 | **Supported** | Recording integration 5 passes; actual Node self-call, Better Auth PKCE and controlled central forwarding pass with exact crypto inputs, operations, IDs and offset-clock proof. Local page/proof/statement/canonical global bypasses and remote forwarding/proof/intent bypasses each fail at the intended assertion and restore green. Process-clock bypass gives proof iat exactly 30 seconds wrong; restored passes. |
| V3 / S5 | **Supported** | Existing digest/thumbprint/DPoP known answers and CSP assertions pass. Uppercase digest mutant gives 2 intended failures, restored 5 passes, exits 1 then 0. Their dependencies are unchanged at delivery head. |
| V4 / S3,S6 | **Supported** | Final scanner 79/79 passes; core .ts and .tsx Node-import rejection checked, including the corrected .tsx case. Allowed cases remain admitted. Identical final scanner copied into base produces the exact adopted base findings. Removing builder crypto or making platform.crypto optional yields intended typecheck diagnostics, exit 2, then restored exit 0. Required type/call boundaries unchanged. |
| V5 / S4,S5 | **Supported under F5 ruling** | Actual two-host Chrome, relay and CLI baselines pass; both organization journey selected sets match literal passed rows: 98 workerd, 97 Node, runtime-child exits 0. Target/artifact/readiness/storage and Node invocations checked. Outer-CLI non-exit is separately retained below. |
| V6 / S7 | **Supported** | Final 79-case scanner, clean candidate scan, exact base scan, qualified/literal global performance and timer probes, and allowed local-object cases pass. Restored real timer yields one intended finding, then restored scan exit 0. Four real-Chrome observations use event-only waits; fence cases pass on their selected host. |
| V7 / S8 | **Supported** | Exhaustive ordered model inspected; 10,000 generated cases and coverage assertion pass. Other-client refresh, skipped introspection and skipped refusal-cleanup mutants each yield one intended Hegel failure with a reduced draw case, then one restored pass. Current model/code dependencies unchanged. |
| V8 / S9 | **Supported under F5 ruling** | Six-case limiter baselines on both hosts; people journeys each select/pass 104 with child exit 0. All 54 workerd receipts use the real binding, zero stand-ins; one deliberate binding rejection. Node has 54 fixed-window receipts, one deliberate counter throw. Each records outer 7/provider 9 limits and one unavailable observation. Binding bypass and removed address key fail, then restore 6/6 green. |
| V9 / S10 | **Supported** | Both databases pass people inventory before removal and at end, eight nonempty tables/all-text UUID inventory and secret non-UUID checks; existing owner/agent inventory and derived-key/replay rows also pass. Planted v4 in organization.metadata fails before removal on both hosts; UUIDv7 backup-code substitution fails the returned-code predicate on both hosts; each restores 1/1 green. |
| V10 / S11 | **Supported under F5 ruling** | Local-workerd agent journey selects/passes 45, child exit 0. Opened decisive source and literal passing rows: real registration/token/JWKS and allowed tool effect; deliberately linked/scoped Person code client gets invalid_target, no credential and no tool effect. Node agent path remains outside this row's required target. |
| V11 / S12 | **Supported** | Final scanner rejects prescribed non-v7 and literal UUID cases; base exposes the adopted three UUID occurrences. Reintroduced randomUUID fails then restores green. Authorized Mac Keychain test passes 1/1, exit 0, with deletion/readback-null and final namespace-specific cleanup. Keychain/store/builder/test inputs unchanged since its observed head. |

No scoped row remains unsupported or unknown. Interactions outside those adopted local outcomes remain unverified as named below.

## Commands, counts and exits

All commands use pinned `mise exec node@24.7.0 pnpm@10.33.0 --` unless noted. Exact literal commands, reporter/output arguments and environment are retained in linked JSON/logs.

| Boundary / actual revision | Command | Result |
| --- | --- | --- |
| Local focused unit / 574c1d98 | [exact first selection](evidence/local-574c1d98/unit-baseline.log) and [exact retained selection](evidence/local-574c1d98/retained-unit-baseline.log) | 9 discovered files/165 passes (one supplied claims path did not exist), then corrected retained claims/limiter selection 2 files/9 passes; exits 0 |
| Local recording integration / 574c1d98 | `pnpm test:integration packages/sign-in-test-support/src/host-crypto-recording.integration.test.ts` | 5 passed, exit 0 |
| Local changed audit/Hegel / 27d39324 | focused unit selection in retained log | 68 passed, exit 0 |
| Sunclaw static / 27d39324 | `pnpm check` | 12/12 groups, exit 0 |
| Sunclaw unit / 27d39324 | `pnpm test:unit` plus retained reporters | 240 files/2630 passed, 0 failed/skipped, exit 0 |
| Sunclaw integration / 27d39324 | `pnpm test:integration` plus retained reporters | 62 files/314 passed, 0 failed/skipped, exit 0 |
| Sunclaw host default / 27d39324 | `unset SIGN_IN_TEST_HOST`; `pnpm test:e2e:host --exclude '**/macos-keychain-proof-key-store.host.e2e.test.ts'` plus retained reporters | 476 passed/0 failed/19 skipped; 79 passed files/3 skipped files; exit 0 |
| Sunclaw host Node / 27d39324 | `SIGN_IN_TEST_HOST=node pnpm test:e2e:host --exclude '**/macos-keychain-proof-key-store.host.e2e.test.ts'` plus retained reporters | 475 passed/0 failed/20 skipped; 80 passed files/2 skipped files; exit 0 |
| Owner Mac Keychain / 574c1d98 | `pnpm test:e2e:host packages/sign-in-owner-cli/src/fleet/macos-keychain-proof-key-store.host.e2e.test.ts --reporter=default --reporter=json --outputFile=../keychain-authorized-host.json` | 1 passed/0 failed/skipped, exit 0; cleanup checked |
| Final scanner unit / e2a91f55 | `pnpm exec vitest run --project unit scripts/audit-portal-architecture.unit.test.ts` | 79 passed/0 failed, exit 0 |
| Final scanner / e2a91f55 | `pnpm test:portal-architecture` | clean, exit 0 |
| Final scanner copied into base f3b2b88b | `pnpm test:portal-architecture` | intended 26 findings, exit 1 |

The default-host 19 skips are sixteen separately gated B2e real-central joint cases, two gated launcher cases, and the Node-only forwarding recorder. The Node-host 20 are eighteen B2e cases plus the workerd-only deploy-backfill and no-scheduled-handler callers, both passed on workerd. The Keychain file is a separate exclusion, not one of the skips. Neither remote host command is called an unmodified no-skip full lane. Completed process groups were empty and sampled PIDs absent; one-second bounded sampling is not an exhaustive process-birth ledger.

The first sandboxed Keychain attempt failed at write/readback (1 failed, exit 1), with finally cleanup completing. The same already-authorized single test then passed with host access, including real deletion/readback and final cleanup. No item remains by those checks. It was not repeated during this resume because its inputs are unchanged.

## Journey observations and F5

Lead ruling `01a1e18e-9b52-78b1-8fcf-b3741d6769c9`, reauthorized in resume `01a1e441-f2a1-75a1-a686-bb2ebeec8119`: for V5/V8/V10, each journey's own matched counts and runtime-child exit decide. Retain the pre-existing outer-CLI non-exit as apparatus defect, neither pass nor fail; driver repair is separate after B1-A. No forced success exit, patch or signal escalation was used.

Each actual command is `unset SIGN_IN_TEST_HOST` followed by `mise exec node@24.7.0 pnpm@10.33.0 -- pnpm exec tsx scripts/verify-auth/verify-auth.ts <journey> --target-file <that run's exact retained target.json>`. Node/workerd selection comes from the compared target, not an inferred inherited variable. Target-file paths and complete command text are in the retained receipts.

| Journey / target | Passed / failed / selected | Offered / unselected / reporter-skipped | Ready receipts | Runtime exit |
| --- | --- | --- | --- | --- |
| organization / local-workerd | 98 / 0 / 98 | 394 / 296 / 93 | 20, real binding | 0 |
| organization / local-node | 97 / 0 / 97 | 393 / 296 / 94 | 19, Node counter | 0 |
| people / local-workerd | 104 / 0 / 104 | 394 / 290 / 103 | 54, real binding | 0 |
| people / local-node | 104 / 0 / 104 | 393 / 289 / 103 | 54, Node counter | 0 |
| agent / local-workerd | 45 / 0 / 45 | 394 / 349 / 3 | 45, real binding | 0 |

Reporter skips are unselected cases inside offered files; they are not selected-case passes. For the four fresh invocations, selected file/name sets exactly equal literal passed ancestor/title sets, with no collisions, zero selected failures and no selected omissions. Original organization/workerd names differ only in the reporter's ancestor separator; the inspected matcher joins ancestors with ` > `, and the normalized sets of 98 agree.

The complete four-journey transfer is 4,417,077 bytes, SHA-256 `78b9b5980dec1dedeaa686b8c8930222483f5cf997e83478edd7337c781de650`; all ten transport chunks and aggregate encoding/gzip hashes were checked. [Redacted transfer](evidence/remote-f5-journeys-redacted.json) removes 172 fixture credential-cache path fields; original retained privately in scratch. [Independent inspection](evidence/remote-f5-inspection.json) binds each source/lockfile/host/toolchain, selected set, child exit/cleanup, readiness, bundle identity and actual module maps. All 46 artifact rehash entries agree. Node organization 279 and people 928 invocation pairs independently match all seven supplied fields, with unique IDs and zero mismatches/unexpected entries. Query strings and headers are outside that identity. Organization Node 19 and workerd 20 export metadata records match harness IDs; full signed bodies/raw rows remain private, not claimed as transferred. Storage component module maps also agree.

F5 cause/disposition: Implementer reported the same base-head non-exit and traced a ref'd React browser-server MessageChannel through the verify-auth import chain. This Verifier opened the diagnostic excerpts and installed React channel creation; the removed diagnostic base worktree prevented independent base-head runtime reproduction. The pre-existing classification is the Lead's sourced disposition, not a new independent base run.

Actual lifecycle is preserved: help printed usage, outer exit null/signal SIGTERM after revalidating its four PIDs; later group/PIDs absent. Original organization/workerd produced child exit 0 but its outer process/exit receipt was lost; that outer-exit gap remains unknown, with later bounded-cleanup absence retained. Each of the four fresh idle outer groups received one authorized SIGTERM after exact identity/start/args/cwd validation. Their outer exits are null/signal SIGTERM (wrapper exit 1 where recorded); immediate dying entries and later absence are both kept. Wrapper `noSignalsSent:true` describes the wrapper only, not the Operator's disclosed signal. No outer command is claimed to have exited 0.

## Runtime sensitivity

[Collected literal reports and patches](evidence/remote-sensitivity-final.json), SHA-256 `e144fa7131190cda764efb37fdc2850a4a261578d342207947ec8890ddd4d208`, and [independent source/patch/restoration inspection](evidence/remote-sensitivity-inspection.json) cover eight controls, ten red host runs and ten restored green host runs. Each original source hash matches the own frozen 27d39324 copy; applying each literal patch in memory reproduces the mutant hash. All seven rebuilt package JS sets (31 entries) restore identically; the v4 fixture control changes only its test and needs no package rebuild. Baselines reused from a prior focused restored green are explicitly linked, not invented runs.

| Control | Intended deciding red | Restored |
| --- | --- | --- |
| A, forwarding global random | missing recorded 32-byte draw; 1 failure, exit 1 | 1 pass, exit 0 |
| B, proof global crypto | missing generate-key record; 1 failure, exit 1 | 1 pass, exit 0 |
| C, intent global digest | missing exact intent input digest; 1 failure, exit 1 | 1 pass, exit 0 |
| H, proof uses process clock | actual iat 1893456000 versus 1893455970; 1 failure, exit 1 | 1 pass, exit 0 |
| D, bypass outer binding | 200 instead of 503, missing outer observation and service page never limits; 3 failures/3 passes, exit 1 | 6 passes, exit 0 |
| E, omit address key | second address gets 429 instead of 200; 2 failures/4 passes, exit 1 | 6 passes, exit 0 |
| F, planted v4 organization metadata | inventory names table/column/version 4; 1 failure per host, exit 1 | 1 pass per host, exit 0 |
| G, v7 recovery codes | returned-code UUID predicate true instead of false, after both inventories/secret assertions pass; 1 failure per host, exit 1 | 1 pass per host, exit 0 |

Only assertions reached before each deciding failure are credited. In particular B's red does not independently reach later export/sign assertions. These are sensitivity checks after passing baselines, not tests-first evidence. Final remote HEAD is 27d39324 and tracked/untracked status empty.

## Browser and identifier proof

[Browser/identifier extraction](evidence/remote-browser-identifier.json) and [baseline supplement](evidence/remote-baseline-supplement.json) retain four real Chrome observations (two per host), each twelve passed UI/endpoint steps, source 27d39324, Node 24.7.0, Chrome 157.0.8103.52. Native enrollment/finish/confirmation, wrong-code refusal and one toast, correct-code success, organization creation, replacement-code non-reuse and authenticated session read are observed. Served CSS and island bytes match expected hashes; all auth/gateway actual module maps match bundle manifests, 46 manifest entries rehash unchanged. Each browser bootstrap is correctly ready:false/readinessEvent:none; actual authenticated UI/native effects supply its browser witness, not CLI readiness. Node browser expected/actual invocation arrays each contain 26 unique matching pairs, all supplied fields equal. cleanupFailure is null; Chrome PID lookup exit 1 means absence, not Chrome's process exit code. Console errors were recorded, exceptions zero; no clean-console or visual-layout claim is made.

Both-host people and owner/agent identifier rows passed, as did both storage legs' derived assertion-key/replay checks. Limiter 6/6, relay 7/7 and CLI 5/5 passed on each host selection. Fence workerd 10/10 and Node 9 selected cases passed; workerd-only caller coverage is kept separate.

## Correction history and final static proof

- F1 closed at 27d39324: all sixteen Hegel model/helper switches end in `satisfies never`, as do the changed production answer switches. Baseline and all three dispatch controls inspected.
- F2 closed: the Lead's 30-second offset is present in the Node recorder; exact proof-time assertions and H control decide the bypass. Integration retains its far pinned clock.
- F3 closed at 27d39324: .tsx Node/Worker/storage import checking restored; identical .ts/.tsx probes both reject, allowed pages/islands remain admitted.
- F4 closed at 7a313fc4: stale two-stand-in recipe now agrees with S9/V8's zero stand-in oracle. Operator used that adopted oracle; prose-only diff inspected in full.
- F6 closed at 81e150f1: literal known members catch Math['random'], crypto['randomUUID'], Date['now'], process['hrtime'] and global timer access; strings and allowed local random/Math floor remain allowed.
- Follow-up F7 closed at e2a91f55: globalThis.performance.now() formerly returned no finding. The final existing scanner boundary rejects dotted/literal global-object performance and timers, while local metrics.performance/metrics['performance']/scheduler['setTimeout'] pass. Complete two-file diff and added positive/negative tests inspected; 79 passes and own probe red/allowed results retained. No product dependency changed.
- Final scanner/copy SHA-256 `5d5626f9ba585a8ea0af95a98f5c350fc3a5dcf0c0e2672fa987582bca80be7a` matches both copies. Base run has exactly 26 findings: 10 core-global, 3 UUID and 13 time occurrences, including native-browser protocol line 29. Candidate scan is clean. Reintroduced timer and UUID controls at the final head each exit 1 for the intended site, then restored exit 0. Final source status is empty.

## Evidence, cleanup and limits

- Local original proof/controls: [local-574c1d98](evidence/local-574c1d98/) (67 files), [local-27d39324](evidence/local-27d39324/) (27 files); saved checksums were checked.
- Final scanner/build/setup/probe/control logs, complete source diff, admission, inspection apparatus text and checksums: [local-e2a91f55](evidence/local-e2a91f55/). No verification script was promoted to product code or a permanent product test.
- Earlier partial baseline and browser/supplement transport hashes were checked. [Original workerd extraction](evidence/remote-organization-workerd-redacted.json) and [its module/count inspection](evidence/remote-organization-workerd-inspection.json) preserve the original child proof and outer gap. The superseded in-progress report is retained as evidence/verifier-observation-before-final.md, historical only; this report controls current status.
- The commissioned base scratch worktree was restored clean and removed after the final copied-scanner evidence was preserved; scoped lsof found no consumer, removal exited 0. Free space read 117 GiB before and after (rounded df; no claimed increase). Candidate source copies remain held for the Lead's downstream evidence review; no shared checkout, Implementer worktree or remote original was removed. All builds/tests and mutation writers have ended.
- Unverified beyond adopted scope: hosted central/provider operation, real Google or vendor Turnstile service, physical authenticator, global clipboard/print behavior, visual-layout acceptance, CI, publication/installation/release and owner acceptance. Controlled provider protocol, software authenticator, local Turnstile, injected clock and recording central peer are explicit stand-ins. The real Miniflare binding proves local binding behavior, not Cloudflare vendor deployment. Final full check/unit reruns are not independently claimed; applicable runtime evidence is reused across the inspected scanner/prose-only diff.

## Needs Implementer

None for these scoped V rows. All routed product/checker corrections have a declared target and verified closure. F5 driver repair is deferred separately by the Lead; no B1-A runtime repair is requested here.

## Needs Lead

No unresolved oracle/owner decision blocks this observation. Read the per-row evidence and retained F5 lifecycle limits before delivery acceptance. F5's separate apparatus repair and the uninspected external layers remain with their existing owners. This handback does not accept the PR or waive those layers.

Both prior one-shot wakes fired and finished; no recurring wake or polling loop remains active. The resume instruction was acted on by inspecting already completed receipts, not duplicating the heavy runs or authorized Keychain test.
