# F2 Hegel design review

**Verdict: FINDINGS — needs revision.** Eight P1 findings and six P2 findings. Several properties reject intended behavior; several counterfactuals do not reach the behavior they name. This is the five-check, inspect-only design review in `brief.md`, not software acceptance or a passing campaign.

Reviewed all six pages at **agent-vm `9ce51cb21`**, with the plan checked only for consistency. The live checkout initially reported `b5ebc34e6b51038056605b0f3d8ee8fed54043e8`; `git diff 9ce51cb21 -- docs/specs/2026-11-17-fleet-access-f2-hegel` was empty. Switchboard was clean at **`b03d35ffeea00f79061353dce1db6231a670c62f`**. Hegel was the commissioned installed **0.4.10**, under the B1c worktree's pnpm package directory. These identities govern the source anchors below.

The reconstructed model is: Hegel searches inputs and sequential operations; each production entry owns a narrower contract; independent expected results describe that contract; real storage/transport stays real only where the claim requires it. A replay-record store is not a signed-token verifier, a command path is not a filesystem path, unlink is not retirement, and a process-local operation index is not the standalone approval coordinator.

The governing boundary is Requirements U1/U2/U3/U4 and its test-only scope ([requirements.html:22](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/requirements.html:22), [requirements.html:33](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/requirements.html:33)). The owner quotations are attributed by the design; no original owner-message export was supplied, so this report does not independently certify that attribution or invent new owner intent. Every accepted finding below preserves the stated goal and existing product contracts. The default correction is to remove or narrow an unsupported test obligation, not add a production guard to satisfy it. Findings are verified source contradictions or source-supported sensitivity gaps; runtime outcomes remain unobserved.

## P1 findings

### F1 — P2's selector-only oracle rejects legitimate policy paths

**Target:** [specification.html:29](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:29), [program-design.html:44](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/program-design.html:44). **Rule:** U1 must test intended allow/deny behavior.

The named functions do not share one selector-only default-deny contract. `resolvePortalAccessPolicy` explicitly supports `defaultPolicy: 'allow-all'` and agent-over-global replacement, at [portal-access-policy.ts:122](/Users/shravansunder/code/projects/switchboard-public/packages/tool-access/src/authorization/portal-access-policy.ts:122). The permanent test expects an empty per-agent map with allow-all to expose both upstream namespaces: [copied-policy-helpers.unit.test.ts:134](/Users/shravansunder/code/projects/switchboard-public/packages/tool-access/src/authorization/copied-policy-helpers.unit.test.ts:134). Separately, a trusted read-only annotation admits an otherwise unnamed call; that allowed result is asserted at [copied-policy-helpers.unit.test.ts:106](/Users/shravansunder/code/projects/switchboard-public/packages/tool-access/src/authorization/copied-policy-helpers.unit.test.ts:106) and implemented at [mcp-approval-policy.ts:62](/Users/shravansunder/code/projects/switchboard-public/packages/tool-access/src/authorization/mcp-approval-policy.ts:62). A selector-only oracle calls those correct results defects. Monotonicity also needs a defined change: installing/removing an agent override can replace/fall back to a broader selection rather than union/subtract a grant.

**Smallest correction:** define an independent decision table per entry, including defaults, override precedence, trusted annotations, explicit denials, and the assessor's other unmet prerequisites. Restrict monotonicity to genuine set extension/removal while all other policy inputs stay fixed. Confirm the allow-all and trusted-read-only examples pass, while an untrusted annotation and a denied selector fail. Recheck P2's unknown-tool counterfactual against the selected default and call-policy mode.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; inside U1, with no product behavior change.

### F2 — P3 assigns filesystem containment to command-policy functions

**Target:** [specification.html:30](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:30), [verification-design.html:28](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/verification-design.html:28). **Rule:** U1's CLI decisions must be exercised at their actual owner.

