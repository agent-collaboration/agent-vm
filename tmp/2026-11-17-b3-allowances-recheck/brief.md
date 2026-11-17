# B3 scoped recheck: allowances back to the owner's machine_allowances table

**Duty:** `review`, scoped design recheck (not a delivery review). **Target:** agent-vm `98b324ccc`, `docs/specs/2026-11-15-fleet-access-b3/`, diff `73eb14c6..98b324ccc` (plus decisions.html from `66f7e0c3`). **Grant:** inspect only; write only `tmp/2026-11-17-b3-allowances-recheck/report.md`. **Work log:** no-home; the report is your record.

**Authority:** owner, 9 Nov, B3 SQL review, "Approve option A": `machine_installations`, `machine_enrollments` (one row per login), `machine_allowances` (one row per machine and workspace, active | withdrawn, UNIQUE(machine, workspace)), former routing ID set once (`tmp/2026-11-08-b3-sql/b3-sql.html`). The 15 Nov B3 had re-asked and recommended `machines.allowed_workspaces`; that is withdrawn. Central migrations are edited in place (owner, 17 Nov, via Lead A).

**Check:**
1. `program-design.html#allowances` is faithful to the 9 Nov decision, adapted to Central's current tables at codex-router `origin/main` `5136b5088` (`machines`, `machine_approvals`, `0001_workspace_requests.sql`).
2. The admission query is correct against `workspace_admission.rs` at that commit: same refusals; NULL or withdrawn refuses; no allowance read without a workspace.
3. The claim "behaviour stays exactly as today" (approval sets the set, revoke withdraws all) is true against `device_login_decision*.rs`, `revoke_enrollment.rs` and `machine_login_writes.rs`.
4. No remaining page still waits on a storage answer or contradicts the table (spec S4/S7, verification V3/V4, plan).
5. `machine_approvals.allowed_workspaces` kept as approval history: is that a second source of truth anywhere?

Return READY or findings with file:line anchors.
