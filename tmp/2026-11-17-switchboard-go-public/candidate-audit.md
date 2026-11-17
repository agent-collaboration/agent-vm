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
