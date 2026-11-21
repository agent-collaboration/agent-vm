# Switchboard public cut: plan (Lead-authored, 17 Nov 2026, rev 2 after Sol review R1–R6)

## Owner decisions (17 Nov, all settled)
- **D1 A:** new public repository from one clean, parentless commit; today's repo stays private as history. Owner: "should we split it up to current private, rest public?". Lead: yes, that is A.
- **D2:** rename today's `agent-collaboration/switchboard` to `switchboard-history` (private, then archived); the new public repo is `agent-collaboration/switchboard`. Owner: "yes im fine with 2".
- **D3:** the same as AgentStudio. Owner: "agpl whatever i had for agentstudio, i can always go to less restrictive later".
  - AgentStudio has a LICENSE with the "Copyright (C) 2025 Shravan Sunder" header and the full AGPLv3 text, README "AGPL-3.0", `CLA.md`, and a CLA section in `.github/PULL_REQUEST_TEMPLATE.md`.
  - Switchboard copies that, with SPDX `AGPL-3.0-only`.
  - The CLA covers contributions made under it. It doesn't reach older third-party contributions or undo existing MIT grants (R5).
- **D4:** code plus a rewritten README, AGENTS.md and CONTRIBUTING; designs later. Owner: "yes to 4".
- **Go:** "open source is fine after you clean stuff" (16 Nov). Publication follows a clean re-audit of the exact candidate and Lead acceptance.

## Evidence
- Audit `tmp/2026-11-16-switchboard-prepublication/report.md` (F1–F6, S1–S4).
- Plan review `tmp/2026-11-17-switchboard-go-public/review.md` (NOT READY, R1–R6).
- The Lead re-read at `7bee7182`: `joint-central-pins.ts:10–30`, `oauth-config-examples.integration.test.ts:9–20`, `ci-workflow.unit.test.ts:58–62`, `panel-theme.css:1–9`, `auth-ui.css:5–8`, and 47 tracked files under `python/`.

## What stays private (only in switchboard-history)
- All history, the other branches and all tags.
- `docs/` entirely, except the two synthetic configuration examples that R3 moves into a fixture home.
- `tmp/`, all tracked images, `scripts/publish-local.sh`, `.github/workflows/release.yml`.
- **Process metadata in retained source:**
  - machine names (Sunclaw, Sunbook), signing team identifiers, Router push/approval IDs and handback references (for example `joint-central-pins.ts:12–29` and `contract-fixtures/*/README.md`);
  - links to private specs, plans or branches (for example `agent-bootstrap.md:98,114`).

  These are removed from comments and docs; the technical content and provenance stay.
- Real deploy values: already outside git (`private-file-access.ts:43`).

## What goes public
- Every package under `packages/` (sign-in included).
- `python/` (the existing SDK, retained unchanged except licence metadata; R6).
- `scripts/` except publish-local, `.github/workflows/ci.yml` and the local actions, `.claude/`, `.cursor/`, `.agents/` (rewritten per step 3), and the root configs and lockfile.
- New files:
  - `README.md` (with a licence application statement: original material is AGPL-3.0-only, subject to the listed third-party exceptions);
  - `AGENTS.md` and `CLAUDE.md` (pointer);
  - `CONTRIBUTING.md` and `CLA.md`, plus `.github/PULL_REQUEST_TEMPLATE.md` with the CLA assent section, adapted from AgentStudio;
  - `LICENSE` (full unmodified AGPLv3; header "Copyright (C) 2025-2026 Shravan Sunder");
  - `THIRD_PARTY_NOTICES.md` and `LICENSES/Apache-2.0.txt`.

