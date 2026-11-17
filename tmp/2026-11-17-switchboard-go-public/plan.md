# Switchboard public cut: plan (Lead-authored, 17 Nov 2026)

## Owner decisions (17 Nov, all settled)
- **D1 A:** new public repository from one clean commit; today's repo stays private as history. Owner: "should we split it up to current private, rest public?". Lead: yes, that is A.
- **D2:** rename today's `agent-collaboration/switchboard` to `switchboard-history` (private, read-only after the cut); the new public repo is `agent-collaboration/switchboard`. Owner: "yes im fine with 2".
- **D3:** the same as AgentStudio. Owner: "agpl whatever i had for agentstudio, i can always go to less restrictive later".
  - AgentStudio (`getagentstudio/agentstudio`) has a LICENSE with the "Copyright (C) 2025 Shravan Sunder" header and the full AGPLv3 text, README "AGPL-3.0", and a `CLA.md`.
  - Switchboard copies that. Package fields need an SPDX ID: `AGPL-3.0-only`. The CLA keeps relicensing with the owner.
- **D4:** code plus a rewritten README, AGENTS.md and CONTRIBUTING; designs later. Owner: "yes to 4".
- **Go:** "open source is fine after you clean stuff" (16 Nov). Publication follows a clean re-audit and Lead acceptance.

## Evidence
`tmp/2026-11-16-switchboard-prepublication/report.md` (Sol, 01:48Z, `7bee7182`): F1–F6, S1–S4. The Lead re-read F1 to F5's anchors at `7bee7182`.

## What stays private (only in switchboard-history)
All history and the 22 other branches. `docs/` entirely (specs, wip, superpowers, plans, reference, subsystems; D4). `tmp/`. All tracked images. `scripts/publish-local.sh`. `.github/workflows/release.yml`. The prototype using the AgentStudio Bridge theme. Real deploy values are already outside git: `private-file-access.ts:43` refuses in-repo paths, and the templates use `__PLACEHOLDERS__`.

## What goes public
Every package under `packages/` (sign-in included), `scripts/` except publish-local, `.github/workflows/ci.yml` and the local actions, `.claude/`, `.cursor/`, `.agents/` (scrubbed), and the root configs and lockfile. Plus a new `README.md`, `AGENTS.md`, `CLAUDE.md` (pointer), `CONTRIBUTING.md`, `CLA.md` (from AgentStudio, names adapted), `LICENSE` (AGPLv3, header "Copyright (C) 2025-2026 Shravan Sunder") and `THIRD_PARTY_NOTICES.md`.

## Steps (Implementer: Sol high)
1. Branch `pub/public-candidate` in the private repo from `origin/main`, in an Agent Studio worktree.
2. Remove the private set above with `git rm`.
3. **F1:** in `.env.example`, empty variables with `<placeholder>` values; no `op://`, vault or item names. In AGENTS.md, rewrite to the Switchboard contributor contract (tests, checks, standards) with no credential locations, deploy names, host slots or machine names. In `.agents/skills/verify-auth`, generalize the private host and slot scheduling (`organization-statements.md:33`, `revision-fences.md:27`) to "a machine you control"; use example identities only.
4. **F3:**
   - `THIRD_PARTY_NOTICES.md` with the Better Auth UI MIT notice (copyright 2025 daveycodez, upstream gitHead `2b028ec5256d6f04879c1a6a1d83822ac23e896f`, path) and the shadcn MIT notice (copyright 2023 shadcn).
   - A one-line header in each copied file under `packages/auth-ui/src/components/` and `packages/tool-access-ui/src/components/ui/`: `// Adapted from <upstream> (MIT). See THIRD_PARTY_NOTICES.md.`
   - Record the shadcn registry style (`base-mira`). The exact registry revision is unknown; say so.
5. **F4:** set `"license": "AGPL-3.0-only"` in all 20 `package.json` files (root included) and `pyproject.toml`.
6. **F5:** `release.yml` removed (step 2). Nothing publishes to npm or PyPI; a later release design adds a trusted gate. Point CI's branch filters at `main`.
7. **S3:** README, package `repository`/`homepage`/`bugs` point to `github.com/agent-collaboration/switchboard`; remove agent-vm wording in public files.
8. **Sweeps on the candidate tree, each must be empty:**
   - `/Users/`
   - `op://`
   - personal-provider emails
   - `sunclaw`, `tailnet`, `ts.net`
   - 1Password account domains
   - tracked image files
   - the audit's provider-token patterns
9. **Gates on Sunclaw** (heavy-run rules from the B1-B commission): `pnpm install --frozen-lockfile`, `pnpm check`, unit and integration suites, `pnpm test:e2e:host` on both hosts. Removing docs must not break a test or script. If one reads a removed path, report it to the Lead and stop.
10. **Handback** in `tmp/2026-11-17-switchboard-go-public/work/implementer-handback.md`: the candidate head SHA, sweep outputs, gate counts, and every judgment call.

## After the build (Lead)
11. A fresh Sol reviewer audits **the exact candidate tree** (F1–F6, S2–S4 closed; new findings), as the publication-source assessment.
12. Lead acceptance: the five conditions against this plan.
13. **Cut:**
    - `gh repo rename switchboard-history` on today's repo;
    - `gh repo create agent-collaboration/switchboard --public`;
    - an orphan single commit of the candidate tree, signed if signing works, authored by the owner identity;
    - push `main`, then confirm CI runs on hosted runners;
    - enable branch protection on `main` (required CI).
14. **Local follow-up:**
    - repoint local remotes and worktrees: the main checkout goes to the public repo, and history worktrees point at `switchboard-history`;
    - B1-B and later work open their PRs on the public repo (B1-B's diff is applied onto the public `main`).

## Not in scope
History rewrite of switchboard-history; npm/PyPI publishing; the Python SDK's future (the owner's no-Python rule is about new work; flag it, don't change it); promoting designs into public docs (later, D4).

## Unverified until the re-audit
That removing `docs/` breaks no test or script; that no copied code outside the two UI folders exists; native-binary bundled notices (we don't ship binaries).
