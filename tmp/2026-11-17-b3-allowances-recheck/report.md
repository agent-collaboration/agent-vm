# B3 allowance recheck — NEEDS REVISION

One introduced finding: approval is additive today, but the revised design replaces the machine's allowed set. The table shape and approval-history separation are sound. The requested cross-page cleanup also has pre-existing residual gates.

## Target and boundary

- Commission: [brief.md](brief.md), lines 3–14; five scoped checks, inspect only, this report is the only write.
- Agent VM: `98b324ccca7264b2abbbf1779549cad2f259a644`; reviewed `73eb14c6..98b324ccc`, including the revised Decisions page. During review HEAD advanced to `c48620c4963f1b8cc05ce8cd1a978929fcd143ff`; the final `git diff --exit-code 98b324ccc -- docs/specs/2026-11-15-fleet-access-b3` was empty (exit 0), so the reviewed B3 content still matched the pinned target.
- Central: `5136b5088f19bdc0bd8f26bf8aff7b62ad6b9205`, also the observed `origin/main`. Central evidence was read with `git show` at that commit, independently of its working tree.
- Duty: independent scoped design review, not delivery review or acceptance. No authoring history in this session.
- Work home: `no-home`, as supplied by the commission. This report is the commissioned record; no board post or separate trace was created.
- The commission supplies the owner's 9 Nov approval and 17 Nov migration choice. I opened the named SQL proposal to check its content; I did not independently retrieve the owner's original selection event.

## F1 — Approval would silently withdraw existing allowances

**Priority: P1. Introduced in this revision. Disposition: accepted finding.**

[program-design.html:96](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-15-fleet-access-b3/program-design.html:96) says behavior stays exactly as today, then requires approval to leave the picked rows active and withdraw the rest. [verification-design.html:29](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-15-fleet-access-b3/verification-design.html:29) makes exactly that replacement behavior an oracle.

Central does the opposite at the pinned commit. [device_login_decision.rs:75](/Users/shravansunder/code/projects/codex-router/crates/collaboration-central-core/src/organization_authority/machine_login/device_login_decision.rs:75) explicitly says approval adds allowances and does not withdraw existing ones. Lines 76–87 compute only additions and append them to the existing machine set. The resulting machine is persisted through `PutMachine` (lines 103–107), and [machine_login_writes.rs:135](/Users/shravansunder/code/projects/codex-router/crates/collaboration-central-core/src/machine_login_writes.rs:135) writes that computed set. These are source observations, not an executed behavior claim.

Concrete counterexample: an active machine has W1 and W2; a new device-code approval selects W2 and W3. Current Central retains W1/W2/W3. The proposed wording withdraws W1 and leaves W2/W3. That changes authorization during re-login and contradicts [specification.html:64](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-15-fleet-access-b3/specification.html:64), which preserves allowances on active re-login. The original approved B3 also preserves them at [b3-machine-login.source.html:63](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-02-fleet-access/deliverables/b3-machine-login.source.html:63) and in its proof row at line 345; the 9 Nov SQL proposal repeats this at [b3-sql.html:112](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/tmp/2026-11-08-b3-sql/b3-sql.html:112).

**Smallest correction:** keep the approved table, remove the new replacement rule, and state that approval activates the selected allowances while preserving other active allowances. Withdraw remains the explicit one-workspace operation. Preserve the existing pure decision; change its storage mapping. In V3 distinguish fresh/post-revoke approval from active re-login, and include the counterexample above. The immutable approval snapshot still records only that approval's submitted workspaces.

Route: `design-program -> design-verification`.

Correction confirmation: reopen these two changed anchors and the V3 cases; confirm active re-login preserves W1 and adds W3, explicit Withdraw removes only its target, and post-revoke approval does not restore old allowances. No new owner storage decision is needed to preserve the existing contract.

## O1 — Storage is still described as awaiting the owner on other pages

**Residual observation against commission check 4; not a newly introduced regression.** These passages already exist at `73eb14c6`:

- [plan.html:23](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-15-fleet-access-b3/plan.html:23) still makes “you have answered the two decisions” a start gate, although its diagram no longer does and its S4/S7 rows now say Decided.
- [audit.html:35](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-15-fleet-access-b3/audit.html:35) still calls enrollment storage A and #11's fate open.
- [program-design.html:91](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-15-fleet-access-b3/program-design.html:91) still sends the former-ID column back for schema approval before build. [decisions.html:132](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-15-fleet-access-b3/decisions.html:132) now expressly says that column was decided and the SQL is for inspection, not a new decision.

This leaves a reader or implementer with conflicting start conditions. Replace these residual statements with references to the settled Decisions entries; retain the separate owner go-ahead and other real prerequisites. Route: `design-program` for its paragraph, caller for Audit and Plan. Recheck these anchors, rather than reopening the storage decision.

## Results for the five commissioned checks

1. **Table shape: checked, no finding.** Program Design lines 98–111 preserve the approved one-machine/one-workspace identity, UUIDv7 primary key, `active | withdrawn`, timestamps and pair uniqueness. The machine foreign key is adapted to current `machines(machine_id)`; timestamps follow current Central TEXT columns. Existing `machines_installation` uniqueness remains part of 0001. The original SQL shape is at `b3-sql.html:98–112`; the current schema is `0001_workspace_requests.sql:3–26`. The supplied commission authorizes the in-place migration treatment; this is not proof that a reset or migration has run.

