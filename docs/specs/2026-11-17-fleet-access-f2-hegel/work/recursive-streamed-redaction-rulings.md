# Lead rulings: redaction follow-up (O1 JSON keys and numbers, O2 streamed stderr)

Fleet access Lead, 2026-11-17. This file is the governing authority for the follow-up PR after PR #5 (merged `8e7c4416`). The findings come from the fresh PR #5 review, `tmp/2026-11-17-pr5-review/report.md`: O1 and O2 are Medium; O3 and O4 are logged and deferred.

## O1 · JSON keys and numbers (`upstream-response-middleware.ts`, the `redactJsonValue` paths)

1. **Keys.** Key text gets the same exact-value plus credential-pattern span policy as values. That is one shared matcher, the same one used by `redactCredentialSpans`.
2. **Numbers.** A number is replaced whole with the string `'[REDACTED]'` only if `String(number)` **equals** a configured exact value.
   - The test is equality, not containment. Short non-secret header values such as `'1'` are in the exact set, and containment would turn most numbers into strings.
   - Unmatched numbers keep their number type.
3. **Key collisions after redaction.** Keep the existing `Object.fromEntries` last-wins behaviour. Add no suffix scheme and no new output contract. Document it in a code comment and in the PR body: "two keys that redact to the same text collapse; the earlier value is dropped".
4. **Catalog redaction** stays exact-only, as before.

## O2 · stdio stderr redacted per chunk (`tool-host-node` `node-upstream-transports.ts:69-71`)

**Boundary**

- A runtime-free **incremental redactor factory** lives in `tool-engine`: `write(string)` returns safe output, and `end()` returns the tail.
- The Node adapter owns only bytes and lifecycle:
  - one `StringDecoder('utf8')`;
  - an idempotent finish on stderr `end` / `close` and on `transport.close` finally.
- The SDK instance's identity and its order wrapper stay intact.
- This follows the core/host split: logic is portable, and the runtime is injected at the edge.

**Carry**

- Keep the **original unredacted** overlap tail and redact over the concatenation of tail and next chunk, emitting only the stable prefix.
- Never redact the buffer and then keep a tail; doing that recreates the split-secret leak.
- Hold back only a suffix that could still be the prefix of an exact value or pattern. Bound the exact-value tail by the longest configured value, and cut it in a surrogate-safe place.

**Cap.** The cap is **4096 UTF-16 code units** for an unresolved pattern prefix, which matters because Bearer and Basic allow unbounded whitespace. On overflow, fail closed: emit the marker and suppress that candidate until its terminator. Over-redacting a long prefix that turns out not to be a credential is acceptable; leaking raw text is not.

**Conditions**

1. **One source of truth.** The batch path (`redactCredentialSpans`) and the incremental path call one shared matcher and pattern set. There is no second copy of the rules.
2. **Decisive oracle: Hegel chunk-partition invariance.** For any input and any partition into chunks, including UTF-8 byte partitions through the Node adapter:
   - when no overflow cap is hit, `concat(write(chunk_i)) + end()` equals the batch `redactCredentialText(input)`;
   - when the cap is hit, no configured value and no pattern fragment leaks.

   Also required: the main-red cases (split value, split overlapping values, split Bearer, generated UTF-8 partitions) and the immediate-delivery control (`'controlled-cancelled\n'` is delivered at once).
3. **Typed state and named cap.** The state is a closed, documented type. The cap is a named constant whose comment says why.

## Logged, not in this PR

- **O3.** `error.name` is copied unredacted (`upstream-response-middleware.ts:187`).
- **O4.** Exact values are whole header values, so a bare token or an echo in a different case is caught only by the patterns.
- **Over-redaction.** Every header value is in the exact set, so short non-secret values such as `'1'` over-redact plain text. Which headers count as secrets is a separate design question.

## Process

- The diff goes to the Lead before push.
- The Verifier pairs as for PR #5: red on main, green on the fix, plus sensitivity challenges.
- After the Lead's acceptance, a fresh review, then merge after telling Lead A.
