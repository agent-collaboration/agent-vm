# Phase 1 code review: sign-in navigation

Role: 🔎 Checker, review duty, independent. Model gpt-6.2-sol, xhigh effort. Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30.

**Target:** the fork draft `shravan-agent/switchboard#1`, branch `ui/navigation-shell`, head `c48dddbcfc152aad71595e668251e930905e7b04`. Review the diff against PR #10's head `cb12ec632ebf918a264b3626aca3cc9f0800e4d9`. Read it into `/Users/shravansunder/code/projects/switchboard-public.verify-sign-in-script` with `git fetch https://github.com/shravan-agent/switchboard.git ui/navigation-shell:nav-phase1`. Read only.

**The approved design:** `design.html` (revision 4 plus the N6 and N7 rows) in the folder above this one, together with `shadcn-inventory.md` and `decisions.html`. The plan is withheld.

**Review for:**
1. **False passes:** any check row that could pass on a wrong build.
2. **Security:**
   - the server route rule enforced for direct requests;
   - sign-out (origin check before effect, token lookup, only Absent clears the cookie, the fenced delete);
   - readiness and continuation preservation.
3. **Structure:**
   - package ownership;
   - injected seams;
   - invariants and where each is enforced;
   - implicit state made explicit.
4. **Components:** anything hand-made against the inventory.
5. **Waits:** no wall-clock waits.

Write `phase1-review-report.md` beside this file: blocking / should-fix / note, each with file:line. Message the Lead.