2. **Admission query: checked in source, no finding.** Program Design lines 113–119 bind workspace/machine/credential as `?1/?2/?3`; the unique pair makes the scalar state lookup unambiguous. Missing/withdrawn refuses; unknown stored states are corruption. With a NULL workspace argument the equality cannot select an allowance row, and the proposed decoder must skip allowance handling. Preserve the existing checks in `workspace_admission.rs:13–33` (organization, credential match, machine state and expiry) and `:42–48` (workspace active; missing/archived refuses). An active allowance alone is insufficient; the page's “refusals unchanged” preserves those checks. No SQL was executed on either host under this inspect-only commission.

3. **Behavior preservation: fails on approval (F1); revoke matches.** `revoke_enrollment.rs:22–27` first requires an active enrollment; its `PutMachine` at `:43–47` clears all allowances and records their withdrawal at `:57–64`. The writer persists the cleared machine set. The table mapping can preserve that behavior atomically. First-Grant supersession also preserves the current machine allowance set (`machine_token_decision.rs:140–144`), rather than resetting it from the approval snapshot.

4. **Cross-page agreement: incomplete (F1 and O1).** S4/S7, V4 and the updated Plan decision rows do not require the old column or a new storage choice. V3's new summary carries F1, and the residual gates above remain. All seven current B3 pages were opened; this was not a new full-design readiness review.

5. **Approval history: checked, no second authority found in the inspected paths.** `machine_login_writes.rs:231–240` inserts the per-approval snapshot; `:267–278` makes it immutable on later state changes. `machine_login_reads.rs:18–20,27–48` and `machine_login_rows.rs:105–108` read it as enrollment history. `device_login_decision.rs:35–39,133–138` returns it for request-id idempotency, as S2 requires. Current authorization comes from the machine's live set (`workspace_admission.rs:34–48`), proposed to move to `machine_allowances`; token activation does not copy the historical snapshot back into that live set. Keep those historical reads and replay semantics while moving live reads/writes to the table.

## Evidence limits and checkpoint

Read-only source inspection and Git comparisons only. No tests, lint, builds, app runs, browser checks, SQL execution, migrations, reset, CI, deployment or runtime proof were run or claimed. No product/design files were edited. Existing unrelated B1 worktree changes were present at entry and were left alone.

The substantive risk if implemented as written is loss of previously granted workspace access during active re-login; V3 would then endorse that regression. Next owner: the commissioning Lead routes F1 and the residual O1 passages for bounded corrections, then returns those anchors for recheck. This report is the checkpoint; no owner question is pending from this review.

**Communication blocker:** the attempted Router reply to the commissioning agent was rejected by automatic approval review. Its stated reason was that internal design findings and repository paths lacked explicit authorization for that destination. No workaround or retry was attempted. Sending the findings and report path is pending the owner's approval; the source review itself is complete.

## Recheck at fc5ba8ca5

**READY for the scoped corrections. F1 closed; O1 closed.** This appended result supersedes the initial verdict for these findings; it does not constitute full-design or delivery acceptance.

Correction authority: the commissioning Lead's Router message `01a1e76d-f939-7a72-8879-d466f06d8860` requests rechecking only the corrected anchors and appending here. It also directs that no Router reply be sent, because the Lead will read the file. That replaces the earlier pending reply with a local handback; no sending approval is needed for this handback.

Observed target: `fc5ba8ca562531127c70320f19af437819a39e17`, also HEAD at entry to the recheck. `git diff --exit-code fc5ba8ca5 -- docs/specs/2026-11-15-fleet-access-b3` returned an empty diff, exit 0. I inspected the complete correction diff for the four affected pages and reopened the named anchors at that commit.

- **F1 closed:** [program-design.html:96](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-15-fleet-access-b3/program-design.html:96) now makes approval additive, preserves every other active row, and keeps the immutable approval snapshot separate. I reopened Central `5136b5088`'s `device_login_decision.rs:63–107` and `revoke_enrollment.rs:22–64`: additions preserve existing allowances; revoking an active enrollment clears them. The corrected wording agrees with those sources.
- **F1 proof-design correction checked:** [verification-design.html:31](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-15-fleet-access-b3/verification-design.html:31) explicitly retains W1/W2/W3 after an active W1/W2 machine is approved for W2/W3. Lines 32–36 then require targeted Withdraw, revoke leaving no active allowances, and a fresh W3 approval restoring only W3. The stated wrong builds distinguish replacement-at-approval and restoration-after-revoke. I also reopened the V3 section at lines 59–64; its ordinary approval/withdraw and post-revoke cases remain consistent with these explicit scenarios.
- **O1 closed:** [program-design.html:91](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-15-fleet-access-b3/program-design.html:91) identifies the former-ID column as already approved and links to Decisions and its SQL. [plan.html:23](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-15-fleet-access-b3/plan.html:23) removes the unanswered-storage start gate while retaining the real prerequisites and owner go-ahead. [audit.html:35](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-15-fleet-access-b3/audit.html:35) now identifies the decisions as settled.

No new finding arose from these corrections. Unchanged coverage from the original review is retained; no broader review was repeated. This was source-only correction verification: no tests, lint, builds, SQL execution or runtime proof. Only this report was edited. No Router reply was sent. This entry is the local handback and checkpoint; no owner action remains for this review.
