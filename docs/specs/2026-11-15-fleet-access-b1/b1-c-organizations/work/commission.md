# B1-C commission (Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30)

## Authority
- **Owner go-ahead:** 16 Nov night, "yes to 4 and 5" (Decision 5: build B1-C, B2 additions and BG in order). Capacity: 17 Nov, "use paid credits and start B1-C now".
- **Owner picks for B1-C (15–16 Nov):** recorded on `decisions.html`: today's card; its own shadcn People page; an owner-only list with email fallback; Better Auth's behaviour after a refused switch, with a redirect.
- **Read the whole design first,** all seven pages in `docs/specs/2026-11-15-fleet-access-b1/b1-c-organizations/`. Your packet is on `plan.html`:
  - the Implementer reads Packet 1;
  - the Verifier reads Packet 2.

  The design pages are the authority; the packet steps are only a checklist. Where they differ, the design wins: stop and ask the Lead. This file is only logistics.

## Repository and base: the public repo
- Switchboard has been public since 17 Nov: `https://github.com/agent-collaboration/switchboard` (AGPL-3.0-only). Main checkout: `/Users/shravansunder/code/projects/switchboard-public`.
- **Base:** `origin/main` at `b03d35ff` (B1-A is included; B1-B is not yet landed).
- **Worktree, already created for the Implementer:** `/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished`, branch `b1c/organizations-finished`.
- The plan's "f3b2b88b is the design baseline" still holds for reading the design; build on the public base.
- **Never** use `/Users/shravansunder/code/projects/switchboard` or its worktrees. They're the private `switchboard-history`.
- **B1-B overlaps** (sign-in pages, `owner-page.tsx`, test-support). B1-B lands on public `main` later; whichever lands second merges `main` in and resolves conflicts. Don't copy B1-B code.
- **Design and work folder:** agent-vm worktree `/Users/shravansunder/code/projects/agent-vm.design-portal-remediation`. Returns go in `docs/specs/2026-11-15-fleet-access-b1/b1-c-organizations/work/`; write only your own return files there.

## The pair
- 🐒 **Implementer:** OpenAI Sol, high effort, codex-local, with the SessionRef in this file's addendum.
- 🔬 **Verifier:** OpenAI Sol, high effort, codex-local, with the SessionRef in this file's addendum.
- **Same-lineage gap:** Claude helpers are rate-limited until about 19 Nov, and no Opus verification row exists. The fresh review includes a different lineage when available.
- Talk directly about setup, reproductions, repairs and rechecks. Blockers and design questions go to the Lead.

## Where things run
- Targeted unit and integration tests run locally.
- **Heavy runs go to the owner's Sunclaw test agent,** as self-contained packets: full host sweeps on both hosts (workerd and Node), real Chrome, and full-suite sweeps.
  - Address: serviceId `8b61218b-d5f3-4ae9-a2db-d2fb4075dbc2`, endpoint `codex-local`, session `01a1b755-5c31-7690-b2b4-5b116d355a7a`. No SSH.
  - **Owner authority to cite in every packet:** agent-vm commit `0446841f`, `docs/specs/2026-11-02-fleet-access/plans/2026-11-12-sign-in-owner-decisions.md:568`, "Owner decisions, 13 Nov", item 2 (Sunclaw: yes).
  - If your own approval check still blocks a send, report it to the Lead at once. Never resend or reroute.
- **Lessons from B1-B, follow them:**
  - Packets clone `https://github.com/agent-collaboration/switchboard.git` (public).
  - Run `pnpm python:sync` before Python tests, as CI does.
  - The formatter is the lockfile's pinned version (oxfmt 0.75.0), not one borrowed from elsewhere.
  - Vitest 4.1.5 doesn't forward the CLI exclude to inline projects. On Sunclaw (Darwin), pass the complete positive file list minus exactly `packages/sign-in-owner-cli/src/fleet/macos-keychain-proof-key-store.host.e2e.test.ts`, and prove inventory equality.
  - Install with no global installs, using the node-gyp script in B1-B's `work/commission.md`.
- **Heavy runs never run on the owner's Mac.**
- **GitHub CI now runs** (the repo is public). The draft PR's CI must be green; `main` requires the `check` job.

## Standing rules
- Never print secrets. No `op://` refs, credentials or test-account addresses in commits, PRs or packets.
- No new CI gates or check-script changes beyond what the design names.
- No wall clock in tests. UUIDv7 only. Drizzle injected; no raw SQL. No DI library.
- Pure transitions with closed unions and inline `x satisfies never`; Hegel property tests where the design names them.
- Better Auth's own organization plugin and Better Auth UI as shipped, with shadcn parts used properly. No patches.
- Copied third-party code gets its provenance header and a `THIRD_PARTY_NOTICES.md` entry.
- No Python added. No stash, `--amend`, `--no-verify` or force-push.
- 1Password-signed commits; after two failed attempts, `--no-gpg-sign`.
- The Implementer opens one draft PR on the public repo. Merging is the Lead's, after verification, Lead acceptance and a fresh review.

## Work log and returns
- No board thread (`no-home`). Only the Lead writes the trace.
- **Implementer:** `work/implementer-handback.md`, as Packet 1 says.
- **Verifier:** `work/verifier-observation.md` and `work/evidence/`, as Packet 2 says. Scratch goes in `/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/tmp/2026-11-17-b1-c-verifier/`.
- **The declared target** is the PR head commit the Implementer names; verify only a pinned commit.

## Addendum: session addresses
- Implementer SessionRef `{serviceId: 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89, endpointId: codex-local, sessionId: 01a1e93c-01c2-7b52-826f-b04571b02916}`
- Verifier SessionRef `{serviceId: 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89, endpointId: codex-local, sessionId: 01a1e93c-020f-7dd3-984d-d2f0c49c53ce}`
