# Review: sign-in verification redesign

Role: 🔎 Checker, review duty (independent). Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30.
Review `design.html` and `plan.html` in this folder against the code in
`/Users/shravansunder/code/projects/switchboard-public.verify-sign-in-script` (main = origin/main 7e32e00e;
PR #9 = branch head 1f2f039, which does not merge) and the verification practice
(`sunstack-dev:practices-verification`, `practices-verification-maintenance`).

Questions:
1. Does each claim/journey name a wrong behaviour its observation can actually catch, at a boundary where
   that wrong behaviour stays real? Any claim that is mis-placed (too cheap or too expensive)?
2. Is anything the design says about the code false? Check file names, what is on main vs PR #9, test files
   named, vitest config, verify-auth skill on main vs PR #9. Cite file:line.
3. D4: does dropping the AST anchor/stack-path decoder allow a security check to pass for the wrong reason?
4. Structure: package ownership, seams, any implicit state left.
5. Anything missing that would make the plan not deliver working verification.

Write findings (blocking / should-fix / note, each with file:line evidence) to `review-report.md` here and
message the Lead. Read only; no runs, no edits elsewhere.