## Steps (Implementer: Sol high)
1. Branch `pub/public-candidate` in the private repo from `origin/main` at the time of build, in an Agent Studio worktree.
2. Remove the private set with `git rm`.
3. **F1, process metadata:**
   - `.env.example`: empty variables with `<placeholder>` values; no `op://`, vault or item names.
   - AGENTS.md: the Switchboard contributor contract only.
   - `.agents/skills/verify-auth`: rewrite so every governing reference is inside the public tree. State the current technical expectations in the recipe itself; drop links to private specs, plans and branches. Generalize host and slot scheduling to "a machine you control". Example identities only.
   - Strip process metadata from code comments and fixture READMEs, keeping technical provenance (what a fixture was produced from, at which public commit, by which recipe).
   - `wrangler.example.jsonc:25`: Cloudflare's documented test sitekey `1x00000000000000000000AA`.
4. **F3, every retained copy, recorded in `THIRD_PARTY_NOTICES.md` with path, version or commit, copyright, licence text and modifications:**
   - Better Auth UI, MIT, © 2025 daveycodez, gitHead `2b028ec5…`: `packages/auth-ui/src/components/`, `src/lib/`, `src/index.ts` (adapted example), icons in `src/components/icons/`.
   - shadcn, MIT, © 2023 shadcn: `packages/tool-access-ui/src/components/ui/`, style `base-mira`. The exact registry revision is unknown; say so.
   - input-otp 1.5.0, MIT, © 2024 Guilherme Rodz, gitHead `3daad8fc…`: `packages/auth-ui/src/auth-ui.css:6–42`.
   - Cloudflare/Microsoft runtime declarations, Apache-2.0: both `worker-configuration.gen.d.ts`. Keep their headers; add `LICENSES/Apache-2.0.txt` and any upstream NOTICE.
   - BridgeWeb theme from AgentStudio (`panel-theme.css`, `sign-in-theme.css`): same copyright holder, AGPL-3.0. Record its provenance, and check AgentStudio's `bridge-app.css` for third-party pieces; record any.
   - Each copied **source file whose format allows comments** (TS, TSX, CSS, JS) gets a one-line header pointing to its notice entry. JSON and other structured or generated data files get no inline header: they are mapped to their full entry in `THIRD_PARTY_NOTICES.md` or an adjacent README. Their parsed producer objects must stay byte-identical, because the tests `JSON.parse` them (R7; `organization-provisioning-client.unit.test.ts:39–50`).
   - The BridgeWeb theme imports Tailwind, tw-animate-css and shadcn, and carries Pierre-derived palette and selection values (AgentStudio `bridge-app.css:11–13,153–169,278–287`). Record each in the inventory. Inventory any other copy you find (CSS, icons, generated files, producer fixtures) the same way and list it in the handback.
   - Package-artifact notice inclusion (`files: ["dist"]`) is deferred to the future release design; this cut is git-source only.
5. **F4:**
   - `"license": "AGPL-3.0-only"` in all 20 `package.json` files and in `python/agent-vm-agent-portal-sdk/pyproject.toml`.
   - The root virtual `pyproject.toml` gets none unless the format requires it.
   - Don't rename technical package or module names, protocol literals, or the `@agent-vm/tool-portal` compatibility oracle (`package.json:50`).
6. **F5:**
   - `release.yml` removed.
   - Replace `ci-workflow.unit.test.ts:58–62` with assertions for the adopted state: `release.yml` is absent, and no retained workflow grants `id-token: write` or `contents: write` or runs a publish step. Same strength, new truth.
   - CI branch filters target `main`.
7. **R3, configuration examples:**
   - Move `oauth-v3.config.jsonc` and `tool-portal-google-policy.config.jsonc` into `packages/config-contracts/src/test-fixtures/configuration-examples/` and retarget `oauth-config-examples.integration.test.ts`.
   - Keep the assertions at `:25–53` unchanged.
   - Their secret references stay obviously synthetic (example vault and item names), and they're documented as such.
8. **S3:**
   - README and package `repository`/`homepage`/`bugs` point to `github.com/agent-collaboration/switchboard`.
   - Rewrite only obsolete explanatory and ownership wording about agent-vm; technical identifiers stay.