`classifyCliPathContribution` explains a fixed **command-token path** and explicitly leaves arguments, flags and stdin per-call: [cli-path-policy.ts:9](/Users/shravansunder/code/projects/switchboard-public/packages/tool-access/src/authorization/cli-path-policy.ts:9). `evaluateCliAllowanceInvocation` matches that command prefix, configured patterns, flags and stdin; it has no allowed-filesystem-root parameter or universal path normalizer: [cli-allowance-validator.ts:57](/Users/shravansunder/code/projects/switchboard-public/packages/tool-access/src/authorization/cli-allowances/cli-allowance-validator.ts:57). With the existing test allowance for `complete`, no denied patterns and an allowed baseline, `['complete', 'a/../../x']` follows the admitted branch. This is a source-derived example, not an executed result. The existing tests explicitly establish generic command/predicate behavior, not filesystem semantics: [configured-cli-invocation-policy.unit.test.ts:11](/Users/shravansunder/code/projects/switchboard-public/packages/tool-access/src/authorization/cli-allowances/configured-cli-invocation-policy.unit.test.ts:11).

Thus correct generic policy fails the unconditional traversal property, and there is no existing normalization-before/after-match check to move for the named wrong build.

**Smallest correction:** keep P3 about authored command paths, matcher AND/OR rules, deny/ask/baseline precedence, flag values and stdin bounds. Use a wrong precedence or matcher decision at that owner. Keep filesystem-path properties at P4's Gog owner (or another explicitly selected existing path boundary), without creating containment policy in tool-access. Confirm an ordinary path-looking positional value remains permitted when the authored generic policy permits it.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; removes an agent-added obligation while preserving U1.

### F3 — P4's normalization equivalence fails for the valid directory root

**Target:** [specification.html:31](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:31). **Rule:** U1 must allow legitimate normalized Gog paths.

`normalizeGogFileArgument('./', 'directory')` intentionally produces the metadata-relative root `''`: [gog-file-paths.ts:20](/Users/shravansunder/code/projects/switchboard-public/packages/oauth-broker-contracts/src/gog-file-paths.ts:20). The real resolver accepts `--out-dir=./` and emits `{relativePath: '', kind: 'directory'}`; its permanent test explicitly asserts this: [gog-commands.unit.test.ts:84](/Users/shravansunder/code/projects/switchboard-public/packages/oauth-broker-contracts/src/gog-commands.unit.test.ts:84). Feeding the normalized empty string back as the executable flag value is refused by `flagValueIsValid`, at [gog-commands.ts:102](/Users/shravansunder/code/projects/switchboard-public/packages/oauth-broker-contracts/src/gog-commands.ts:102). Normalization is for returned file metadata; executable argv is deliberately preserved. The proposed before/after classification equality therefore fails a correct root-directory case.

**Smallest correction:** assert the existing raw-argv-to-normalized-metadata relationship, file/directory distinctions and unchanged argv. Do not reclassify metadata as executable argv. Keep root output directories allowed and input directories refused. Make the wrong build specifically admit a directory-only value such as `'./'` as a file, so it fails that named kind property.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; preserves U1 and the existing root-directory contract.

### F4 — M1 mistakes replay retention for signed-token expiry enforcement

**Target:** [specification.html:43](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:43), [program-design.html:45](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/program-design.html:45). **Rule:** U2/U3 require the right one-use and expiry boundaries.

Both named stores deliberately prune expired entries and can accept the same ID again: [approval-token-use.ts:10](/Users/shravansunder/code/projects/switchboard-public/packages/tool-engine/src/mcp-gateway/call-approvals/approval-token-use.ts:10), [approval-token-use-rules.ts:16](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-core/src/workspace-authority/approval-token-use-rules.ts:16). Signed verification owns rejecting expired tokens before consumption, at [approval-token-signing.ts:119](/Users/shravansunder/code/projects/switchboard-public/packages/tool-engine/src/mcp-gateway/signed-tokens/approval-token-signing.ts:119). Existing Hegel proof explicitly asserts that the store permits the original expired ID again while signed verification and backend execution refuse it: [signed-approval-expiry.unit.test.ts:74](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-core/src/workspace-authority/signed-approval-expiry.unit.test.ts:74), especially line 86.

The M1 store-only invariants “at most once” across all time and “never used after expiry” fail intended behavior. The two stores also have different caps: count for the in-memory Map, serialized UTF-8 bytes for authority state.

