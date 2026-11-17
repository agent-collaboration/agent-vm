# Lead acceptance: link-social malformed-JSON fix (switchboard PR #2, 246b889e)

1. **Required:** malformed JSON at `POST /api/auth/link-social` must get a client refusal, not 503, matching the native parser. Genuine storage failure must stay 503. Found by F1 (S2), confirmed by the Verifier on workerd.
2. **Observed:**
   - My diff read: only `SyntaxError` around `request.clone().json()` is caught; it returns 400 `{ code: 'BAD_REQUEST', message: 'Invalid JSON in request body' }` with `no-store`, identical to Better Call 1.4.2 (`utils.mjs:24–31`). Other errors rethrow to the existing 503.
   - Regression test: asserts the body, `no-store`, no `Set-Cookie`, and every stored row unchanged. A second case keeps the genuine-store 503.
   - Verifier (`link-social-verifier.md`), with hashes checked: pre-fix plus only the new test fails 1 and passes 1 on each host; fixed `246b889e` passes 12 of 12 on each host.
   - GitHub CI: Validation, E2E (host) and check all pass.
3. **Boundary exercised:** the real host HTTP entry on workerd and Node, the real Better Auth handler, the real stores.
4. **Uncertain:** hosted Cloudflare; real social providers (the controlled provider was used).
5. **Decision:** accepted. Next: fresh review, then merge after telling Lead A.
