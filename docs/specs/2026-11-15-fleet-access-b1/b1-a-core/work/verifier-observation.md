# B1-A verification observation

Status: setup prepared; delivery observation has not started. No candidate target has been declared. Every delivered-behavior claim below is **unknown**, and no verification row is closed.

## Target and authority

- Verifier: `codex-local/01a1e108-8877-7e32-8ce8-889bc694377c` on Router service `0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89`.
- Duty: verification, delivery observation. Governing sources are `commission.md`, Packet 2 in `../plan.html`, `../specification.html` S1–S12, `../verification-design.html` V1–V11, `../program-design.html`, and the owner decisions in `../decisions.html#owner`.
- Initial design repository HEAD inspected: `2ddf2e7701e8c231d0464d9fe0d7e805949d5c0f`. On the Keychain authorization update, HEAD is `f5c08aa64cbc831c1d83037880052712c7a542b5`; the five design-page hashes remain unchanged. Current governing-input hashes are retained in `evidence/design-inputs.sha256`.
- V2 route update inspected at design HEAD `9aedabe8558a80e16131ea5bcf2cf37719582e66`: `plan.html` and `verification-design.html` changed; Specification, Program Design and Decisions hashes are unchanged. This changes the observation route, not the expected crypto outputs or recording coverage.
- Implementation base verified locally: Switchboard `origin/main` resolves to `f3b2b88b74225359970b0580a290cd34fe1e557b`.
- Candidate commit, executed artifacts, configuration and client: not yet declared. No build or observation is attributable to a candidate.
- Switchboard's active main checkout was at `d10a994e332f9471f0e4152ed42be2912c68e236`, a different branch. Initial orientation reads there are not candidate or base evidence. Subsequent preparation reads used `git show f3b2b88b:<path>`; no tests or builds ran in that checkout.
- No board thread is supplied (`no-home`), per the updated commission. The Lead alone writes its established trace. This return file and Router reports are this Verifier's authorized record; no log-repository writes were made.
- Authorized scratch root: `tmp/2026-11-15-b1-a-verifier/` in the design worktree. Frozen candidate/base copies and prescribed mutations belong there, never in the Implementer's active tree.

## Scoped outcomes

All test counts are **not run**, not zero passes. No gate exit code exists yet.

| Check | Required deciding observation | Current result |
| --- | --- | --- |
| V1 / S1 | Fixed-byte nonce equals CSP and every script nonce; one draw per rendered page and none for JSON, redirect or pass-through; eager-mint wrong build fails | Unknown; candidate required |
| V2 / S1–S2 | Pinned-process-clock integration covers nonce, statement digest, private key import/export and canonical JSON; Node host e2e covers actual forwarding, PKCE, proof and intent with crypto/clock/ID/central recording; six individual global-crypto restorations fail at their site | Unknown; candidate and offered tests required; forwarding run assigned to Sunclaw |
| V3 / S5 | Existing digest/thumbprint/DPoP known answers and fixed CSP remain unchanged; altered digest encoding fails | Unknown; candidate required |
| V4 / S3,S6 | Allowed-global planted cases, base-versus-candidate scan, and both type mutations; copied scanner hash equals candidate scanner hash | Unknown; candidate scanner required |
| V5 / S4,S5 | Host diff inspection, real-Chrome two-host test, relay/CLI regression and organization journey on both targets | Unknown; candidate required; heavy runs assigned to Sunclaw |
| V6 / S7 | Planted timer/clock cases and base-versus-candidate scan; restored timer fails; browser passes with event waits and fence fixtures use controlled clock | Unknown; candidate required; heavy runtime checks assigned to Sunclaw |
| V7 / S8 | Dispatch family covers ordered model, thrown reads and rejected cleanup; three prescribed wrong builds produce intended Hegel reds with shrunk cases and restored greens | Unknown; candidate and family required |
| V8 / S9 | Real-binding limit, Retry-After, unchanged rows, second address, forged address refusal, controlled reset, and people admission with zero stand-in receipts; two wrong builds fail | Unknown; candidate required; host/journey runs assigned to Sunclaw |
| V9 / S10 | Both databases: eight nonempty tables, all-text inventory before removal and at end, named secret non-UUID checks, preserved derived-key/replay checks; planted v4 and v7 recovery-code controls fail | Unknown; candidate required; host runs assigned to Sunclaw |
| V10 / S11 | Real agent journey token and allowed call; person refused a tool credential on local-workerd | Unknown; candidate required; journey assigned to Sunclaw |
| V11 / S12 | Non-v7 planted cases, exact baseline UUID sites and clean candidate scan, randomUUID restoration fails; Mac Keychain test with fixed-clock v7 name and no test item left afterward | Unknown; candidate required; single Mac Keychain test authorized |

