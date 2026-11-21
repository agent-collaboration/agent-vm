# F2 Hegel verification observations

Status: **local verification and CI baseline supported; Sunclaw mutation completion on HOLD** at frozen `829651c7df1f686a53abf5ca4292f46568a84bce`. Local baseline: 14 new unit files / 38 tests and 7 new integration files / 9 tests pass, zero failures/skips, both exit 0. Seventeen local mutant probes each fail their named property twice with the same shrunk draws or steps (exit 1), then pass after restoration (exit 0). CI's real Durable Object and Unix-socket baseline passes are now independently inspected; their separate Sunclaw wrong-build/restoration observations remain outstanding.

## Scope and authority

- Duty: Checker on verification duty, delivery observation of P1–P9 and M1–M5. Governing sources: `commission.md` and all six sibling F2 design pages, read on 2026-11-17. Requirements, Specification, Program Design and Verification Design govern the oracle; the plan sets order.
- Candidate: public Switchboard worktree `/Users/shravansunder/code/projects/switchboard-public.f2-hegel-critical`, initially clean at `b03d35ffeea00f79061353dce1db6231a670c62f`. This is baseline/setup evidence, not a delivered target.
- Pair: Implementer `codex-local/01a1e9c1-c92d-72e3-9abf-5bcecfc16e98`; Verifier `codex-local/01a1e9c1-d7a4-78a2-b8ba-e06890681d42`, service `0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89`.
- No board/work trail: commission reserves trace writing to Lead. This report returns material observations, decisions and gaps to Lead; no product or product-test writes by Verifier.
- Repository standard: AGENTS.md says “Whose standards: this repository's own.” Its TypeScript/monorepo rules and established Vitest lanes apply.
- Local unit and integration execution authorized by Lead reply `01a1e9d5-bd32-7032-a0c3-6135370a2df6`, following Program Design's existing lanes. Host and heavy runs belong on Sunclaw/CI. Standing Sunclaw authority: agent-vm `0446841f`, `docs/specs/2026-11-02-fleet-access/plans/2026-11-12-sign-in-owner-decisions.md`, “Owner decisions, 13 Nov”, item 2, independently opened in current source.
- Deliberately wrong builds belong only in verifier scratch, outside the Implementer's tree. No product fixes are authorized. Any real finding goes to Lead with its minimal case.

## Scoped outcomes

The baseline assertions were inspected against the independent expectation in each governing row. P1–P9, M1–M3, M4's core and M5's decoder now have intended mutant red, repeated red and restored-green receipts at the final source head (each selected red: one failed property, exit 1; each restore: one passing property, exit 0; other properties in the same file intentionally unselected). P5 ceiling/scope and M2 principal/completion/browser challenges are separate. Numeric seed `20261117`, `derandomize: true`, database disabled, cases unchanged.

| Probe | Deliberate defect | Shrunk case or steps observed at final head, identical on repeated red |
| --- | --- | --- |
| P1-expiry | Skip signed expiry | value 1, issued 0, lifetime 1: admitted instead of expired |
| P2-trust | Trust an untrusted annotation | trusted false, read-only true, destructive false, always-ask false, selector 0: allowed instead of blocked |
| P3-and | Match flag conjunction as OR | only `--format=json`, no force, no deny, without-approval baseline: incorrectly asks |
| P4-directory | Treat directory root as a file | `.` / `./` accepted as empty filename |
| P5-ceiling | Ignore ceiling membership | Drive upload with write group and empty ceiling compiled instead of refusing |
| P5-scope | Skip exact-scope equality | Drive upload lacking `openid` admitted instead of scope-mismatch |
| P7-recursion | Drop nested credential-key hints | opaque suffix 1 retained under credential keys |
| P9-origin | Accept foreign canonical Origin | host0.example, port 1024: foreign Origin allowed |
| P6-alias | Retain unauthored catalog aliases | all five command-extension flags false: `mail/search` emitted anyway |
| P8-digest | Omit committed surface field | value 1: changed surface retains the same digest |
| M1-replay | Skip authority live-replay guard | consume token-a at 100, expiry 101; consume it again at 100: admitted instead of replayed |
| M2-principal | Treat all browser principals as equal | capacity 1 and both TTLs 1: rebind to another principal does not throw |
| M2-completion | Skip completion principal comparison | capacity 1 and both TTLs 1: wrong principal begins commit instead of identity-mismatch |
| M2-browser | Skip continuation browser-secret guard | capacity 1, agents target, synthetic-owner: changed browser secret accepted |
| M3-effect | Bypass dispatched-operation guard | invoke, invoke: second real selected-resource invocation returns completed instead of not-dispatched |
| M4-admission-core | Admit during pending removal | begin unlink for first synthetic client/request; always-checked admission probe succeeds instead of refusing |
| M5-decoder | Raise decoder limit by one byte | payload `a`, UTF-8 body 37 bytes: configured limit 36 accepts instead of CONTENT_TOO_LARGE |

