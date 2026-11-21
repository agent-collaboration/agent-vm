# F1 Hegel slice: commission (Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30)

## Authority
- **Owner, 17 Nov:** "did you add designs and plan out and execute fuzz testing? for hegel ts and bombardil ts?"; "get hegel working on critical systems too". Test-tooling choices are Lead calls ("these are not important decisions for me to make for now").
- **Scope: the Hegel slice only,** READY per the Sol xhigh design review (`tmp/2026-11-17-f1-review/report.md`, final section, at `b8ebbbc82`):
  - S1 route coverage;
  - S2 route requests;
  - S3 organization sequences;
  - S5 for Hegel;
  - S6's applicable limits.
- **Bombadil (S4) is NOT in this commission;** it waits for a feasibility probe (plan.html, "Split").
- **Read all six pages first:** `docs/specs/2026-11-17-fleet-access-f1-fuzz/`. Requirements, Specification, Program Design and Verification Design are the authority; Plan Packets 1 and 2 are only a checklist. Where they differ, the design wins; ask the Lead.

## Repository and base
- Public Switchboard: `https://github.com/agent-collaboration/switchboard`. Worktree already created: `/Users/shravansunder/code/projects/switchboard-public.f1-hegel-fuzz`, branch `f1/hegel-fuzz`, from public `main`.
- Never use `/Users/shravansunder/code/projects/switchboard` or its worktrees: that's the private history.
- **New test and support files only.** No product file changes. A real finding is reported to the Lead with its minimal case before any product fix.
- **B1-B and B1-C** land separately; S1's coverage test makes whichever lands later add families for its new routes.
- Design and work folder: agent-vm worktree; returns go in `docs/specs/2026-11-17-fleet-access-f1-fuzz/work/`, and you write only your own return files.

## The pair
- 🐒 **Implementer:** OpenAI Sol, high, codex-local; address in the addendum.
- 🔬 **Verifier:** OpenAI Sol, high, codex-local; address in the addendum.
- **Same-lineage gap** (Claude helpers rate-limited); the fresh PR review uses a different lineage if available.
- Talk directly; blockers and design questions go to the Lead.

## Where things run
- **Unit lane locally.** The host lane (live inventory, both hosts, both engines) goes to the owner's Sunclaw test agent: serviceId `8b61218b-d5f3-4ae9-a2db-d2fb4075dbc2`, endpoint `codex-local`, session `01a1b755-5c31-7690-b2b4-5b116d355a7a`.
- **Cite the owner authority** in every packet: agent-vm `0446841f` (`docs/specs/2026-11-02-fleet-access/plans/2026-11-12-sign-in-owner-decisions.md:568`, "Owner decisions, 13 Nov", item 2).
- **If your own approval check blocks a send,** give the Lead the packet path and SHA in one line (owner Decision 8: the Lead reads it and sends it unchanged).
- **Lessons from B1-B and B1-C:**
  - Clone the public URL.
  - Run `pnpm python:sync` before the Python tests.
  - Use the pinned oxfmt 0.75.0.
  - Vitest 4.1.5 doesn't forward the CLI exclude to inline projects: pass the complete positive file list minus exactly `packages/sign-in-owner-cli/src/fleet/macos-keychain-proof-key-store.host.e2e.test.ts` on Darwin, and prove inventory equality.
  - Canonicalize `/tmp` against `/private/tmp` before any manifest preparation.
  - Miniflare's rate limiter windows follow the real clock. Don't build a fuzz property whose oracle depends on limiter counts within a window.
- **No heavy runs on the owner's Mac.** GitHub CI runs on the public repo; the draft PR's CI must be green.

## Standing rules
- **Never print secrets.** Nothing private in commits or packets.
- **No new CI gates or check-script changes.** The Hegel tests join the existing unit and host lanes.
- **Test discipline:**
  - no wall clock in tests;
  - UUIDv7 only;
  - Drizzle injected;
  - no DI library;
  - closed unions with `satisfies never`;
  - no Python;
  - Hegel `derandomize` in CI and the database disabled.
- **Git:** no stash, `--amend`, `--no-verify` or force-push. Signed commits, with `--no-gpg-sign` after two failed attempts.
- **The Implementer opens one draft PR** on the public repo. Merging is the Lead's.

## Returns
- **Implementer:** `work/implementer-handback.md`.
- **Verifier:** `work/verifier-observation.md` plus `work/evidence/`. Every V1, V2, V3 and V5-Hegel wrong build goes red with the named property and a minimal case, then green when restored. Scratch goes in `tmp/2026-11-17-f1-verifier/`.
- **No board** (`no-home`); only the Lead writes the trace.

## Addendum: session addresses
- Implementer SessionRef `{serviceId: 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89, endpointId: codex-local, sessionId: 01a1e99b-385e-7162-a944-eb9c91dd3438}`
- Verifier SessionRef `{serviceId: 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89, endpointId: codex-local, sessionId: 01a1e99b-44eb-77f3-b4ff-27d8a1f9339c}`
