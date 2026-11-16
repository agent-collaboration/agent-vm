# Sol xhigh: B1-A independent delivery review

**Duty:** review, independent delivery review of B1-A "One sign-in core". You have no history with this work.

**Packet:** follow Packet 3 in `docs/specs/2026-11-15-fleet-access-b1/b1-a-core/plan.html` exactly. The Plan is only your logistics; it is not the standard.

**Target, frozen:** Switchboard draft PR agent-collaboration/switchboard#18, head `e2a91f5502944e456c3920ce3ab951b29d8742a9`, base `f3b2b88b`. Read the code with `git -C /Users/shravansunder/code/projects/switchboard show e2a91f55:<path>` and diff it with `git -C ... diff f3b2b88b e2a91f55`.

**Yardstick:** the owner's words and the approved design, all pages except the Plan: `audit.html`, `requirements.html`, `specification.html`, `program-design.html`, `verification-design.html` and `decisions.html` in `docs/specs/2026-11-15-fleet-access-b1/b1-a-core/`, plus the approved B1 deliverable and audit the pages cite.

**Claims to inspect, not to trust:**
- `work/lead-check.html` (the Lead's acceptance);
- `work/implementer-handback.md`;
- `work/verifier-observation.md` and `work/evidence/`;
- the Verifier's scratch evidence under `tmp/2026-11-15-b1-a-verifier/`.

**Known ruling:** F5 (the verify-auth outer CLI doesn't exit) reproduces at base `f3b2b88b`. The Lead ruled that V5, V8 and V10 are judged by each journey's matched counts and its runtime child's exit code. Challenge that ruling if the evidence doesn't support it.

**First question:** what does this change drop compared with the owner's words, the approved design, or the old tests? Answer it first, as a list.

**Grant:** read-only. Write only `docs/specs/2026-11-15-fleet-access-b1/b1-a-core/work/reviewer-report.html`. No product changes, no heavy runs on the owner's Mac.

**Output:** findings ranked P0–P3, each with its file:line, the failure scenario, the yardstick it breaks and the fix. End with READY or NOT READY.