The complete per-probe named assertion, exact command, result, shrunk transcript and reproduction comparison are indexed by `evidence/final-829651c/sensitivity-summary.json`, `batch1-mutation-runs.json` and `additional-mutation-runs.json`. Original versus repeated failure messages and shrunk transcripts match for 17/17 probes. Source restoration audit covers all 16 touched scratch product files: `source-restoration.txt`.

| Outcome | Test check and real boundary observed | Conclusion |
| --- | --- | --- |
| P1 | Real signing/verifying, frozen HMAC vector, ordered field mutations and exact expiry; real dispatcher rejects mismatched offered/current receipt and records no backend effect | Supported locally |
| P2 | Independent namespace/default precedence and MCP decision tables; assessor prerequisites/account state and unknown-tool entry cases | Supported locally |
| P3 | Independent authored matcher conjunction/alternative/precedence table; flags, UTF-8 stdin and path classification; allowed path-looking positional arguments remain allowed | Supported locally |
| P4 | Real normalizer and operation resolver; raw argv unchanged, metadata separated, output directories admitted and input directories refused | Supported locally |
| P5 | Literal group/operation/scope model inspected; every catalog operation reached, helper read requirements retained; ceiling and scope mutations both caught | Supported locally |
| P6 | Compiler through its owning entry; literal authored/catalog intersection, no-OAuth help/version and declared semantic errors kept distinct from schema failures/crashes | Supported locally |
| P7 | Exact, pattern, nested credential-key and parsed-value redaction exercised separately; ordinary data retained | Supported locally |
| P8 | ToolRef round trips, independently serialized UTF-8 multi-page pagination and rejections, separate digest contracts and frozen vectors; omitted committed field caught | Supported locally |
| P9 | Real request policy and credential parser/authenticator; byte equality, separate Host/Origin rules, missing Origin and origin-form target cases | Supported locally |
| M1 | Real memory and core stores with independent caps/pruning model; signed exact-expiry verifier/gateway path retains one effect and no permanent tombstone | Supported locally |
| M2 | Real transaction/completion/continuation/navigation stores; independent sequential models, explicit refusal preludes, capacity, expiry, cancellation and disposal observations | Supported locally |
| M3 | Real operation index transition API and separate coordinator model; repeated backend entry counts effects at selected.invoke; no-double-effect mutation caught | Supported locally |
| M4 | Core membership/removal model and readback; pending/disabled admission refusal mutation caught. CI real-DO baseline 1/1 passes, 715276 ms; raw success line inspected | Core and CI baseline supported; Sunclaw DO mutation HOLD |
| M5 | Real decoder at independent byte limit; socket test source keeps capacity one and holds the cancelled reply before a second request, then observes late reply/close. CI socket baseline 1/1 passes, 263 ms; raw success line inspected | Decoder and CI baseline supported; Sunclaw socket mutation HOLD |

No app or browser launch is needed for these library properties. The only project recipe found, `.agents/skills/verify-auth/SKILL.md`, covers sign-in journeys outside F2. F2 uses its governing permanent property tests as the bounded observation route; no new project skill or product journey has been invented. This is not delivery acceptance.

## Needs Implementer

No local product/test repair remains from this Verifier. Frozen final target received as Router push `01a1e9d5-e079-7d62-b221-5eb6cf3505a1`; protected public checkout rechecked clean at that exact head after local probes.

Implementer owns full host/CI delivery proof. Its handback and raw `implementer-evidence/{unit-seeded,integration-seeded,check-seeded}.log` were opened: reported full unit 254 files/2692 tests, integration 69 files/323 tests, and check 12 gates passed/0 failed. These are Implementer-run receipts, distinct from the Verifier's scoped runs above. The check log also records Wrangler log-file EPERM diagnostics under host preferences while its type generation/typecheck and aggregate gate pass; those diagnostics are retained rather than described as zero diagnostic errors.

### CI follow-up, 17 Nov

