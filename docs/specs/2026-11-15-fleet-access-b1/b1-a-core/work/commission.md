# B1-A commission (Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30)

## Authority
- The owner gave the go-ahead to build B1-A and B1-B on 15 Nov 2026, in the Fleet session: "yes to b1a and b1b". Their stop on development is lifted for these two features only.
- The design is final and reviewed. Sol's review passed (READY) at agent-vm `2e5e33ce`, and the overview was updated at `2ddf2e77`.
- The governing pages are the seven in `docs/specs/2026-11-15-fleet-access-b1/b1-a-core/`. Your packet is on `plan.html`:
  - the Implementer reads Packet 1;
  - the Verifier reads Packet 2.

  The yardstick is the design pages and the owner's decisions on `decisions.html#owner`. This file is only logistics.

## Repositories and base
- Code: switchboard, `/Users/shravansunder/code/projects/switchboard`, base `origin/main` `f3b2b88b`. That is still current at commission time.
  - The Implementer creates an Agent Studio worktree on a new branch `b1a/one-sign-in-core` from `origin/main`: `/Applications/AgentStudio.app/Contents/Helpers/agentstudio worktree new -c b1a/one-sign-in-core --repo /Users/shravansunder/code/projects/switchboard`.
  - Don't work in the main checkout. It's on another branch and is someone else's.
- Design and work folder: agent-vm worktree `/Users/shravansunder/code/projects/agent-vm.design-portal-remediation`.
  - Returns go in `docs/specs/2026-11-15-fleet-access-b1/b1-a-core/work/`.
  - Write only your own return files there. Never edit the design pages.

## The pair
- 🐒 Implementer: Claude Opus, high effort. agent-router SessionRef `{serviceId: 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89, endpointId: claude-local, sessionId: 13abb87b-9781-487c-b1f2-c994f0c30621}`.
- 🔬 Verifier: OpenAI Sol, high effort, a different lineage. SessionRef `{serviceId: 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89, endpointId: codex-local, sessionId: 01a1e108-8877-7e32-8ce8-889bc694377c}`.
- Talk to each other directly through agent-router about setup, reproductions, repairs and rechecks. Bring blockers, design questions and any place you think the design is wrong to the Lead. Don't take them to the owner.

## Where things run
- Targeted unit and integration tests run locally.
- Heavy runs go to the owner's Sunclaw test agent as self-contained packets. That covers `pnpm test:e2e:host` on both hosts, the real-Chrome browser test, the `verify-auth` journeys and whole-suite sweeps.
  - Address: serviceId `8b61218b-d5f3-4ae9-a2db-d2fb4075dbc2`, endpoint `codex-local`, session `01a1b755-5c31-7690-b2b4-5b116d355a7a`.
  - Each packet gives the commit, exact commands, its own working root and what to report.
  - No SSH to Sunclaw.
  - **Install fix on Sunclaw, with no global install** (Lead ruling, 15 Nov). `pnpm install --frozen-lockfile` fails there because better-sqlite3 runs `node-gyp rebuild` and there's no `node-gyp` on PATH. The packet adds a shim inside its own working root that points at the npm-bundled node-gyp of the same Node:
    1. make `<root>/bin/node-gyp` a script that runs `node "$(dirname "$(dirname "$(command -v node)")")/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "$@"`;
    2. run `PATH="<root>/bin:$PATH" pnpm install --frozen-lockfile`.

    better-sqlite3 ships a prebuilt darwin-arm64 binary, which then loads. This is the same fix recorded for this repo on 20 Oct. The packet records the Node and pnpm versions. If npm's bundled node-gyp isn't present, the packet reports that and stops; nothing gets installed.
  - **On Sunclaw (Darwin),** every `pnpm test:e2e:host` command excludes `packages/sign-in-owner-cli/src/fleet/macos-keychain-proof-key-store.host.e2e.test.ts`. That one test runs only on the owner's Mac, by the Verifier.
  - **Heavy runs never move to the owner's Mac.** Only the single Keychain test does.
- macOS Keychain test (V11's "the keychain test still runs"): **the owner said yes on 15 Nov.** The Verifier may run that one test, and only that one, on the owner's Mac:
  - the test: `packages/sign-in-owner-cli/src/fleet/macos-keychain-proof-key-store.host.e2e.test.ts`;
  - where: this Mac, in the PR worktree at the pinned commit;
  - what it touches: it creates one test Keychain item and deletes it.

  Record the command, count and exit code, and confirm afterwards that no test item is left. Every other heavy run still goes to Sunclaw.

## Standing rules (owner's)
- Never print secrets.
- No new CI gates or check-script changes beyond what the design names. The design's changes to `audit-portal-architecture.ts` are authorized.
- No wall clock in tests. UUIDv7 only. Drizzle injected; no raw SQL.
- No stash, `--amend`, `--no-verify` or force-push.
- No DI library or service getter (owner, 15 Nov).
- Commits are signed with 1Password. After two failed signing attempts, `git commit --no-gpg-sign` is allowed.
- The Implementer opens the PR as a draft. Merging is the Lead's, after review and acceptance.

## Work log and scratch
- **No board thread** (`no-home`). The work log is the Lead's trace, `~/dev/session-logs/projects/2026/2026-10-agent-vm/planbooks/2026-10-18-tool-portal-identity-advisor-claude-2febb449.md`. Only the Lead writes it.
- **Your record** is your return file in `work/` plus your agent-router reports to the Lead.
- **Scratch:**
  - the Verifier uses `/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/tmp/2026-11-15-b1-a-verifier/` for frozen PR and base copies, scratch worktrees and logs. That covers V4's base-tree run: make the scratch worktree there with `git -C /Users/shravansunder/code/projects/switchboard worktree add <that folder>/base-f3b2b88b f3b2b88b`, and remove it afterwards;
  - the Implementer uses its own Agent Studio worktree.
- **The declared target** is the PR head commit the Implementer names in its handback, or in a direct message to the Verifier for an interim batch. Verify only a pinned commit.

## Returns
- Implementer: `work/implementer-handback.md`, as Packet 1 says.
- Verifier: `work/verifier-observation.md` and `work/evidence/`, as Packet 2 says.
