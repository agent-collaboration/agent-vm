# M4 host cost at829651c — source/log analysis, no new run

The observed12-minute cost is inside the generated property, not repeated workerd startup. Per-case DO initialization and per-step latency were not separately timed, so their individual durations remain unknown. No source, settings, scope, case count or proof requirement changed.

## Observed timing

CI run44100359864, E2E(host), exact829651c:

| Observation | Milliseconds | Meaning |
| --- | ---: | --- |
| Whole M4 test file |715276| Vitest file result |
| Named property |714936| Includes every Hegel callback and state-machine operation |
| Difference |340| Aggregate overhead outside the property; not an individual startup/teardown measurement |

About99.95% of the file time belongs to the property. Dividing by the configured100 cases gives7.149s/case amortized; dividing by the maximum configured5000 accepted steps gives142.99ms/step amortized. These are ratios, not measured case/step latency.

## What is initialized where

- File-level beforeAll starts one socket guard, creates one persistent root and calls unstable_dev once. File-level afterAll stops it and removes that root. Source: packages/tool-host-cloudflare/src/durable-workspace-authority/agent-removal.hegel.host.e2e.test.ts:26–67.
- Each Hegel callback increments a scenario counter and chooses one unique workspace UUIDv7; it creates the two-agent in-memory oracle and starts runAsync. The first control request lazily reaches that workspace's new DO. Source: same file:100–111 and shared model:258–270.
- The test entrypoint selects the DO by idFromName(workspaceId). Every operation is a separate worker.fetch HTTP request, then DO RPC, then real storage get/put/transaction. Source: host test:70–96; test-fixtures/agent-removal-proof-entrypoint.ts:36–57.
- The DO creates a small createWorkspaceAuthority wrapper per RPC around the same ctx.storage. This is not a newly initialized database per call. Source: durable-workspace-authority/workspace-authority.ts:9–24.
- Wrangler migrations are configured on the once-started worker. The source contains no per-case application migration routine. The cost of engine-owned lazy object/storage creation is not separately visible in these logs. Source: wrangler.example.jsonc:22–30.

## Per-step work from the model

There are eight rule entries. A rule generally issues one RPC; successful unlink completion also checks two reads and re-admits. Two invariants run at the initial state, final state and after every round (alwaysCheck):

1. Membership/removal equality: two reads for each of two agents =4 control RPCs per checkpoint. Each agent's reads are sequential, and the two agent branches use Promise.all.
2. Pending/disabled refusal: for each blocked agent, an attempted admission expected to reject plus two reads =3 further RPCs. With both blocked this adds6, so invariants alone reach10 control RPCs/checkpoint.

This is a source-confirmed multiplier at the real storage boundary. It is not a measurement of RPC time or proof that it accounts for a particular percentage of the714936ms.

## Cases and steps: configured versus observed

- Settings request100 successful test cases, deterministic seed20261117, database disabled.
- runAsync receives stepCount50. Hegel0.4.10 stateful.js documentation says the engine chooses **at most** that number and a swarm subset of rules.
- Four rules can tc.assume(false) when the selected agent has no removal. Hegel drops that step without consuming accepted-step budget; its machineSteps loop nevertheless reaches the after-round invariant checks. Thus attempted rounds/checkpoints can exceed accepted steps.
- Both invariants are alwaysCheck, as required. Library code checks them initially/finally and after each round.
- The green success receipt gives one Vitest property pass, not internal counts. It does not report completed case callbacks, accepted/rejected rounds, total RPCs or per-case object-init durations.100×50 is the configured maximum accepted-step budget; exact executed rounds/steps are not observable from this log. No claim of an observed5000-step run.

Installed source examined: packages/tool-host-core/node_modules/@hegeldev/hegel/dist/stateful.js:45–68,195–273 and326–340; runnerCore.js configureSettings sets testCases, seed and deterministic settings.

## Observed expected-exception volume

The raw log repeatedly prints expected DO RPC refusals as uncaught errors at the RPC boundary, even though the outer test entrypoint converts them to409 and the oracle expects them. Attribution to this test's stderr context counted:

| Expected refusal | Events |
| --- | ---: |
| Agent removal prevents admission |7780|
| Pending membership replacement conflicts |415|
| Membership operation conflicts |446|
| Pending membership operation conflicts |861|
| Membership still active |105|
| Membership operation intent conflicts |314|
| Retired client cannot be changed |284|
| Total |10205|

The attributed stderr occupies about72200 log lines/8.4MB including repeated stack frames and runner prefixes. First expected refusal14:29:36.425Z, last14:41:13.974Z; property result14:41:30.812Z. This demonstrates substantial rejection/RPC/logging work through the property. Its latency share is unknown. The logs are not test failures: both M4 and the lane passed.

## Remaining uncertainty

Existing source/logs settle file-level startup versus property cost, and the invariant/RPC multiplier. They cannot partition one-time lazy object setup from steady-state RPC/storage/serialization/logging cost or provide exact generated-case/round counters. A timing/counter probe on Sunclaw would be the smallest real measurement that closes that gap, but no probe or additional run is authorized by this source/log request. Lead decides whether to authorize it, retain current cost, or change the proof design. The Sunclaw baseline/mutation HOLDs remain unchanged.

Raw receipt: work/implementer-evidence/ci-44100359864.log. No code or settings changed during this analysis.
