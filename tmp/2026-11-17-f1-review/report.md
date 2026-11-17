# F1 fuzz-testing design review

**Verdict: FINDINGS — needs revision.** Ten findings: six P1 and four P2. This is the inspect-only design review commissioned by [brief.md](brief.md), not delivery acceptance or evidence that a campaign passed.

Reviewed all six F1 pages at **agent-vm `ea39c7a1f`** with `git show`; the plan was checked only for consistency. The live checkout was `b344b1b785e24a21ab6a992588f0c97d6c7b988b`. Its F1 differences inspected during review concern decision-number references; the findings below address the declared revision. Switchboard source is **`91bfdc5a3bf1632f0ffc70f22a2c34f3a9b469b5`**; Bombadil is **`7c7081b60080d2af39daf45ac66639b02b512f9d`**; Hegel is installed **0.4.10**. These version labels govern the anchors below. A concurrent writer changed Switchboard's browser fixture; its decisive email/403 assertions were reopened from the pinned Git object. The other cited product sources were compared with that revision and had no differences.

The reconstructed boundary is: Hegel supplies input/sequence search; Switchboard's real HTTP/provider paths enforce authorization and invoke injected Drizzle storage; an independent model checks their observable results; Bombadil supplies sampled browser states/actions over a separately seeded local service. A store, a provider endpoint, and a browser property observe different parts of that path.

## P1 findings

### F1 — The disclosure oracle rejects the intended owner People page

**Target:** [specification.html:42](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/specification.html:42), [specification.html:66](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/specification.html:66).

S2 forbids any other person's email/ID in every response; S4 forbids any other person's email in every campaign, including the owner People campaign. The existing owner contract intentionally returns members' and invitees' emails: [organization-membership-store.ts:101](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/storage/organization-membership-store.ts:101). The pinned browser test explicitly asserts those displayed emails at [organization-browser-people.ts:145](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/organization-browser-people.ts:145). Correct behavior therefore fails the proposed clean baseline. Deleting the owner campaign would leave U3 uncovered.

**Smallest correction:** specify permitted disclosures per route/caller/organization. Keep unauthorized identities and credentials forbidden while allowing the owner's contracted People projection. Validate with an owner reading its own organization's members (pass), a member reading People (refuse), and a cross-organization identity disclosure (fail).

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; inside the existing goal.

### F2 — Refusals can legitimately consume stored security state

**Target:** [specification.html:43](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/specification.html:43), [program-design.html:51](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:51).

S2 requires every stored row to remain unchanged after every refusal. In the real passkey-confirm route, the verification value is consumed **before** checking expiry, credential ownership, and signature validity: [passkey-confirmation-plugin.ts:110](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/better-auth/passkey-confirmation-plugin.ts:110). A valid challenge ID plus an invalid assertion must refuse after consuming that challenge; it can also append a factor-change intent before signature verification at line 139. The proposed full-row equality reports this anti-replay behavior as a defect. Requiring rollback would change the product's security contract.

**Smallest correction:** define each refusal's permitted effects and compare all other state unchanged. Include a consumed-challenge rejection and its rejected replay, alongside V2(c)'s unrelated unauthorized write. Both the legitimate cleanup and the deliberately wrong write must be distinguished.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; preserve existing behavior.

### F3 — The store-only S3 path cannot exercise the promised domain guards

**Target:** [program-design.html:62](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:62), [verification-design.html:34](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/verification-design.html:34).

The injected `createSignInStore` does not expose create/invite/accept/cancel/remove/change-role/session-create operations matching S3. Its organization store exposes reads and provisioning operations: [sign-in-store.ts:35](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/storage/sign-in-store.ts:35), [organization-membership-store.ts:35](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/storage/organization-membership-store.ts:35). Native domain guards are above those stores. The last-owner test reaches the provider route and verifies refusal before the production hook: [people-organizations.host.e2e.test.ts:421](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/people-organizations.host.e2e.test.ts:421). There is also an independent hook refusing *all* owner removals: [organization-role-hooks.ts:35](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/better-auth/organization-role-hooks.ts:35).

Thus raw store mutations bypass the domain guard, while removing only the native last-owner guard still leaves owner removal refused by the second guard. V3(a) cannot produce its promised ownerless organization as written. Adding the guard to a test adapter would test the adapter.

