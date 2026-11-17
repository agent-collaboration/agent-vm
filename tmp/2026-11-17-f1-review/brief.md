# F1 fuzz-testing design review (fresh Sol xhigh)

**Duty:** `review`, an independent design review (not delivery). **Target:** agent-vm `ea39c7a1f`, `docs/specs/2026-11-17-fleet-access-f1-fuzz/`: requirements, specification, program-design, verification-design and decisions. Read the plan only for consistency; it's not the standard. **Independence:** you authored none of it. **Grant:** inspect only; write only `tmp/2026-11-17-f1-review/report.md`. **Work log:** no-home.

**Ground truth to check the design against (read the source, not summaries):**
- Hegel 0.4.10, installed in `/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/`;
- Bombadil at `~/Documents/dev/open-source/bombadil` (7c7081b);
- Switchboard public worktree `/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished`: `installedProviderEndpointInventory`, the local-auth harness, the injected Drizzle stores, and the existing Hegel tests;
- the research report `tmp/2026-11-17-fuzz-research/report.md`, as evidence only.

**Check:**
1. Does each S obligation hold up against the real APIs? For example: can a Bombadil extractor see the performance entries for the challenge request before a click; can `--cookie` carry our session; does `alwaysCheck` exist; can both storage engines be built through the existing factories?
2. Can every V wrong build actually fail its test, with no proxy check?
3. Coverage: is `installedProviderEndpointInventory` the right oracle, and does it mark reachability?
4. Does anything violate the repo's rules? These are: no CI gate changes without the owner; tests under packages, drivers under `scripts/`; no wall clock in tests; UUIDv7; Drizzle injected; no Python.
5. Is anything missing from S2's forbidden-value list or S3's rules that a real sign-in attacker or bug would hit?

Return READY or findings by severity with file:line anchors.
