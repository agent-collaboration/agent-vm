# Phase 1 Implementer packet: sign-in navigation shell

Role: 🐒 Implementer (role-implementer), Designed Outcome, Cross-domain. Model gpt-6.2-sol, high effort. Runs on Sunclaw.
Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30, service 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89. Report to the Lead.

**Read first, in full,** from agent-collaboration/agent-vm at commit 52eaf358a (branch design/portal-remediation), folder docs/specs/2026-11-20-sign-in-navigation-ui/:
- design.html (revision 4, accepted). The spec is Phase 1, N1–N10 and the route table.
- design-review-report.md.
- shadcn-inventory.md.
- decisions.html.
- mockups/index.html. Note that its phone bottom bar is superseded.

**Build** one PR on public agent-collaboration/switchboard, from the fork used for PR #10:
- Branch `ui/navigation-shell`, from PR #10's head `cb12ec632ebf918a264b3626aca3cc9f0800e4d9`. Rebase onto main once PR #10 merges.
- Worktree under /Users/shravansunder/code/projects/fleet-access-runner/nav/.
- Phase 1 only:
  - the shell (Sidebar and Sheet, the switcher);
  - Me, recomposed, with the layout fix;
  - the sign-in-owned Sign out route and sessionRowByToken;
  - /people in the shell;
  - the server route table;
  - the readiness predicate;
  - a switcher link to /organization-admin, which itself is unchanged.
- Add the shadcn `dropdown-menu` and `item` with the shadcn CLI into the shared tool-access-ui package. Hand-build nothing.
- Every Phase 1 check row has a test, using PR #10's Playwright tooling in real Chromium on both hosts. Server-rule checks call the real routes on both hosts.

**Rules:**
- No wall-clock waits.
- UUIDv7 only.
- TypeScript only.
- Drizzle for any store read.
- No new check gates.
- No SIGKILL.
- Sunclaw runs one heavy job at a time. A Claude Sonnet session (claude-local 1f4d23ed on Sunclaw) is running PR #10's security checks; don't start heavy runs until it finishes.

**Handback:** commit, commands, counts and exit codes per host. For each check row, the wrong build failing and the right build passing. A STRUCTURE section: package ownership, seams, invariants, and implicit state made explicit.
