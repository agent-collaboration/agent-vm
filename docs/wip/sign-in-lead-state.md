# Sign-in Lead state

Owner: 🦁 Sign-in Lead, claude-local `cd5902e2-2105-4472-adde-031ae6496e30` (Sunbook). Reports to the central Lead, claude-local `e69c260f-028a-45be-8d9b-f7e1a5d3570b`.
Updated: 2026-11-20 (UTC). Reread this file after every compaction.

## Scope

These decisions are the owner's, from 20 Nov.

**Mine:** the auth service (Switchboard sign-in). That covers the issuer, sign-in, refresh, machine login, and what the tokens and machine tables mean.

**Also mine: verifying the auth service in full.** That means:
- the local journeys;
- the security checks;
- the B2 commands;
- CI proof;
- staging proof once staging exists.

**Not mine:**
- the Mac Router, which belongs to the Mac Lead;
- the seams between the lines, which the central Lead designs.

## Work in flight

| Item | Where | State | Next |
|---|---|---|---|
| PR #10: Playwright driver, `verify-auth` recipe, CI background steps | agent-collaboration/switchboard#10, head `46b582ff`. Sunclaw Implementer `01a1f8cc-9667`, Verifier `01a1f8cc-9614` | Draft. Handback in: both hosts green, 20/0 browser, CI E2E passed with background steps. BLOCKER: intermittent passkey enrollment hang. Diagnosis: the list empty-state shifts Add passkey 22 px (button 28 px tall), so a click measured before the shift can miss. Fix: wait for the committed initial list before clicking, plus a failure-only CI summary artifact. Product layout shift goes to the navigation UI. | Verifier five facts. 14 security checks (Sonnet Operator claude-local `ac2dd8de` on Sunclaw). Fresh Sol review. Final CI. Tell central. Merge. |
| PR #9 | switchboard#9 | CLOSED 20 Nov, superseded by #10 | none |
| F1 fuzzing, PR #4 | switchboard#4, draft | E2E hung 6 h on 17 Nov; branch older than #8 and #1 | After #10: merge main in, rerun CI once |
| Follow-up sign-in items | `docs/specs/2026-11-19-sign-in-verification-script/work/follow-up-pr-items.md` | Open | Includes: public `/sign-out` answers 404; `passkeyAuditPending` as a closed union; PR #1 finalizer items |
| B3, sign-in side | switchboard-public worktree `feat/b3-sign-in-carrier` `cd2f7e5` (not pushed) | Joint proof with central `81d6ec761` passed 19 Nov | Device-approval page onto public main; real Worker carrier |
| B3, Mac side (seam 3, Mac end) | codex-router `feat/b3-machine-token-source` `acde7c34d` and `feat/b3-credential-store` `6607298ae` (neither pushed). Earlier: `item2/b3-central` `de2c82337` and `item2/b3-central-storage` `10c7bb624` (pushed) | Handed over 20 Nov. The two token/credential branches went to the Mac Lead, with notes in `docs/wip/b3-mac-side-handover.md`. The two `item2/*` branches went to the central Lead, who is comparing them with main. | Nothing for me, beyond answering questions about what tokens mean. |
| Staging sign-in service | none | Doesn't exist | Needs BG: staging `testUtils` routes, the deploy, the SO15 and SO16 checks. `cf auth whoami` works again. |

## Design and records

- Verification redesign, plan, CI workflow: agent-vm `docs/specs/2026-11-20-sign-in-verification-redesign/`
- B3 design: agent-vm `docs/specs/2026-11-15-fleet-access-b3/`
- BG design: agent-vm `docs/specs/2026-11-02-fleet-access/deliverables/bg-getting-in.source.html`
- Owner status page: agent-vm `tmp/2026-11-20-fleet-access-status.html`
- Trace: `~/dev/session-logs/projects/2026/2026-10-agent-vm/planbooks/2026-10-18-tool-portal-identity-advisor-claude-2febb449.md`

## Open with the owner

- The navigation tabs (People, Machines, Agents, Me), for BG's UI.
- The B3 Router checks that need a signed desktop session. These are on the Mac side now.

## Calls I made (meaning of machine login), 2026-11-20

These are my answers to the central Lead's comparison of the two old central branches. Both branches are now history.

