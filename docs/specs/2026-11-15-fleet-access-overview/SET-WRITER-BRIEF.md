# Fleet access: write one deliverable's full design set (B2, B2 additions, BG or B3)

**Owner (15 Nov, first-hand):** every deliverable has its own set:
1. Audit (first);
2. Requirements;
3. Specification;
4. Program Design;
5. Verification Design;
6. Plan;
7. Decisions;
8. Inventory.

Plus a short home page. Relayed by Lead A on the owner's behalf: each deliverable is cut into tangible 2–4 hour items, each with a gate ("gate and go"). The Plan names four packets with exact contents and locations. Owner stop: **no development**; this is design documentation only. Your commission message names your deliverable.

## Reference: copy the B1 set's shape exactly
`docs/specs/2026-11-15-fleet-access-b1/` is the reference:
- `index.html` is the owner's short version: answer, journey (sequence diagram), state picture with a key, "Did we build what you agreed?" as an `ex-trace` (one step per agreement: agreed with owner words or design row, built, proven, gap), the decisions for the owner, after-the-stop items, the reviewer packet picture, and the detail pages folded away;
- `plan.html` §3: four packets as cards, with exact files and one folder per item `work/<item>/`;
- `plan.html` §4: the 2–4 h items with gates;
- `decisions.html`: yours / mine with verdict / open as `ex-choice`.

The owner reads only HTML, finds big matrices unreadable ("matrices are for you to validate"), and wants pictures and plain words first.

## Load first
- `sunstack-dev:presentation-html` (`~/.codex/plugins/cache/sunstack/sunstack-dev/3.3.5/skills/presentation-html/`), including `references/engineering-documents.md`, and the Demistify v1 guide `https://demistify.getagentstudio.dev/v1/authoring/SKILL.md` with the component references you use (`diagrams.md`, `traces.md`, `cards-and-callouts.md`, `choices-and-comments.md`).
- `sunstack-workflow-v2:design-specification`, `design-program`, `design-verification` (`~/.codex/plugins/cache/sunstack/sunstack-workflow-v2/0.3.2/skills/`).

## Sources: the owner-approved design ONLY, plus owner first-hand words
- The shared approved set: `docs/specs/2026-11-02-fleet-access/` (requirements, specification, program-design, verification-design `.source.html`), plus your deliverable's `deliverables/<x>.source.html`. Take every row that belongs to your deliverable. Keep the original IDs and link back to the source. Mark superseded rows with the owner's newer words.
- Owner decisions after the design, with first-hand records: `tmp/2026-11-15-full-review/inventory.md` §1. The transcripts are listed there. Quote the owner exactly, typos included, with line and time. Anything you can't find in a transcript is labelled "unconfirmed".
- The independent audit for your deliverable: `tmp/2026-11-15-full-review/report-<B2|B2-additions|BG|B3>.html`. Copy it to `audit.html` with the set's menu. Rewrite every relative link as an absolute `file://` link (the B1 copy shows how). Don't change its findings.
- PRs and commits: `inventory.md` §2–§3; switchboard `/Users/shravansunder/code/projects/switchboard`; codex-router `/Users/shravansunder/code/projects/codex-router`.
- **Never use** the Lead's plan, acceptances or summaries as design.

## Open owner questions you must carry (as `ex-choice`, with diagram, options, gain and cost, recommendation, and what waits)
- **B2 additions:** CLI `--device` login.
  - A: a device→session table, so sign-out still ends the token (recommended).
  - B: a session-less device token.
  - C: drop `--device`.
  - Source: `~/dev/memory-logs/projects/2026/2026-11-codex-router/owner-pages/2026-11-15-fleet-access-audit.html#d3`.
- **B3:**
  - Machine-login storage A: confirm or discuss. The owner asked about its costs ("whats teh cons i don tkudnetand fully") and never confirmed it.
  - What happens to frozen PRs #11 and #14.
  - The deny-without-fresh-second-factor defect is a defect to fix, not a question.
- **BG:** the never-answered BG choices from the 30 Oct page (`tmp/2026-10-30-lead-pages/assumptions-by-deliverable.html`, groups BG pages, BG staging, BG gaps: P01–P19, S01–S17). Group them. Each picker carries its diagram, options and recommendation.
- **B2:** whatever the audit's section 8 raises, checked against the design: is it already decided? Only true open items get a picker. If the design or a first-hand owner line decides it, say so (B1's Decisions page shows how).

## Output
Write to `docs/specs/2026-11-15-fleet-access-<b2|b2x|bg|b3>/`:
- `index.html`
- `audit.html`
- `requirements.html`
- `specification.html`
- `program-design.html`
- `verification-design.html`
- `plan.html`
- `decisions.html`
- `inventory.html`

Every page carries the same 9-link menu as B1.

**Diagram rules:**
- Use Mermaid `slot1`–`slot6` classes with a key in prose. Never hex classDefs.
- Use `flowchart TB` with `data-width="canvas"`.
- Keep labels to at most 8 words.
- Use `sequenceDiagram` for journeys.

**Check:** run `pnpm dlx https://demistify.getagentstudio.dev/v1/demistify-cli.tgz check <all 9 files>` until it shows 0 errors.

**Hand back:**
- the paths and hashes;
- the count of obligations per page;
- the open questions you carried;
- the gaps the design or a first-hand line already decides;
- every source tension, shown side by side and not settled;
- anything you couldn't place.

The Lead then sends the set to a Terra medium checker. Write only in your folder; no product code, no commits.
