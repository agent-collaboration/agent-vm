# PR #10 independent review

Role: 🔎 Checker, review duty (independent; no authoring history on this PR). Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30.

**Target:** agent-collaboration/switchboard PR #10, head `46b582ff3d8cc2d265c3436d6234617c8177d781`, base main `7e32e00e`.
Fetch it into `/Users/shravansunder/code/projects/switchboard-public.verify-sign-in-script` with
`git fetch origin pull/10/head:pr10`. Read only, and don't change that checkout's branch.

**Approved design:** `design.html`, `ci-workflow.html` and `review-report.md` (the disposition at the end) in
`docs/specs/2026-11-20-sign-in-verification-redesign/`. The plan is deliberately withheld.

**Review for:**
1. Correctness. Can any browser scenario, journey script or security-check decoder pass on a wrong build? Check the D4 assertion identity, D6 causal cancellation and the D8 explicit hosts.
2. Waits. Is there any wall-clock wait or non-zero timeout used as a wait? Is every wait causal?
3. Structure. Check package ownership, injected seams, invariants and where each is enforced, and any implicit state machine (flags, ordering, pending variables) that should be a closed union.
4. Cutover. Do main's B2 selections still route with their evidence? Is the importer disposition complete? Is anything of ours left dead?
5. CI. Does `ci.yml` match `ci-workflow.html`, and are the background, wait and wait-all semantics right?
6. The known intermittent hang (run 44738937290, `passkey no-user-verification on cloudflare` stalls before registration-options). From source alone, name any race in the page or the scenario that could explain it, with file:line.

Write findings to `pr10-review-report.md` beside this file, marked blocking / should-fix / note, each with file:line and a concrete failure scenario. Message the Lead. No runs, no edits elsewhere.
