# Switchboard candidate publication-source audit

**NOT PUBLISHABLE at this checkpoint.** Two small source corrections remain (C3/C4 below), and the mandatory validation receipts have not arrived (G1). No live credential was identified or tested. This is an independent assessment of the Git source tree, not product delivery acceptance.

## Target, authority and coverage

- Current target: `027c73aa7b09d4ac2c91b5cfdb85c88067d31deb`, tree `473cffaeaf889c382f3aa7b46d13ce8f9724b964`, private branch `pub/public-candidate`, worktree `/Users/shravansunder/code/projects/switchboard.pub-public-candidate`.
- Initial target was `bb34e6b0712cc10fc764f90c0236e9e1319d1b6a`. Lead correction message `01a1e77d-e66b-7481-bbb5-7f66e13b71cf` and the reopened [candidate brief](candidate-audit-brief.md) select `027c73aa`. I read the complete five-file correction diff and reopened each corrected anchor. Unchanged coverage is reused.
- Governing sources: complete [plan](plan.md), all rounds of [plan review](review.md), the original audit's findings/provenance/workflow/collection sections in [report](../2026-11-16-switchboard-prepublication/report.md), and the current [Implementer handback](work/implementer-handback.md). The original report's 2,344-row npm / 144-row Python historical dependency inventory was not independently repeated.
- Independent session: no authoring history for the candidate or plan. The brief's model/effort label is not independently exposed by harness metadata.
- Grant: source inspection and read-only scans; this report is the only write. No package install, build, application test, credential resolution, live deployment request, Git mutation, publication or visibility change was performed. No additional agents were commissioned.
- Work home: supplied `no-home`; no fallback trace destination/writer was granted. This report returns the observations and remaining work to the Lead. No board or log repository was created.
- Admission: this explicitly bounded publication-source assessment is not full delivery review. Missing product acceptance does not prevent these source checks; it also cannot be inferred from them.

The candidate's parents and all other private refs remain outside this audit. F2/S1 close only if the Lead actually creates and exposes the planned parentless commit with this accepted tree. This private-history checkout must not become the public push source.

## Findings and correction checks

### C1 — Closed: operational vault namespace retained in five test literals

At the initial target, `packages/config-contracts/src/controller-configured-cli.unit.test.ts:52`, `packages/config-contracts/src/mcp-config.unit.test.ts:128,149`, and `packages/tool-host-node/src/host-configuration/mcp-config.unit.test.ts:132,153` reused the vault namespace from base `7bee7182:.env.example:16–17` and `scripts/publish-local.sh:24`. The whole item references differed. This was a real operational namespace in an otherwise synthetic fixture, not a confirmed credential leak; no reference was resolved.

At **027c73aa**, all five occurrences use an explicit example namespace/item/field. I read the full correction diff and the real loader/assertion contexts: only literal values changed, including both inputs and expected resolved references. The full-tree URI scan found **zero occurrences in the original operational namespace**. The remaining project-name words are package/module/protocol or provenance text, not that credential URI. C1 is closed.

### C2 — Closed: two source pointers did not exist

At **027c73aa**:

- `.agents/skills/verify-auth/references/agent-bootstrap.md:143` now points to `packages/sign-in-core/src/storage/person-session-store.ts`; its `readOwnerSession` implementation exists at `:167`. The distinct owner-proof call remains in `better-auth/sign-in-management-binding.ts:80–85`.
- `packages/tool-host-node/README.md:97` now names the retained oracle under `src/test-fixtures/legacy-baselines/mcp-portal/testing/fake-upstream-mcp-server.ts`. The actual comparison imports that oracle in `src/testing/controlled-upstream-parity.integration.test.ts:8`.

Both corrected targets exist in the exact tree. C2 is closed.

### C3 — Open, P2: Pierre diffs copyright is missing from its notice entry

**Target anchor:** `THIRD_PARTY_NOTICES.md:93` identifies `@pierre/diffs` **1.2.10**, includes generic Apache-2.0 text, and notes the absence of a separate NOTICE. The nearby `:97` copyright belongs to the different `@pierre/theme` package.

