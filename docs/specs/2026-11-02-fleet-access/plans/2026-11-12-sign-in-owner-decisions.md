# Sign-in: the owner's 9 Nov decisions (switchboard #11 and #12)

Issued by the 🦁 Fleet access Lead (claude-local `cd5902e2-2105-4472-adde-031ae6496e30`) on 2026-11-12, at the owner's direction ("can you work on 1 and 2", "use an opus implementer and sol verify and sol reviewer"). This file is the governing assignment for the three sessions below. Corrections arrive as edits to this file, followed by a fresh role/files call.

## Outcome

Two switchboard draft PRs carry the owner's decisions of 9 Nov and pass the repository's checks on both sign-in hosts (Cloudflare/workerd with D1, and Node with better-sqlite3):

- **WS1, #11 (B3a, machine device login)**, branch `item2/b3a-device-grant`, at `227e6217f` when this was written.
- **WS2, #12 (B2 sign-in side)**, branch `item2/b2-sign-in-additions`, at `1668129fe` when this was written.

Order: WS1 first, then WS2. WS2's build starts only once the Reviewer's design pass (R-design below) has no open blocking finding on the B2 renew-on-use section.

## Governing sources (read in full before editing)

- B3 deliverable: `docs/specs/2026-11-02-fleet-access/deliverables/b3-machine-login.source.html`, especially `#b3-flows` (the device-login sequence) and `#b3-unknowns` ("Your decisions of 9 Nov").
- Program Design: `docs/specs/2026-11-02-fleet-access/program-design.source.html`, the `DecideDeviceLogin` / `DeviceLoginDecision` contract (around line 870) and the device-code states (around line 1590).
- B2 deliverable: `docs/specs/2026-11-02-fleet-access/deliverables/b2-central-organizations.source.html`, the section "Renewing the stamp when the organization is used", and its proof rows (`#b2-proof`).
- Owner decision pages: `tmp/2026-11-09-b3-decisions/b3-open.html` (rev .4) and `tmp/2026-11-09-b3-decisions/stamp-renew-on-use.html` (rev .4).
- The design commit carrying these changes: agent-vm `016a5e69` on `design/portal-remediation`. Diff it against `9b0be67d`.
- The switchboard `AGENTS.md` in each worktree.

All paths above are relative to `/Users/shravansunder/code/projects/agent-vm.design-portal-remediation` unless stated.

## WS1: #11, what changes (sign-in side only)

1. `DecideDeviceLogin` carries `codeExpiresAt`, the device code record's own expiry. Central stores it and refuses the first Grant at or after it. That central half is **not** built here.
2. `Approved` carries what central stored: `enrollmentId`, `label`, `allowedWorkspaces`. A repeat of the same request id returns the first approval unchanged. The sign-in approval result page shows central's returned label and workspaces, never the submitted form.
3. No stamp pin anywhere: no column, field or check.
4. Token lifetime stays central's per-organization setting. No issuer copy.
5. The central side is a **stand-in** that honours this contract. Name it in the handback as unverified until B3 central lands.

## WS2: #12, what changes (sign-in side only)

1. Remove the daily renewal trigger (Cloudflare scheduled handler / cron) and the Node daily timer, with their wiring and tests. It's a hard cutover, with no flag.
2. Renew-on-use exactly as the B2 section's rules 1–6 say:
   - the stamp record in extra organization columns via Better Auth `additionalFields` with `input: false`, like `fleetState`;
   - at most one sent stamp in doubt, re-sent byte-identical;
   - set and clear by conditional update;
   - unanswered and refused tries counted apart;
   - a valid stamp still makes the call, and an expired one answers the existing unavailable "try again shortly";
   - key-change re-sign of every organization kept.
3. The guard runs before each sign-in→Fleet call that exists on this branch. WS1's calls adopt it when the two branches meet. Whichever PR merges second wires the other's calls, and the handback says which calls were wired.
4. The schema change goes through the repository's existing Drizzle migration route for both hosts.

## Limits

- **Write scope:** `/Users/shravansunder/code/projects/switchboard.item2-b3a-device-grant` (WS1) and `/Users/shravansunder/code/projects/switchboard.item2-b2-sign-in-additions` (WS2) only. Nothing in codex-router, agent-fleet-sync, agent-vm (except the Verifier's own notes under its worktree `tmp/`), staging or production.
- **Commands:** the repository's own scripts (`pnpm install`, `pnpm check`, `pnpm test:unit`, `pnpm test:integration`, `pnpm lint`, `pnpm lint:types`, the `verify-auth` journeys), `git` on those two branches, and `gh pr` view/edit on #11–#14. Pushing to those two branches is allowed. Not allowed: `--force`, amend, stash, `--no-verify`, merging any PR, or deploying.
- Standing rules:
  - no wall clock in tests (inject the clock, wait on events);
  - UUIDv7 only, from the injected id source;
  - Drizzle injected, no raw SQL;
  - follow Better Auth's own grain;
  - no new or changed check gates or CI steps;
  - checked-in scripts are TypeScript;
  - no secrets, `op://` refs or test-account addresses in repos or PRs.
- Heavy or long runs go to the Sunclaw test agent (codex-local `01a1b755`), never ssh, if the Mac's free disk is under 30 GiB or a run is long.

## Sessions (agent-router SessionRefs, service `0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89`)

| Role | Session | Model / effort |
|---|---|---|
| 🐒 Implementer | claude-local `ccc121df-1cb9-4803-8100-ab588e93951b` | Claude Opus (`opus` alias), high |
| 🔬 Verifier (paired Checker) | codex-local `01a1cda2-c16d-74f2-a19d-423ad7ea3497` | OpenAI Sol `gpt-6.1-sol`, high |
| 🔎 Reviewer (independent Checker) | codex-local `01a1cda2-c280-7840-b852-6c6e054309b8` | OpenAI Sol `gpt-6.1-sol`, high |

The Implementer and Verifier work as a pair and talk directly. The Reviewer stays outside that loop.

## Checker duties

- **Verifier (paired verification):**
  - before each workstream's build, challenge whether the proof can tell a correct build from a wrong one;
  - after it, observe the adopted outcome on **both hosts** through the repository's harness and the `verify-auth` journeys (#13/#14 hold their maintenance), against the B2/B3 proof rows;
  - no product repairs, no changing an expected outcome.
- **Reviewer (independent review):**
  - **R-design (now):** review agent-vm `016a5e69` against `9b0be67d` for alignment with the owner's decisions on the two pages above, and with the switchboard code as it stands on the two branches. Flag anything in the docs that the code, Better Auth 1.7.x or central's existing replace path contradicts.
  - **R-code (later):** after the Lead accepts each PR, review its head. Read-only.

## Stop condition

- A workstream ends when its branch is pushed with `pnpm check` green, the Verifier's two-host observations recorded, and the handback sent.
- Stop and return to the Lead at once on:
  - a design break (a contract or owner decision that doesn't fit the code);
  - a needed change outside the write scope;
  - a failing gate you would have to weaken.

## Return and work log

- **Return:** the role handback to the Lead (claude-local `cd5902e2-2105-4472-adde-031ae6496e30`). For each claim, give the commit, the command or observation, and what it doesn't cover.
- **Work log:** no Router log. The Lead's trace is `~/dev/session-logs/projects/2026/2026-10-agent-vm/planbooks/2026-10-18-tool-portal-identity-advisor-claude-2febb449.md`. Helpers return their rows in the handback, and the Lead records them.
- **Messaging:** direct messages only. Don't subscribe to the coordination board.
