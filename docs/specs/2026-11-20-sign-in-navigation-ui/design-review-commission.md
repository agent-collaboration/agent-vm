# Review: sign-in navigation design

Role: 🔎 Checker, review duty, independent. Model gpt-6.2-sol, xhigh effort. Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30.

**Target:** `design.html` beside this file. **Inputs:**
- `decisions.html` and `shadcn-inventory.md`;
- `mockups/` and `mockups/NOTES.md`;
- the owner's quotes in `docs/specs/2026-11-15-fleet-access-overview/owner-quotes-2026-11-20.md`.

**Code:** Switchboard main `7e32e00e`, read-only in `/Users/shravansunder/code/projects/switchboard-public.verify-sign-in-script` (`git show origin/main:<path>`). Better Auth is 1.7.11 and Better Auth UI 1.7.34, both pinned in its lockfile.

**Check:**
1. Is every file and line claim true? That includes `sign-in-http-handler.ts`, `sign-in-request-handler.ts`, `session-read-without-token.ts` and `person-organization-choice.tsx`.
2. Do the named Better Auth routes exist at the pinned version, with those exact paths and behaviour? These are `list-sessions`, `sign-out`, `revoke-session`, `organization/list-user-invitations`, `organization/reject-invitation`, `organization/update` and `organization/delete`.
3. Is every UI element a shadcn or Better Auth UI part as the inventory says? Is anything hand-made?
4. Are the owner's quotes exact, and are the assumptions labelled?
5. Can each planned check actually fail on its wrong build?
6. Are any requirements, dependencies or security gaps missing, for example permission filtering done only in the UI, or organization delete with no factor?

Write `design-review-report.md` beside this file: blocking / should-fix / note, with file:line for each. Message the Lead. Read only.
