# F2 implementer handback — 17 Nov 2026

Status: implementation delivered; final verification, Sunclaw host proof and CI pending. No acceptance or merge claim.

## Target and delivery

- Public repository: https://github.com/agent-collaboration/switchboard
- Draft PR: https://github.com/agent-collaboration/switchboard/pull/3
- Source: 829651c7df1f686a53abf5ca4292f46568a84bce, branch f2/hegel-critical, public base b03d35ffeea00f79061353dce1db6231a670c62f.
- Working tree clean; public remote head confirmed equal. Four scoped commits; no history rewrite.
- 27 new TypeScript test/support files plus eight existing package manifests and lock importer entries. No product source, CI, check script, public contract, persisted format or dependency-version changes.
- Hegel 0.4.10 development dependency added to agent-portal-sdk, config-contracts, oauth-broker-contracts, oauth-broker, tool-access, tool-engine, tool-host-cloudflare and tool-host-node, following Lead authorization in Router reply 01a1e9c6-486a-7573-a8df-a9004d0f8340. Lock diff is exactly24 importer lines; no packages/snapshots changed.

## Local proof at 829651c

| Check | Exit | Outcome | Receipt |
| --- | --- | --- | --- |
| pnpm test:unit --maxWorkers 2 | 0 | 254 files, 2692 tests passed; 0 failed/skipped | implementer-evidence/unit-seeded.log |
| pnpm test:integration --maxWorkers 2 | 0 | 69 files, 323 tests passed; 0 failed/skipped | implementer-evidence/integration-seeded.log |
| pnpm check | 0 | 12 gates passed, 0 failed; includes build, audits, lint, format, type-aware lint and typecheck | implementer-evidence/check-seeded.log |
| pnpm exec tsc -p tsconfig.json --noEmit | 0 | root exactOptionalPropertyTypes correction verified | implementer-evidence/root-typecheck-correction.log |

Actual local tools: Node26.13.1, pnpm10.33.0, Vitest4.1.5, root Vite8.2.1, Hegel0.4.10, oxfmt0.75.0. Root lock importer and installed root Vite agree; unrelated8.2.2 snapshots also exist. Existing repository lint warnings remain in the broad log; the gate exits0 with no errors. New files received targeted lint/format/type checks.

Pure properties use500 cases; state machines100 cases and50 steps, alwaysCheck invariants. Every new Hegel settings object uses seed20261117, derandomize:true and Database.disabled. Existing frozen call-argument byte/digest vectors were reused and included in the parent targeted run. Tests exercise real pure functions/process-local stores; host proofs stay separate.

## Target map

| Target | New test suffix/path under packages |
| --- | --- |
| P1 | tool-engine/src/mcp-gateway/signed-tokens/approval-token-signing.hegel.unit.test.ts and capability-dispatch/capability-dispatcher.hegel.unit.test.ts |
| P2 | tool-access/src/authorization/portal-access-policy.hegel.unit.test.ts |
| P3 | tool-access/src/authorization/cli-allowances/cli-allowance.hegel.unit.test.ts |
| P4 | oauth-broker-contracts/src/gog-file-arguments.hegel.unit.test.ts |
| P5 | oauth-broker/src/google/google-operation-grants.hegel.unit.test.ts; independent google-grant-literal-model.ts |
| P6 | config-contracts/src/oauth-policy-compiler.hegel.unit.test.ts |
| P7 | tool-engine/src/upstream-mcp-connectors/upstream-response-middleware.hegel.unit.test.ts |
| P8 | tool-engine/src/capability-dispatch/dispatch-intent.hegel.unit.test.ts; mcp-gateway/agent-catalog-views/tool-ref and tool-list-pagination.hegel.unit.test.ts; tool-access/src/contracts/call-argument-digest.hegel.unit.test.ts |
| P9 | tool-host-node/src/mcp-proxy-server/http-boundaries.hegel.unit.test.ts |
| M1 | tool-host-core/src/workspace-authority/approval-token-replay.hegel.integration.test.ts |
| M2 | oauth-broker/src/oauth-transaction-store and oauth-browser-stores.hegel.integration.test.ts; oauth-ceremony-hegel-fixture.ts |
| M3 | tool-host-node/src/operation-records/node-operation-store.hegel.integration.test.ts; standalone-tool-portal/standalone-batch-approval and standalone-batch-dispatch.hegel.integration.test.ts |
| M4 | tool-host-core/src/workspace-authority/agent-removal.hegel.integration.test.ts; shared test model; tool-host-cloudflare/src/durable-workspace-authority/agent-removal.hegel.host.e2e.test.ts and test-only DO entrypoint |
| M5 | agent-portal-sdk/src/gateway-runtime-client/gateway-runtime-protocol.hegel.unit.test.ts and node-gateway-runtime-transport.hegel.host.e2e.test.ts |