**Smallest correction:** model retention, pruning, live replay and each store's actual cap independently. Put signed-expiry/no-second-effect assertions through the existing verifier/gateway seam, retaining successful first use, live replay refusal, pruning and refusal at exact expiry. Extend the existing Hegel tests rather than replacing their oracle with permanent tombstones.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; preserves U2/U3 without a new retention policy.

### F5 — M4 forbids intended readmission after completed unlink

**Target:** [specification.html:46](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:46), [verification-design.html:38](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/verification-design.html:38). **Rule:** U3 must distinguish unlink from permanent retirement.

The admission guard refuses a pending removal or any `disable`, but permits a completed `unlink`: [workspace-authority.ts:27](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-core/src/workspace-authority/workspace-authority.ts:27). The actual management path relinks an existing agent and calls `setMembership` after a completed unlink: [workspace-agent-management.ts:226](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-core/src/agent-management/workspace-agent-management.ts:226), [workspace-agent-management.ts:244](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-core/src/agent-management/workspace-agent-management.ts:244). The existing state machine performs complete unlink and later re-admission against its membership model: [workspace-authority.stateful.unit.test.ts:110](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-core/src/workspace-authority/workspace-authority.stateful.unit.test.ts:110), [workspace-authority.stateful.unit.test.ts:128](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-core/src/workspace-authority/workspace-authority.stateful.unit.test.ts:128). Permanent-disable refusal is separately pinned at [agent-retirement.unit.test.ts:9](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-core/src/workspace-authority/agent-retirement.unit.test.ts:9).

“A removed or retired agent is never admitted” rejects that valid unlink/relink sequence. The wrong build can also be indistinguishable from correct behavior if its re-add follows completed unlink.

**Smallest correction:** distinguish pending unlink, completed unlink, pending/completed disable and request-intent conflicts. Require denial while removal is pending and after disable, permit authorized re-admission after completed unlink, and define idempotence for the same request/intent. Challenge the pending/disable guard specifically. Recheck the same model over the DO adapter.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; preserves U3 and existing management semantics.

### F6 — P9 treats existing Host normalization as the deliberately wrong build

**Target:** [specification.html:36](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:36), [verification-design.html:34](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/verification-design.html:34). **Rule:** U1 must test the configured request policy as intended.

Both configured and received Host values go through URL parsing, and the comparison uses `parsed.hostname`, which omits the port: [http-request-policy.ts:11](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-node/src/mcp-proxy-server/http-request-policy.ts:11), [http-request-policy.ts:65](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-node/src/mcp-proxy-server/http-request-policy.ts:65). URL hostname normalization also canonicalizes DNS case. Origin comparison instead uses `parsed.origin`, at line 62, so scheme and effective port have a different role. The existing integration test establishes foreign Host/Origin refusal, not literal Host case/port equality: [node-host.integration.test.ts:197](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-node/src/mcp-proxy-server/node-host.integration.test.ts:197).

Consequently the proposed “case-insensitive Host” or “ignores the port” mutant describes the current Host comparison, not a forbidden deviation. It cannot produce the required clean-green/wrong-red distinction.

**Smallest correction:** specify Host and Origin canonicalization separately, plus missing Origin and origin-form request-target behavior. Keep exact bearer-token byte matching separate. Mutate the allowlist membership or origin/target guard and require the corresponding foreign authority to fail. If literal Host-port enforcement is desired, that is a separate product-contract change, outside F2's test-only grant.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; preserves U1 without inventing a stricter policy.

### F7 — M3 combines two unrelated state machines and names a nonexistent transition

**Target:** [specification.html:45](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:45), [verification-design.html:37](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/verification-design.html:37). **Rule:** U3's transitions and proof must reach the owning production API.

The operation index offers `createOrRead`, `lookup`, `transition` and `close`. Its states are ready, pending, armed, completed, ambiguous and result-expired; **there is no activate transition**: [node-operation-store.ts:20](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-node/src/operation-records/node-operation-store.ts:20). Completed -> result-expired is deliberately allowed, so “terminal” also needs its exact meaning.

