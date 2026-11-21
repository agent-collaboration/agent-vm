# F1 fixes for a Claude agent (the Codex agent declined these)

Lead: the Sign-in Lead, claude-local cd5902e2-2105-4472-adde-031ae6496e30, service 0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89. Report to the Lead.
This is authorized property-based testing (Hegel) of our own sign-in service, in the public repo agentswitchboard/switchboard, PR #4.

**The checkout:** /Users/shravansunder/code/projects/fleet-access-runner/f1, detached and clean at `dccd77438d16d6d0e9ea131bed393826977755cc`. Create the branch `f1/hegel-fuzz` there, tracking origin. The diagnosis (by the Codex F1 agent) is below, with file:line; reread each line before you change anything.

1. **Add 4 routes to the F1 route classification and model,** each with its documented answer, so that `packages/sign-in-test-support/src/fuzz/handler-route-discovery.unit.test.ts` passes:
   - GET /api/auth/organization/people
   - GET /api/auth/organization/people-list
   - POST /api/auth/organization/person-membership
   - GET /api/auth/organization/self-context

   Source: `sign-in-request-handler.ts:18–27`. The documented answers come from the B1-C design (agentswitchboard/agent-vm, docs/specs/2026-11-15-fleet-access-b1/b1-c-organizations/specification.html) and the existing permanent tests for those routes.
2. **Fix the stale disclosure oracle.** `request-case-fixture.ts:299–303` adds the second organization's ID to `foreignIdentities`, but the same owner created it (`request-case-fixture.ts:81–88`, creatorRole owner in `organization-provider-options.ts:96–105`). The owner's own memberships are entitled (B1-C S1, S2), as shown by the chooser on `/owner-ready` (`owner-page.tsx:210–224`). Treat the caller's own memberships as entitled. Keep a genuinely foreign organization, one where the caller is **not** a member, in `foreignIdentities`, so the disclosure check can still fail. Prove it: a wrong build that leaks a non-member organization must still fail S2.
3. **Budget:** the S2 default is 200 cases per route and caller group (`SIGN_IN_FUZZ_CASES`), about 1.5 s each against real hosts, which made CI run 98 minutes. Lower the default so the fuzz adds only a few minutes to the e2e-host lane. Bound shrinking so a failure ends quickly. Keep a larger budget available through the variable for manual deep runs. **Don't change CI files or add check gates.**

**Rules:** TypeScript; no wall-clock waits; no SIGKILL. Run on Sunclaw only after the navigation Implementer (codex-local 01a1f8cc-9667-7983-b135-b42797f332a5) releases the heavy lane; ask it first.

**Prove:**
- `pnpm check`;
- the unit tests (including the route-discovery test);
- the F1 e2e-host fuzz on both hosts, timed;
- the wrong build from step 2, failing.

**Then:** commit, and push to the branch `f1/hegel-fuzz` on origin (agentswitchboard/switchboard). Report the commit, the counts per host, the measured fuzz duration, and the wrong-build result.