The literal OAuth oracle pins27 groups and37 operations, with independent scopes. The models preserve contract differences: memory entry cap versus authority byte cap, retained expired OAuth getters versus mutation-time reaping, pre-login browser-secret binding versus post-login principal binding, and backend entry count versus selected.invoke effects.

## Corrections and departures retained

1. Initial pure runs collected0 tests because Hegel was package-local. Lead authorized the existing-version per-package declarations; properties then ran. No claim from setup failures.
2. P5 sampling initially reached34/37 operations; the coverage assertion failed. The property now reaches every literal operation in every generated case. No product defect.
3. The first pnpm check passed9 gates and failed formatting (in-progress M2 and manifest key order). Next passed11 and failed P9 optional-property fixture typing. Both raw failures are retained; the final check passes12.
4. A concurrent check build briefly removed dist artifacts during a helper M2 run. That setup failure collected0 tests; runs were serialized after the build and passed. The final unit/integration runs completed before the final check build.
5. Verifier initially requested numeric seed proof. Explicit Settings.seed20261117 landed before Lead revised Verification Design at1a651e268 to require deterministic shrunk draws rather than a numeric seed. No proof tooling changed, derandomize/DB settings retained. Lead informed.
6. Two scoped signing attempts failed at the password-manager agent. Commits use the authorized --no-gpg-sign fallback, never --no-verify.
7. Independent package work was delegated to bounded native helpers (Terra high for local pieces, Sol high for cross-domain pieces), integrated and source-inspected by parent; combined proof was run by parent. No helper changed product code or gate strength. No board home; commission reserves trace writes to Lead.

## Pending proof and risks

- Paired Verifier original report: work/verifier-observation.md (pending final target). Parent inspected first-batch raw red/restored JSON and shrunk logs for P1/P2/P3/P4/P5 ceiling+scope/P7/P9 at78c0a98: intended assertion failures and restored selected-property passes. Those pre-seed mutation observations are not final829651c acceptance. No product defect reported.
- Sunclaw host execution queued, not started. Packet: work/implementer-host-packet.md, SHA256bbafba92c48a89c2165d0401238f9b169a752eea5bbad061ddee7ddaf567089e. Remote acknowledgment Router01a1e9d8-04d7-71b2-9e53-bcb1ae3cd6ce names exact829651c, full inventory minus exactly one Darwin Keychain file, both Node/workerd and Python lane. Standing owner authority cited in packet. No local socket/workerd host run or local Python run claimed.
- CI run44100359864 for829651c in progress; blocking check watch interval240 active. Draft PR remains draft.
- No real Google, upstream MCP, hosted login, deployment or release claim. Sequential models do not prove concurrency. No product change; merge risk is added test runtime/platform behavior or incorrect oracle causing false CI failures. Worst plausible regression is blocking delivery with a test/harness failure. The literal catalog can require deliberate maintenance after a catalog change.
- Required final host/mutation/CI receipts remain open. Lead owns acceptance, independent review and merge.

## Test-support bundle confirmation (Lead request)

At829651c, tsdown entries are only src/index.ts and src/google/index.ts and package exports only the corresponding built index files. A recursive TypeScript import/export scan reached34 local modules from those roots; neither src/google/google-grant-literal-model.ts nor src/oauth-ceremony-hegel-fixture.ts was reachable. The only importers are new Hegel test files. Current built dist JS, declarations and sourcemaps contain neither source basename nor literalPermissionGroups/literalGrantModel/createCeremonyModel/syntheticGrantSchema. Current dist contains the two entrypoints and one shared oauth-transaction-store chunk, with maps and declarations; no separate support artifact. The fresh pnpm check build passed, so no fixture relocation was necessary.

Verifier update received for829651c: independent archive baseline new unit14files38tests and integration7files9tests exit0, zero skips; first8 mutants rerun red/repeated-red/restored-green under seed20261117. This is a received report pending the parent's final raw-receipt inspection; final host mutation rows remain open.

## Final local Verifier receipt inspection

