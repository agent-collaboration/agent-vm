# Fuzz-testing research brief (bounded evidence, read-only)

**You:** bounded research helper for the Fleet access Lead (claude-local cd5902e2). The Lead writes the design; you return evidence only. Inspect only; write only `tmp/2026-11-17-fuzz-research/report.md` in the agent-vm worktree. Work log: no-home.

**Owner intent (17 Nov, verbatim):** "yes i hegel is fuzz testing we hsoudld use it"; "and ui fuzz testing with bombardil if we need it as a later step"; then "did you add diesgns and paln out and execute fuzz testing? for heagel ts and bombardil ts?"

**System under test:** Switchboard (public): `/Users/shravansunder/code/projects/switchboard-public` (main `b03d35ff`), and the B1-C worktree `/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished`, which has node_modules. TypeScript sign-in service on Better Auth 1.7.11 with Better Auth UI, two runtime hosts (workerd and Node), Vitest 4.1.5, and existing Hegel property tests (`*.hegel.unit.test.ts`).

**Answer from source, citing file:line, never from summaries:**
1. **Bombadil** (`~/Documents/dev/open-source/bombadil`, HEAD 7c7081b; read `docs/manual/src/*.md`, `examples/`, `lib/` and the README):
   - how it drives the browser (CDP? WebDriver? its own Chromium?);
   - the spec language: TypeScript module, LTL operators, built-in default properties, action generators (exact syntax with a real example from the repo);
   - how to point it at a locally served page, auth/cookies/seeded state, headless and CI flags, exit codes, determinism/seeds, failure output and shrinking;
   - install route (binary, Nix, npm types package and its exact name and version), platform support (macOS arm64 and Linux), maturity and breaking-change notes in CHANGELOG;
   - whether it can run against our existing harness (a page served by our Node or workerd test host on localhost).
2. **Hegel TS** (`@hegeldev/hegel` 0.4.10 as installed in the B1-C worktree's node_modules):
   - its generator API, how it integrates with Vitest, shrinking, seeds and replay;
   - how the existing `*.hegel.unit.test.ts` files in Switchboard use it (list them; quote one pattern);
   - whether it can drive (a) Zod request-schema fuzzing for every public endpoint body, (b) HTTP-level fuzzing against our in-process host, and (c) stateful/model-based testing (command sequences against a model) for storage invariants.
3. **Fit:** for each tool, what it can and can't prove here, its runtime cost, and the risks (flakiness, its own maturity).

**Return:** `report.md` with these sections and exact anchors, then a short message to the Lead with the path. No design, no recommendations beyond what the evidence directly supports.
