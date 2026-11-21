# B1-B commission (Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30)

## Authority
- The owner gave the go-ahead to build B1-A and B1-B on 15 Nov 2026: "yes to b1a and b1b". B1-B waited on B1-A, which merged on 17 Nov as Switchboard `7bee7182` (PR #18).
- The owner's B1-B decision is on `decisions.html`: the passkey button is click only.
- **Read the whole design first**, all seven pages in `docs/specs/2026-11-15-fleet-access-b1/b1-b-passkey/`. Your packet is on `plan.html`:
  - the Implementer reads Packet 1;
  - the Verifier reads Packet 2.

  The design pages are the authority; the packet steps are only a checklist. Where they differ, the design wins: stop and ask the Lead. This file is only logistics.

## Repositories and base
- Code: switchboard, `/Users/shravansunder/code/projects/switchboard`, base `origin/main` `7bee7182` (B1-A merged).
  - The Implementer creates an Agent Studio worktree on a new branch `b1b/passkey-sign-in` from `origin/main`: `/Applications/AgentStudio.app/Contents/Helpers/agentstudio worktree new -c b1b/passkey-sign-in --repo /Users/shravansunder/code/projects/switchboard`.
  - Don't work in the main checkout.
- Design and work folder: agent-vm worktree `/Users/shravansunder/code/projects/agent-vm.design-portal-remediation`.
  - Returns go in `docs/specs/2026-11-15-fleet-access-b1/b1-b-passkey/work/`.
  - Write only your own return files there; never edit the design pages.

## The pair
- 🐒 Implementer: OpenAI Sol, high effort. SessionRef `{serviceId: 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89, endpointId: codex-local, sessionId: 01a1e734-e29e-75c0-a74c-cf45c14f12ba}`.
  - Replaced on 17 Nov 01:55 UTC: the first Implementer (claude-local 11d7359e, Opus) hit the Claude usage limit, with about 48 hours to headroom, before doing any work. It had only created the worktree and fast-forwarded it to `7bee7182`. That worktree, `/Users/shravansunder/code/projects/switchboard.b1b-passkey-sign-in`, is yours; reuse it.
  - **Write scope:** your working root is `/Users/shravansunder/code/projects` only so git (whose metadata is in the main `switchboard/.git`) and your return file work. Write only in the B1-B worktree, git metadata through git commands, and `work/implementer-handback.md`. Touch nothing else under that root.
  - **Same lineage as the Verifier** (both Sol). No Opus verification row exists and the Opus route is rate-limited, so this is a named gap; the fresh Reviewer will include Claude Opus high when its quota returns.
- 🔬 Verifier: OpenAI Sol, high effort, a different lineage. SessionRef `{serviceId: 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89, endpointId: codex-local, sessionId: 01a1e709-8628-73d2-98a1-b8995fe5db2d}`.
- Talk to each other directly through agent-router about setup, reproductions, repairs and rechecks. Blockers, design questions and anything you think is wrong in the design go to the Lead, not the owner.

## Where things run
- Targeted unit and integration tests run locally.
- Heavy runs go to the owner's Sunclaw test agent as self-contained packets: `pnpm test:e2e:host` on both hosts, the real-Chrome browser test, `verify-auth` journeys and whole-suite sweeps.
  - Address: serviceId `8b61218b-d5f3-4ae9-a2db-d2fb4075dbc2`, endpoint `codex-local`, session `01a1b755-5c31-7690-b2b4-5b116d355a7a`. No SSH.
  - Each packet gives the commit, exact commands, its own working root and what to report.
  - **Install on Sunclaw, with no global install:** add `<root>/bin/node-gyp` as a script running `node "$(dirname "$(dirname "$(command -v node)")")/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "$@"`, then `PATH="<root>/bin:$PATH" pnpm install --frozen-lockfile`. If npm's bundled node-gyp is absent, report and stop.
  - **On Sunclaw (Darwin),** every `pnpm test:e2e:host` command excludes `packages/sign-in-owner-cli/src/fleet/macos-keychain-proof-key-store.host.e2e.test.ts`.
  - **Heavy runs never run on the owner's Mac.**
- **GitHub CI does not run right now** (Actions billing). The owner accepted merging B1-A on the Sunclaw evidence. Run the full gates on Sunclaw, and report CI as not run.

## Standing rules (owner's)
- Never print secrets.
- No new CI gates or check-script changes beyond what the design names.
- No wall clock in tests. UUIDv7 only. Drizzle injected; no raw SQL. No DI library.
- Pure transitions with closed unions and inline `x satisfies never`; Hegel families where the design names them.
- Use Better Auth's own passkey plugin and Better Auth UI as shipped, and shadcn parts properly. No patches.
- No Python anywhere in the repo; scripts and tests are TypeScript (or Rust tests).
- No stash, `--amend`, `--no-verify` or force-push.
- Commits are signed with 1Password. After two failed signing attempts, `git commit --no-gpg-sign` is allowed.
- The Implementer opens the PR as a draft. Merging is the Lead's, after verification, Lead acceptance and a fresh Sol review.

## Work log and scratch
- **No board thread** (`no-home`). The work log is the Lead's trace; only the Lead writes it.
- **Your record** is your return file in `work/` plus your agent-router reports to the Lead.
- **Scratch:**
  - the Verifier uses `/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/tmp/2026-11-17-b1-b-verifier/`;
  - the Implementer uses its own Agent Studio worktree.
- **The declared target** is the PR head commit the Implementer names. Verify only a pinned commit.

## Returns
- Implementer: `work/implementer-handback.md`, as Packet 1 says.
- Verifier: `work/verifier-observation.md` and `work/evidence/`, as Packet 2 says.