Parent opened verifier-observation.md plus all17 final-829651c probe JSON command/results, named assertion failure messages, repeated shrunk draw/step excerpts, and source-restoration.txt. All17 selected properties fail twice for their intended defect (exit1), reproduce the shrunk transcript, then pass restored (exit0). The17 probes cover P1–P9, M1/M2/M3, M4 core and M5 decoder; DO/socket host mutations remain HOLD. Sixteen scratch product source files were restored byte-for-byte. Original Verifier index: work/evidence/final-829651c/sensitivity-summary.json. These are Verifier-run observations, inspected by Implementer; they are not Lead acceptance.

Diagnostic qualification: the successful check log is not diagnostic-free. It contains expected negative packed-loader fixture output, existing lint warnings, and Wrangler log-file EPERM messages under host preferences while its types and aggregate gate exit0. The reported12/12 is command/gate outcome, not a claim of zero emitted diagnostics. No global host preference write was made to silence these messages.

CI Validation job134098412273 at829651c completed success at14:16:11Z: quality, units, integrations and Python all pass. E2E(host) job134098412876 is running, so aggregate CI remains pending. Sunclaw acknowledged both clean lane and isolated two-mutation lane queued/not-started in Router01a1e9dd-f216-7903-8eeb-4ba12a12fe07.

## Active checkpoint

CI check watch remains active at240-second cadence (local exec session30624). A single Router follow-through wake01a1e9e2-b3ca-75c0-b9e6-93e4cf507ffc is saved, active, due2026-11-17T14:26:50.917Z, expires14:51:50.917Z; it continues only this delivery's outstanding CI state. Sunclaw and Verifier replies deliver natively to this same session. No repeating monitor or remote queue polling was added. Source remains frozen, clean, public829651c. The checkpoint is not task completion: final host proof, host mutations and aggregateCI are outstanding.

Wake continuation: the one-shot fired at14:26:51Z and was processed. The previous host exec session did not survive the turn boundary (Unknown process id30624); its retained log was read, exact public source/PR head rechecked829651c, Validation remains success and E2Ehost in progress. A new blocking240-second watch is active as exec44337 with log /private/tmp/2026-11-f2-hegel/ci-watch-resumed.log. No extra remote queue poll or source change. The fired wake is no longer a pending continuation mechanism; Sunclaw/Verifier notifications remain active.

Extended external wait checkpoint: resumed240-second CI watch still reports E2Ehost pending and Validation passed; no code/test change or failure observation. PR comments/reviews/inline findings were fetched and are empty. To avoid keeping an interactive turn alive through a long host job, delayed one-shot wake01a1e9f1-57c7-7f51-a5c1-4161435d2da4 is saved, due2026-11-17T15:07:50.407Z and expiring15:37:50.407Z, and native Sunclaw/Verifier replies remain the event path. No repeated remote polling or changed gate. Task remains incomplete until required host/CI proof arrives.

## CI completion at frozen829651c (15:07Z observation)

Run https://github.com/agent-collaboration/switchboard/actions/runs/44100359864 succeeded at exact829651c7df1f686a53abf5ca4292f46568a84bce. Validation completed14:16:11Z; E2Ehost completed14:41:36Z; aggregatecheck completed14:41:41Z. Parent fetched fresh PR check state and full raw log. The existing watch no longer needs a follow-through wake; the delayed one-shot fired and was processed.

CI quality12/12, unit254files2692tests, integration69files323tests, Python407passed (12.72s). E2Ehost80files passed,4files skipped;477tests passed,20skipped,0failed. Both new host tests executed: M4 realDO1test715276ms (property714936ms), M5 Unixsocket1test263ms. This is CI host baseline evidence, not the two deliberately wrong host builds. Raw log: implementer-evidence/ci-44100359864.log; selected count/proof lines: implementer-evidence/ci-summary-extract.log.

Existing skipped inventory: b2e-joint-journey.host.e2e.test.ts16 and b2e-launcher-teardown.host.e2e.test.ts2 require pinned Central artifacts absent from default CI; host-crypto-recording.host.e2e.test.ts1 is Node-host only while default host is Cloudflare; macos-keychain-proof-key-store.host.e2e.test.ts1 is Darwin-only on Linux. Source selection conditions independently opened. No skip/proof gate was changed for F2.

Remaining: Sunclaw's separate full both-host lane/inventory plus Verifier's isolated M4DO/M5socket baseline/red/repeated-red/restored-green proof. Native result notifications remain the event path; no new CI polling or wake needed. PR remains draft and acceptance/merge stay with Lead.
