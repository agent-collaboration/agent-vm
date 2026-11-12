# Sign-in: the owner's 9 Nov decisions (switchboard #11 and #12)

Issued by the 🦁 Fleet access Lead (claude-local `cd5902e2-2105-4472-adde-031ae6496e30`) on 2026-11-12, at the owner's direction ("can you work on 1 and 2", "use an opus implementer and sol verify and sol reviewer"). This file is the governing assignment for the three sessions below. Corrections arrive as edits to this file, followed by a fresh role/files call.

## Outcome

Two switchboard draft PRs carry the owner's decisions of 9 Nov and pass the repository's checks on both sign-in hosts (Cloudflare/workerd with D1, and Node with better-sqlite3):

- **WS1, #11 (B3a, machine device login)**, branch `item2/b3a-device-grant`, at `227e6217f` when this was written.
- **WS2, #12 (B2 sign-in side)**, branch `item2/b2-sign-in-additions`, at `1668129fe` when this was written.

Order: WS1 first, then WS2. WS2's build starts only once the Reviewer's design pass (R-design below) has no open blocking finding on the B2 renew-on-use section. **Status (Lead, 12 Nov):** R-design is cleared. It found no blocking finding on B2 renew-on-use. F1 (the `Approved` field names) and O1 were fixed in agent-vm `1b6791c4`. WS1's product is frozen at `55636ebb`, with Sunclaw receipts pending. **WS2 may start now,** in its own worktree. The WS1 handback is still due once the receipts are in.