I retrieved the exact [diffs 1.2.10 registry record](https://registry.npmjs.org/@pierre%2fdiffs/1.2.10) and read its tarball's `package/LICENSE.md` in memory. Its applied appendix says **“Copyright 2025 Pierre Computer Company”**. A normalized comparison against `LICENSES/Apache-2.0.txt` differs only in that applied copyright versus the generic template fields. The current entry does not preserve that applied notice. The theme's 2026 copyright is not the same notice.

**Required correction:** retain the exact diffs copyright in its inventory entry, or establish that no diffs-derived material remains. This is the plan's per-copy copyright/notice requirement; it is not a claim about an unshipped dependency binary. The exact Pierre palette/selection provenance remains the limit already disclosed and allowed by the plan.

### C4 — Open, P2: the public recipe still cites a missing scratch script

**Target anchor:** `.agents/skills/verify-auth/references/agent-bootstrap.md:54` attributes the single-owner native refusal to `crud-members.mjs`. That file is absent from the entire tree; unlike the named manifest/receipt files elsewhere, this passage treats it as supporting source/evidence rather than a generated output.

**Required correction:** replace the scratch-script citation with reachable native source or a permanent test, or remove the unavailable citation while keeping the current technical expectation and proof limit. The assignment explicitly requires usable public-tree references. Other missing basenames found by the scan were generated evidence/bundle outputs, illustrative naming examples or external dependency internals; they are not reported as broken repository links.

### G1 — Open: required validation receipts are unavailable

The handback's gate table at `work/implementer-handback.md:61–66` still says **PENDING** for frozen install, `pnpm check`, unit, integration, Python host and complete host E2E. No actual commands/counts/exits or raw run receipts for these gates were available at this checkpoint. Its runner paragraph still describes the earlier `bb34e6b0` target; final proof must name the actual final source and any authorized reuse after the small correction diff.

| Required evidence | Observed result |
| --- | --- |
| `pnpm install --frozen-lockfile` | Receipt unavailable; not a pass |
| `pnpm check` | Receipt unavailable; build/lint/format/type checks unverified |
| `pnpm test:unit` | Pass/fail/skip counts and exit unavailable |
| `pnpm test:integration` | Pass/fail/skip counts and exit unavailable |
| `pnpm python:test:host` | Pass/fail/skip counts and exit unavailable |
| Complete host E2E on workerd and Node | Both host receipts, selected/executed inventory equality, counts and exits unavailable |

The handback attributes exactly one Keychain-file exclusion to the Lead's Linux-runner commission; its execution/inventory receipt has not arrived. This audit cannot verify that it is the only exclusion. “Both hosts” means the two sign-in runtimes on the remote machine, not two physical machines. GitHub CI remains separately NOT RUN for the stated private-billing reason. No product failure or unreasonable skip is inferred from missing receipts.

## Independent sensitive-source checks

My scanner read **all 1,593 tracked blobs**, including hidden files and symlink contents. At 027c73aa every working byte string was checked against its declared Git blob SHA-1: **zero mismatches**. All paths decode as UTF-8 with no NUL-bearing binary; **zero images, binaries, submodules, tracked `docs/` or tracked `tmp/` paths** remain. The three symlinks resolve inside the tree to retained targets. The manifest matches Git's ordered mode/type/blob/path list.

This used an independent Python/std-library reader and regex/entropy checks, not execution of the Implementer's collector. Initial verbose outputs were truncated; affected classes were rerun with bounded per-class output before conclusions. The final correction diff was checked separately and the affected full-tree namespace/email/host/key/path classes were repeated at 027c73aa.

| Class | Inspected outcome |
| --- | --- |
| Personal data/emails | No personal-provider email. Actual address matches are synthetic example/invalid domains or the existing GitHub noreply author identity; package-version text was separated from addresses. Copyright names are retained deliberately. |
| Secret locations/account domains | 15 complete fixture URI occurrences, plus protocol-prefix validator text. C1's operational namespace is absent. Other reference contexts are explicit example/test fixtures; no account-domain match. |
| Machine/LAN/Tailscale | No private machine name, tailnet address or deployment hostname. One legacy field name is a rejected input; two LAN addresses are explicit diagnostic-redaction test events. `.local` configuration/property text was checked separately. |
| Router/approval/handback/signing metadata | No Router URI, private Router process ID, signing-team value or private build-host comment. Approval reference types/literals describe the product protocol. Generic evidence/handback wording has no private address or record attached. |
| Private keys/JWKs | No complete private-key block or literal private JWK. Matches to private-key words are redaction regexes, schema/type fields or freshly generated runtime key variables. |
| JWTs | Five short fixture occurrences. Headers/payloads decode to minimal fixture `typ`/`alg` and `sub` fields; each signature component is a 12-character fixture marker. Their parser/provisioning context is explicit. No live token validation. |
| Credential assignments/userinfo | Short canaries/negative inputs, public dummy Turnstile values, placeholders, or shell parameter forwarding. Four userinfo URLs exercise refusal/redaction. A provider-prefix false positive is an operation identifier in a Python test. |
| Cloud IDs | UUID fixtures, all-zero deployment placeholders, generated header hashes, standard trace-context vectors and a fixed local D1 identifier; no deployed account/zone value identified. |
| Home paths | Synthetic guest `/home` staging data, rejected `~` outputs, module `file:` URLs and the deliberate rejected `/Users/person/file` input at `portal-attachment-contracts.unit.test.ts:43`. The latter negative assertion is retained. |
| Entropy | Independent quoted and unquoted passes separated public pins/digests/integrities, canonical vectors, UUID fixtures, generated identifiers, source paths, flags, character alphabets and explicit canaries from credential candidates. No additional unexplained secret-shaped value was identified. This is not a guarantee against every encoding or liveness condition. |

I also matched the Implementer's retained-disposition hashes back to the exact source matches and opened their current source-line contexts. The final 027c73aa ledgers have **zero unresolved rows**:

- `nonentropy-dispositions.json`: 313 rows, **309 synthetic/negative + 4 technical/public**; SHA-256 `f7f6f96b0c4aad2ab6f81ee661dff36e9ccf6f86501e400dafedae0581de6061`.
- `final-entropy-dispositions.json`: 7,232 rows, **7,209 technical/public + 23 synthetic/negative**; SHA-256 `202857da78e7017348983630d7fd9445c0d871b13adbf7c46982d5e4ed5a074d`.
- `final-file-manifest.tsv`: SHA-256 `791faa4b4db9dfd67996c1e61921c923b51bd57ce54d014665ea89fb713e6fd7`.

Earlier 591/144-unresolved observations were intermediate ledger states and are superseded by these inspected final classifications. C1 demonstrates why a matching count or a “synthetic” label alone was insufficient.

## Notices, licences, workflows and public usability

**Licences:** all **20** tracked npm manifests and the nested Python SDK manifest declare `AGPL-3.0-only`; the virtual Python workspace has no inappropriate project licence field. All **47** Python paths remain. README/CONTRIBUTING apply the licence to original material with third-party exceptions and preserve earlier grants. CLA and the retained PR assent section agree about future contributions and do not claim retroactive rights.

The complete [GNU AGPLv3 text](https://www.gnu.org/licenses/agpl-3.0.txt) and [Apache-2.0 text](https://www.apache.org/licenses/LICENSE-2.0.txt) are present when whitespace is normalized; the project's separate copyright header is `LICENSE:1`. Exact primary Better Auth UI/input-otp pins and current primary shadcn/Tailwind/tw-animate texts all match the included notices. This is a text/provenance check, not a legal opinion about every historical contribution.

**Copied source:** I independently checked **67 inline notice pointers** against their named entries, with zero missing pointers/entry names, and enumerated all 17 non-test auth component files, five auth helpers and 23 tool-access UI component files for header coverage. Input-otp CSS, icons/entries, both runtime declarations, BridgeWeb theme/token mirrors/primitives, central producer fixtures, Drizzle diagnostics and owner-origin copies have inventory entries. Cloudflare/Microsoft headers remain at `worker-configuration.gen.d.ts:44–57` and `:25–38` respectively. C3 is the remaining identified notice defect.

The exact Pierre theme tarball's MIT text matches its entry. Neither Pierre tarball has a separate NOTICE. A recursive GitHub API read of the complete, nontruncated workerd `v1.20260815.1` tree found no NOTICE/NOTICE.txt/NOTICE.md. This does not clear notices of separately distributed components. The generated Better Auth schema was investigated through the pinned primary generator: it emits configured field/schema declarations; this inspection did not establish a separate unnotified verbatim source copy. No additional definite copied-source omission was found by the provenance/header searches.

**JSON and test adaptations:** all **182** retained contract JSON files are byte-identical to base. No inline JSON notice was inserted. Both moved configuration examples remain in the public fixture home. The real file-loader/compiler assertions for policy/defaults remain. The CI test enumerates retained workflows, asserts release-workflow absence, and rejects write permissions/publishing text; a reintroduced release file or privilege/publish step can make those assertions fail. This is assertion-path inspection, not an observed test run or mutation-sensitivity claim.

**Workflows:** exactly one workflow remains, `.github/workflows/ci.yml`. I read it and all three local composite actions. Push/PR filters use `main`; contents permission is read-only; checkout persistence is disabled. No `id-token: write`, `contents: write`, publishing step, `pull_request_target`, self-hosted runner or `secrets.*` reference exists in that retained path. The aggregate check requires both jobs to succeed. Source topology is not hosted CI/protection acceptance.

**Public paths:** the Markdown link-target scan has zero missing local targets, and the complete quoted repository-path scan now resolves the two C2 repairs. Build outputs, generated evidence and explicit external producer/dependency paths were distinguished from source requirements. No retained Markdown link points at a private spec/plan/branch/repository. C4 is the remaining unavailable evidence citation.

## Original item disposition

| Items | Exact-tree disposition |
| --- | --- |
| F1 | Source correction C1 closed; env example is a placeholder, operational script/docs excluded; independent scan above. |
| F2, S1 | No reintroduced personal-provider address or private-key fixture in the tree. Parentless-commit/no-private-ref publication remains the Lead's later obligation. |
| F3, S4, R2 | Notices substantially implemented; C3 remains. Binary/package redistribution compliance is deferred by the source-only plan. |
| F4, R5, R6 | AGPL texts/20 npm fields/nested Python field, application statement, CLA assent and Python retention verified in source. |
| F5 | Privileged inherited release workflow absent; retained workflow/actions inspected. |
| F6, S2 | No tracked docs/tmp/image/binary working records remain. |
| S3 | Public README and package ownership URLs use Switchboard; compatibility/protocol/module spellings remain intentionally. C4 still affects the verification recipe's public usability. |
| R3 | Relocated fixture consumer and CI safety test adaptations inspected; C2 source pointers repaired; C4 residual citation and G1 execution proof remain. |
| R4 | Classified sensitive/entropy sweeps reach zero unresolved at 027c73aa; final parentless commit metadata and advertised refs are outside this tree audit. |
| R7 | JSON objects preserved without notice comments; independent 182-file byte comparison passed. |

## Receipts and limits

My read-only checks returned exit **0**: full-tree blob/encoding/symlink scans, sensitivity and entropy scans, manifest/metadata checks, licence comparisons, notice/header checks, Markdown/path checks, and 182-file JSON comparison. These are source-check counts, not passing application-test counts. A first lookup used two guessed local action names and returned exit 1; the actual three actions were then enumerated and read. No claim rests on the failed lookup. The preferred local OSS checkout was absent; DeepWiki supplied generator pointers, then the exact pinned public source was opened. Its guessed root `LICENSE` URL returned 404 and supplies no licence evidence.

Source routes: local governing sources and exact Git objects first; sibling/primary provenance as needed; primary licence/registry/GitHub/Cloudflare documents next. Memory was discovery only. No saved-reader, conversation-history or browser/runtime evidence was needed; no private source or secret was sent to external research services. The record is this sole authorized report rather than a separate research ledger.

Not covered: private history or refs; future public commit authorship/signature/message/parents; GitHub cutover, protections, PR/release/Actions surfaces; actual required runtime gates; complete ownership of historical contributions; native/npm/Python/browser-artifact distribution; live providers, credentials, hosted identity, deployment or owner acceptance. Exact shadcn registry and Pierre palette/selection source revisions remain disclosed provenance limits, not newly invented release requirements.

**Checkpoint:** unchanged target source and the complete correction diff have been inspected; the report is the only write. Lead owns C3/C4 repairs, final required proof and publication. Recheck only their corrected anchors and affected proof when returned.

**NOT PUBLISHABLE — C3 (diffs copyright), C4 (missing scratch citation), G1 (mandatory gate receipts unavailable).**

## Correction recheck at 1250e102

**C3 and C4 are closed. G1 remains open; NOT PUBLISHABLE.** This is the current verdict and supersedes the preceding checkpoint's open source findings.

Authority: Lead correction message `01a1e787-09da-74e1-9ade-05090a688861` and the reopened candidate brief name commit **`1250e102e3e3f8d36fc8c550637d90aa87990aad`**, tree **`a707a936c157790c6df015fa8581452c5969fca2`**. The grant remains inspect-only/report-only. I read the complete three-file diff from 027c73aa, the corrected notice and CI test, and the permanent test cited by the recipe. The worktree is clean at the declared target. Unchanged prior coverage is reused; no full audit or product gate was repeated.

| Item | Corrected target anchor and observed result |
| --- | --- |
| C3 | `THIRD_PARTY_NOTICES.md:93` now retains the exact applied **Copyright 2025 Pierre Computer Company** notice for diffs 1.2.10, with its registry source, separately from the theme's 2026 MIT notice. This matches the exact package licence already inspected. Closed. |
| C4 | `.agents/skills/verify-auth/references/agent-bootstrap.md:54` replaces the scratch citation with the permanent case in `packages/sign-in-test-support/src/people-organizations.host.e2e.test.ts:421`. The relative Markdown link and line fragment resolve. I read the full test: it posts a single-owner removal through the harness, requires HTTP 400 with the native last-owner error code, and checks unchanged membership and no people-change records. This closes the unavailable-source citation; I did not run the case or claim new runtime proof. |
| CI test formatting | `scripts/ci-workflow.unit.test.ts:68–71` only reflows the existing async map. The complete before/after text is identical after whitespace removal; all release-absence, permission, publishing and workflow-inventory assertions remain. Source inspection passed, exit 0. The preceding whitespace-insensitive Git diff returned 1 because moving a newline is still a diff; this was not a product or validation failure. |

The Lead reports that `pnpm check` at 027c73aa stopped on this formatting issue and that the final batch is now running at 1250e102. The original failure and corrected full-run receipts are not yet in the handback, so that attribution is retained as reported, not independently observed. At this recheck the handback still names 027c73aa and lists all six required gate families as PENDING. No final-target install/check/unit/integration/Python/workerd/Node commands, counts, exclusions or exits can be accepted from it yet. **G1 remains the sole open audit item.**

The three changed working files match their declared Git blobs. The notice addition and source-link replacement introduce public attribution and a retained local path; the test edit changes no token. No new source finding arose from these corrections. The earlier scan and licence/fixture/workflow checks retain their stated scope; their old manifest/ledger hashes are historical receipts, not hashes for the new tree.

The earlier wake was cancelled before firing when this correction arrived; Router returned state `cancelled`, no dispatched deliveries. The remaining dependency is the Implementer's complete final-target receipts, owned by the Lead/runner. I will inspect those receipts when delivered; this review does not take over their implementation or execution.

**NOT PUBLISHABLE — G1 only: complete validation receipts for 1250e102 are still unavailable.**

## G1 receipt checkpoint — 2026-11-17 03:41 UTC

The wake fired and the governing brief, handback and report were reopened. Target remains **1250e102**, tree **a707a936c157790c6df015fa8581452c5969fca2**; the candidate worktree remains clean. No source finding was reopened.

The handback now corrects the earlier “running” status: the runner's 03:38 UTC acknowledgement says **no command at 1250e102 has started**. The loaded final batch is queued behind earlier admitted B1-B browser work. This is an external capacity dependency; it is not evidence of a service outage or a failed final-target gate. No preemption, alternate host, replay or additional execution was performed by this review.

I opened the supplied local `tmp/public-candidate-evidence/remote-027-check-report.json` in the candidate worktree, SHA-256 **`9240104a47a4402b36a2a1cfbb79b62133d97e45a93b5429e91eb09a52593471`**. It binds the clean **027c73aa / 473cffae** source, records frozen install **exit 0**, then `pnpm check` **exit 1**, **9 checks passed / 1 formatting check failed**, naming `scripts/ci-workflow.unit.test.ts`. Type-aware lint and typecheck were not run; unit, integration, Python and both host/inventory gates were not reached. The report records that stopping at this first failure was required. Python locked-sync qualification and the offered/executed host inventory equality are explicitly NOT RUN.

Its raw-log references agree with the handback: install log SHA-256 `12b2d51b54202bb32cb57bc70fee0a469fb6634eab72ce6a866c7b89be750853`; failed check log `65cea61ca53abbc34d15e6b7d6b571d13b50946fb1393e685e8cac83d50b678a`; decisive stderr `d98cd20526baecb92e85931dee793cd12dbb66f13cda5abfc4a837a6a94e152d`. These are inspected runner-report fields. I have not independently opened the remote raw logs, and they establish no passing claim for 1250e102. The bounded formatting correction was already reviewed in the preceding section.

**G1 remains open:** final-target frozen install, complete quality gate, unit, integration, Python, workerd and Node counts/exits plus the exact authorized exclusion/inventory receipts are still unavailable. The Lead/runner owns that execution. Supported session-delivered Router replies remain the continuation path; a queued acknowledgement is not a completed gate. Only this report was appended.

**NOT PUBLISHABLE — G1: final-target validation has not started and its required receipts are unavailable.**

### Handoff access gap

Automatic approval review rejected the checkpoint reply to the commissioning Lead, including a subsequent minimal status-only reply on the same stored message. The first rejection described internal audit findings/hashes/status being sent without trusted destination authorization; the minimal reply was rejected as an indirect retry to an unverified session. No delivery receipt was returned, and neither message is treated as sent. No alternate identity, transport or indirect send was attempted. The local report update is complete; a further outgoing handoff requires the host's explicit approval. This access gap does not change the source findings or G1 verdict.

**NOT PUBLISHABLE — G1 remains open; outgoing handoff is blocked by automatic approval review.**

## G1 receipt review — 2026-11-17 04:15 UTC

Final-target receipts have now arrived for the install/check/unit/integration prefix. I reopened the brief, current handback and local report. The candidate remains clean at **1250e102 / a707a936c157790c6df015fa8581452c5969fca2**. No product command, new scan, repair or cross-session handoff was run.

The supplied `tmp/public-candidate-evidence/final-candidate-1250-report.json` is **779,848 bytes**, SHA-256 **`daf02ba11b97fdeef18b080a2a5d897f6a0b3eacc93b1dc737db31732fb42994`**. I inspected its source admission, commands/exits, all twelve extracted quality-check rows, complete transferred Vitest assertion rows and Python traceback. All **nine** admission-file hashes independently match the exact local Git objects. Its clean head/tree tuple matches the declared final target. This confirms the supplied evidence's source binding; it does not claim that I ran the gates or opened every remote stdout byte.

| Required gate | Inspected evidence and disposition |
| --- | --- |
| Frozen install | Scoped `pnpm install --frozen-lockfile`, **exit 0**, run by the supplied remote agent. Original log SHA-256 `f3bafbadcc29f4339c0f2ecf6e56286b9023433da61489d7fc8a1324d7dcaa7e`. |
| `pnpm check` | **Exit 0; 12 passed / 0 failed**, reported gate duration 83.04 s. I read twelve distinct PASS rows: build, CLI architecture, version sync, Zod guard, taxonomy, portal architecture, export/packed closures, contract freshness, lint, format, type-aware lint and typecheck. Original log SHA-256 `4b6a8ce381d86289a6978c8932a29430a8e31077bd2c8d3adaf3558b82f15399`. |
| Unit | Scoped `pnpm test:unit` with default/JSON reporters, **exit 0**. Independent count of the complete transferred rows: **240 unique files, 2,654 passed, 0 failed, 0 skipped**, no failure-message row. All four CI-topology assertions pass, including no privileged release/publishing path. Original Vitest JSON SHA-256 `31fd3c7a421203ae1b70883abbefb348e5f09441b3e38be63dd8cbb04d00ce8a`; log `287b4914cb2ffa07cdeb9d04ab40f2e8cc728026a4a87091df48aef20de650d3`. |
| Integration | Scoped `pnpm test:integration` with default/JSON reporters, **exit 0**. Independent count: **62 unique files, 314 passed, 0 failed, 0 skipped**, no failure-message row. The relocated synthetic OAuth/configuration example test is present and passed. Original Vitest JSON SHA-256 `a1ad818e383f287539adffb1b063574e13bd03df3c3c4f7ac4a9610305565a2d`; log `3dee42ccb911a72e54c6922fd4b08c82ed5f88e16587cc90d37492fe615e9993`. |
| Initial Python attempt | Scoped `pnpm python:test:host`, **exit 2; 0 collected / 22 collection errors**. The complete supplied stdout/stderr match their original byte counts and SHA-256 fields. Exact traceback count is **21 missing `agent_vm_agent_portal_sdk` plus 1 missing `uvicorn`**, not 22 errors naming only the SDK as the handback's shorthand says. This is collection/setup evidence, with no test-body credit. Original log SHA-256 `670c9ce3534939b70fa01c1491acaaaf06e83a81636f582387d8db3dd7c268ff`. |

The root `pyproject.toml` has no project dependencies, and the existing `python:sync` script is `uv sync --locked --all-packages`; `python:test:host` is `uv run pytest python/agent-vm-agent-portal-sdk`. The supplied initial report explicitly says no all-packages sync preceded the import failure. The current handback attributes an environment-only continuation to the Lead and reports sync/retry success (**407 passed**) without source/lock changes. Its complete continuation command/output/hash receipt has not yet been supplied locally, so that green remains **reported, not independently reviewed**. The original Python setup red remains preserved; the passing final-target prefix is not relabelled or rerun.

Similarly, the current handback reports workerd **475 passed / 0 failed / 0 reporter-skipped across 78 files**, with **476 original rows minus exactly one authorized Keychain row = 475 filtered rows**. The complete offered/filtered/executed identity sets, raw receipt and hash binding have not yet arrived here. Node inventory/runtime is still reported active, with no final completion receipt. Neither host is accepted from a milestone summary alone. The complete safe report still lists both host families as not run at its earlier cutoff; later milestones do not silently alter that historical snapshot.

**G1 is now narrowed to:** inspect the frozen Python sync/retry receipts, and both runtime-host final results and exact exclusion/inventory equalities, including continued final-source/build identity. The earlier install/check/unit/integration evidence is sufficient for its scoped prefix at 1250e102 and should not be needlessly rerun. The blocked outgoing handoff has not been retried.

**NOT PUBLISHABLE — G1 remains open for Python continuation and complete workerd/Node receipts.**

## Lead acceptance correction and completed 1250 receipts — 2026-11-17 04:31 UTC

**Verdict held.** Lead message `01a1e7c0-f281-7592-9738-7546012448e1` identified six more real vault references which this audit had incorrectly treated as synthetic because their namespace was labelled for testing. I reopened base `7bee7182:AGENTS.md:140–146`: it names the dedicated operational test-vault default. The assumption that a test-labelled namespace is fictional was agent-added and false. My earlier C1 closure and “all fixture URIs synthetic” statement were too narrow; they covered the deployment namespace, not every operational namespace. No credential was resolved. The approved publication boundary remains unchanged.

The six affected anchors at 1250e102 were `packages/config-contracts/src/oauth-config-test-fixture.ts:12,61` and `packages/config-contracts/src/tool-portal-config.unit.test.ts:236,343,409,965`. Lead's next-target message `01a1e7c3-f740-7101-af93-d6fdfae0d18e` and the reopened brief now select **`d9923c5e64763d1bd849f97919c8f6fbf1d7d0e3`**, tree **`ce4a989842ff7117e52b4192f43ccb7d844efc8a`**.

I read the complete two-file diff and corrected contexts. It changes exactly those six namespace literals to explicit example values, with no assertion, production code, schema, lockfile, configuration or other file changed. My independent reader re-enumerated every old-tree URI first segment outside `example-*` (six distinct segments, including schematic values) and compared them with every retained current URI. At d9923c5e:

- **1,593 tracked blobs** match the declared tree; zero working-byte mismatches.
- **15 complete URI references**, under **two namespaces**, all explicitly `example-*`.
- **Zero non-example URI first segments**, and **zero retained URI matches against any of the old-tree non-example segments**, including the dedicated test, deployment and development namespaces named by the Lead.
- Two additional occurrences are bare protocol-prefix validator text, not vault references.

This closes the dedicated-test-namespace source correction at d9923c5e and supersedes the earlier incomplete URI classifications. Real metadata does not become synthetic because it appears in a unit test or in a namespace whose name includes “testing”. The old ledger snapshots remain historical evidence; their labels do not override this corrected assessment.

### Completed full-batch receipts at 1250e102

The supplied complete safe report is **4,067,868 bytes**, SHA-256 **`61cf88aa28c4dee9a22219f35a7f650aa398ce133e22551720896b658ba75d9a`**, at `tmp/public-candidate-evidence/completed-candidate-1250-safe-report.json`. I inspected the actual transferred command records, Python stdout/stderr, all assertion rows, complete original/filtered inventory rows, source admission and runtime identity records, rather than accepting the Implementer's index alone. All nine admission hashes match exact 1250 Git objects. The earlier install/check/unit/integration prefix is reused with its already-inspected counts.

| Remaining 1250 gate | Independent receipt check |
| --- | --- |
| Frozen Python sync | Existing `pnpm python:sync` invokes `uv sync --locked --all-packages`, exit **0**. Complete transferred stdout/stderr match original byte counts/hashes. Output installs editable SDK 0.0.153 and uvicorn in the same task root; the following frozen identity command resolves Python 3.15.2 and the SDK module from that exact checkout. Sync log SHA-256 `9d22d3616dfe0771ca6d8ac2743d5620312333a3cfb1fc1d7fb406b2b507ee57`. |
| Python after sync | Same `pnpm python:test:host`, exit **0**, **407 collected / 407 passed / 0 failed**, 6.32 s. Full transferred stdout/stderr match original byte counts/hashes. Log SHA-256 `75b05d81afcabafcc6ec09b2c4ebc3a333df10b9500b138f1a39b9691019bf58`. The initial exit-2 collection red is preserved separately; it earns no product-test credit. |
| Workerd host | Exit **0**; independently counted **78 files, 475 passed / 0 failed / 0 skipped**, no failure-message row. Original inventory **476** minus the exact one authorized Keychain row equals filtered **475**, as a multiset of file/name/project. The actual passed set equals that filtered multiset, with zero missing/extra rows. Its 78 unique positive argv paths equal the filtered file set, with no additional test-name/retry/bail filter. Log SHA-256 `23ca200ddf65ad50714cfb4913dac85a8ab5712e724619579829ed1ac9824b57`; original Vitest JSON `9f26e27360ff1e4a761c67345ebe87381587214af70585607b45c3ad0a951192`. |
| Node host | Exit **0**; independently counted **79 files, 474 passed / 0 failed / 2 skipped**, no failure-message row. Original inventory **475** minus exactly the same one Keychain row equals filtered **474**; the actual passed multiset equals the filtered multiset. Its 79 unique positive argv paths equal the filtered file set. Log SHA-256 `01b886831ed2eed7fa5f1871b74ee57b39f9f8ca01de5877c356973415312eca`; original Vitest JSON `a646ef4485959fd60dcaab29e6725d572823d4f9de732c451ba0c7e47a2b90f7`. |

The two Node skipped identities are the deploy-backfill case in `authorization-fence.host.e2e.test.ts:815–816` and the no-scheduled-handler case in `authorization-revision-drain.host.e2e.test.ts:289–290`. I opened their existing workerd-only `runIf` conditions and matched both exact file/test identities to one passing workerd assertion each. They are explained source-owned skips, not Node passes. The Keychain exclusion is exactly one offered row per host; no other offered row was dropped. Separately gated B2e files and the Node-only crypto file when unoffered on workerd remain outside these run claims.

The source tuple is clean 1250 before/between/after hosts. Receipts record 103 built JS artifacts and zero changed artifacts at both later checks. Four supplied original factor-browser observations each contain **12 passed steps**, with no artifact hash mismatch; both Node observations have **26 expected and actual invocation IDs**, identical complete recorded field maps, zero mismatch/unexpected, and the declared Node manifest identity. Harness bootstrap readiness remains false/none and is not counted as bootstrap proof. No screenshots, credential-bearing data or remote database rows were opened here; provider/siteverify/central/authenticator/clock stand-ins and sampled cleanup limits remain explicit.

These full-batch receipts close the missing Python/host evidence **for 1250e102 only**. They do not clear that older tree for publication because of the corrected vault metadata finding. Lead explicitly directs reuse of this full batch with **targeted config-contracts tests plus `pnpm check` at d9923c5e**; that reuse is justified by the complete two-file fixture-literal diff, with no product/runtime/lock change. The targeted final-head command/count/exit receipts have not yet arrived in the handback. G1 therefore remains open only for that affected proof and the final target comparison. No gate was run or repaired by this reviewer. The outgoing handoff remains blocked and has not been retried.

**NOT PUBLISHABLE — d9923c5e source correction checked; targeted final-head test/check receipts still pending (G1).**

### Targeted proof inventory check — 2026-11-17 04:45 UTC

The source remains clean at d9923c5e. The handback still has no scoped command results for this head. I independently compared `correction-config-expected-test-set.json` with the complete 1250 assertion rows: the expected config-contracts rerun is exactly **128 unit assertions in 11 files** and **one integration assertion in one file**, with equal file/hierarchy/status multisets. This is the expected inventory, not a new passing run. G1 still needs those actual final-head results and the complete quality-check receipt; no additional source or execution work is authorized here.

**NOT PUBLISHABLE — G1 final-head receipts remain pending.**

## Final scoped receipt review and verdict — 2026-11-17 05:02 UTC

**G1 closed. PUBLISHABLE: commit `d9923c5e64763d1bd849f97919c8f6fbf1d7d0e3`, exact tree `ce4a989842ff7117e52b4192f43ccb7d844efc8a`.** This supersedes the earlier checkpoint verdicts. C1–C4, including the dedicated operational test-vault correction, are closed for this tree. No publication-source blocker remains within the commissioned scope.

Authority: Lead message `01a1e7df-213e-77a0-9533-dd1880e1571a` requests the exact-tree verdict after inspecting the targeted receipts. I reopened the brief, final handback and report. The **113,852-byte** `tmp/public-candidate-evidence/scoped-d992-safe-report.json` has SHA-256 **`931692ac7bf5ebfd108ba0f55717e43973bfb2fac66858e23dc63b76589f648e`**, matching the supplied receipt. Its admission and final-source tuples both name clean d9923c5e / ce4a9898. The local candidate also remains clean at that exact tuple.

I independently matched both changed files' base/target SHA-256 values to their Git objects and checked all four unchanged dependency/script/Vitest/recipe references. A byte comparison establishes that replacing the old dedicated namespace with the example namespace is the **only** change: two occurrences in `oauth-config-test-fixture.ts`, four in `tool-portal-config.unit.test.ts`. There are exactly two changed paths; every other byte in those files is preserved after the intended substitution. This independently supports the scoped reuse of the complete, already-inspected 1250 batch for unchanged production, Python and host behavior.

### Fresh gates at d9923c5e

Commands ran on the supplied remote agent with Node **24.7.0** and pnpm **10.33.0**, in the source-bound isolated task checkout. Full command/environment records are in the scoped safe report and `scoped-d992-commands.md`.

| Gate | Observed command/result | Original combined-log SHA-256 |
| --- | --- | --- |
| Frozen install | `pnpm install --frozen-lockfile`, **exit 0** | `8170cfb38e54afc5b3afac7ec67ecb7c25d8cc34d8cb74ac7d8b6204c27d74be` |
| Complete quality gate | `pnpm check`, **exit 0; 12 distinct PASS rows / 0 failed**. Build, audits, lint, formatter, type-aware lint and typecheck are all present. | `16bac16fd3d3aeb585e260c253eec74e2f394d431f9235dfc58ad8267d52b4cb` |
| Config-contracts unit | `pnpm exec vitest run --config vitest.config.ts --project unit packages/config-contracts/src` with default/JSON reporters; **exit 0; 128 passed / 0 failed / 0 skipped, 11 files** | `4aac9652395b62d293d53881fbcb29559c7cb1b15e842ee3ffeac7bb3e25e67a` |
| Config-contracts integration | Same scope under `--project integration`; **exit 0; 1 passed / 0 failed / 0 skipped, 1 file** | `dd6505ba2e0cff9f7498577d3d8ad7591072500ccb1b94e8d4fc3e645b69fa54` |

I counted every transferred assertion, checked zero failure-message rows, and independently reconstructed the file/hierarchy/status multisets. **All 129 identities exactly equal the verified baseline config-contracts scope**, with no missing/extra case, skip or weakened assertion. Original unit JSON: **44,810 bytes**, SHA-256 `206ecda7b424a89eed781d798363af9040db8d07defb81f28a97733e14eab481`. Integration JSON: **1,061 bytes**, SHA-256 `4c17d0540b17b52aa362c212c2f96da66375ef544d5761dceb08a79202c9a4af`.

The three completed check/test command groups and sampled PIDs are recorded absent, with no signals. That is bounded group/sample evidence, not exhaustive process-birth tracking. An initial AST-helper diagnostic stopped before installation and was corrected without a product edit; it is not counted as a product red. The earlier formatter and Python collection failures remain preserved under their original heads and causes.

### Scope carried into the final decision

- Final manifest exactly equals Git's **1,593** mode/type/blob/path entries; SHA-256 **`54efe9ca63bfb5d38ad8fa73482ed3ccb870d2c9f3d10a19b41a549315f52e29`**. Current dispositions bind d9923c5e / ce4a9898: **7,548 rows, 7,213 technical/public + 335 synthetic/negative, zero unresolved**. This does not revive the earlier incorrect dedicated-vault classifications.
- The expanded independent URI re-sweep is current: all **15** complete references use explicit example-prefixed namespaces; zero matches against any old-tree non-example vault first segment. The other two occurrences are bare protocol-prefix validators.
- C2–C4 source corrections and all unchanged notice/licence/workflow/public-link coverage remain applicable. No source change beyond the inspected two-file namespace correction occurred.
- The reviewed full 1250 evidence remains labelled 1250: **2,654 unit, 314 integration, 407 Python, 475 workerd and 474 Node passes**, with zero failures after the preserved authorized setup correction. Node's **two workerd-only skips** remain skips; each passes under workerd. Exactly one authorized Keychain row was excluded per offered host inventory; no other offered row was omitted. Those full gates were not represented as fresh d992 runs.
- GitHub CI remains **NOT RUN** for the stated private-billing reason. Hosted identity/provider/vendor/real-central/deployment behavior, package/native/bundle redistribution, exhaustive process cleanup, private history and future public commit/ref metadata remain outside this source assessment. The disclosed exact shadcn registry/Pierre palette provenance limits are unchanged. No resolved credential or sensitive browser/database content was inspected or transferred by this review.

The source review and assigned receipt check are complete. No further G1 wake is needed; the pending wake was cancelled before firing, with no dispatched delivery. The automatic approval-review block on outgoing cross-session messages remains separate: I have not retried that handoff or treated it as delivered. This report is the authorized local deliverable.

The Lead still owns acceptance and the planned publication/cutover steps: create the separate parentless public commit with this exact accepted tree, inspect its approved metadata, preserve private writers/history, and perform the public-ref/hosted-CI/protection checks. This verdict does not authorize exposing the candidate's inherited private ancestry or claim those future actions have happened.

**PUBLISHABLE — exact tree `ce4a989842ff7117e52b4192f43ccb7d844efc8a` at `d9923c5e64763d1bd849f97919c8f6fbf1d7d0e3`, within the commissioned Git-source publication scope.**
