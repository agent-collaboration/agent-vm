# Switchboard public candidate: Implementer commission (Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30)

## Authority
- Owner decisions D1–D4 and the go-ahead are in `../plan.md` "Owner decisions". The owner is asleep overnight: take questions to the Lead only.
- **Read first, in full:**
  - `../plan.md` (rev 3, agent-vm `50bacb00f`). It's the governing design; steps 1–11 are yours, 12–21 are the Lead's.
  - `../review.md` (R1–R7 and both rechecks).
  - `../../2026-11-16-switchboard-prepublication/report.md` (the audit).
- Where they differ, the plan wins; stop and ask the Lead.

## You
🐒 Implementer, OpenAI Sol high, codex-local `01a1e75d-dfca-76f1-8385-aed1aff70ebc`. Task guidance: Designed Outcome.
- **Scope:** plan steps 1–11 only. Build the candidate branch; don't rename, create or push any repository other than the candidate branch on today's private origin; no visibility or settings change.
- **No paired Verifier** (a named gap): nothing user-facing changes behaviour, so the independent check is the fresh Sol auditor of the exact candidate tree (plan step 12) after your handback. Your own gates and sweeps are the proof you own.
- **Stop condition:** stop and hand back when steps 1–11 are complete with gates green; or stop and report to the Lead on a gate failure that the plan does not already cover, or on any plan contradiction.
- **"Both hosts"** means the two runtime hosts, workerd and Node, not macOS. Both run on Sunclaw; nothing heavy runs on this Mac.

## Where
- **Repo:** `/Users/shravansunder/code/projects/switchboard`, base `origin/main` (fetch first; record the SHA).
- **Worktree:** `/Applications/AgentStudio.app/Contents/Helpers/agentstudio worktree new -c pub/public-candidate --repo /Users/shravansunder/code/projects/switchboard`. Don't work in the main checkout.
- **Write scope:** your working root is `/Users/shravansunder/code/projects` so git and your return file work. Write only in the candidate worktree, git metadata through git, and `work/implementer-handback.md` here.
- **Heavy runs go to the Sunclaw test agent,** never this Mac:
  - address: serviceId `8b61218b-d5f3-4ae9-a2db-d2fb4075dbc2`, endpoint `codex-local`, session `01a1b755-5c31-7690-b2b4-5b116d355a7a`. No SSH.
  - Install there with no global installs: create `<root>/bin/node-gyp` running npm's bundled node-gyp (see B1-B `work/commission.md` for the exact script), then `PATH="<root>/bin:$PATH" pnpm install --frozen-lockfile`.
  - On Sunclaw, `pnpm test:e2e:host` excludes `packages/sign-in-owner-cli/src/fleet/macos-keychain-proof-key-store.host.e2e.test.ts`. Vitest 4.1.5 doesn't forward the CLI exclude to inline projects, so pass the complete positive file list minus that one file and prove inventory equality.
  - Sunclaw is shared with B1-B's runs; queue, don't preempt.
- **GitHub CI doesn't run** (private-repo billing). Report it as not run.

## Standing rules
- Never print secret values; redact matches in reports.
- No new CI gates or check-script changes beyond what the plan names (steps 6–7 adapt two tests at the same strength).
- No Python added. UUIDv7 only. No wall clock in tests.
- No stash, `--amend`, `--no-verify` or force-push. Signed commits through 1Password; after two failed attempts, `--no-gpg-sign`.
- Push the candidate branch to today's private origin so the auditor can read it. Open no PR.

## Return
- `work/implementer-handback.md`, as plan step 11 says: candidate head SHA, tree hash, sweep dispositions (redacted), gate counts with exit codes, the notice inventory, the final file manifest path, and every judgment call.
- Report milestones and blockers to the Lead by agent-router message.
- **Work log:** no-home; the handback is your record; only the Lead writes the trace.