Reserve, arm, prove-not-dispatched and credential activation belong to the separate standalone approval coordinator: [standalone-batch-approval.ts:125](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-node/src/standalone-tool-portal/standalone-batch-approval.ts:125), [standalone-batch-approval.ts:333](/Users/shravansunder/code/projects/switchboard-public/packages/tool-host-node/src/standalone-tool-portal/standalone-batch-approval.ts:333). Mutating `transitionIsAllowed` cannot enable that coordinator's activation. Neither store alone dispatches a backend; actual dispatch occurs in [capability-dispatcher.ts:204](/Users/shravansunder/code/projects/switchboard-public/packages/tool-engine/src/capability-dispatch/capability-dispatcher.ts:204).

**Smallest correction:** identify separate operation-index and coordinator models under the target, with actual operations, result variants, allowed transitions and readback. Exercise a forbidden transition such as ambiguous -> armed using the current revision, while permitting completed -> result-expired. State any “never dispatched twice” claim at the real dispatcher/coordinator effect seam, counting backend effects rather than inferring them from a store label.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; restores U3's existing owners, not a new abstraction.

### F8 — P7 promises arbitrary-secret removal that neither redactor contracts to provide

**Target:** [specification.html:34](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:34), [verification-design.html:32](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/verification-design.html:32). **Rule:** U2's secret property needs a defined input and observation domain.

Exact redaction replaces nonempty configured literal strings; pattern redaction recognizes three credential-shaped text patterns and credential-shaped object keys: [upstream-response-middleware.ts:3](/Users/shravansunder/code/projects/switchboard-public/packages/tool-engine/src/upstream-mcp-connectors/upstream-response-middleware.ts:3), [upstream-response-middleware.ts:26](/Users/shravansunder/code/projects/switchboard-public/packages/tool-engine/src/upstream-mcp-connectors/upstream-response-middleware.ts:26). Arbitrary text such as `opaque-value` without an exact-values entry remains unchanged. Object **keys** are preserved, and a literal containing a quote is not matched in an already JSON-escaped text string unless that encoded spelling is supplied. Conversely, a parsed nested string is redacted before JSON serialization. The permanent tests explicitly separate credential-shaped text, supplied exact values and ordinary fields: [upstream-response-middleware.unit.test.ts:10](/Users/shravansunder/code/projects/switchboard-public/packages/tool-engine/src/upstream-mcp-connectors/upstream-response-middleware.unit.test.ts:10), lines 25 and 76.

Thus “any secret anywhere in any value” has no correct universal oracle. A raw substring assertion also fails on permitted output if a generated secret is `REDACTED`, because the replacement marker contains it; an empty secret occurs in every output. Merely saying a pattern “misses JSON-escaped secrets” does not distinguish encoded text from parsed JSON.

**Smallest correction:** define separate exact-value, recognized-pattern, credential-key and parsed-value properties, with nonempty generated credentials that cannot overlap the marker. Keep ordinary data preserved. Name the serialization layer for escaped cases and mutate one actual matching/recursion branch there. Do not add universal secret decoding to production to make the test pass.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; preserves U2 at its current redaction boundary.

## P2 findings

### F9 — P5's scope-intersection oracle omits local consent and exact scope equality

**Target:** [specification.html:32](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:32), [program-design.html:44](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/program-design.html:44), [verification-design.html:30](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/verification-design.html:30). **Rule:** U1 must test operation authority, including all current prerequisites.

The ceiling and selection are **group IDs**, not OAuth scopes. Compilation rejects an out-of-ceiling selection rather than intersecting it into a partial grant: [google-permission-catalog.ts:196](/Users/shravansunder/code/projects/switchboard-public/packages/oauth-broker/src/google/google-permission-catalog.ts:196). Evaluation additionally requires exact actual-scope equality with identity plus compiled scopes, and a selected group supporting every required service/effect: [google-operation-grant-policy.ts:16](/Users/shravansunder/code/projects/switchboard-public/packages/oauth-broker/src/google/google-operation-grant-policy.ts:16). The permanent tests explicitly require helper-read consent even when a write scope technically permits it and refuse surplus/missing scopes: [google-operation-grant-policy.unit.test.ts:51](/Users/shravansunder/code/projects/switchboard-public/packages/oauth-broker/src/google/google-operation-grant-policy.unit.test.ts:51), [google-operation-grant-policy.unit.test.ts:62](/Users/shravansunder/code/projects/switchboard-public/packages/oauth-broker/src/google/google-operation-grant-policy.unit.test.ts:62).

