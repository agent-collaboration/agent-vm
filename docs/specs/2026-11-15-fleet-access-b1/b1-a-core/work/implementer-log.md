# B1-A Implementer log (🐒 claude-local 13abb87b)

Record of material decisions, shortcuts, assumptions and proof for B1-A Packet 1. No board thread (`no-home`, confirmed by the Lead, push 01a1e10e-c285); this file is the Implementer's record. Stream: `b1a-one-sign-in-core`.

Worktree: `/Users/shravansunder/code/projects/switchboard.b1a-one-sign-in-core`, branch `b1a/one-sign-in-core`.

---

**Action.** Worktree created and set to the commissioned base.
The Agent Studio helper forked the stale local `main` (`d10a994e`). The new branch had no commits and `d10a994e` is an ancestor of `origin/main`, so it was fast-forwarded (`git merge --ff-only origin/main`) to `f3b2b88b`. Lead confirmed (push 01a1e10e-c285).

**Decision.** `SignInCrypto` is a narrow, single-signature subset of Web Crypto, written without DOM-only type names.
Choice: `SignInSubtleCrypto` declares exactly the five operations the core uses (`digest` SHA-256; `generateKey`, `exportKey('jwk')`, `importKey('jwk')`, `sign` for ES256), with the contract's own structural types (`SignInEcdsaKeyAlgorithm`, `SignInEcdsaSignatureAlgorithm`, `SignInKeyUsage`, `SignInExportedJwk`, `SignInEcPrivateJwk`). Key usages are a mutable array.
Authority: Program Design, "The new capability": "a subset of the standard Web Crypto, so both runtimes satisfy it with their own globalThis.crypto, and a test can wrap it". Forced by ground truth: the root `tsc -p tsconfig.json` includes `sign-in-host-node`, which compiles the core and the web builder under `lib: ES2024` + `@types/node` with no DOM. There `EcKeyGenParams`, `JsonWebKey`, `CryptoKeyPair` etc. don't exist as globals, and Node's `subtle` declares `keyUsages: KeyUsage[]` (mutable), so a DOM-typed or readonly contract fails to accept `globalThis.crypto` (observed TS2304 / TS2322). Single signatures also let the recording fixture wrap it without casts.

**Decision.** Removed two hand-written duplicate shapes in `fleet-admin-proof.ts`.
Choice: the local `ExportedJwk` interface is replaced by the contract's `SignInExportedJwk` (identical members); `FleetAdminPrivateJwk` stays as the exported name, now `= SignInEcPrivateJwk` (identical members), so the Keychain shape and the crypto boundary have one owner.
Authority: own call, inside the Program Design's change table (`fleet-admin-proof.ts` is in scope); no exported name changes.

**Decision.** Tests get their crypto from one named source.
Choice: test-support fixtures and host tests use `webSignInCrypto`, exported by the new `recording-sign-in-capabilities.ts` as `createWebSignInCapabilities(controlledSignInClock).crypto` (the shared builder's web default, with the controlled clock so the builder's `Date.now()` default is never reached). Core unit tests (core can't depend on test-support or the web builder) and owner-CLI unit tests pass `globalThis.crypto`, which is that same default. The keychain test takes both its v7 service name and its crypto from `createWebSignInCapabilities(keychainTestClock)`.
Authority: Program Design, "What existing tests become": "Pass a crypto (the web default)"; Packet 1 step 5 for the keychain clock.

**Observation (not changed).** The owner CLI's own PKCE in `sign-in-owner-cli/src/fleet/fleet-credential.ts:1,104,111` uses `node:crypto` (`randomBytes`, `createHash`). That is host code outside the core and outside the change table, so it stays. The CLI hands the core its Web Crypto as designed.

**Observation (not changed).** Core test files aren't type-checked by `pnpm typecheck` (package excludes `src/**/*.test.ts`). A scratch check over them shows pre-existing type drift unrelated to crypto on base `f3b2b88b` (branded IDs in `served-page-appearance.unit.test.ts`, missing store members in `organization-provider-options`, `authorization-revision-drainer`, `organization-provisioning`, `organization-invitation-resend`, and `deadlines` missing from `provider-rate-limit.unit.test.ts`'s platform). Out of scope; left as is.

**Proof (local, Implementer).** V1 page-nonce cases can fail for their wrong builds.
Claim: the nonce cases reject today's minting and a mint-before-branching build.
Check: on the worktree, base's `crypto.randomUUID()` nonce line put back in `page-document.tsx` → 4 nonce/policy cases red; a mint at the top of `renderFactorFormResponse` → the 5 rendered/zero-draw factor cases red; both files restored, 45 page tests green.
Not covered: the handler-level "mint in the handler" wrong build; V2's recording run through the handler carries that.

**Decision.** All three new architecture rules live in `scripts/audit-portal-architecture.ts` itself (file now ~1,750 lines).
Choice: no sibling module, though the file is past the 900-line smell.
Authority: Verification Design V4 step 3: the Verifier copies only that one file into a base worktree and records its SHA-256; a sibling import would fail on the base tree.

**Decision.** The existing core import rule keeps its `.ts` file set; only the new runtime-global rule reads `.tsx`.
Choice: `collectAuthCoreViolations` returns early for `.tsx`.
Authority: Program Design, "Read .tsx too … no other check widens". Ground truth: feeding `.tsx` to the old rule reported 10 existing page/island imports (`#sign-in-core/better-auth/*`, `better-auth/react`). Consequence: a Node import planted in a core `.tsx` page is not caught by the import rule (unchanged from base); U23's Node-import mutant is covered for `.ts`.

**Decision.** The allowed-globals rule treats a symbol as a runtime global when any of its declarations is in a default library file.
Choice: stricter than "every declaration", so a package augmenting a lib global can't escape the list.
Authority: own call inside S6; base and PR measurements are unaffected (below).