**WS1 accepted by the Lead (12 Nov) for review at switchboard `55636ebb584b87437f47a813e4f22de2ffd15904`** (#11), with Verifier apparatus #14 at `7176db2ce7a9130430af4003ee509d7c5be9a988`. **R-code for WS1 is now due.** The Reviewer reviews the diff `227e6217f..55636ebb`, read-only, against WS1 items 1–5, the pinned proof basis and the receipts in `switchboard.item2-b3a-verify-auth/tmp/2026-11-12-ws1-verifier-7176/` and `switchboard.item2-b3a-device-grant/tmp/2026-11-ws1/`.

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
2. `Approved` carries what central stored: `enrollmentId`, `label`, `allowedWorkspaces`. A repeat of the same request id returns the first approval unchanged. **Lead decision (12 Nov, the Implementer's option A):** no served approval page exists yet. So `POST /api/auth/machine-login/approve` returns central's stored label and workspaces (never the submitted form), and that response *is* the approval result, proven as the HTTP response on both hosts. The served `/device` page is a later slice of #11, with its own design pass. It is not in WS1, and it renders only that response.
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

### WS2 Lead rulings (12 Nov; the source is the Implementer's proposals, pushes 01a1cdc1 and 01a1cdc9, accepted by the Lead)

- **Cron:** renewal comes off the Cloudflare `0 0 * * *` cron, the Node timer and their wiring and tests. The cron stays, firing **only** `runAuthorizationRevisionBackfill`, because that is accepted B2 recovery. Dropping the cron is an open owner question, not part of this work.
- **D1, guard placement:** one server-only endpoint, `prepareOrganizationFleetCall`, runs before:
  - the revision drainer's `pushAuthorizationRevision`;
  - `forwardFleetAdminRequest`;
  - `relayFleetAdminRequest`, which reads `organization_id` from sign-in's own DPoP access token for the guard only. An undecodable token skips the guard, and central still verifies everything.

  Not guarded: setup `provisionOrganization`, and the guard's own digest read.
- **D2, definite non-stale refusals** (`organization-mismatch`, `invalid-statement`): one refused try, and the sent stamp is cleared under its conditional update. Stale refusals reconcile per B2 rule 3.
- **D3, empty record on a ready organization:** the first guarded use seeds the confirmed stamp from central's digest read, by a conditional write only where the digest is null, then applies the rules. If that read is unavailable, the call proceeds without the guard, and central's own stamp check still fails closed.
- **D4, counters:** cumulative, never reset, each with its last time and reason.
- **D5, setup (final Lead ruling, 12 Nov, the Implementer's option B, push 01a1cdd5).** Central's wire answers `{"result":"provisioned"}` both when it stores the bytes and when it already holds a stamp (`provisioning.rs:140`, `organization_link_transport.rs:82`). So sign-in can't tell the two apart, and the earlier "record only on `Provisioned`" ruling is withdrawn.
  - After a `provisioned` answer, setup reads central's digest at once and records central's facts (digest, `exp`, `kid`) by a conditional write where the digest is null.
  - If that read fails, the record stays empty and D3 seeds it on first use.
  - **Why B over A:** the stamp is fresh at setup, so the read nearly always succeeds. An organization unused for its stamp's whole life can then still renew on its first later use, because central accepts a new stamp naming an expired one. Under A, any organization idle for 120 days after setup couldn't recover on its own.
  - The cost is one extra link call at setup.
- **D6, key change:** today's server-only entry stays. Every ready organization goes through the same guard with `force`, idle and not-due ones included. No host trigger is added.
- **Edge: an empty record and an already-expired stamp at first use.** This happens only when setup's digest read failed and the organization then went unused for the stamp's whole life. The seed read is refused, because central's digest read refuses an expired stamp. That counts one **unanswered** try with reason `seed-unavailable`, and the call proceeds. Central then refuses it, failing closed, and the caller gets the existing unavailable answer. This is the documented limit: sign-in can't recover on its own, and the counters make it visible. It is never treated as success or as a renewed stamp.

## Limits

- **Write scope:** `/Users/shravansunder/code/projects/switchboard.item2-b3a-device-grant` (WS1) and `/Users/shravansunder/code/projects/switchboard.item2-b2-sign-in-additions` (WS2) only. **The Verifier's own write scope (apparatus only, no product code):** `.agents/skills/verify-auth/**` and its driver under `scripts/` or `tests/` as the skill places it, in `/Users/shravansunder/code/projects/switchboard.item2-b3a-verify-auth` (#14, the machine-login journeys) and `/Users/shravansunder/code/projects/switchboard.item2-b2-verify-auth` (#13, the renew-on-use journeys). It may push those two branches, and merge the matching WS branch into them to run against it. **Verification apparatus in test support (Lead, 12 Nov):** in those two verify-auth worktrees only, also the existing verification drivers and their helpers under `packages/sign-in-test-support/src/test-fixtures/` and `packages/sign-in-test-support/src/storage-cases/` (e.g. `device-grant-verification-cli.ts`), their apparatus tests (e.g. `device-grant-verification.unit.test.ts`), and new verification-only files there, including a machine-login Node listener driver. **Not** product code, and **not** product tests the Implementer owns. If a helper is shared with product tests, ask the Implementer before changing it. The full `startNodeSignInHost` has no machine-decision injection, so name that wiring limit in observations rather than working around it. Nothing in codex-router, agent-fleet-sync, agent-vm (except the Verifier's own notes under its worktree `tmp/`), staging or production.
- **Commands:** the repository's own scripts (`pnpm install`, `pnpm check`, `pnpm test:unit`, `pnpm test:integration`, `pnpm lint`, `pnpm lint:types`, the `verify-auth` journeys), `git` on those two branches, and `gh pr` view/edit on #11–#14. Pushing to those two branches is allowed. Not allowed: `--force`, amend, stash, `--no-verify`, merging any PR, or deploying.
- Standing rules:
  - no wall clock in tests (inject the clock, wait on events);
  - UUIDv7 only, from the injected id source;
  - Drizzle injected, no raw SQL;
  - follow Better Auth's own grain;
  - no new or changed check gates or CI steps;
  - checked-in scripts are TypeScript;
  - no secrets, `op://` refs or test-account addresses in repos or PRs.
- Heavy or long runs go to the **Sunclaw test agent**, never ssh: SessionRef serviceId `8b61218b-d5f3-4ae9-a2db-d2fb4075dbc2`, endpoint `codex-local`, session `01a1b755-5c31-7690-b2b4-5b116d355a7a` (Sunclaw's own Router service, not this Mac's). Send a self-contained packet with exact commands, its own debug root and port, and what to report. This applies if the Mac's free disk is under 30 GiB or a run is long (a full suite or many connections). Focused unit, integration and listener runs may stay on the Mac.

## Sessions (agent-router SessionRefs, service `0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89`)

| Role | Session | Model / effort |
|---|---|---|
| 🐒 Implementer | claude-local `ccc121df-1cb9-4803-8100-ab588e93951b` | Claude Opus (`opus` alias), high |
| 🔬 Verifier (paired Checker) | codex-local `01a1cda2-c16d-74f2-a19d-423ad7ea3497` | OpenAI Sol `gpt-6.1-sol`, high |
| 🔎 Reviewer (independent Checker) | codex-local `01a1cda2-c280-7840-b852-6c6e054309b8` | OpenAI Sol `gpt-6.1-sol`, high |

The Implementer and Verifier work as a pair and talk directly. The Reviewer stays outside that loop.

## Proof basis (pinned for the Verifier)

The Verification Design (`verification-design.source.html`, revision `2026-10-30.1`) predates these decisions and is **not** updated for them. That refresh is deferred, and the Lead owns it. For this work the proof basis is:
- **WS1:**
  - the B3 deliverable's `#b3-proof` table at the agent-vm commit carrying this file's latest edit: the rows "a code is used once", "the code's deadline reaches central (N10)", "a repeat returns the first approval (N03)", plus the sign-in halves of "a login reaches only its machine and organization" and "the real journey";
  - the sign-in halves of Verification Design U31 (only you log machines in), U21 (approving a code) and U33 (login by device code).
  - The central halves of N10 and N03 are observed against the stand-in central only, and named unverified.
- **WS2:**
  - the B2 deliverable's `#b2-proof` rows "renewal can't go backwards", "renewal happens on use" and "a lost answer can't strand renewal";
  - Verification Design U14's renewal clause (fail closed).
- **Both hosts for every row:** Cloudflare/workerd with D1, and Node with better-sqlite3, on a controlled clock.
- **Declared targets:**
  - **workerd:** the WS branch head, through the existing dual-storage suite (real handler and Better Auth on workerd with D1);
  - **Node:** the same head, through the built Node listener with better-sqlite3.
  - The Implementer names the exact commit when it declares a target.
  - The lasting journeys go into `verify-auth` on #14 (WS1) and #13 (WS2), with each run's receipts saved in that worktree's `tmp/`.

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