Independently checked `gh run view 44100359864 --repo agent-collaboration/switchboard --json headSha,conclusion,status,url,jobs`: completed success, associated head `829651c7df1f686a53abf5ca4292f46568a84bce`; Validation, E2E (host) and final check jobs all success. [Run](https://github.com/agent-collaboration/switchboard/actions/runs/44100359864).

Execution identity: both checkout logs say `4a29b28259f076a29d2b06c6eeb6012d88849d47`, the PR merge of `829651c` into base `b03d35f`. GitHub commit metadata was opened with `gh api repos/agent-collaboration/switchboard/commits/4a29b28`; its parents are exactly those heads. Its tree `88270b9adc7f1f718877a2d51c0d622a5e2237a0` equals the independently read local tree of `829651c`. Thus the CI source tree matches the frozen candidate, while its executed commit identity is retained separately.

Opened deciding raw-log anchors: quality 12/12; unit 254 files/2692 tests; integration 69 files/323 tests; Python 407 tests; E2E (host) 80 files/477 tests pass, 4 files/20 tests skipped. The skips are b2e-joint-journey (16), host-crypto-recording (1), macos-keychain-proof-key-store on Linux (1), and b2e-launcher-teardown (2). Neither new F2 host test is skipped: M4 DO passes 1/1 in 715276 ms, M5 UDS passes 1/1 in 263 ms. These are CI-run baseline observations, not Sunclaw mutations or deployment proof. Raw output includes expected model refusal diagnostics; an aggregate pass is not zero diagnostic output.

Full raw log retained at `evidence/ci-44100359864.log`; 16 deciding checkout/result/skip lines retained separately at `evidence/ci-44100359864-excerpts.log`. This inspection does not claim a line-by-line audit of every diagnostic in the 14.4 MB log.

## Needs Verifier repair

None open locally. Temporary mutation orchestration is owned in assigned scratch; no product test or project verification skill was authored. Remote apparatus is syntax-checked but not yet executed; its real host execution remains required.

CI exposed a Verifier apparatus limit before the remote observation: M4 baseline 715276 ms exceeds the earlier 600000 ms process wrapper, and the raw combined CI log is 14447023 bytes. Corrected only the runner's command timeout to 1200000 ms and output allowance to 64000000 bytes, fitting the existing 900000 ms test plus 300000 ms hook bounds. No product, test, property, case/step count or assertion changed. `node --check` passes. Revised packet SHA256 `492cdfd69528af956e2da8febb29dcf7a7e7d3af569e529fa3d7fc8c9fd23088`; script SHA256 `f59f1980f4395f5bcf5d5f4b2d32bcb1902f803990c2415d8075c76b2faefdb8`. Correction sent to Implementer for unchanged forwarding in push `01a1ea0f-6804-73d1-9734-93bc87a3a37c`; confirmation remains outstanding. An old-wrapper interruption, if one happened, must be retained as apparatus failure and reconciled before the affected rerun.

The Verifier's `work/verifier-host-packet.md` and `work/evidence/verifier-host-mutations.mjs` were passed to Implementer to forward unchanged. Implementer confirmed both hashes and queued their unchanged contents to Sunclaw as outbox item `01a1e9dd-44ce-7ee0-a9a4-dbf6a2da1b5d` (confirmation push `01a1e9dd-74c1-7c62-bb48-797f4d382039`). Queued is not run. Separate disposable source/build mutation checkout is required; the full clean host lane remains untouched.

## Needs Lead

No current authority question. Earlier integration wording resolved by Lead. Reproducibility question resolved in Verification Design at agent-vm `1a651e268`: deterministic settings plus shrunk draws are sufficient, no seed-override apparatus. The Implementer independently supplied explicit seed `20261117` in final tests; no runtime seed override was used.

Required HOLDs: M4 real-DO and M5 real-socket baseline/red/repeated-red/restored-green receipts from Sunclaw, plus the Implementer's full Sunclaw host lane. CI delivery evidence is now independently inspected and no longer a gap. Owner of remaining execution: existing Sunclaw test agent; owner of interpretation/recheck: this Verifier; owner of final acceptance: Lead. Closure requires reachable raw results at exact target, intended failures and restored passes, not a queued status or summary.

## Evidence and limits

Raw results, exact argument arrays, statuses and mutation descriptions are in `work/evidence/final-829651c/`: `baseline-unit*`, `baseline-integration*`, `{probe}-mutation.json`, `{probe}-{red,red-repeat,restored}.{json,log}` and command records. Earlier `78c0a98` evidence remains in `work/evidence/` and is superseded for final seeded execution; its 29 new passing tests plus one pre-existing F1 property were not the complete F2 scope.

Source isolation: both candidates were extracted from exact git archives into `tmp/2026-11-17-f2-verifier/candidate-{78c0a98,829651c}`. The second reuses unchanged third-party dependencies read-only and separately copied package links/build artifacts; only archived scratch product sources are mutated. Toolchain: Node 26.13.1, pnpm 10.33.0, Vitest 4.1.5, root Vite 8.2.1, Hegel 0.4.10. All eight first-batch and all 16 final-batch touched product sources were restored byte-for-byte to their respective original revisions. Temporary candidates and runners are retained while host consumers and Lead still need their evidence; no cleanup of shared or unrelated paths occurred.

Correction retained: an initial Vite mismatch concern came from reading package-local nested snapshots instead of the root importer. Opening `78c0a98:pnpm-lock.yaml:41–46` confirmed the root Vite/Vitest runner correctly uses 8.2.1; the concern was withdrawn in Router reply `01a1e9d4-5831-7901-81c8-499bda300b0e`. No dependency reinstall or product change was needed.

No hosted/provider, deployment, release or acceptance claim is made. No product code or product test has been authored by this Verifier. No host run has been made on the owner's Mac.
