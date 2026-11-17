# Switchboard public candidate: publication-source audit (fresh Sol xhigh)

**Duty:** `review`, an independent publication-source assessment of a declared artifact. It isn't a delivery review of product behaviour. **Independence:** you authored none of Switchboard, the plan or the candidate.

**Target:** the exact tree that would be published.
- Branch `pub/public-candidate` on `agent-collaboration/switchboard` (private).
- Commit and tree hash are the ones named in `work/implementer-handback.md`: **`d9923c5e64763d1bd849f97919c8f6fbf1d7d0e3`** (six test-vault literals changed to example-vault in 2 files, from `1250e102`), unless the handback declares a later head.
- Audit the **tree only**. The candidate's parent history stays private and is never published; the public commit will be a new parentless commit with this exact tree (plan steps 15 and 19).

**Grant:** inspect only (read and run read-only commands, `pnpm dlx` read-only scanners, no installs into the repo); write only `tmp/2026-11-17-switchboard-go-public/candidate-audit.md`. Never print secret values; redact to the first 4 characters. **Work log:** no-home.

**Governing sources:**
- `plan.md` (rev 3, READY in `review.md`);
- the original audit `../2026-11-16-switchboard-prepublication/report.md`;
- `work/implementer-handback.md` (gate counts, sweep dispositions, notice inventory, manifest).

**Check, with file:line anchors at the target:**
1. **Every audit and review item closed in the tree:** F1, F3, F4, F5, F6, S2, S3, S4 and R2–R7. F2 and S1 are closed by not publishing history; confirm no tracked file reintroduces them.
2. **Full-tree sensitive scan of your own, not the Implementer's:**
   - personal data and emails;
   - `op://`, vault and item names, account domains;
   - machine and host names, LAN, Tailscale;
   - Router or approval IDs and handback references;
   - signing team IDs;
   - private keys, JWTs, credential assignments, URL userinfo;
   - cloud account and zone IDs;
   - provider tokens and high-entropy candidates;
   - home paths;
   - any image or binary.

   Check each "kept" disposition in the handback: is it really synthetic, a negative test, or a public technical value?
3. **Notices:** every copied third-party piece in the tree has a correct entry in `THIRD_PARTY_NOTICES.md`, plus a header where the format allows comments. The Apache text is present. Licence fields say AGPL-3.0-only everywhere planned. LICENSE is the unmodified AGPLv3 text with the project header. CLA, PR template and CONTRIBUTING are consistent. Look for any copy the inventory missed.
4. **Workflows:** no workflow grants `id-token: write` or `contents: write`, or publishes. No `pull_request_target`, no self-hosted runner, no `secrets.*` in PR-triggered jobs.
5. **Usability:** public docs and agent skills reference only paths that exist in the tree. No link points to a private spec, branch or repo.
6. **Gates** (the Sunclaw run may still be in progress when you start; do checks 1–5 first, then read the receipts once the handback has them, and say if they never arrived): read the handback's Sunclaw receipts. Are the counts complete (both hosts, Python, check)? Anything skipped without a reason?

**End with** PUBLISHABLE (this exact tree may be published) or NOT PUBLISHABLE plus the blocking items. State what you didn't cover.
