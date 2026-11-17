# Fresh review: switchboard PR #2, malformed link-social JSON (Opus high, different lineage from the Sol author)

**Duty:** `review`, an independent delivery review of a small bug-fix PR. **Target:** `https://github.com/agent-collaboration/switchboard/pull/2` at `246b889ecf7894ef555d93dbeb4d064ef3ad1d53`, base public `main` `b03d35ff`. Local checkout: `/Users/shravansunder/code/projects/switchboard-public.fix-link-social-malformed-json`. **Grant:** inspect only; write only `tmp/2026-11-17-pr2-review/report.md` in the agent-vm worktree. **Independence:** you authored none of it.

**What it must do** (from F1's fuzz finding):
- Malformed JSON at `POST /api/auth/link-social` must get a client refusal, not 503, matching Better Auth's own parser (Better Call 1.4.2 `dist/utils.mjs:24–31`).
- A genuine storage failure must stay 503.
- No new stored effect and no credential in the refusal.

**Evidence to read** (don't trust summaries; open the sources):
- the diff;
- the Lead acceptance `docs/specs/2026-11-17-fleet-access-f1-fuzz/work/link-social-lead-acceptance.md`;
- the Verifier's `docs/specs/2026-11-17-fleet-access-f1-fuzz/work/link-social-verifier.md`;
- the PR's CI.

**Check:**
1. Is catching only `SyntaxError` right, or can another parse failure still reach the 503 path? Consider: a wrong content type, an empty body, a huge body, and invalid UTF-8.
2. Does the 400 body and its headers match native behaviour exactly, and does the early return skip anything the native route would have done (for example the CSRF/origin checks, rate limit or audit)?
3. Do the regression tests fail on the old code and pass on the new, for the right reason?
4. Anything else in `sign-in-http-handler.ts` with the same pattern (a pre-read inside a catch-all 503)? Report it; don't fix it.

**Return:** READY or findings by severity with file:line, then a short message to the Lead.
