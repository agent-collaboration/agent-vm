# Lead acceptance: Switchboard public candidate (17 Nov 2026, 05:30 UTC)

**Accepted for publication:** commit `d9923c5e64763d1bd849f97919c8f6fbf1d7d0e3`, exact tree `ce4a989842ff7117e52b4192f43ccb7d844efc8a`, as a new parentless public commit. Only the tree is published; this commit's private ancestry is not.

## 1 · What was required
- Owner: D1 A (a new public repo, one clean commit; old repo private), D2 (rename to `switchboard-history`), D3 (AgentStudio-style AGPL), D4 (code plus rewritten docs). Go-ahead: "open source is fine after you clean stuff" (16 Nov).
- Plan rev 3 (`plan.md`, READY in `review.md`): steps 1–11, closing audit F1–F6, S1–S4 and review R1–R7.

## 2 · What was observed
- **Independent audit:** PUBLISHABLE (`candidate-audit.md`, Sol xhigh 01a1e774, 05:02 UTC). C1–C4 closed, F/S/R items closed in source, 7,548 sweep rows with 0 unresolved, JSON byte-identical.
- **Gates:**
  - Full batch at `1250e102`: check 12/0, unit 2,654/0, integration 314/0, Python 407/0 after the CI-equivalent frozen sync, workerd 475/0, Node 474/0 with 2 workerd-only skips; inventories equal the full list minus the one Keychain file.
  - Targeted at `d9923c5e`: check 12/0, config-contracts unit 128/0 and integration 1/0. The diff from `1250e102` is literal-only (6 vault literals in 2 test files), verified both by the auditor and by me.
  - Earlier failures stay on record: the `027c` format check and the `1250` Python collection.
- **My own reads** of the exact tree:
  - remote head and tree hash match;
  - 0 `agent-vm-testing`; op:// first segments only `example-vault` and `example-agent-vm`;
  - 0 home paths, personal emails, host names or 1Password account domains;
  - 0 docs, tmp, images or release workflow;
  - LICENSE (AGPLv3 with the project header), THIRD_PARTY_NOTICES, `LICENSES/Apache-2.0.txt`, CLA, CONTRIBUTING and the PR template are present;
  - README states AGPL-3.0-only subject to the third-party exceptions.
- **My acceptance found one leak the audit had missed** (the real test vault in 6 fixtures). It was fixed and re-audited before this acceptance.

## 3 · What boundary the observation exercised
The Git source tree that will be published, plus its gates on Sunclaw (both runtime hosts, Python and the check suite).

## 4 · What is still uncertain
- GitHub-hosted CI has never run on this tree. It runs first on the public repo, then branch protection requires it.
- The exact shadcn registry revision and the Pierre palette provenance are disclosed limits.
- Package and native-binary notice inclusion is deferred to a release design; nothing is published to npm or PyPI.
- Real identity providers, Cloudflare hosting and production aren't exercised.
- Commit metadata and the advertised refs of the future public commit get checked at the cut (plan steps 15, 19).

## 5 · Decision
Accepted. Proceed with plan steps 14–21; tell Lead A first. If hosted CI fails on the first public push, fix forward on the public repo; nothing private is exposed by a CI failure.