**Proof (local, Implementer).** The PR's checker over the base sources reports what the design predicts, plus one line.
Check: scratch script `/tmp/b1a-scratch/measure-base.mts` feeding `git archive f3b2b88b` sign-in sources through the three new collectors.
Result: core: `globalThis` at the nine lines (fleet-admin-forwarding 156; fleet-admin-proof 53, 60, 68, 81, 121; canonical-json 36; fleet-admin-operation 134; organization-stamp-renewal 424) and `crypto` at page-document.tsx:181; nothing else, so `signInCoreAllowedGlobals` matches the base. UUID: page-document.tsx:181 and the keychain test lines 1, 17. Test time: native-browser-protocol 84, 115, 148, 218, 274 **and 29**, authorization-fence 538, 548, 549, 560, 567, 678, native-browser-scenario 43. PR tree: `pnpm test:portal-architecture` passes.
Not covered: the Verifier's prescribed scratch-worktree run.

**Finding for the Lead.** V6's expected base list names five protocol bounds; the checker also reports `native-browser-protocol.ts:29` (`readonly timeout: ReturnType<typeof setTimeout>`, the pending-call record's field). That is S7's own "typeof setTimeout in a type", and the Program Design removes that field. Expected base report = the five bounds + line 29.

**Proof (local, Implementer).** The S6/S7/S12 unit cases fail on today's checker.
Check: three new collectors unwired from `collectPortalArchitectureViolations` → 34 of 35 "rejects" cases red (the 35th, `import 'node:fs'`, is the existing rule by design); all "accepts" cases green both ways. Restored: 64/64 green.

**Finding.** Step 16's "names another person" branch is unreachable through the real code: `decidePersonFleetRelease` takes `personId` from the same claims' `sub`, so `release.personId !== claims.sub` never holds. The Hegel family generates refused / released-then-refused / released; the model keeps the step.

**Proof (local, Implementer).** Hegel dispatch family matches its model and catches V7's three mutations.
Check: `sign-in-response-release.hegel.unit.test.ts`, 10,000 derandomized cases, no database; coverage assertion requires steps 0–19 and both rules (rule 1 introspection/refusal, rule 2 delete/cleanup rejects). Mutations (core rebuilt each time, then restored): no owner-fleet-CLI refresh check → red; step 3 skipped → red; no cleanup on refusal → red. Restored → green.
Not covered: device-code family (B3).

**Decision (Lead, push 01a1e138-66c8; design agent-vm 9aedabe8).** V2's forwarding rows run as a Node host-e2e test through the real harness.
Choice: option B of three I brought (forwardFleetAdminRequest isn't exported; the forwarding needs a signed-in owner, organization, bootstrap clients and a central link). `startLocalAuthHarness({ nodeCapabilityRecording })` → `startNodeAuthProofHost({ capabilityRecording })` wraps the in-process Node platform's crypto, clock, ids and centralClient with the recording fixture and rebuilds the store on it; refused on Cloudflare; unarmed, the configuration is unchanged. `local-auth-harness.ts` and `node-auth-proof-host.ts` added to the may-change list by that decision.
Authority: Lead decision above; "No test-only public export".

**Shortcut.** V2's canonical-JSON row is in `packages/sign-in-core/src/contracts/canonical-json.unit.test.ts` (unit lane), not the integration file.
Planned: Verification Design V2 lists the canonical-JSON digest among the integration file's rows ("Called directly").
Did instead: an inline recording crypto in core's own unit test, asserting the digested text is exactly the canonical text and the digest matches.
Why: `canonicalJsonSha256Hex` isn't exported from sign-in-core (Program Design: "not re-exported by the index; tests are its only callers"), and the Lead ruled out test-only exports.
Authority: none yet; reported to the Lead with this handback.

**Proof (local, Implementer).** V2 recording run, both files, and each site fails when put back on the runtime global.
Check: `pnpm test:integration packages/sign-in-test-support/src/host-crypto-recording.integration.test.ts` → 5/5 (page nonce via the real handler on a temp better-sqlite3 db with the Node host's configuration, a JSON reply with zero draws, a throwing crypto → 503 `sign-in-unavailable`, statement digest via stamp renewal, private JWK export/import via the CLI Keychain store); process clock pinned at 2_500_000_000_000 with the injected clock at 1_800_000_000_000. `SIGN_IN_TEST_HOST=node pnpm test:e2e:host packages/sign-in-test-support/src/host-crypto-recording.host.e2e.test.ts` → 1/1 (verifier 32-byte draw and S256 challenge input, generateKey non-extractable + public export + thumbprint digest, ath and intent digests matching the proof's claims, two ES256 signatures one over central's exact signing input, jti minted and iat from the recorded clock, sendFleetAdminRequest recorded; a throwing randomness stops before any signature, token or central call). Canonical JSON in core unit lane.
Breaks (script `/tmp/b1a-scratch/v2-site-reds.sh`, core rebuilt each time, then restored): page nonce, statement digest, private key export, canonical JSON, admin verifier, proof signature, intent digest each → 1 failed. Restored, rebuilt.
Not covered: Cloudflare for the forwarding rows (Node only by design); the token-endpoint DPoP proof's signing input isn't observable outside the self-call, so only central's signing input is matched exactly.

**Proof (local, Implementer).** V8/V9 new cases pass locally.
Check: `pnpm test:e2e:host people-identifier-inventory` on D1 and with `SIGN_IN_TEST_HOST=node` → 1/1 each; `people-request-limits` on D1 → 6/6 (20 s).
Not covered: Node run of people-request-limits; the deliberate breaks (Verifier's).