**Smallest correction:** bind every S3 operation to its actual existing provider/service or adapter entry and its stored readback. Separate provider policy from storage mutation invariants. Rewrite V3(a) around a reachable forbidden outcome and identify every enforcing guard the deliberate break must affect. Preserve both real engines and the independent model.

**Route:** design-program -> design-verification. **Disposition:** accepted; no new product abstraction is required.

### F4 — The denied-member campaign fails Bombadil's retained default

**Target:** [specification.html:65](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/specification.html:65), [program-design.html:76](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:76).

The member campaign starts at the People URL, whose correct response is **403**, asserted in the pinned [organization-browser-people.ts:353](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/organization-browser-people.ts:353). The design retains every default except `noConsoleErrors`. Bombadil's [defaults/properties.ts:4](/Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil/src/specification/browser/defaults/properties.ts:4) defines `noHttpErrorCodes` as navigation status below 400. The clean denial therefore violates a retained property. An exit code 2 alone cannot distinguish this false positive from V4(c)'s unauthorized People rows.

**Smallest correction:** replace that default in the denied-route campaign with the expected refusal/status/content contract. Keep unexpected HTTP failures rejected. The clean 403 must pass; showing People rows to the same member must fail the named authorization property.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; do not remove the member campaign.

### F5 — The inventory is neither the claimed reachability classification nor the full HTTP surface

**Target:** [specification.html:37](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/specification.html:37), [program-design.html:47](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:47).

`installedProviderEndpointInventory` enumerates `provider.api`; its only relevant flag is `serverOnly`, with no browser/CLI exposure classification: [provider-endpoint-inventory.ts:17](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/provider-endpoint-inventory.ts:17). The real outer handler separately admits and handles routes such as owner bootstrap, organization-admin forwarding/relay, and issuer-root metadata: [sign-in-request-handler.ts:62](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/response-release/sign-in-request-handler.ts:62), [sign-in-http-handler.ts:196](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/better-auth/sign-in-http-handler.ts:196). Conversely, installed provider APIs can be blocked by that outer handler. Equating families with the provider list cannot establish U1's full service coverage; a new handler-owned route can be absent from both sides and leave equality green.

**Smallest correction:** retain the useful provider enumeration and add the existing outer-handler routes to the coverage basis, with an independently reviewed method/exposure/outcome classification. Do not derive expected exposure solely from the product allowlist under test. V1 must include adding a handler-owned public route without a family, not merely deleting a family from a shared list.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; covers U1's existing scope.

### F6 — V4(a) lacks a causal witness for a request before the click

**Target:** [program-design.html:77](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:77), [verification-design.html:35](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/verification-design.html:35).

There are two holes in this one proof row. First, `passkeyPlugin()` supplies configuration; autofill runs only when `usePasskeyAutoFill` is mounted and its feature probe succeeds: [passkey-plugin.ts:35](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@better-auth-ui+core@1.7.34_59f40c48c9659f7ce1dd2a23b4a664ba/node_modules/@better-auth-ui/core/src/plugins/passkey/passkey-plugin.ts:35), [use-passkey-auto-fill.ts:44](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@better-auth-ui+react@1.7.34_1417e9185ab78ebaaa5b2efa76694010/node_modules/@better-auth-ui/react/src/plugins/passkey/hooks/use-passkey-auto-fill.ts:44). Switchboard's signed-out form is its own Google/GitHub form, and its island provider mounts only the two-factor plugin: [owner-page.tsx:114](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/pages/owner-page.tsx:114), [sign-in-pages-island.tsx:176](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/pages/islands/sign-in-pages-island.tsx:176). Merely registering the proposed plugin need not issue a challenge.