A necessary scope-subset condition alone cannot reject consent bypass or surplus authority; a model that directly intersects ceiling group IDs with scopes has the wrong types. The named mutation must target the group validation, not a nonexistent scope-intersection expression. Reduced-ceiling refusal is separately asserted at line 80.

**Smallest correction:** model known operation/family, selected group membership within the ceiling, exact scopes and complete local service/effect support; include admitted as well as refusal outcomes. Use independently checked literal/catalog cases, not the compiler under test to compute expected scopes. Challenge the above-ceiling guard and the consent/scope checks separately; preserve the existing gmail-write-without-helper-read refusal.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; inside U1.

### F10 — P6 mistakes deliberate semantic compiler errors for schema failures

**Target:** [specification.html:33](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:33), [verification-design.html:31](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/verification-design.html:31). **Rule:** U1's parse/compile properties must distinguish expected refusal from a crash.

The compiler intentionally throws ordinary `Error` for semantically invalid but schema-valid configuration, via `compilationError`: [oauth-tool-portal-config.ts:63](/Users/shravansunder/code/projects/switchboard-public/packages/config-contracts/src/oauth-tool-portal-config.ts:63). Existing examples include a recommendation above the hard maximum and incompatible hosts/fixed argv: [oauth-policy-compiler.unit.test.ts:135](/Users/shravansunder/code/projects/switchboard-public/packages/config-contracts/src/oauth-policy-compiler.unit.test.ts:135), [oauth-policy-compiler.unit.test.ts:244](/Users/shravansunder/code/projects/switchboard-public/packages/config-contracts/src/oauth-policy-compiler.unit.test.ts:244). Requiring every invalid config to produce a schema error rejects these intended refusals. `compileCommandSet` is also private; its honest public seam is `compileOAuthPolicy` and returned command sets.

The alternative “unordered map makes same-input compilation nondeterministic” is not established: this implementation constructs a Map in input command order and hashes its resulting arrays ([oauth-tool-portal-config.ts:134](/Users/shravansunder/code/projects/switchboard-public/packages/config-contracts/src/oauth-tool-portal-config.ts:134), line 208). Repeated compilation of the same ordered input does not exercise an insertion-order permutation.

**Smallest correction:** distinguish structural schema failure, declared semantic compilation refusal and unexpected failure. Exercise the private compiler through its owner. Keep repeated-input determinism, but only demand permutation invariance for fields whose contract declares order irrelevant; choose an actually observable digest/grant wrong build. The authored-grant-union alternative is useful once its exact projection and assertion are named.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; inside U1/U2, no exception-type product change.

### F11 — P8 omits allowed equivalence and pagination refusal domains

**Target:** [specification.html:35](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:35). **Rule:** U2's canonical representation tests must preserve its intended equivalence classes.

“Different values give different digests” conflicts with the supported omission rule: `{a:1, omitted:undefined}` and `{a:1}` share canonical bytes. This behavior is implemented at [call-argument-digest.ts:7](/Users/shravansunder/code/projects/switchboard-public/packages/tool-access/src/contracts/call-argument-digest.ts:7) and explicitly retained in [call-argument-digest.unit.test.ts:28](/Users/shravansunder/code/projects/switchboard-public/packages/tool-access/src/contracts/call-argument-digest.unit.test.ts:28). Dispatch digests likewise commit to selected intent fields, not every invocation field. Unrestricted injectivity is not a SHA-256 guarantee.

“Pagination returns every tool” also needs its accepted domain: one indivisible tool over the serialized 1 MiB budget is deliberately rejected at [tool-list-pagination.ts:53](/Users/shravansunder/code/projects/switchboard-public/packages/tool-engine/src/mcp-gateway/agent-catalog-views/tool-list-pagination.ts:53); the permanent tests assert rejection: [tool-list-pagination.unit.test.ts:81](/Users/shravansunder/code/projects/switchboard-public/packages/tool-engine/src/mcp-gateway/agent-catalog-views/tool-list-pagination.unit.test.ts:81).