For each offered test, the delivery pass will inspect the scenario, assertion and real boundary against the wrong behavior named by its verification row. Setup/discovery/build failures will remain separate from intended mutation assertion failures. Every mutation requires restoration and a same-case green receipt. No product implementation or permanent product test will be repaired by this Verifier.

## Preparation evidence

- Read the live-call governing files and the updated commission. Design input hashes are in `evidence/design-inputs.sha256`.
- Selected project skill at the commissioned base: `.agents/skills/verify-auth/SKILL.md`. The base's `.claude/skills/verify-auth` is the relative link `../../.agents/skills/verify-auth`, not a second authored copy.
- Read the base skill and its `agent-bootstrap.md`, `organization-statements.md` and `native-browser.md` references. They supply target/artifact/configuration/client/inventory/host comparisons and private evidence requirements. The actual candidate copies must be checked again before execution.
- Heavy work is not dispatched yet: a self-contained Sunclaw request needs the declared candidate commit, its own root and exact executable commands. Host/browser/journey and whole-suite runs must remain off this Mac under the commission.
- Sent setup request directly to paired Implementer. Router receipt: `router://0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89/push/01a1e10c-096c-7901-a3df-ef6824319d77`, outcome `steered`. That receipt proves delivery, not setup or completion.
- Received setup: `router://0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89/push/01a1e10e-2e11-77d3-9ecb-d8efeb14f937`. Implementer names active worktree `/Users/shravansunder/code/projects/switchboard.b1a-one-sign-in-core`, branch `b1a/one-sign-in-core`, and plans one integrated target after the batch and local gates, expected in several hours. It explicitly forbids observation of that active tree before declaration. Setup names the planned tests and commands; these are not executed evidence.
- Returned the original trace/scratch input gaps to Lead. Router receipt: `router://0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89/push/01a1e10c-01dc-7601-abbd-2ca66475cfc8`, outcome `peerMessageWritten`. The updated commission resolves those gaps.
- Keychain authorization update received through `router://0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89/push/01a1e114-8d29-7683-bd85-7a91bd1679be`. Current `commission.md` records the owner's 15 Nov approval for only `packages/sign-in-owner-cli/src/fleet/macos-keychain-proof-key-store.host.e2e.test.ts` on this Mac at the pinned PR commit. Record command, count and exit, and confirm no test Keychain item remains. Other heavy runs still go to Sunclaw. The original commission hash was `f5b2284e88ce86f5fb4ad9f324ae1a0f0ad1e48bdeb3e85ee2d0dca2e7b550ba`; the authorized update is `488d44b5f11d56cc8698817e3ed1648a3ab5a4bd4a183a6036cf0e2985b9c50e`. No test ran on receipt of this update.
- V2 route correction received through `router://0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89/push/01a1e138-7d2a-7f71-b7b4-1c56f0495b56`. Current `verification-design.html#V2` assigns forwarding to `packages/sign-in-test-support/src/host-crypto-recording.host.e2e.test.ts`, with `SIGN_IN_TEST_HOST=node pnpm test:e2e:host <file>` on Sunclaw. Its test-only harness option wraps the Node platform's crypto, clock, IDs and central client and must be refused on Cloudflare. The path must drive the actual self-call, Better Auth PKCE and controlled central admin; no public test export substitutes. Integration keeps the other recording rows. Pinning of the process clock, operation/input assertions, throw behavior and all six sensitivity controls remain required. Earlier plan/verification hashes were `65fd3890a2345af64206b1147a3add3312608fa6090d534a80db13bcfbc9eeab` and `c5492c4c4729aa3c7cab2fa056fa89f9e44fb530112df24960fce79a14a1c749`; current hashes are in the manifest. No observation ran on receipt of the correction.

## Needs Implementer

- Declare the batch target with full commit, frozen work/build location and configuration/client. General setup and the planned test list have arrived; the completed candidate and actual offered tests remain pending. The Implementer will notify this session directly. No observation of an undeclared working tree will substitute.

## Needs Lead

- No authorization decision is currently waiting on Lead. The Keychain authorization gap is closed by the updated commission; the actual V11 observation and cleanup confirmation remain pending the candidate target.
- No runtime outcome is yet supported. After candidate declaration, the remaining work is the full V1–V11 observation and prescribed sensitivity set, including independently requested Sunclaw collection and inspection of its raw evidence. This file is a preparation checkpoint, not delivery acceptance.

Router delivers direct replies to this session, as the setup reply demonstrated. The paired Implementer's target declaration is the active dependency. The stop-review-authorized one-shot wake `01a1e10f-bd2e-7070-8e7d-9fbe01b43199` is saved for `2026-11-16T01:14:27.501Z`; no recurring wake or liveness polling was created.