Second, Bombadil extractors sample captured states, not request-start events: [specification-language.md:189](/Users/shravansunder/Documents/dev/open-source/bombadil/docs/manual/src/03-specification-language.md:189). Resource timing is reported at response end-of-body, per the [Fetch Standard](https://fetch.spec.whatwg.org/#fetch-finale). A challenge started before the click can still be pending at the last pre-click capture and finish after the click; a pre-click-only scan misses it. The design names no retained click/request ordering witness.

**Smallest correction:** use a deliberate break at a mounted real challenge trigger, and specify an observation of request initiation ordered against the relevant user action for each document. Prove it rejects a pre-click request whose response is held until after the click, while accepting a request genuinely initiated by the button. Require the intended property/observed request in V4(a)'s receipt, not any exit 2.

**Route:** design-program -> design-verification. **Disposition:** accepted; implementer must not invent this proof contract.

## P2 findings

### F7 — A body family cannot cover the existing GET and form request contracts

**Target:** [specification.html:29](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/specification.html:29), [program-design.html:39](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:39).

All endpoint families are specified as JSON/body generators, but the service includes GET query contracts (People pagination, passkey options, OAuth callbacks) and URL-encoded OAuth token requests. The real harness delegates to Fetch: [local-auth-browser.ts:24](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/local-auth-browser.ts:24). GET/HEAD with a non-null body is rejected before a request reaches the host; the [Fetch Request constructor](https://fetch.spec.whatwg.org/#dom-request) specifies this. The actual GET surface is visible at [sign-in-request-handler.ts:18](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/response-release/sign-in-request-handler.ts:18); the token path consumes form text at line 119. Coverage equality can pass while query fields never vary or valid token requests never occur.

**Smallest correction:** make each family generate its route's actual request parts and encoding, explicitly distinguishing query, form and JSON/body inputs. Preserve malformed-wire cases where the transport allows them. Validate one reachable GET query boundary and one valid URL-encoded token case, with host-entry evidence rather than a client-construction error.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; same endpoint scope.

### F8 — The proposed unit/integration placement crosses the repository's host boundary

**Target:** [program-design.html:47](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:47), [program-design.html:60](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:60).

The coverage unit test directly consumes an inventory requiring a live Miniflare/configuration and awaited provider context: [provider-endpoint-inventory.ts:33](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/provider-endpoint-inventory.ts:33). The dual-engine storage factory prepares migrations/builds and starts a real workerd-backed Miniflare runtime: [dual-storage-test-host.ts:41](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/storage-cases/dual-storage-test-host.ts:41). These are incompatible with Switchboard's process-local unit lane and host/process proof placement in [AGENTS.md:32](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/AGENTS.md:32). Classifying the D1 campaign as integration does not remove that real boundary.

**Smallest correction:** keep pure model/set-comparison tests in the unit lane, and place live inventory completeness and workerd storage proof in the existing host lane. Keep any genuinely process-local integration portion where appropriate. No CI gate change is needed: the current host lane is already required by [.github/workflows/ci.yml:43](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/.github/workflows/ci.yml:43).

**Route:** design-program -> design-verification. **Disposition:** accepted; preserve proof strength and existing CI ownership.

### F9 — R-fence omits existing authorization-changing transitions and its actual key

**Target:** [specification.html:52](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/specification.html:52), [program-design.html:59](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:59).

The rule names a person's revision and requires a strict increase only for member/session deletes, although the generated operations include role changes and person deletion. The real retained identity is **(organization, person)**, with active/inactive state: [sign-in-schema.ts:566](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/storage/sign-in-schema.ts:566). Role changes bump the affected pair; rejoining bumps a retained pair rather than resetting it; session deletion bumps all of that person's retained pairs: [authorization-fence-mutations.ts:233](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/storage/authorization-fence-mutations.ts:233), lines 265–295 and 327–354. Person cleanup also bumps retained pairs and marks them inactive: [person-session-store.ts:239](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/storage/person-session-store.ts:239).

A wrong role-change implementation that updates membership but skips its fence bump satisfies the stated monotonic/delete-only rule. A model reconstructed only from these rules has no independent reason to reject it. This can preserve stale authorization after a permission change.

**Smallest correction:** state the existing pair identity, retained-state behavior and required bump/inactivation for the generated mutation kinds, including no-op/refused cases. Add a role-change-without-bump wrong build and a multi-organization/session-delete readback. Keep concurrent delivery/ACK behavior outside this sequential scope.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; restores the existing authorization contract.

### F10 — The recorded Bombadil command outlives its backend without a replay procedure

**Target:** [program-design.html:82](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:82), [specification.html:75](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/specification.html:75), [verification-design.html:36](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/verification-design.html:36).

The driver starts a fresh port-0 harness, seeds sessions, records Bombadil's reproduce command and tears the harness down. The saved command then points to a stopped issuer with no recreated fixture. Bombadil's `--reproduce` loads recorded browser actions, not Switchboard state: [browser.rs:592](/Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/browser.rs:592). Its manual requires matching options and permits replay divergence: [04-workflows.md:7](/Users/shravansunder/Documents/dev/open-source/bombadil/docs/manual/src/04-workflows.md:7). A trace path plus a command string is insufficient for U4's reproducible local case even before browser nondeterminism matters.

**Smallest correction:** define replay through the existing driver/harness, recreating the selected host, campaign fixture, controlled clock and authenticated state, and supplying the live issuer/spec/cookie to `--reproduce`. V5 should actually replay one finding after the original harness has closed and attribute any remaining divergence honestly. Replay must omit the incompatible `--time-limit`/`--exit-on-violation` flags documented at [browser.rs:187](/Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/browser.rs:187).

**Route:** design-program -> design-verification. **Disposition:** accepted; same local reproducibility requirement.

## Check coverage and points that held

| Commission check | Source-review coverage | Result |
| --- | --- | --- |
| 1. S obligations against APIs | All S1–S6, Hegel declarations/runner, Bombadil browser spec/defaults/CLI, host and store factories | Complete source assessment; F1–F8/F10. No execution. |
| 2. Every V wrong build can fail honestly | V1–V6 walked against its named assertion and entry | V1 has F5; V2 has F1/F2/F7; V3 has F3/F9; V4 has F1/F4/F6; V5 has F10. V6 is a source/artifact check, not a fuzz campaign. |
| 3. Inventory oracle and reachability | Actual inventory schema/implementation and outer HTTP routing | Complete; F5. |
| 4. Repository constraints | Contributor contract, fixture/runtime boundaries, current CI and proposed placement | Complete for this design; F8. Tests remain under packages and driver under scripts; no proposed CI mutation, Python, wall-clock sleep, or non-v7 ID requirement found. Concrete generators must still preserve injected clocks/UUIDv7. |
| 5. Attacker/bug cases absent from S2/S3 | Existing security effects, disclosure, fences, token/refusal helpers | Complete bounded assessment; F1/F2/F9, plus the disclosure checklist below. |

- Hegel **does** export `stateful.StateMachine`, `runAsync`, `Pool`, and `{ check, alwaysCheck: true }`: installed [stateful.d.ts:55](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/stateful.d.ts:55), lines 93–134 and 180–229. Its async runner awaits each step. Keeping concurrency explicitly unverified is correct.
- Both real engines have existing injected factories. The factory's existence is supported; it does not supply the missing S3 domain mutation API (F3).
- Bombadil `--cookie` **does** set real browser cookies, including origin-scoped plain pairs and Set-Cookie attributes, through CDP: [browser.rs:276](/Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-browser/src/browser.rs:276), [CLI browser.rs:243](/Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/browser.rs:243). Correct seeded backend state is still required. Multiple fixture cookie pairs should be passed as separate cookie arguments.
- Hegel's CI defaults do enable derandomization and disable its database: installed [nodeRuntime.js:29](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/nodeRuntime.js:29). The existing permanent Hegel tests use an independent reference and compare generated prefixes; they are useful precedents, not current pass receipts.
- The S2 disclosure contract should explicitly carry forward the existing credential classes and header behavior when F1 is corrected: access/refresh/ID tokens and client credentials, not just raw browser-session tokens, with per-route legitimate-success exceptions. [credential-free-refusal.ts:4](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/credential-free-refusal.ts:4) already enumerates these refusal fields; [people-organizations.host.e2e.test.ts:281](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/people-organizations.host.e2e.test.ts:281) checks refused callback Location and Set-Cookie outcomes. Checking strict generic refusal bodies can cover extra body fields; it does not cover leaked credentials in headers. Legitimate cookie deletion must remain allowed.
- The driver must map an existing `CHROME_BIN` value to Bombadil's **`CHROME`** environment variable if it relies on an override; Bombadil's [locate.rs:7](/Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-browser/src/chromium/locate.rs:7) reads `CHROME`. This is a bounded implementation detail, not a separate design finding.

## Evidence limits and handback

Only this report was written. No installation, build, test, lint, browser launch, fuzz campaign, mutant, credential lookup or service change was run. **Execution pass/fail/skip counts: not applicable; all campaign and counterfactual runtime claims remain NOT RUN.** The research report was used for pointers and checked against primary source; its successful-execution limits were preserved. DeepWiki was not available in this session's advertised tools; exact local source was used. Web evidence used is the primary Resource Timing/Fetch standards for the browser observation/transport claims above. Extracted constructor passages and a Mozilla documentation lookup were insufficient; the [Fetch standard's source](https://github.com/whatwg/fetch/blob/main/fetch.bs#L9167) was then read directly to verify the GET/HEAD body restriction. A quick memory search supplied no evidence used in the findings.

Work log: **no-home**, as commissioned. No separate authorized entries-file destination was supplied; the report is the scoped evidence/checkpoint handback. The narrow five-check commission governs this report; it does not claim visual/rendered-document review, full workflow design certification, product acceptance, or owner acceptance. Existing source rules and owner quotations in the design were not promoted into new owner decisions. No helpers were commissioned.

The next revision starts with the observable contracts in **F1/F2/F5/F7/F9** (`design-specification`), then aligns Program Design and Verification Design in that order. The local-host/injected-provider boundary can remain. No new owner tradeoff is needed to preserve the existing People, anti-replay and authorization contracts. Bombadil CI remains the owner's open decision as the design already states.

## Correction check — revision 2, `073eb8839`

**Current verdict: FINDINGS — needs revision.** Eight original findings close at the design level. F5 and F6 remain open. The corrections introduce F11 (P1) and F12 (P2): **four open findings, three P1 and one P2**, down from ten. This is a converging correction check, not a new baseline review.

Authority: the Lead's [correction handback](router://0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89/push/01a1e987-2b9a-7ae3-bf79-f2bdc96c9e06) accepts F1–F10 and requests only their revised anchors and affected proof. I reopened the complete rewritten Specification, Program Design and Verification Design from **`073eb8839b01c56800b1ec87696e07e1b015b29e`**, and compared the current files with that target. The decisive product reads below use the same pinned Switchboard `91bfdc5a3bf1632f0ffc70f22a2c34f3a9b469b5`. Unchanged earlier checks are reused; there was no new general review, implementation, or runtime execution.

| Original finding | Correction disposition | Revised anchors inspected at `073eb8839` |
| --- | --- | --- |
| F1 | **Closed.** The owner's same-organization People disclosures are permitted. The new credential prohibition is a separate defect, F11. | Specification:63,104; Verification Design:41,49 |
| F2 | **Closed.** Per-route permitted effects replace blanket row equality; consumed challenge plus rejected replay is an explicit clean case. F12 records the newly introduced fence contradiction separately. | Specification:64,72; Program Design:61; Verification Design:44,50 |
| F3 | **Closed at the reviewed design boundary.** Sequence actions now use real provider/service entries; the model no longer supplies policy missing from raw stores. Both owner-removal guards are named in the wrong build. Existing `createOrganizationProofProvider` is a real-provider precedent on the dual-storage context, not a public HTTP coverage claim. Exact command wiring and reaching each mutation remain implementation proof obligations. | Specification:68–72; Program Design:68–72; Verification Design:54; reopened product `organization-provider-proof.ts:28–40` |
| F4 | **Closed.** The member campaign replaces the generic navigation default and permits only its contracted 403/content. | Specification:103; Program Design:82–84; Verification Design:59,63 |
| F5 | **Open, P1.** Classification and current handler coverage improve, but the actual handler still has no dependency into the proposed new-route completeness check. | Program Design:26,41–43; Verification Design:38 |
| F6 | **Open, P1.** The mounted-trigger intention improves; final count equality still cannot establish request/click ordering. | Specification:105; Program Design:88,94; Verification Design:61 |
| F7 | **Closed.** Query, URL-encoded form and JSON/wire cases are separated, with GET/form clean cases. | Specification:52–57; Program Design:49–54; Verification Design:42–43 |
| F8 | **Closed.** Live inventory and dual-engine campaigns move to the existing host lane; pure table/model checks stay unit. | Program Design:22,25–31,68; Verification Design:38,58 |
| F9 | **Closed for the original missing key/transitions.** Pair identity, role/rejoin/delete/cleanup changes and both fence counterfactuals are now present. The added blanket refusal rule is F12. | Specification:79–87; Program Design:67; Verification Design:56–57 |
| F10 | **Closed at the design level.** Replay now recreates the backend/fixture and correct CLI options; V5 requires replay after the original harness closes. Execution/replay success remains unobserved. | Specification:110; Program Design:96; Verification Design:67 |

### F5 retained — A new real handler route is still invisible to the coverage comparison (P1)

**Revised target:** [program-design.html:41](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:41), [verification-design.html:38](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/verification-design.html:38).

`handler-routes.ts` is expressly handwritten by reading the handlers; the check then compares that list plus the provider inventory with a second handwritten classification. Add a new public branch to the **actual** outer handler while leaving both test lists unchanged: provider inventory, handler list, classification and families are all unchanged, so their equality still passes. This is precisely V1(b)'s promised wrong build. S1 at Specification:45–49 says it must fail. Adding the row to the test list as part of the mutant would test omission from a test list, not discovery of a real new handler route.

**Smallest correction:** give the coverage check an inspected dependency on the real handler-owned surface, while retaining independent expected exposure/outcomes. Identify how the existing handler shape is enumerated or checked; do not silently substitute a manual review for the promised automated failure. Validate by adding only a real handler route and observing the missing-classification/family failure. No product registration refactor is implied or authorized by this finding.

**Route:** design-program -> design-verification. **Disposition:** retained; U1/S1 coverage obligation unchanged.

### F6 retained — Final count equality loses the causal order and imposes an extra guarantee (P1)

**Revised target:** [specification.html:105](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/specification.html:105), [program-design.html:88](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:88), [program-design.html:94](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:94).

The driver compares totals **after** the campaign. `request on load -> later button click with no second request` produces one request and one click, exactly like `button click -> request`. The first violates U3's click-only rule; both pass the revised assertion. A delayed pre-click response also remains indistinguishable. Conversely, click-only does not require every click to reach the server: navigation/cancellation or transport failure can leave a click without a received challenge. Equality would reject that permitted behavior. Moving the counter to the server fixes visibility of received requests, not their causal order relative to browser input.

**Smallest correction:** preserve the original observable rule—no challenge initiation before its relevant user action—and specify an ordered, retained witness for that initiation and action in each document. Counts may supplement it. Add a wrong case whose final totals match despite a pre-click request, including the held-response case from F6; also permit a click with no received request. The real autofill mutation must fail the named ordering property, rather than an incidental count imbalance.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** retained; preserve U3 rather than replacing it with a one-request-per-click requirement.

### F11 new — S2 now rejects the token endpoint's legitimate success body (P1)

**Revised target:** [specification.html:63](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/specification.html:63), [program-design.html:60](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:60), [verification-design.html:43](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/verification-design.html:43).

The correction forbids access/refresh/ID tokens and client secrets in **every body or header**, with exceptions expressly limited to legitimate success `Set-Cookie` and cookie deletion. Yet V2 requires a valid token request to pass. The actual release path requires `access_token` in that success body and permits a refresh credential for the configured fleet CLI under its release checks: [sign-in-response-release.ts:111](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/response-release/sign-in-response-release.ts:111). The permanent real-host assertion checks a 200 response and parses its access token: [person-fleet-token.host.e2e.test.ts:205](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/person-fleet-token.host.e2e.test.ts:205). `credential-free-refusal.ts` is a **refusal** oracle; applying it unchanged to every success cannot satisfy both requirements.

**Smallest correction:** allow only each route's explicitly authorized successful credential outputs, checked against their existing issuance/release contract; keep refusal and unauthorized-disclosure checks strict. State the success-body exception in S2 rather than leaving the implementer to override it. Validate valid token issuance (pass), the same credential in an error response (fail), and issuance outside the route/caller entitlement (fail).

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; introduced by revision 2 while correcting the disclosure rule.

### F12 new — The new refusal fence rule contradicts permitted expiry cleanup (P2)

**Revised target:** [specification.html:64](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/specification.html:64), [specification.html:86](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/specification.html:86).

S2 now correctly permits expired-session cleanup **with its fence bump**, but the new R-fence clause says all refused operations bump nothing. The existing self-context expiry test returns **401**, then verifies native deletion and every retained pair's increment: [people-organization-context.host.e2e.test.ts:160](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/people-organization-context.host.e2e.test.ts:160), [expired-session-cleanup-proof.ts:60](/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/expired-session-cleanup-proof.ts:60). After an expiry in the generated sequence, this legitimate refused read cannot satisfy both rules. Applying the no-bump clause would undo F2's correction or give the model the wrong expected fence state.

**Smallest correction:** scope no-bump to operations that make no authorized mutation, including no permitted cleanup effect. Classify fence expectations by the committed effect, not the HTTP success/refusal label. Validate the existing 401-plus-cleanup increment alongside a policy refusal with no cleanup and no bump.

**Route:** design-specification -> design-program -> design-verification. **Disposition:** accepted; introduced by revision 2's added refusal clause.

**Correction-check boundary:** only this report was appended. No tests, mutants, builds, browser campaigns, lints or replay runs were performed; closures above concern corrected design meaning only. The no-home record and source-only proof limits remain. The next revision starts with S2's legitimate success credential exception and S3's effect-based fence rule (`design-specification`), carries the retained F6 causal obligation unchanged, then corrects the F5/F6 Program/Verification Design dependencies. No owner outcome or CI gate was waived.

## Correction check — revision 3, `6fb37dc2e`

**Current verdict: FINDINGS — needs revision. One open finding: F6 (P1).** F5, F11 and F12 close at the design level; no new finding is added. Open count decreases **4 -> 1**. Earlier closed findings retain their coverage.

The [revision-3 handback](router://0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89/push/01a1e98c-b833-7bc3-82a9-c48b6b6b126b) requested these four corrections only. I reopened their changed Specification, Program Design and Verification Design sections and their surrounding realization/proof at **`6fb37dc2e7040d5ebe2bf9dcb9b5fcf3198c35a7`**. Current target files matched that revision. Product/tool references remain the pinned Switchboard and Bombadil sources already declared above.

| Finding | Disposition | Revised anchors and basis |
| --- | --- | --- |
| F5 | **Closed at design level.** Route discovery now depends on actual handler source through the TypeScript compiler API. V1(b) changes the actual handler only; V1(d) rejects undiscoverable routing rather than silently excluding it. | Specification:43; Program Design:26,41–43; Verification Design:38. The parser's clean baseline must include the existing statically resolvable imported route constants and handler route helpers; `sign-in-http-handler.ts:203` compares `organizationAdminPagePath`, whose value is declared in `organization-admin-page.ts:4`. This is an implementation coverage obligation, not a request to change product routing. |
| F11 | **Closed.** Authorized token bodies and the release-constrained refresh credential are explicit success exceptions; refusal and unauthorized issuance stay forbidden. | Specification:63; Verification Design:43,49–50. These match the release/body anchors inspected for F11. |
| F12 | **Closed.** Fence changes follow committed authorized effects; a refused expired-session read may perform its required cleanup/bump. | Specification:64,86; Verification Design:44. This matches the existing 401 cleanup scenario inspected for F12. |
| F6 | **Open, P1.** Specification and the ordered-observer description improve, and V4(a) now names equal-totals/held-response counterfactuals. The actual run/replay instructions still select the previous browser and verdict paths. | Specification:105; Program Design:88–101; Verification Design:63. |

### F6 retained — Run/replay instructions bypass the newly designed ordered observer

**Target:** [program-design.html:88](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:88), [program-design.html:98](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:98), [program-design.html:99](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:99), [program-design.html:101](/Users/shravansunder/code/projects/agent-vm.design-portal-remediation/docs/specs/2026-11-17-fleet-access-f1-fuzz/program-design.html:101).

The new witness says the driver launches Chrome, observes its target through CDP, and attaches Bombadil with `test-external`. The ensuing run command still says **`bombadil browser test --headless ...`**, followed by **“then compare the challenge counts”**; replay likewise uses `browser test --reproduce`. Those commands do not attach to that observed Chrome. Bombadil explicitly defines `Test` as a managed-browser launch and `TestExternal` as attachment to the supplied remote debugger: [CLI browser.rs:97](/Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/browser.rs:97), [browser.rs:269](/Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/browser.rs:269). The documented execution path can therefore explore a different browser from the observer and still apply the rejected aggregate-count verdict. This leaves V4(a)'s named ordering failure unrealized despite the corrected Specification.

**Smallest correction:** make the executable run and replay recipes use the same externally managed browser/target as the observer; remove the count-based verdict and require the ordered witness to decide both modes. State that both observers are armed before the target's first application script/navigation so an on-load challenge cannot escape the record. Preserve the equal-totals, held-response and click-without-request cases. No new product behavior or dependency is requested.

**Route:** design-program -> design-verification. **Disposition:** retained; U3's ordering obligation unchanged. Source review establishes the contradictory command/ownership paths; it does not establish that the proposed cross-domain CDP observation has executed successfully. Its real behavior still needs V4(a)'s planned counterfactual proof.

Only the report was appended for this correction check. No builds, tests, lints, browsers, mutants or replay were run. The next correction belongs to Program Design's driver procedure; no owner outcome or proof strength was waived.