**Smallest correction:** define each digest's accepted domain, canonical equivalences and committed fields; preserve frozen independent byte/digest vectors and generate binding-field changes. For pagination, compare traversed outputs to the independent original ordered input only when every item fits, and separately require oversized-item/invalid-cursor refusal. Boundary generators must measure serialized UTF-8 bytes independently of the production budget helper. The off-by-one mutant is then reachable with deliberately generated multi-page cases.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; removes unsupported universal claims within U2/U4.

### F12 — M2 leaves different browser bindings and cancellation states under one oracle

**Target:** [specification.html:44](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:44), [program-design.html:44](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/program-design.html:44), [verification-design.html:36](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/verification-design.html:36). **Rule:** U3's sequence model must bind operations to the actual ceremony.

The transaction store has selecting -> authorizing -> consuming-callback -> completion -> committing operations, not a generic create/consume/cancel interface. Agent cancellation deliberately refuses a consuming callback and committing disconnect, and completion cancellation requires its own state and identity/secret/CSRF checks: [oauth-transaction-store.ts:244](/Users/shravansunder/code/projects/switchboard-public/packages/oauth-broker/src/oauth-transaction-store.ts:244), [oauth-transaction-store.ts:426](/Users/shravansunder/code/projects/switchboard-public/packages/oauth-broker/src/oauth-transaction-store.ts:426). A refused cancel is not a completed cancellation.

Login continuations are different again: they are created **before login** with target, browser-binding secret and expiry, without a principal identity. The authenticated identity is first supplied and returned at consumption, not compared with a stored owner: [oauth-login-continuation-store.ts:25](/Users/shravansunder/code/projects/switchboard-public/packages/oauth-broker/src/oauth-login-continuation-store.ts:25), [oauth-login-continuation-store.ts:105](/Users/shravansunder/code/projects/switchboard-public/packages/oauth-broker/src/oauth-login-continuation-store.ts:105). The permanent test defines a wrong browser by its binding secret, at [oauth-login-continuation-store.unit.test.ts:25](/Users/shravansunder/code/projects/switchboard-public/packages/oauth-broker/src/oauth-login-continuation-store.unit.test.ts:25). A shared “one identity can't consume another's” model can invent a creation-time identity binding that this entry does not have.

**Smallest correction:** give transaction, completion and continuation operations their real entry/result/state bindings and independent expectations. Treat successful versus refused cancellation separately; model principal equality where already bound, and secret binding for pre-login continuations. Select M2's identity-comparison wrong build in the transaction/completion check and its browser-secret wrong build in continuations. Preserve expiry, capacity and first-use checks across all selected stores.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; clarifies U3 without expanding ceremony behavior.

### F13 — M5's retained-pending mutation cannot cause the promised double settlement

**Target:** [verification-design.html:39](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/verification-design.html:39), [specification.html:47](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/specification.html:47). **Rule:** U3/U4 require a wrong build that fails the named observable property.

On abort, `settleRejected` sets the per-request `settled` flag and deletes the pending map entry. `settleResolved` independently checks that flag: [node-gateway-runtime-transport.ts:310](/Users/shravansunder/code/projects/switchboard-public/packages/agent-portal-sdk/src/gateway-runtime-client/node-gateway-runtime-transport.ts:310). Removing only the deletion retains an entry, but a late response removes it in `#receiveMessage` and calls a resolver that immediately returns because the request is already settled ([node-gateway-runtime-transport.ts:186](/Users/shravansunder/code/projects/switchboard-public/packages/agent-portal-sdk/src/gateway-runtime-client/node-gateway-runtime-transport.ts:186)). Close separately clears both maps at line 143. The named edit therefore does not settle the request twice or violate the close invariant. Native Promise settlement alone cannot reveal repeated resolver attempts either.

**Smallest correction:** assert an observable cancellation resource/continuation contract: abort releases a pending slot before any late reply, the expected late cancelled reply is tolerated, a subsequent request succeeds, and close rejects outstanding requests and prevents further use. The retained-entry mutant can fail the released-slot assertion by filling capacity while withholding the cancelled response. Keep real frames and transport behavior, event barriers and bounds. Give the oversized-frame property its own decoder-limit challenge.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; preserves U3/U4 with a falsifiable proof.

### F14 — M5's real socket/lifecycle proof is assigned to integration

