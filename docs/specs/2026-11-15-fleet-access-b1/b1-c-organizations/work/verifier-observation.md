# B1-C paired verification — preparation checkpoint

17 November 2026. Delivery observation has **not started**: the Implementer has not declared a frozen PR head, build, configuration and client. V1–V8 are **unknown**, not passes. No build, test, browser journey or wrong-build experiment has run in this session.

## Scoped outcomes

The governing sources are the seven B1-C design pages, Plan Packet 2 and `work/commission.md`, including the verify-auth maintenance addendum at agent-vm commit `d0607a47c`. I read all seven pages, the approved B1 and BG deliverables, the public repository instructions and the canonical verify-auth skill and its shared journey reference. Expected results come from those sources, not the Implementer's description.

The preparation source hashes are retained in [evidence/verifier-source-sha256.txt](evidence/verifier-source-sha256.txt); they identify documents read, not executed artifacts.

The assigned product checkout is `/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished`. Its setup-only inspection found HEAD `b03d35ffeea00f79061353dce1db6231a670c62f` and empty `git status --short` output. This is the commission's public base, **not a declared delivery target**. No private switchboard-history checkout was used.

| Observation | Outcome required by the design | Wrong behavior the observation must reject | Current result |
|---|---|---|---|
| V1, S1/S4 | Exact self-context from real session/membership rows; empty differs from unavailable; session-read faults return 503; no extension of live session/factor state | Swallowed session failure becomes signed out; stale choice survives membership loss; membership failure becomes an empty list | Unknown; waiting for target |
| V2, S2/S3 | Choose O1 then O2 in one session, card remains available, real CLI Continue yields O2; foreign choice clears selection; old confirmation permits switching without renewal | Hide card after first choice; memberships keep Continue disabled; restore O1 after refusal; switch stamps a factor | Unknown; waiting for target |
| V3, S6/S7/S8 | Exact scoped member/invited/not-member replies, strict expiry, all relevant rows parsed, elsewhere/nowhere byte equality, protected tables unchanged | Cross-organization query, expiry equality admitted, SQL status filtering masks corrupt data, one old invitation hides a newer one, read writes audit | Unknown; waiting for target |
| V4, S5 | Initial refusal performs zero subject reads; fresh session and organization:view checks bracket the held real read; session end/expiry, switch or lost permission discards candidate | Skip a check; reuse cached session; compare a role name instead of native permission; release after revocation | Unknown; waiting for target |
| V5, S5/S7/S8/S10 | Owner-only 50/1 member pages from 51 rows; exact safe projections; invitation filtering after parsing; unchanged tables; held-read refusals; native reads 404 | O2 row, ID or metadata canary leaks; malformed rows silently disappear; a member sees roster; native list route opens | Unknown; waiting for target |
| V6, S2/S3/S9/S10/S12 | Real Chrome on each host: lost-response readback, CLI continuation, latest request wins, failure/edit clears prior result, owner-only link, keyboard and 400 px dark layout | Trust request success; stale reply wins; prior result remains; member sees People link; administrative controls appear | Unknown; waiting for target |
| V7, S7/S11/S12 | Existing people/agent proof preserved; exact route and removal census; one schema home; no forbidden boundary/dependency change; architecture wrong builds fail | Old listener or overloaded choices returns; native reads open; new uninjected crypto or non-v7 ID passes checks | Unknown; waiting for target/diff/receipts |
| V8, S13 | Three independent Hegel models, prefix checks and state/event census; named semantic reds shrink; restored greens; six exhaustiveness failures | Wrong expiry/state transitions, early release, wrong-kind facts, stale generation, duplicate submit, disposed revival, nonexhaustive union | Unknown; waiting for target/tests/receipts |

Allowed cases that must remain accepted include zero memberships as an available empty self-context, permission loss **after** the second check outside S5's promise, native foreign-choice clearing, and changes between list pages under the named snapshot limit. B1-C does not claim BG's sole-membership selection after a later clearing.

