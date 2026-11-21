# F1 update packet: PR #4 on current main

Role: 🐒 Implementer (role-implementer), Designed Outcome. Model gpt-6.2-sol, high effort. Runs on Sunclaw.
Lead: claude-local cd5902e2-2105-4472-adde-031ae6496e30, service 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89. Report to the Lead.

**Target:** agentswitchboard/switchboard PR #4, branch `f1/hegel-fuzz`, head `dccd77438d16d6d0e9ea131bed393826977755cc`. That's the old F1 plus a merge of main `23827d3d`. Make a worktree under /Users/shravansunder/code/projects/fleet-access-runner/f1/.

**The design:** agentswitchboard/agent-vm, branch design/portal-remediation, folder docs/specs/2026-11-17-fleet-access-f1-fuzz/. Read all of it.

**CI run 44848813313 on dccd774** gave three findings:
1. **Validation:** `packages/sign-in-test-support/src/fuzz/handler-route-discovery.unit.test.ts` reports 4 route paths in the real outer handlers that the fuzzer doesn't cover (`expected { paths: [ …(4) ] } to deeply equal { paths: [] }`). They came with the passkey and organizations PRs merged after F1 was cut. Name the 4 paths, and add them to the fuzz route model with their documented answers.
2. **E2E, `route-requests.host.e2e.test.ts`:** `S2 GET /owner-ready as owner` fails `identity-disclosure: body exceeds caller and organization entitlement` (seed 20261117, cloudflare host, variant valid). **Diagnose before you fix.** Is `/owner-ready` really disclosing data beyond the caller's entitlement (a product bug: report it to the Lead with the exact field and stop), or is the F1 oracle stale against B1-C's organization chooser, which shows the person's own memberships? Cite the field and the design rule (B1-C) that decides it.
3. **Duration:** the fuzz runs about 1.5 s per case against real hosts, across every route and caller. It ran over 100 minutes until it was cancelled; that's what was called the "6-hour hang" on 17 Nov. Cap the per-route case budget so the whole e2e-host lane fits within a normal run (main's takes about 34 min, and F1 should add at most a few minutes). Keep shrinking bounded too, so a failure doesn't loop for hours. This is test design. **Don't change CI configuration or add check gates.**

**Rules:** no wall-clock waits, UUIDv7, TypeScript, no SIGKILL. Sunclaw runs one heavy job at a time, and it is shared with the navigation pair (Implementer codex-local 01a1f8cc-9667): agree turns with it before each heavy run.

**Handback:**
- the 4 paths;
- the disclosure diagnosis, with evidence;
- the new budget and its measured e2e duration on Sunclaw;
- both hosts green;
- for each fix, its wrong build failing.

Push to `f1/hegel-fuzz`. CI then runs.
