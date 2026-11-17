# Lead acceptance: redaction of keys, numbers and streamed stderr (switchboard PR #7, e76bf5a6)

Governing file: `work/recursive-streamed-redaction-rulings.md` (O1 and O2, from the PR #5 fresh review). Written 2026-11-17 by the Fleet access Lead.

1. **Required.**
   - **O1.** JSON object keys get the same redaction policy as values: exact values plus patterns on the response path, exact values only on the catalog path. A number becomes `'[REDACTED]'` only when `String(number)` equals a configured exact value. Key collisions keep `Object.fromEntries`'s last-wins behaviour, documented.
   - **O2.** Node stdio stderr is redacted across chunk boundaries:
     - through a runtime-free incremental redactor in `tool-engine` that shares its rules with the batch path;
     - carrying original unredacted text, never redacted text;
     - with a named 4096 cap that fails closed.

     The Node adapter owns UTF-8 decoding and an idempotent finish, and keeps the SDK transport identity.
   - **Oracle.** For any partition into chunks, including UTF-8 byte partitions through the real Node adapter, streamed output equals batch output when the cap isn't hit. When the cap is hit, nothing leaks.

2. **Observed**, opened by me:
   - **Product diff.** I read all five product files at frozen `7df81e95` (push gate, 17 Nov):
     - `credential-text-matches.ts` holds the single rule set and matcher; `redactCredentialSpans` and the incremental redactor both call `findCredentialTextMatches`.
     - The pending tail is `combined.slice(stableEnd)` of the original text.
     - `maximumPendingCredentialPatternCharacters = 4096`, with its why-comment; overflow marks the span covered.
     - The redactor's states are closed unions: `RedactorState`, `PatternStreamState`.
     - The Node adapter uses one `StringDecoder` and `finish()` on stderr `end`/`close` and in the `close` finally. `withOrderedStdioMessages` returns the same instance, which I read in source.
     - Number equality and redacted keys are in both walkers, with the last-wins comment.
   - **Product unchanged since review.** I ran `git diff 7df81e95..e76bf5a6 -- ':!*.test.ts'` myself: empty. After `7df` only three test files changed, each delta read and accepted:
     - the long-tail `!suffix` fixture;
     - the union wrapper key, which now takes its expectation from the independent coverage oracle;
     - word-boundary literal controls on the core and the real SDK Node path.
   - **Verifier** (`work/verifier-recursive-streamed-observation.md`, `evidence/followup-e76bf5a/`):
     - On `main` the new tests fail: 13 semantic failures, identical across runs. They pass again once restored.
     - 25 deliberate faults are each rejected: they fail twice with the same shrunk case and pass once restored. These are the 20 at `7df`, plus the strong tail, union and literal faults at `52bf8630`, plus 2 word-context faults at `e76`.
     - Among them is the precedingWordCharacter mutation that the 500-case properties had missed. The new literal controls catch it: `x[REDACTED]` against `xBearer secret`.
     - At `e76`: 46 unit tests across its 6 files pass; all 1627 tracked blobs match Git.
   - **Implementer at `e76`.** check 12/12, unit 2733, integration 325, all exit 0.
   - **PR body.** Carries the collision sentence word for word and the logged exclusions (O3 `error.name`, O4 whole-header matching, short-header over-redaction). No private paths; I scanned it.

3. **Boundary exercised.**
   - The real `tool-engine` redaction functions through the unit lane.
   - The real upstream MCP runtime through integration.
   - The real `StdioClientTransport` stderr pipe with byte-level partitions through the Node adapter.

4. **Uncertain or limited.**
   - The cap path over-redacts a long `Bearer`/`Basic` whitespace prefix that turns out not to be a credential. This is accepted by the ruling.
   - Every header value is in the exact set, so short non-secret values over-redact. Logged; a separate design question.
   - O3 and O4 are logged, not fixed.
   - No benchmark on very large stderr.
   - Hosted deployment is not covered.
   - CI on `e76bf5a6`: see below.

5. **Decision.** Accepted, conditional on CI run 44178013201 on `e76bf5a6` being green. Next: a fresh Opus review against the rulings and the PR, then merge after telling Lead A.

CI on `e76bf5a6`: pending at time of writing.
CI run 44178013201 on `e76bf5a6`: E2E (host), Validation and check all passed. I checked this myself with `gh run view`.

## Update: fresh review READY, L1 fix in progress

The fresh Opus review (`tmp/2026-11-17-pr7-review/report.md`) is READY, with five Low or informational notes. L1 is a regression this PR introduced: key redaction renames `isError` or `content` before the error classification reads them. It is fixed before merge, under the L1 refinement in the rulings file. **This acceptance does not cover the L1 head.** It is updated once the L1 diff passes my review, the Verifier pairs red on `e76` with green on the fix, CI runs on the new head, and the same reviewer reads the delta.

## Update: final head `962d258d` (L1 and L2 fixed, main merged)

- **L1 and L2 diff `e76bf5a6..571ae9ba`, read by me before push:**
  - Both runtimes classify on the raw result.
  - Both helpers take an optional `RedactionOptions` and redact each raw block before the existing trim, join and cap, so the pre-PR order is kept.
  - The error path carries only the redacted message.
  - The success path returns `redactUpstreamResponse(...)`.
  - L2 is one comment.
- **Merge `962d258d`** brings in main `b0198164` (PR #6). `git diff 571ae9ba 962d258d -- packages/tool-engine packages/tool-host-node` is empty; I ran it myself.
- **Verifier at `571ae9ba`:**
  - 4 Error/on cases fail on `e76` and pass on the fix.
  - 4 preservation controls: the long value across the cap, and the whitespace trim.
  - 6 rollback probes are each rejected twice: classification, raw extraction, and redact-after-trim/cap.
  - The helpers with no options give output equal to `e76`.
- **Implementer at `962d258d`:** check 12/12, unit 2739, integration 333.
- **Delta review** by the same reviewer: READY, with 0 findings and one informational note. N1: a configured value inside the literal `text` no longer drops the message, which is correct.
- **CI** on `962d258d`, run 44185671558: pending; see below.

**Decision:** accepted at `962d258d`, conditional on CI 44185671558 being green. Then merge after telling Lead A.
