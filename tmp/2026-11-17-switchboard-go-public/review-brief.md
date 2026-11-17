# Validate the Switchboard public-cut plan (Sol xhigh review)

**Duty:** `review`, an independent design review (not a delivery review). **Target:** `tmp/2026-11-17-switchboard-go-public/plan.md` as committed at agent-vm HEAD, against Switchboard `origin/main` `7bee7182` and the audit `tmp/2026-11-16-switchboard-prepublication/report.md`. **Independence:** you authored neither. **Grant:** inspect only; write only `tmp/2026-11-17-switchboard-go-public/review.md`. **Work log:** no-home.

The owner asked: "is there anything that should be private?" and "get sol to validate". Answer that question first.

**Check:**
1. **The split.** Is anything on the public list something that should stay private? This covers secrets or their locations, personal data, internal hosts and process, third-party material without rights, unfixed security weaknesses, and business-sensitive material. Is anything on the private list needed for the public code to build, test or be understood? Read the actual files, not only the audit.
2. **Coverage.** Does every audit finding (F1–F6, S1–S4) have a step that closes it, or a stated reason it doesn't apply under a new repo?
3. **Breakage.** Will removing `docs/`, `tmp/`, `scripts/publish-local.sh` and `release.yml` break any test, script, check, import, workspace glob or fixture? Name the files.
4. **Licence.** Are the AGPL-3.0-only fields, the AgentStudio-style LICENSE and CLA, and the notice treatment for Better Auth UI and shadcn right? Anything else copied (code, fonts, icons, generated vendor files) that needs a notice?
5. **The cut.** Is the step-13 sequence (rename, create public, orphan single commit, push, branch protection) safe, and in the right order? Does renaming break anything GitHub-side (open PRs, Actions, redirects once the old name is reused)?
6. **Sweeps.** Are the step-8 sweeps sufficient as a publication gate? What's missing?

Return READY or findings by severity with file:line anchors at `7bee7182`, and a direct answer to "is there anything that should be private?".
