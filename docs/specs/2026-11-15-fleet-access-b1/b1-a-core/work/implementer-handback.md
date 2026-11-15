# B1-A Implementer handback (🐒 claude-local 13abb87b)

**Delivered:** draft PR [agent-collaboration/switchboard#18](https://github.com/agent-collaboration/switchboard/pull/18), head `574c1d98abc78d73fd4143fc1588822d425ffd37` (SSH-signed), base `f3b2b88b`. The declared target is this commit (Verifier push 01a1e145-28c4).
**Record:** decisions, shortcuts and proof in [implementer-log.md](implementer-log.md). The Verifier's observation is its own: `work/verifier-observation.md` (not yet returned).

## Open items for the Lead

1. **V6's base list: one line more than the design names (ruling asked, push 01a1e144-a8ff).** Over the base tree, the PR's checker also reports `native-browser-protocol.ts:29` (`readonly timeout: ReturnType<typeof setTimeout>`). That is S7's own "typeof setTimeout in a type", and the Program Design removes the field. Everything else the checker reports on base matches the design: the six crypto sites, the two v4 mints and the test-time sites.
2. **V2's canonical-JSON row is in the core's unit lane (shortcut, ruling asked).** `canonicalJsonSha256Hex` isn't exported, and test-only exports are ruled out, so the row is `sign-in-core/src/contracts/canonical-json.unit.test.ts`.
3. **Two-host `pnpm test:e2e:host`: pending on Sunclaw** (packet 01a1e144-6001). Results are filled in below when they land.

## Gate results at 574c1d98 (run by the Implementer, locally, Node 26.11.1)

| Command | Result | Exit |
| --- | --- | --- |
| `pnpm check` | 12 groups passed, 0 failed (build, cli-architecture, package-versions, zod-version, test-taxonomy, portal-architecture, portal-exports, portal-contracts, lint, format, type-aware-lint, typecheck) | 0 |
| `pnpm test:unit` | 240 files, 2627 tests passed | 0 |
| `pnpm test:integration` | 62 files, 314 tests passed | 0 |
| `pnpm test:e2e:host` (workerd, D1) | pending (Sunclaw) | — |
| `SIGN_IN_TEST_HOST=node pnpm test:e2e:host` | pending (Sunclaw) | — |

Targeted host runs, local, at the pre-commit tree with the same content:
- `people-identifier-inventory` passed 1/1 on D1 and 1/1 on Node.
- `people-request-limits` passed 6/6 on D1 (20 s).
- `host-crypto-recording.host.e2e` passed 1/1 on Node.

The plan pins Node 24.7.0 for the Verifier's runs; my local runs used Node 26.11.1.

## Decisive proof and departures (details and receipts in the log)

- **V1 nonce.** With base's nonce line restored, the 4 nonce and policy cases fail. Minting before the render branch makes the 5 rendered and zero-draw factor cases fail.
- **V2 recording.** Each of the seven site reverts fails its row: page nonce, statement digest, private key export, canonical JSON, admin verifier, proof signature, intent digest. The forwarding rows are Node-only by the Lead's decision (agent-vm `9aedabe8`). A test-only `nodeCapabilityRecording` option was added to `local-auth-harness.ts` and `node-auth-proof-host.ts`; it is refused on Cloudflare.
- **V4, V6, V11 check.** With the three new collectors unwired, 34 of 35 planted slips pass, so the cases fail on today's checker. The 35th, the Node import, is the existing rule by design.
- **V7 Hegel.** 10,000 derandomized cases match the model, with a coverage assertion over steps 0–19 and both rules. Each of the three prescribed mutations fails.
- **S9.** The stand-in is deleted everywhere, including two artifact lists the design didn't name: `proof-bundle-artifacts.ts` and `node-proof-artifacts.ts`.

Departures:
- The receipt schema keeps its `'cloudflare-controlled-binding-stand-in'` value, because receipts are recorded files. The driver now refuses any counter other than the host's real one.
- The README passage at line 25 is also rewritten, since it described the deleted stand-in.
- `SignInCrypto` is a narrow, single-signature subset with its own structural types. The root typecheck compiles the core under `@types/node` without DOM, and Node's `subtle` has mutable `keyUsages`.
- The existing core import rule keeps `.ts` only. Feeding it `.tsx` flagged 10 existing page and island imports, and the design says no other check widens. A Node import in a core `.tsx` page is therefore still not caught by the import rule, as on base.
- The allowed-globals rule counts a symbol as a runtime global when any declaration is in a default lib file. This is stricter than "every".

## Extra callers touched (beyond the change table, flagged by typecheck or the rules)

- **Storage cases and fixtures:** `storage-case-context.ts`, `organization-central-empty-cases.ts`, `organization-central-forgot-cases.ts`, `organization-stamp-central-model.ts`, `organization-stamp-deadline-cases.ts`, `organization-stamp-renewal-cases.ts`, `organization-stamp-restart.ts`, `central-forgot-host.ts`, `fleet-cli-fixture.ts`.
- **Core and CLI tests:** `provider-rate-limit.unit.test.ts`, `fleet-permission-policy.unit.test.ts`, `fleet-command-no-credential-files.integration.test.ts`, `fleet-admin-command.unit.test.ts`.
- **Stand-in removal:** `proof-bundle-artifacts.ts`, `node-proof-artifacts.ts`.
- **V2 option, by the Lead's decision:** `local-auth-harness.ts`, `node-auth-proof-host.ts`.

## What I couldn't do or didn't verify

- **macOS Keychain test.** The owner's permission is for the Verifier's run, so I didn't run it.
- **Full two-host e2e and the verify-auth journeys (V5, V8 driver, V10).** The e2e is pending on Sunclaw; the journeys are the Verifier's.
- **The deliberate breaks for V8 and V9.** I ran none of them; they are the Verifier's.
- **Unreachable Hegel branch.** Step 16's "names another person" can't be reached: the decision's person is parsed from the same claims.
- **Owner CLI's own PKCE.** `fleet-credential.ts:1,104,111` still uses `node:crypto` for the CLI's own PKCE. That is host code outside the core and outside the change table, so it is unchanged.
- **Pre-existing type drift in core test files.** Core tests aren't type-checked by the gate, and on base they have unrelated drift (listed in the log). Left as is.

## Where I think the design is wrong

Nothing structural. Items 1 and 2 above are where the pages don't match ground truth, and both are with the Lead.

## TypeScript standards walk (domain-typescript, repo conventions)

- No `any`, `as` casts (only `as const`) or `!` were added.
- New states are discriminated unions: `SignInCapabilityRecord`, the Hegel `Answer`, `Outcome` and case knobs. The Hegel generator ends its switch with an exhaustive `unreachable(never)`.
- Hand-written duplicates removed: `ExportedJwk` is replaced by `SignInExportedJwk`, and `FleetAdminPrivateJwk` is now `= SignInEcPrivateJwk`.
- Remaining oxlint warnings in changed files are only `id-length` on the JWK members `x`, `y` and `d`. RFC 7517 fixes those names, and base carries the same warnings.