1. **Same request ID, different body:** refuse as an idempotency conflict. A byte-identical repeat returns the first answer.
2. **`machineId` is claimed globally:** a machine belongs to one organization.
3. **Idle expiry bumps the enrollment generation,** the same as revoke.
4. **Allowances: a `machine_allowances` table. OWNER DECISION, 20 Nov: "we want allowance tables".** One row per machine and workspace, active or withdrawn; central's JSON column gives way to it. The central Lead has been told.
5. **Revoke permission:** the owner role holds enroll, revoke and setTokenLifetime. Revoke needs a recent factor. Enroll needs one only after the organization's first machine (OD18).
6. **A malformed key set** fails closed but is answered as retryable, not as a token rejection.
7. **Machine admin commands, in order:** list and revoke first, then allow or withdraw one workspace. Owner-only, each recorded. They appear in the new Machines tab and as CLI commands.

The central Lead also carries:
- a live idle check at connect and at renewal;
- revoke removing the enrollment's sessions, which waits on central's session list.

## Cleanup, 20 Nov

**Closed:**
- PR #9.
- The old B3 Implementer `01a1edfb-60a8` and Verifier `01a1edfb-a468`: stood down, wakes cancelled.
- PR #9's helpers: all stood down or idle.
- Worktrees removed: `switchboard-public.b1c-organizations-finished` (merged as #1) and `switchboard-public.f1-hegel-fuzz-corrections` (a duplicate of f1's commit).

**Kept:**
- `switchboard-public.f1-hegel-fuzz` (PR #4).
- `feat-b3-sign-in-carrier` (mine).
- `switchboard-public.verify-sign-in-script`: the review checkout for PR #10; remove after #10 merges.
- `switchboard.item2-b3a-device-grant`: source for porting the device-approval page.
- B3 verification worktrees `switchboard-public.verify-b3-{contract-1-node-drain,tcp-wrong-build}`: evidence for the joint proof, with no uncommitted changes.
- The codex-router B3 worktrees: handed to the Mac Lead.

**Owner's call:** `switchboard-public.b1b-proof-viewport-old-mouse` has uncommitted changes from 17 Nov (old proof scratch for B1-B, which has merged). Removing it would discard those changes.

## Navigation UI decisions (owner, 20 Nov)

- **Tabs:** Me / People / Machines / Workspaces. The organization is a header switcher; settings, audit and delete sit in its menu.
- **Look:** the mockups "look fine". **Use shadcn components only, nothing hand-made.** A Sol agent is checking every element against shadcn (`docs/specs/2026-11-20-sign-in-navigation-ui/shadcn-inventory.md`).
- **After an org switch:** land on a page you're allowed to see. A plain member lands on Me.
- **The person CLI sign-in:** a banner that can't be dismissed, with Continue and Cancel. It expires at the CLI's deadline, and the resulting login then shows under Me → My sessions.
- **Pending machine logins:** shown in Machines as "Waiting for approval", with Approve and Deny.

## Machine claim: owner ruling (20 Nov, relayed by the central Lead with his exact words)

**His words:** "no it may not, but how we ensure this /  only by the router righ?"; "Whats teh best deppoulec solutoin fro this?  enrollment is hwo's repsosnability? is the easy way a private link to singin service like sign in to central areayd exists?"; "so what happeners here two way itnernal comm?"

**What it means:**
- One Mac in one organization, and the server enforces it.
- Options C and D are out.
- His lean is option A, over the existing private link.

**My proposal to the central Lead, not yet reviewed:**
- One-way only: sign-in asks, central answers. A new read-only central route answers "is this machine's enrollment live?".
- Sign-in is the activation fence, because it forwards every first grant.
- Sign-in serializes per machine, using a Checking state.
- A new `login_machine_claims` table in sign-in.
- The `deviceCode` table's two machine-ID columns become the single `machineId`.

## Typed design record (owner direction, 20 Nov, relayed)

**His words:** "ok i wante dyou to kuse it for each design to keep track so alter kon accepts we can cross reference or imeplmentals and verficaiers can cross reference eaisly."

**What it means:** each set gets a `design.ts` typed record. The central Lead is preparing a general checker and a worked example. Until then, keep the U, R, D and V IDs and the heading IDs stable.

## Machine claim: final ruling (20 Nov)

**His words:** "a machien cannot move to another organization".

**What it means:**
- A permanent claim in sign-in: `login_machine_claims`, one row per machine ID, written at the first approval and never changed.
- Any other organization is refused.
- A Mac joins another organization only with a new machine ID, which is Mac Lead work.
- Central changes nothing.

**Design:** B3 `machine-claim.html`, revision 4.
