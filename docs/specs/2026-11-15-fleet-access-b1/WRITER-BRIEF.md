# B1 design set: writer brief (the four design documents)

**Owner (15 Nov, first-hand):** every deliverable has its own set: Audit · Requirements · Specification · Program Design · Verification Design · Plan · Decisions · Inventory, plus one overview per Lead with the sequence. No development (owner stop); this is design documentation only.

**You write four HTML pages in this folder:** `requirements.html`, `specification.html`, `program-design.html`, `verification-design.html`. The Lead writes `index.html`, `audit.html`, `plan.html`, `decisions.html` and `inventory.html`.

## Load first
- `sunstack-workflow-v2:design-specification`, `design-program`, `design-verification` (`~/.codex/plugins/cache/sunstack/sunstack-workflow-v2/0.3.2/skills/`);
- `sunstack-dev:presentation-html` (`~/.codex/plugins/cache/sunstack/sunstack-dev/3.3.5/skills/presentation-html/`).

## Sources: the owner-approved design ONLY
- **Shared set:** `docs/specs/2026-11-02-fleet-access/` (`requirements`, `specification`, `program-design` and `verification-design` `.source.html`). **Take every row that belongs to B1**, and every cross-cutting row B1 owns.
- **The B1 deliverable:** `docs/specs/2026-11-02-fleet-access/deliverables/b1-people-roles-sign-in.source.html`.
- **Owner decisions made after the design** (first-hand records): `tmp/2026-11-15-full-review/inventory.md` §1.
- **Current state, for annotation only:** `tmp/2026-11-15-full-review/report-B1.html`, the independent audit.
- **Do NOT use** the Lead's plan, acceptance records or pages as design.

## Rules
- **Split, don't invent.** Each obligation keeps its original ID (U…, R…, E…, V…, OD…) and a link or anchor to its source. Where a later owner decision supersedes text, show the original, mark it **superseded**, and give the new owner wording with its first-hand reference. Drop nothing silently.
- **Each page opens with:**
  - a plain-words summary;
  - one diagram that fits the screen (`flowchart TB`, `data-width="canvas"`, labels of at most 8 words, **every classDef with a dark `color:`**);
  - then the rows.
- **Status column on every obligation:** delivered / partial / missing / defect, from report-B1.html, with that audit's row ID.
- **Open owner questions** become `ex-choice` pickers, with options, gains and costs, and a recommendation.
- **Page menu on every page:**

  ```html
  <ex-nav for="content"><nav slot="pages" aria-label="Pages">
    <a href="index.html">B1 home</a><a href="audit.html">Audit</a><a href="requirements.html">Requirements</a>
    <a href="specification.html">Specification</a><a href="program-design.html">Program Design</a>
    <a href="verification-design.html">Verification Design</a><a href="plan.html">Plan</a>
    <a href="decisions.html">Decisions</a><a href="inventory.html">Inventory</a>
  </nav></ex-nav>
  ```

- **Check:** run `pnpm dlx https://demistify.getagentstudio.dev/v1/demistify-cli.tgz check <files>` until it shows 0 errors.
- **Hand back** the four paths, the count of obligations per page, every superseded row, and anything you couldn't place.