## Setup evidence and follow-ups

1. Canonical verification skill: public `.agents/skills/verify-auth/SKILL.md`; `.claude/skills/verify-auth` is the relative link `../../.agents/skills/verify-auth`. No competing authored copy was found in the declared project skill inventory.
2. At the inspected base, `SKILL.md:36` still describes the old served-page chooser. `references/agent-bootstrap.md` lists the old people files. `packages/sign-in-test-support/src/test-fixtures/auth-verification-journeys.ts`'s `authJourneyFiles('people')` omits the four new B1-C files; `selectAuthObservations` rejects an empty/omitted offered inventory. These are setup observations before implementation, **not delivered-product defects**.
3. Reported the lasting-journey coverage gap to Lead in Router push `01a1e93e-bc5c-7932-b5d4-5459587baa18`. Lead assigned maintenance to the Implementer in commit `d0607a47c` and reply `01a1e93f-1d67-7543-89ea-50592e3abb9a`. The scope/owner gap is resolved; the resulting changes and runtime inventory equality remain unverified.
4. Sent Implementer the inventory admission requirement and the V6 fixture requirement: reaching offset 100 needs at least 101 members, separate from V5's 51-member case. For a second lookup while an older reply is held, input editing must invalidate the first generation; an unchanged duplicate submit remains refused. This follows M3's existing table; no oracle was changed.
5. Implementer setup reply `01a1e93d-47d1-7ca3-ab5a-1be2771dbaf3` states that no observation target has been declared and promises one frozen PR head at the batch boundary.

## Commands and execution

Setup reads only: `git rev-parse HEAD` returned the public base above (exit 0); `git status --short` returned no entries (exit 0); `readlink .claude/skills/verify-auth` returned the canonical link above (exit 0); project skill inventory and the source searches were inspected. These are not behavior proof.

All required build/check/unit/integration/host commands, people journeys on both hosts, the supported agent journey, real Chrome observations, semantic wrong-build runs, and six exhaustiveness checks are **NOT RUN**. There are no test pass/fail/skip counts, runtime exit codes, prepared artifact hashes, Chrome versions, runtime host versions or screenshot receipts to report yet. Source inspection does not substitute for any of them.

Delivery execution must bind full source head, clean isolated execution tree, built artifact identities, fixture configuration, client, exact offered/selected/executed inventory, host and toolchain. Heavy host/Chrome/full-suite work goes only to the commissioned Sunclaw agent. Remote packets must carry the commission's exact owner-authority citation and public clone URL, and preserve raw red/green/count/exit receipts. No remote packet has been sent yet.

## Needs Implementer

- **Declare target.** Send frozen PR/head, build location and recipe, fixture configuration/client, offered tests and evidence locations. Closure: the declared tuple can be compared to the actual isolated execution target before observation.
- **Deliver verification recipe maintenance.** Include the four B1-C host files, new read journeys, corrected chooser wording and runner inventory in the same draft PR. Closure: inspect those changes, resolve every reference and verify offered/selected/executed inventory equality plus retained unknown-case refusal.

## Needs Lead

No unsettled owner expectation was identified during preparation. The skill-maintenance assignment is recorded and awaits implementation. Lead alone owns the trace (`no-home` supplied by commission); this report and the Router messages carry my material setup evidence for that trace.

The pending dependency is the Implementer's frozen delivery declaration. Router direct-message delivery is working: the setup reply reached this session during its active turn. The pair has the exact session addresses, and that supported reply notification is the continuation path; no polling or duplicate listener is needed.

## Unverified

All delivered B1-C behavior and offered-test sensitivity remain unverified. No current delivery target exists. Deployed hosts, real identity providers, staging, release sign-in, BG's account/continuation work and its six combined journeys remain outside this local proof. Raw intermediate row/ledger retention limitations in the existing verify-auth recipe must stay explicit when runtime evidence arrives. No product code, permanent tests, verification skill or product driver was edited by this Verifier.
