# B3 machine login: commission

Lead: Fleet access Lead (claude-local `cd5902e2-2105-4472-adde-031ae6496e30`). Written 2026-11-18.

**Authority.** The owner said "yes" in chat on 2026-11-18, about 09:20 UTC, to building B3 now. The design and its decisions are approved: `decisions.html`, including the 9 Nov B3 storage review (option A, the `machine_allowances` table) and the 11-07 rule that the only secret store is the macOS Keychain, behind an injected trait.

## Read first, in full

All seven pages in this folder: `requirements.html`, `specification.html`, `program-design.html`, `verification-design.html`, `decisions.html`, `audit.html` and `plan.html`. The design pages are the authority. The plan is a checklist. Where a step and the design differ, the design wins: stop and ask the Lead.

## Priority: M4 first

Lead A's codex-router PR 3 (the Router driver) reports "not enrolled" until a real `MachineTokenSource` plugs in. The seam is Lead A's, and M4 is pinned to it (agent-vm `8b7ac4d07`): Ready / RefreshPending / NeedsNewCode, plus `report_renewal` and the refusal mapping. Build the Router-host `MachineTokenSource` first, as its own reviewable unit, so PR 3 can wire it in. Coordinate the exact seam version directly with Lead A (claude-local `13635880-b8f1-47f9-8d66-ca6aa9ddc134`).

## Preconditions: check them before writing code

`plan.html` lists these as preconditions:
- Lead A's `RenewMachineToken`;
- codex-router's repo split;
- Design 3 PR A on main.

Check each against the current `main` of each repo and report any that is missing.

Switchboard is now PUBLIC (`agent-collaboration/switchboard`, `main` at `1f46eab9` or later). The plan's sign-in branches (`item2/b3a-device-grant`, `item2/b3a-verify-auth`) live in the private `switchboard-history` repo. Port what's needed onto public `main` as a public PR, the way B1-B moved to the public repo, with no private history in public. Report the port plan before pushing.

## Seats and worktrees

- Implementer: OpenAI Sol `gpt-6.2-sol`, high.
- Verifier: OpenAI Sol `gpt-6.2-sol`, high. Paired, working directly with the Implementer.
- Review: `gpt-6.2-sol` xhigh, after the Lead's acceptance.
- Worktrees: Agent Studio worktrees of public Switchboard and of codex-router (`"/Applications/AgentStudio.app/Contents/Helpers/agentstudio" worktree new -c <branch> --repo <repo>`). Never `.claude/worktrees`.

## Rules

- Hard cutover; no backward compatibility.
- UUIDv7 only.
- Drizzle, injected; no DI library.
- No wall clock in tests; no timers or hang guards.
- Hegel for the state machines: pure transitions and a full sequence plan.
- TypeScript or Rust only; no Python in the repos.
- Never change check gates.
- Heavy and host runs go on Sunclaw, never this Mac. Ask the Lead for a packet.
- Never print secrets.
- Diff to the Lead before every push. Two PRs: Switchboard sign-in and codex-router.

## Seated sessions

- Implementer: codex-local `01a1edfb-60a8-77c3-8c7b-1e9aeb5ae300` (`gpt-6.2-sol`, high)
- Verifier: codex-local `01a1edfb-a468-75d2-8ded-7b907a3a0369` (`gpt-6.2-sol`, high)
