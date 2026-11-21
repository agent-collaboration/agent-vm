# Commission: sign-in verification script

Lead: Fleet access Lead (claude-local `cd5902e2`). Written 2026-11-20 at about 00:55 UTC.

**Authority.** On 19 Nov the owner said, in chat: "you have to do verification design you in charge clean up the suppositions and make a verification script that matters". The design is `design.html`, in this folder. It is the governing document: read it in full first.

**Build.** Make one Switchboard PR on public `main` (`e51fa198` or later) in a new Agent Studio worktree. Branch: `verify/sign-in-script`.
- Add `scripts/verify-sign-in.mts`, written in TypeScript and run with Node. It takes `--commit <sha>` and, optionally, `--flows` and `--checks`. For that commit it:
  - makes a fresh temporary checkout, then runs a frozen install and a build;
  - runs each flow's tests on both hosts (`SIGN_IN_TEST_HOST=cloudflare` and `node`) in real Chrome;
  - runs each security check from `verification/security-checks.ts`: apply the edit, run the named test, require a failure at the named assertion, restore, then require a pass;
  - prints one table of the five deciding facts and writes a small JSON report;
  - exits with a non-zero code on any problem.
- Add `verification/security-checks.ts`, a typed list with these fields: id, file, exact `find` and `replace`, test file and name, and the expected failure message substring. It starts with today's checks:
  - V5, the removed-member guard (INSERT assertion);
  - F1, a failed sign-in is recorded;
  - B04, the factor stamp on switch;
  - HTTP checks 9–16;
  - the stale-reply generation guard;
  - V6, the provider and outer limiters.

  Copy the exact edits from the qualified packets on Sunclaw.
- Add the flow lists from the design's table, reusing `auth-verification-journeys.ts` lists where they fit.
- Add unit tests (Vitest, under `packages/` or `scripts/`, following repo conventions) for the parts that make the decisions: reading each test's pass or fail and the assertion it failed at, deciding pass or fail for a security check, the restore check, and the report.
- Add `pnpm verify:sign-in` to `package.json`. Make **no** CI gate changes.
- Point the `verify-auth` skill's guidance at the new script, and trim its record-keeping rules.

**Rules.**
- TypeScript only.
- No timers or sleeps.
- No secrets in the code, the output or the commits.
- The script never touches the user's Keychain. The Keychain test stays excluded.

**Proof, on Sunclaw.**
- Run `pnpm verify:sign-in --commit e51fa198` (current main). Every flow must pass, and every security check must go red then green.
- Run it once against a deliberately broken local commit and show it reports failure.
- Get the exact command to the runner, or tell me and I'll run it over SSH.

**Diff to me before push.**

**Seats.** Implementer: codex-local `01a1e734`. Verifier: codex-local `01a1e709`. Same pair as B1-B. The Verifier challenges the script's decision logic and checks the two proof runs against the five deciding facts.

## Amendment 1 (Lead, 2026-11-20 about 01:05 UTC): follow practices-verification-maintenance

The owner invoked `sunstack-dev:practices-verification-maintenance` for this work. Load that skill and follow it. It replaces the "one new script" framing above wherever the two differ.

- **The outcome is upkeep of the existing project skill `.agents/skills/verify-auth/`.** It is the canonical skill, and `.claude/skills/verify-auth` is the intended relative link. Don't create a second recipe.
- **`SKILL.md` becomes short.** It covers:
  - app identity (the sign-in service and its two hosts);
  - how to start it and its readiness signal (the real harness witness);
  - a read-only health check;
  - a **journey index** naming each journey's script, with when and why to run it;
  - evidence;
  - cleanup.

  Remove the record-keeping and identity-comparison rules: the "compare the declared source revision, executed build/artifact, configuration, client, offered test inventory, host and toolchain" block, the every-receipt-`ready: true` rule, and similar. A journey passes when its tests pass on the target.
- **`references/` holds one file per journey or small group.** Each file says, from the user's side:
  - the behavior;
  - its prerequisites;
  - its entry points;
  - the steps, each with its observable result;
  - the **expected result, with its adopted source**: the approved design page and row, for example B1-B `specification.html#S5`;
  - the failures that matter;
  - the gotchas;
  - its script.

  Expected results come from those adopted sources, never from what the app does today.
- **Scripts live in `scripts/verify-auth/`, one self-describing script per journey.** Each script's header and `--help` say what it proves, its inputs and how to run it. It runs that journey's tests on both hosts, and prints the five deciding facts and a pass or fail exit code. The journeys are:
  - passkey sign-in;
  - organizations;
  - CLI sign-in;
  - agents;
  - security checks;
  - machine login, added later.

  The security-checks script reads `verification/security-checks.ts`, or puts that list beside the scripts if that fits the repo better. Shared logic goes in one module with unit tests where the repo keeps its tests. Use the repo's script convention: TypeScript run with `tsx`, as the existing `scripts/verify-auth/*.ts` are. Replace `verify-auth.ts`'s receipt-checking wrapper; hard cutover.
- **Run the scripts on the real target.** Drive every journey script on Sunclaw at current main, and every security check red then green. A journey you didn't drive is reported as a gap, not as covered.
- **On a failure, decide one cause before fixing anything.**
  - If the skill is stale, fix the skill.
  - If the script is broken, fix it and run it again.
  - If the app breaks its adopted outcome, keep the journey as written and report it as a product regression.
- **Return** using the practice's own return format.

> SUPERSEDED 2026-11-20 by ../2026-11-20-sign-in-verification-redesign/design.html. PR #9 does not merge.