9. **Classified sweeps (R4) over every tracked file in the candidate, hidden files and symlinks included:**
   - Patterns:
     - `/Users/` and home paths
     - `op://` and 1Password account domains
     - personal-provider emails
     - machine and host names (`sunclaw`, `sunbook`, `tailnet`, `.ts.net`, LAN IPs)
     - Router or approval IDs in prose
     - signing team IDs
     - private-key blocks
     - JWTs and credential assignments
     - URL userinfo
     - cloud account and zone IDs
     - provider-token patterns
     - high-entropy candidates
   - Any tracked image or binary is also a match.
   - Every match gets one of three dispositions:
     - **removed**;
     - **kept as a synthetic example or negative test**, with its purpose (for example `portal-attachment-contracts.unit.test.ts:43` `/Users/person/file`, which asserts rejection);
     - **kept as a verified non-sensitive technical or public value**, with its source and reason: public commit SHAs, artifact SHA-256 digests, producer records (for example `contract-fixtures/central-organization-admin/README.md:10–25`, `joint-central-pins.ts:18,29,38–42`). Private labels around them are neutralized while the value and its check stay (for example the `sunclawSigned` key becomes a neutral name such as `signedForDirectExecution`).
   - Private host, signing-team and approval metadata never qualifies for the third disposition.
   - Zero unresolved sensitive matches. Redact values in the report. Include the final file manifest.
10. **Gates on Sunclaw:** `pnpm install --frozen-lockfile`, `pnpm check`, unit and integration suites, `pnpm python:test:host`, and `pnpm test:e2e:host` on both hosts. A failure caused by a removed path that isn't covered above: report to the Lead and stop.
11. **Handback** in `tmp/2026-11-17-switchboard-go-public/work/implementer-handback.md`: the candidate head SHA, the tree hash, sweep dispositions, gate counts, the notice inventory, and every judgment call.

## After the build (Lead)
12. A fresh Sol reviewer audits **the exact candidate tree** (F1–F6, S2–S4, R1–R6) as the publication-source assessment.
13. Lead acceptance: the five conditions against this plan.

## The cut (Lead, in this order, R1)
14. **Freeze and inventory:**
    - List open PRs, branches, automation and consumers on today's repo. B1-B (#19) is open; it moves to the public repo as a patch.
    - Check for external `uses: agent-collaboration/switchboard/...` references.
    - Tell every agent with a Switchboard worktree to stop pushing.
15. **Build the public commit in a separate clean directory,** never in a checkout with private history:
    - `git init`, copy the accepted tree, one commit signed if signing works, authored and committed as the owner with their **GitHub noreply address** (`<id>+<login>@users.noreply.github.com`, from `gh api user`), never a personal email;
    - before any push, inspect and record the commit's author and committer names and emails, dates, the message (a neutral "Initial public release of Switchboard" plus licence line) and the signature key ID (R4);
    - verify there are no parents and the tree hash equals the accepted candidate tree.
16. Rename today's repo to `switchboard-history`.
17. **Repoint every local remote and worktree** on this Mac and Sunclaw that points at `agent-collaboration/switchboard.git`:
    - each goes to `switchboard-history.git`;
    - verify by `git remote -v` sweep.
18. Set `switchboard-history` read-only: archive it after B1-B's patch is taken.
19. **Create the public repo and push:**
    - `gh repo create agent-collaboration/switchboard --public`;
    - from the clean directory, push only `main` (no `--mirror`, no tags);
    - verify `git ls-remote` shows only `refs/heads/main` at the parentless commit.
20. **CI and protection:**
    - read the hosted CI results;
    - then protect `main`, requiring the aggregate `check` job (`ci.yml:81`);
    - record the bootstrap push as the one push before protection.
21. Point the main local checkout at the public repo through a fresh clone. B1-B's diff is applied onto public `main` as a new PR.

## Not in scope
History rewrite; npm/PyPI publishing and package-artifact notices (future release design); the Python SDK's future (flag only); public design docs (later, D4); live use of the Turnstile key.

## Unverified until the candidate audit
The full copied-source inventory; that nothing else reads a removed path; bundled native notices (nothing is distributed); GitHub-side settings, consumers and OIDC trust.
