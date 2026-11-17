# Switchboard public-cut plan review

**NOT READY — six findings below.** The fresh public repository is the right boundary, but the plan needs corrections before implementation and publication.

**Is there anything that should stay private? Yes.** Keep the inherited Git history, other branches, recovery/deployment records, real credential locations, personal data, working screenshots and private host/signing/process metadata private. The proposed exclusions cover most of this. They do not cover all retained package comments and verification instructions. In particular, `packages/sign-in-test-support/src/test-fixtures/b2e/joint-central-pins.ts:12,25–29` retains a private build-host name, signing-team identifier and internal handback reference outside the two skill files named for scrubbing. Fixture READMEs also carry private Router decision references. Publish the useful contracts and fixture provenance after removing that process metadata.

I found no source-based reason in this bounded review to keep an entire Switchboard package, including sign-in, private. Copied themes/code need rights and notices established; their presence is not itself a confidentiality finding. No live credential or current application vulnerability is established here.

## Target, authority and limits

- Governing commission: [review-brief.md](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/tmp/2026-11-17-switchboard-go-public/review-brief.md:1), independent design/source review with six prescribed checks. This is not delivery acceptance.
- Plan: agent-vm commit `af934ed8cc9e6c53edf21e3a27aa1a8af766ac8d`, blob `d309c7414d94c8a81d17d0d66a64d295e1979fce`, [plan.md](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/tmp/2026-11-17-switchboard-go-public/plan.md:1). No authoring history in this session.
- Switchboard: `7bee7182d1a87073cdc9795270aaa994c28e21ef`. Every Switchboard source anchor below names this revision. Reads used `git show`/`git grep` with that revision; the checkout HEAD is not substituted for it.
- Original audit: [report.md](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/tmp/2026-11-16-switchboard-prepublication/report.md:21). Findings, provenance, workflow assessment and collection limits were inspected; the historical dependency inventory was not independently repeated.
- AgentStudio comparison: `d77e97bb320e1788b475f72aaf1ee042a0b61f14`, specifically `LICENSE`, `CLA.md`, `.github/PULL_REQUEST_TEMPLATE.md`, README licensing text and `BridgeWeb/src/app/bridge-app.css`.
- Grant: inspect sources and write this report only. No installation, build, test suite, scanner, credential resolution, exploit, deployment, GitHub mutation, commit, push or publication was performed. Primary public platform/licence documents were retrieved read-only. Model/effort metadata is unavailable; the brief's “Sol xhigh” label is not independently verified.
- Work log: supplied `no-home`. No fallback trace path/writer is granted; this report returns the material observations and remaining work to the Lead. No board was created. No additional reviewers were commissioned.

## Findings

### R1 — P1: freeze and redirect private writers before reusing the old name

**Plan anchors:** `plan.md:47–54`. Step 13 reuses the original repository name; step 14 updates private worktree remotes afterward. No step enforces the promised read-only state of `switchboard-history` (`:5`).

