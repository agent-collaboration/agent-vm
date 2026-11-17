# Addendum to the handler input-errors host packet: proof retention per leg

This addendum applies to packet `handler-input-errors-host-packet.md`, sha256 `43c9afbcfa8a1492a6747900147250a6ae2f3ff0195cd68aeaa1d1f489b22df8`. The Fleet access Lead asked for it in Router push `01a1eb16-1306-7842-8101-bea9cad2b110`, after the Verifier found the established retention missing. It applies to every host leg: step 2 red, step 3 green and step 4 full suite, on cloudflare and node. The packet is otherwise unchanged. It makes no product or test change. Call the APIs below from a private, runner-owned scratch script that imports them from the checkout.

## Before each leg

Run this after that leg's `pnpm build`. The red leg uses the red build.

1. Create a fresh, distinct run-evidence directory for the leg. Canonicalize both the checkout root and that directory with `realpath`.
2. Call `prepareProofBundles(canonicalRoot, canonicalRunEvidence)` from `packages/sign-in-test-support/src/test-fixtures/proof-bundle-artifacts.ts`. Write the result to `<runEvidence>/bundle-manifest.json` with mode `0600` and flag `wx`.
3. Call `prepareNodeProofArtifacts(canonicalRoot, canonicalRunEvidence)` from `node-proof-artifacts.ts` and write the result to `<runEvidence>/node-manifest.json` with mode `0600` and flag `wx`, on these legs:
   - **Targeted legs (steps 2 and 3):** Node legs only. All three files run one harness on the selected host, and the harness reads the Node manifest only when `SIGN_IN_TEST_HOST=node` (`local-auth-harness.ts:460`).
   - **Full-suite legs (step 4):** both hosts, including cloudflare. Some full-suite files start Node children on their own, and the native-browser file runs both hosts. This matches the B1-B full-gate packets: "Both manifests even for default full lanes (some cases explicitly use Node)".
4. On the vitest child, set `AUTH_PROOF_MANIFEST_FILE=<canonical bundle-manifest.json>`. Wherever item 3 prepared a Node manifest, also set `AUTH_PROOF_NODE_MANIFEST_FILE=<canonical node-manifest.json>`. Keep the packet's own argv and file selection.

## After each leg

Do these checks as `auth-verification-cli.ts` does. Report any failure as a retention or identity failure, never as a product result.

1. **Worker modules, configuration, client** (`auth-verification-cli.ts:515-625`):
   - At least one `harness-*.json` receipt exists in the run-evidence directory.
   - Each receipt's `identity` deep-equals `bundle-manifest.json`.
   - The receipt configuration's sign-in issuer is loopback, the client issuer equals it, and the gateway's `SIGN_IN_ISSUER`, `SIGN_IN_JWKS_URL`, `TOOL_PORTAL_ORIGIN` and `MANAGEMENT_AUDIENCE` agree with it.

   At load time the harness already refuses any module whose sha256 differs from the manifest, and any configuration or client source that changed (`proof-bundle-artifacts.ts:250-276`).
2. **Node receipts** (`auth-verification-cli.ts:81-115`), on every leg that set a Node manifest:
   - The declared `nodeHost`, `bridge` and module sha256 values are unchanged after the leg.
   - Each `node-harness-*.json` that is present has an `identity` that deep-equals `node-manifest.json`.
   - Each non-empty receipt is paired by `receiptId` and must pass `compareNodeProofReceipts(expected, actual)`.
   - On targeted Node legs, at least one node receipt must exist, and the counts of node receipts and harness receipts must be equal.
   - On full-suite legs, hosts can mix, so the global counts of node and harness receipts need not match; record both. Pairing is by id instead. Each local auth harness writes `harness-<receiptId>.json`, and when it runs a Node host it also writes `node-harness-<receiptId>.json` under the same id (`local-auth-harness.ts:756-766, 839-844`). A Node harness receipt records `requestLimits.outerCounter: "node-fixed-window"` (`:762`). So:
     - every `harness-<id>.json` with `outerCounter: "node-fixed-window"` must have a `node-harness-<id>.json`, and a missing one is a retention failure;
     - every `node-harness-<id>.json` must have its `harness-<id>.json`;
     - a pair whose `expected` is non-empty must pass `compareNodeProofReceipts`;
     - a pair whose `expected` is empty (a metadata-only, fault or unused harness) is recorded as explicit N/A, naming its `receiptId` and, where the leg's output shows it, the test case.

     Comparing only the receipts that are present can never stand in for a missing one. A full-suite leg with no Node-host harness at all is recorded as N/A for the Node comparison.
3. **Return per leg:** the run-evidence path; the sha256 of both manifests and of every receipt; the receipt counts; and the comparison result.
