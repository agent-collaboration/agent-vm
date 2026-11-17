# F2 design review (fresh Sol xhigh)

**Duty:** `review`, an independent design review. **Target:** agent-vm `9ce51cb21`, `docs/specs/2026-11-17-fleet-access-f2-hegel/`: all pages; the plan only for consistency. **Grant:** inspect only; write only `tmp/2026-11-17-f2-review/report.md`. **Work log:** no-home. **Independence:** you authored none of it.

**Ground truth:** public Switchboard `/Users/shravansunder/code/projects/switchboard-public` (`b03d35ff`); Hegel 0.4.10 as installed in `/Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/`; the collection `tmp/2026-11-17-f2-research/report.md` (evidence only); and the F1 review (`tmp/2026-11-17-f1-review/report.md`) for the lessons already learned.

**Check:**
1. Is each P/M property true of the *intended* behaviour, read from the source and its tests? Would correct code fail any of them (as F1's first draft did with owner emails and consumed challenges)?
2. Is each oracle independent of the code under test?
3. Can each wrong build really fail its named property, at a reachable seam, in the stated lane?
4. Lane placement against AGENTS.md:35 and `vitest.config.ts`.
5. Any high-risk decision in the collection that should replace a lower-value target?

Return READY or findings by severity with file:line anchors.
