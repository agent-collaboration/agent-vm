# F2 research brief: critical Switchboard systems for Hegel (bounded evidence, read-only)

**You:** bounded research helper for the Fleet access Lead (claude-local cd5902e2). The Lead writes the design; you return evidence only. Inspect only; write only `tmp/2026-11-17-f2-research/report.md` in the agent-vm worktree. Work log: no-home.

**Owner (17 Nov):** "get hegel working on critical systems too". F1 already covers sign-in (`docs/specs/2026-11-17-fleet-access-f1-fuzz/`, read it for the method). F2 covers the other critical TypeScript packages in public Switchboard (`/Users/shravansunder/code/projects/switchboard-public`, main `b03d35ff`): **tool-engine, tool-access, tool-host-core (plus its Cloudflare and Node hosts), oauth-broker, oauth-broker-contracts, config-contracts, agent-portal-sdk**.

**For each package, answer from source with file:line, not summaries:**
1. **Its security- or correctness-critical decisions:**
   - authorization and policy evaluation;
   - token issuance, refresh, custody, revocation and expiry;
   - request and approval state machines;
   - config parsing and compilation into grants;
   - routing to upstream tools;
   - attachment/path validation;
   - anything that decides allow or deny, or holds a secret.

   For each, give the pure function or state machine where it lives (or note it's mixed with I/O), its input types and schemas (Zod?), and its documented invariants (comments, specs, tests).
2. **Existing tests:**
   - which properties are already tested and how: unit, integration or host e2e;
   - any Hegel or property tests (`*.hegel.*`), and whether any of the package's own tests run hosts;
   - the test lanes and Vitest projects per `vitest.config.ts`, and AGENTS.md's taxonomy.
3. **State and storage:** what each package stores (Durable Object or SQLite through Drizzle?) and what invariants hold across sequences of operations (for example a token can't be used after revocation, or an approval can't be replayed).
4. **Candidate Hegel properties,** grounded in the code, not invented:
   - for pure functions, the property with its oracle (model, round-trip, idempotence or monotonicity);
   - for stateful flows, the operations and the invariants.

   Mark each with how its wrong behaviour would be caught.
5. **Gaps:** decisions with no tests at all.

**Return:** `report.md` with one section per package, exact anchors, and a ranked list of the 10–15 highest-value property targets with the reason. Then send a short message to the Lead with the path. No design.