**Target:** [program-design.html:34](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/program-design.html:34), [verification-design.html:41](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f2-hegel/verification-design.html:41). **Rule:** repository [AGENTS.md:32](/Users/shravansunder/code/projects/switchboard-public/AGENTS.md:32) puts listeners and process-lifecycle proof in the host lane.

The production connection class is private and its exported factory opens a real Unix socket: [node-gateway-runtime-transport.ts:390](/Users/shravansunder/code/projects/switchboard-public/packages/agent-portal-sdk/src/gateway-runtime-client/node-gateway-runtime-transport.ts:390). The existing fixture opens a listener at [node-gateway-runtime-transport.integration.test.ts:72](/Users/shravansunder/code/projects/switchboard-public/packages/agent-portal-sdk/src/gateway-runtime-client/node-gateway-runtime-transport.integration.test.ts:72). Copying that fixture's integration suffix does not override the current contributor contract. Testing only the pure frame decoder can stay unit-local, but does not establish pending-request/cancel/close wiring. Vitest selects lanes solely by suffix ([vitest.config.ts:147](/Users/shravansunder/code/projects/switchboard-public/vitest.config.ts:147), [vitest.config.ts:167](/Users/shravansunder/code/projects/switchboard-public/vitest.config.ts:167), [vitest.config.ts:177](/Users/shravansunder/code/projects/switchboard-public/vitest.config.ts:177)).

**Smallest correction:** place M5's real UDS/request/cancel/close campaign in `*.hegel.host.e2e.test.ts` with owned temporary roots and teardown. Keep pure framing below it if selected. M4's real DO placement is already correct. Process-local Maps need no SQLite merely because the diagram says “where stored”; no new CI gate is required.

**Route:** design-program -> design-verification. **Disposition:** accepted; preserves repository proof strength.

## Check coverage

| Commission check | Inspected coverage | Source result |
| --- | --- | --- |
| 1. Intended P/M semantics | All P1–P9 and M1–M5; named production owners and deciding tests | Complete bounded assessment; F1–F12. No executable baseline claimed. |
| 2. Oracle independence | Every declared oracle kind and the concrete contract behind it | Complete source assessment. Independent syntax alone is insufficient: P2/P5 and the state models need the corrected independent rules above. |
| 3. Wrong-build reachability | All fourteen verification rows against entry, enforcing guard and named observation | Complete source assessment; F2/F3/F5/F6/F7/F9/F10/F12/F13 identify corrections. No mutant was executed. |
| 4. Test lanes | AGENTS, Vitest selection, actual DO/store/UDS seams | Complete; F14. Unit filenames and M4 host suffix are selected by existing projects. |
| 5. Higher-risk alternatives | Collection's token proofs plus primary verifier/test source | Complete bounded prioritization observation below; no ranking change imposed. |

Per-target account:

| Target | Assessment |
| --- | --- |
| P1 | Ordered-call/audience/key/expiry refusal is a sound relation through the signed verifier with a fresh controlled consumer; no order mutation is observable for a singleton/identical pair, so generators must include distinct calls. `receiptMatches` is private and reached through dispatcher challenge **and** current-receipt checks ([capability-dispatcher.ts:173](/Users/shravansunder/code/projects/switchboard-public/packages/tool-engine/src/capability-dispatch/capability-dispatcher.ts:173)); its separate operation/revision/context binding needs corresponding receipt fixtures and backend-effect assertions, not a token round trip. |
| P2 | F1; retain explicit deny precedence and all other assessor prerequisites. |
| P3 | F2; generic argv policy has no universal filesystem root. |
| P4 | F3; preserve raw argv and compare returned normalized metadata. |
| P5 | F9; group, scope and effect/consent rules are distinct. |
| P6 | F10; expected compiler refusal is broader than schema error. |
| P7 | F8; exact literals, recognized patterns and parsed values require separate domains. |
| P8 | F11; round-trip relations are valid independent properties of valid identities, but do not alone establish frozen wire bytes. Pagination must reach the byte boundary. |
| P9 | F6; Host, Origin and credential equivalence are different contracts. |
| M1 | F4; existing Hegel already exercises the store/verifier distinction. |
| M2 | F12; bind each real transition and binding before constructing the model. |
| M3 | F7; operation index and standalone coordinator need distinct models. |
| M4 | F5; pending removal, completed unlink and disable differ. |
| M5 | F13/F14; pure framing and the real socket lifecycle differ. |