GitHub documents that reusing the old name removes the redirect to the renamed repository. An existing checkout still pointing at `agent-collaboration/switchboard` then addresses the new public repository. A push of a private topic branch can expose its inherited history; a normal `main` push may refuse, but that does not protect newly named branches. Main-only branch protection is not a confidentiality boundary for other refs. This is a risk introduced by the ordering, not evidence that any such push happened. See [GitHub's rename rules](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository).

**Required correction:** prepare and verify the parentless public commit locally before changing repository names. Freeze all private writers/automation, inventory open PRs and consumers, rename the old repo, repoint and verify every private remote, and enforce the old repo's read-only state before reusing the original name. Use a separate clean public checkout; do not give a private-history object store the public push remote. Only then create/push the new public repository. If any private writer cannot be accounted for, hold name reuse.

The cut receipt must establish that the final commit has no parents, its tree equals the accepted candidate tree, and the public server advertises only the intended branch and no inherited tags/other refs. Push only that branch, with no mirror/all-tags operation. Then read actual hosted CI results and enforce/verify protection against the aggregate `check` job (`7bee7182:.github/workflows/ci.yml:81`); record the initial bootstrap push as the deliberate exception before protection.

Open PRs/issues and Actions history remain associated with the renamed repository; they are not transplanted into the new one. Old numbered links cannot be relied on once the name is reused. External `uses: agent-collaboration/switchboard/...` references need explicit review because GitHub does not redirect hosted-action calls. Local `uses: ./.github/actions/...` references do not depend on repository-name redirects. [Archiving](https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories) makes the old repository and its PRs read-only, so settle or record pending work first. Live PRs, consumers, settings, automation and registry trust were not queried here and remain cut prerequisites.

### R2 — P1: the proposed notices omit retained third-party source

**Plan anchors:** `plan.md:16,25–28,60`. Step 4 names Better Auth UI and shadcn only; the remaining source clearance is deferred. Direct reads show additional retained copies:

| Source at `7bee7182` | What the anchor establishes | Required treatment |
| --- | --- | --- |
| `packages/auth-ui/src/auth-ui.css:6–42` | Explicitly identifies copied `input-otp` 1.5.0 rules, with substantial inline CSS. | Add its MIT copyright/permission/disclaimer and path/version provenance. The exact version's registry gitHead is `3daad8fc88c9a041dbce98e97185efd65b3d87de`; its [LICENSE](https://raw.githubusercontent.com/guilhermerodz/input-otp/3daad8fc88c9a041dbce98e97185efd65b3d87de/LICENSE) names Guilherme Rodz, 2024. |
| `packages/sign-in-host-cloudflare/worker-configuration.gen.d.ts:42–56`; `packages/tool-host-cloudflare/worker-configuration.gen.d.ts:23–37` | Checked-in Cloudflare/Microsoft runtime declarations retain Apache-2.0 headers. This is source redistribution even without native binaries. | Preserve those headers and supply the Apache-2.0 licence text plus any applicable upstream NOTICE. [Apache section 4](https://www.apache.org/licenses/LICENSE-2.0) requires a licence copy; a URL in a header is not the whole treatment. |
| `packages/tool-access-ui/src/panel-theme.css:1–9`; package manifest `:29–30,44`; `packages/sign-in-core/src/pages/sign-in-theme.css:1` | A BridgeWeb theme remains in the public package, is copied into build output, and styles sign-in too. Its opening matches AgentStudio's `BridgeWeb/src/app/bridge-app.css:1–9`. | Record the actual AgentStudio provenance, copyright/licence or owner's rights basis and any included third-party pieces. Excluding the prototype in `docs/` does not exclude this copy. Do not remove the required theme merely to satisfy the exclusion. |

The Better Auth UI and shadcn MIT notices/copyright holders in the plan match the primary [pinned Better Auth UI licence](https://raw.githubusercontent.com/better-auth-ui/better-auth-ui/2b028ec5256d6f04879c1a6a1d83822ac23e896f/LICENSE) and [shadcn licence](https://raw.githubusercontent.com/shadcn-ui/ui/main/LICENSE.md). `packages/tool-access-ui/components.json:3` confirms `base-mira`. The missing exact registry revision is an honest provenance limit, not by itself evidence that MIT permission is missing.

Make the copy inventory cover CSS, `auth-ui/src/lib/`, inline Google/GitHub icons (`src/components/icons/`), generated declarations and producer fixtures as well as the two component directories. `auth-ui/src/index.ts:1–4` identifies adaptation from the pinned upstream example. Preserve technical producer provenance in `sign-in-core/contract-fixtures/*/README.md`; remove private approval-message references separately. No separate tracked font binaries were found in the inspected tree; the theme's font names are system font stacks. Dependency-installed or bundled icons/fonts/native components have not been exhaustively cleared.

For this Git-source-only cut, do not invent binary-distribution work for dependencies that are merely lockfile entries. Conversely, ensure copied source notices travel in the public Git archive now. Any later npm/Python/browser-bundle distribution needs its own notice inclusion proof: both UI manifests currently list only `dist` (`packages/auth-ui/package.json:11–13`, `packages/tool-access-ui/package.json:11–13`), so a root-only notices file and ordinary `//` comments do not establish that packages/bundles will carry the full notices.

### R3 — P1: deletion already has two known test failures; plan their repairs

**Plan anchors:** `plan.md:16,23,40,60`. These are deterministic source dependencies, not merely unknowns to discover after deletion:

1. `7bee7182:packages/config-contracts/src/oauth-config-examples.integration.test.ts:9–20` loads `docs/reference/configuration/examples/oauth-v3.config.jsonc` and `tool-portal-google-policy.config.jsonc`. `loadJsonConfigFile` calls real `readFile` (`src/json-config-file.ts:23–24`), so deleting the examples throws before compilation/assertions. The test is included by `vitest.config.ts:164–170`. It should catch a bad public configuration/policy example, and currently asserts the compiled per-agent grants/defaults at `:25–53`; retain that behavioral coverage. Move scrubbed synthetic examples into the retained fixture home and retarget the test, or preserve equivalent examples in a permitted public location. They do not need to stay private solely because they presently live under `docs/`.
2. `7bee7182:scripts/ci-workflow.unit.test.ts:58–62` unconditionally reads the removed `.github/workflows/release.yml` through real `fs.readFile` (`:7–8`). It is included by `vitest.config.ts:149–153`. Its old assertion prevents accidentally enabling the inherited release policy on main. Replace it with a meaningful assertion for the adopted state: the inherited release workflow is absent and CI has no replacement privileged publishing path. Keeping the old file or dropping the safety coverage would not close F5.

Add these bounded adaptations to the implementation plan now. Step 9's stop rule otherwise guarantees an avoidable handback. No tests were run in this review; the predicted missing-file failures are source conclusions. The corrected candidate still needs the plan's actual install/check/unit/integration/host runs.

The retained public verification recipe also needs rewriting: `.agents/skills/verify-auth/references/agent-bootstrap.md:98,114` makes excluded private specs/plans at old commits and a private branch its governing sources. A fresh public repository cannot resolve that history. Put the required current technical expectations in the retained recipe or link a reachable public contract; retain any legacy Gateway-pairing scope only with its prerequisites and proof limits explicit. Generalizing the host name alone does not make that recipe usable.

Other inspected references are not all failures: `scripts/audit-portal-architecture.ts:1810–1843` handles absent documentation roots as empty; `scripts/audit-openclaw-removal.ts:109–116` does likewise. `gateway-approval-presentation-schema.unit.test.ts:16` uses `docs/README.md` as string data, not a file read. The workspace package glob is `packages/*`. No additional removed-path runtime read was found in the targeted reference searches; this is not a successful build claim.

### R4 — P2: step 8 needs classified matches and wider metadata coverage

**Plan anchors:** `plan.md:24,32–39`. The blanket “each must be empty” gate both misses private material and rejects intentional synthetic coverage.

- Retained internal metadata exists outside the two skill files named for scrubbing: `joint-central-pins.ts:12–29` has host/signing/handback details. `sign-in-core/contract-fixtures/central-authorization-revisions/README.md:5` and `central-provisioning/README.md:7` retain private Router approval references. The listed patterns do not recognize those references or signing identifiers.
- `packages/sign-in-host-cloudflare/wrangler.example.jsonc:25` embeds a concrete Turnstile sitekey rather than a deliberate placeholder or one of the documented [dummy sitekeys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/). A sitekey is not a secret, and its owner/live use was not established. Nonetheless, this contradicts the plan's blanket claim that retained deploy templates already use placeholders. Replace it or document an intentional public example; do not test its live service.
- `packages/agent-portal-sdk/src/portal-call-surface/models/portal-attachment-contracts.unit.test.ts:43` deliberately passes `/Users/person/file` to assert rejection. Deleting that negative case to get a zero sweep would weaken proof. The caller checks a host path is rejected, and the schema's anchored guest-path regex supplies that boundary (`portal-attachment-contracts.ts`, `PortalAttachmentResultSchema`).
- Copying the needed OAuth fixture unchanged would also retain explicitly synthetic secret references. Generic examples are a classification decision, not evidence of real credential locations.

Specify exact patterns, tracked-file coverage including hidden files and symlinks, expected exclusions and per-match dispositions. Keep zero unresolved sensitive matches; permit narrowly documented synthetic examples/negative fixtures with their test purpose. Include private-key blocks, JWT/credential assignments, URL userinfo, cloud resource identifiers, LAN/host/account details and contextual high-entropy candidates, rather than provider-token prefixes alone. Review unusual/binary/encoded files and the final file manifest. Redact matches before reports. Recheck the exact final parentless tree and all refs actually exposed, including commit author/committer metadata. Nothing here asks to publish or rewrite the old history.

### R5 — P2: copied CLA refers to a PR assent mechanism the plan omits

**Plan anchors:** `plan.md:7–9,19`. AgentStudio's `CLA.md:35–39` expressly refers to a CLA section in its PR template. That section exists in AgentStudio's `.github/PULL_REQUEST_TEMPLATE.md`; Switchboard `7bee7182` has no PR template, and the proposed public list adds none.

Copy/adapt the matching template section and connect CONTRIBUTING/README to it, or deliberately revise the copied CLA to the actual contribution mechanism. A new CLA only speaks to contributions made under it; it does not establish rights over older third-party contributions or undo existing MIT grants. The statement “The CLA keeps relicensing with the owner” therefore needs that limit. This is a source/workflow consistency finding, not an assessment of enforceability.

### R6 — P2: name the retained Python tree and its actual licence target

**Plan anchors:** `plan.md:19,29,57`. The public list names `packages/`, scripts and root files but omits `python/`, while step 5 says only `pyproject.toml`.

At `7bee7182`, the actual MIT field is `python/agent-vm-agent-portal-sdk/pyproject.toml:7`; the root `pyproject.toml` is a separate virtual workspace with no licence field. Root scripts still run/build/typecheck/test that SDK (`package.json:18–27`), `pyproject.toml` includes `python/*`, and retained CI runs `pnpm python:test:host` (`ci.yml:40–41`). Applying AGPL only to the root file leaves the published source's SDK metadata MIT; omitting the Python directory breaks retained commands and coverage.

Explicitly retain the existing Python SDK under this cut, as the plan's no-rewrite scope intends, update its exact manifest path, and leave technical module/package names unchanged unless a separate migration is authorized. Likewise, restrict “remove agent-vm wording” to obsolete explanatory/ownership text: `package.json:50` intentionally pins the existing `@agent-vm/tool-portal` compatibility oracle, and protocol path literals still contain that spelling. A textual sweep must not become an unplanned API/package/fixture migration.

## Licence conclusion

`AGPL-3.0-only` is a valid and suitably precise identifier for the selected v3-only policy; [SPDX distinguishes it from the or-later grant](https://spdx.org/licenses/AGPL-3.0-only.html). Retain the full unmodified AGPLv3 text with the project's separate copyright header, as planned. Add a clear project application statement in README/CONTRIBUTING that original project material is under AGPL-3.0-only, subject to listed third-party exceptions. The full licence's illustrative “or later” appendix must not be mistaken for the project's application notice. [GNU's text](https://www.gnu.org/licenses/agpl-3.0.html) is the governing licence source.

The proposed AgentStudio-style CLA and AGPL combination is coherent for future contributions once R5 is fixed. Preserve upstream MIT/Apache and applicable AgentStudio notices; a package-level AGPL field does not erase them. This review does not certify ownership of every historical contribution or every bundled dependency. Native MPL/LGPL/source/relinking and CC-BY attribution remain distribution-dependent: record why each is not shipped in this source cut, and reopen the applicable obligations when artifacts are distributed.

## Original audit coverage

“Covered” below means a credible planned treatment, not an implemented closure.

| Audit item | Plan treatment | Review disposition |
| --- | --- | --- |
| F1 secret locations/deployment metadata | Exclude docs/publish script; rewrite env/AGENTS/skill. | Partial: R4 expands retained-source cleanup. |
| F2 personal data/history | New parentless repository, old history private; docs removed. | Covered in principle; R1 must prevent private-ref leakage and R4 must inspect final metadata. |
| F3 copied UI notices | MIT notices and component provenance. | Partial: R2 adds actual retained copies and distribution limits. |
| F4 AGPL | LICENSE/CLA and manifest fields. | Partial: R5/R6 plus explicit application statement above. |
| F5 privileged release workflow | Remove `release.yml`; defer publishing. | Correct treatment; R3 must adapt the retained safety test. Manual publishing scripts remaining in source do not by themselves create an automatic release trigger. |
| F6 working records/images | Remove docs/tmp and every tracked image. | Covered if the final manifest verifies those exclusions. No image was visually cleared by this review. |
| S1 historical test private key | Publish no inherited history. | Does not apply to the parentless candidate if no old refs are exposed. No claim about deployment reuse/rotation is made. |
| S2 old security discussion | Keep docs/history private. | Covered; this is not evidence that old agent-vm findings are current Switchboard vulnerabilities. |
| S3 old product/release metadata | Rewrite product docs/manifest URLs; remove release workflow. | Covered subject to R6's exact Python and compatibility boundaries. |
| S4 copied/generated/dependency obligations | Two UI notices; source gaps deferred to re-audit. | Incomplete: R2 identifies definite retained source requiring treatment now; native artifact work can remain deferred if genuinely unshipped. |

## Evidence and remaining proof

Source routes used, in order: pinned local plan/audit and Switchboard files; sibling AgentStudio prior art; current primary GitHub/licence/Cloudflare sources. Memory was discovery only and supplies no substantive current finding. DeepWiki/Firecrawl tools were not advertised; public search used Perplexity and primary-page extraction used Tavily. A standard web-tool request failed with HTTP 404 before returning evidence; the primary pages were subsequently retrieved through extraction. No saved-reader, session-transcript or browser-runtime research was needed. No independent extra countercheck was commissioned: this is the bounded independent checker assignment itself.

Principal local reference searches were `git grep -n -I -E '(docs/|tmp/|publish-local|release\.yml)' 7bee7182` over retained paths, followed by exclusions of generated declarations/fixture JSON to inspect consumers; and retained-path searches for `(sunclaw|Sunclaw|Sunbook|tailnet|\.ts\.net|1password\.(com|ca|eu)|/Users/)`. Tracked asset/notice/publisher paths were listed with `git ls-tree -r --name-only 7bee7182`. These were file/reference inspections, not a rerun of the original full-history scanner. Initial broad outputs were truncated; decisive findings were reopened individually with explicit file/line reads. Wrong-repository/path lookups that returned invalid-object/missing-path errors supplied no evidence and were corrected before any claim.

Public search queries were `site:docs.github.com renaming repository GitHub Actions redirect previous name reused` and `site:docs.github.com actions workflow syntax jobs steps parallel keyword`. The latter possible concern was **refuted**: current [GitHub workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idstepsparallel) explicitly supports step groups using `parallel`; it is not a finding. Other primary documents opened are linked at the claims they support. Exact-version input-otp registry metadata supplied the licence pin above. No private source or credential value was sent to research services.

**Checks run:** source inspection only; no automated suite, lint/typecheck/build or runtime proof was authorized or run. Pass/fail counts are therefore **NOT RUN**, not zero failures. Switchboard's `git status --porcelain=v1` was empty, exit 0, at the final source check; `origin/main` still resolved to `7bee7182d1a87073cdc9795270aaa994c28e21ef`. Agent-vm already contained unrelated working changes; this assignment writes only this report and makes no clean-worktree claim for that checkout.

**Still unverified:** no scrubbed candidate was inspected in this review; actual gate results, both host selections/skips, final file/ref/commit metadata, fresh publication audit, all copied-source ownership, complete bundled notices, hosted CI, branch protection, old-repo archival, live PRs/action consumers, and registry/OIDC trust. The five-condition Lead acceptance and publication remain the Lead's responsibility. After correcting the plan, implement the candidate and collect the real receipts; do not treat this report as clearance to publish.
