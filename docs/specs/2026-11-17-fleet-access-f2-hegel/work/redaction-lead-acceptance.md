# Lead acceptance: exact and pattern credential redaction (switchboard PR #5, 5e99fc30)

1. **Required.** A redacted upstream response must never contain any part of a configured exact value, which means every upstream header value (`upstream-mcp-protocol.ts:253-255`). It must also never contain any part of a credential-pattern match (`Bearer …`, `Basic …`, `key=…`). This must hold whatever the configured order is and however values overlap. Found by the F2 fresh review (F1). The old code replaced values one at a time in order (`upstream-response-middleware.ts:26-30` at `d96e9650`):
   - `['acme','acme_live_9f8']` gave `[REDACTED]_live_9f8`;
   - with patterns applied first, an exact value containing `Bearer …` lost its prefix;
   - with exact values applied first, `Bearer secret-token` with exact `secret` gave `[REDACTED]-token`.

2. **Observed** (I read the diff and the Verifier's report, `work/verifier-redaction-observation.md`):
   - **The fix.** `redactCredentialSpans` collects every exact occurrence, including self-overlap, and every pattern match (the patterns are all `/gi`), all against the original text. It merges overlapping and adjacent spans and replaces each span once.
   - **API.** The exact-only API passes no patterns. The wrapper keeps the existing three patterns.
   - **Scope.** Four files: the function, a new Hegel unit file, and a tool-engine devDependency on `@hegeldev/hegel` 0.4.10, with three lock importer lines and no resolved-version change.
   - **Verifier on main `d96e9650`.** The four new regressions each fail twice, with matching shrunk traces. The fifth test, which preserves existing behaviour, passes. The 15 runtime integration tests pass.
   - **Verifier on `5e99fc30`.** 11 unit and 15 integration tests pass.
   - **Extra scratch challenges.** Five more defects were planted: self-overlap, adjacency, unmerged overlap, exact-first in the unit and exact-first in the real runtime. Each fails twice and is green once restored.
   - **Implementer's broad run.** Unit 2659, integration 314, check 12/12.

3. **Boundary exercised.** The real tool-engine redaction functions, through the unit lane and the real upstream MCP client runtime integration.

4. **Uncertain.**
   - Performance on very large responses with many header values. The cost is O(values × occurrences); no benchmark was run.
   - Hosted deployment.
   - CI on `5e99fc30`: see below.

5. **Decision.** Accepted, conditional on CI being green. Next: a fresh Opus review, then merge after telling Lead A. It's security-relevant.

CI on `5e99fc30`: Validation passed; the E2E host run was in progress when this was written.