## What held and prioritization

- Installed Hegel 0.4.10 exports `stateful.StateMachine`, `runAsync`, `Pool`, `alwaysCheck`, and `stepCount`. `runAsync` awaits each rule/invariant; `alwaysCheck` addresses sampled intermediate invariants. The chosen 50-step sequential bound is supported by `dist/stateful.d.ts:55,90,121,125` and `dist/stateful.js:326` in the commissioned package. CI defaults enable derandomization and disable its database (`dist/nodeRuntime.js:29`). Concrete seed replay, shrinking, case counts and reset/teardown are still implementation proof obligations.
- A round trip is a legitimate independent algebraic property when that inverse relationship is the contract. It need not reimplement the codec. Frozen wire vectors and negative binding cases test different claims and should remain.
- Test-only product scope, injected clocks, explicit exclusion of concurrency/live Google/upstream servers, permanent regression cases, and the wrong-build/named-property/restored-green requirement are appropriate. A property false of the existing contract must be corrected before any production “fix.”
- **Prioritization observation:** replace the broad P8 codec/pagination/hash bucket with a focused generated **agent access-token verifier** campaign if fourteen targets is the budget. Its deployed-authority/issuer, audience, workspace, token-type, signature, expiry and exact-scope decisions are an earlier trust boundary than pagination. The collected pointer was independently opened: [agent-proof.ts:56](/Users/shravansunder/code/projects/switchboard-public/packages/tool-access/src/contracts/agent-proof.ts:56) and its real-signature synthetic-JWKS cases at [agent-proof.unit.test.ts:82](/Users/shravansunder/code/projects/switchboard-public/packages/tool-access/src/contracts/agent-proof.unit.test.ts:82). A generated bad-claim matrix can use independently signed synthetic tokens and the existing injected clock/JWKS fetch without live sign-in. This is a ranking recommendation for Lead, not an additional acceptance requirement or a request for a new auth mechanism. Existing P8 permanent tests remain.
- Requirements' claim that the nine packages have no property tests is contradicted by the commissioned collection itself (`tmp/2026-11-17-f2-research/report.md:30`) and the two current core Hegel tests opened above. Reword the baseline and extend those tests where they already cover M1/M4 behavior. No claim that a Hegel filename search proves absent coverage is supported.

## Boundary, record and next owner

This is the first F2 review baseline. All findings are source-verified at the declared revisions; none is a passing-run receipt, an observed production vulnerability or an authorization to change product behavior. There are no contested source anchors. Potential stricter policies (permanent unlink tombstones, literal Host-port equality, generic filesystem containment or universal escaped-secret decoding) are **not** adopted; removing those agent-added test obligations preserves the stated goal. No new owner tradeoff is required to test the existing contracts.

**Result: needs-revision. First revision: design-specification.** Carry F1–F13's corrected observable contracts into the Specification first, then align Program Design and Verification Design, including F14's host placement. P1's receipt branch should be made explicit in the corresponding proof row during that alignment. Recheck those changed contracts and their affected proof rows; no implementation planning should depend on the present universal properties.

Only this report was written. No product/config/design file changed. No dependency install, build, test, lint, browser, host, mutant, credential lookup or service operation was run. **Runtime pass/fail/skip counts and exit codes: NOT RUN, as required by inspect-only.** Read-only Git/file/search commands supplied the evidence. Rendered HTML/navigation/design-rule execution and full workflow certification were outside the five-check commission.

Work log: **no-home**, as supplied. There was no authorized separate entries-file destination; this report is the scoped record/checkpoint. Source routes were the declared local design -> collection pointers -> primary Switchboard owners and permanent tests -> installed pinned Hegel. DeepWiki `ask_question` was absent from the advertised tools; installed source was used for the pinned library API. A lightweight memory search produced older project leads, none used as evidence. No web freshness claim, live provider claim or UI observation is made. No helpers were commissioned.

Read gaps in the collection were not treated as absent behavior. The collection was used for pointers and ranking context, not as an oracle. The F1 original findings and latest scoped-readiness conclusion informed the checks for false oracles, real entries, proof sensitivity and lanes; their historical runtime limits remain intact.

