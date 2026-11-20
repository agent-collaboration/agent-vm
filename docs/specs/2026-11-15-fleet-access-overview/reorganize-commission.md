# Commission: reorganize the sign-in design sets into the owner's layout

Role: 🐒 Implementer for documentation structure only. Model gpt-6.2-sol, high effort. Runs on Sunbook.
Lead: the 🦁 Sign-in Lead, claude-local `cd5902e2-2105-4472-adde-031ae6496e30`.
Write scope: `docs/specs/` in `/Users/shravansunder/code/projects/agent-vm.design-portal-remediation` (branch `design/portal-remediation`). No commits; the Lead reviews and commits.

## The owner's layout (20 Nov)

The owner, quoted by the central Lead:
- "overview set -> overview documents -> links to design documents. all the planning etc"
- "each design set -> all decision documents -> decisions for each as well and any show me logs"
- "your plans should be part of the html"
- "make sure tests and planned verification for automated tests and verification scripts. use turmoil or hegel"
- "also implicit state machines are state machines"

Read the reference in full first: `/Users/shravansunder/dev/ai-tools.fix-reviwer-role/docs/wip/2026-11-20-demistify-design-quickstart/README.md`, `verification-and-decisions.md` and `index.html`, plus https://demistify.getagentstudio.dev/v1/authoring/references/navigation.md.

### Rules

1. A **set** is one folder with its own `navigation.json`. Each page loads only its own set's JSON: `<ex-nav for="<doc-id>" src="./navigation.json">`. That replaces any hand-written page list.
2. **The overview set** is `2026-11-15-fleet-access-overview/`, titled "Sign-in (auth service)". Its Pages list is only the overview documents (Home, plus any overview pages that exist). It has a progress table: one row per deliverable, with state, Lead, PR, and an ordinary link into that deliverable's Home. No deliverable pages go in its Pages list.
3. **One set per deliverable,** with Pages in this order:
   - Home (`index.html`: what it is, its state, its Lead, a visible link back to the overview);
   - Requirements, Specification, Program design and Verification design (only those that exist);
   - Plan (HTML);
   - Decisions (`decisions.html`): decided items quote the owner's exact words and the date; open items show the choice;
   - Work log, only if one already exists;
   - last, "Back to the overview".

   Never another deliverable's page.
4. **Map** per set: groups of related topics, each entry pointing at a page id in that set and a real heading id. It is not a copy of the Pages list.
5. **Each decision lives once,** in its own set. Elsewhere, write one line and a link.

## Sets: existing folders, don't move them

| Set | Folder | Notes |
|---|---|---|
| Overview | `2026-11-15-fleet-access-overview/` | Its existing `index.html` is the Home. |
| B1-A core sign-in | `2026-11-15-fleet-access-b1/b1-a-core/` | Merged. |
| B1-B passkeys | `2026-11-15-fleet-access-b1/b1-b-passkey/` | Merged, PR #8. |
| B1-C organizations | `2026-11-15-fleet-access-b1/b1-c-organizations/` | Merged, PR #1. `b1/audit.html` belongs with whichever set it audits; link it from there. |
| B2 central statements | `2026-11-15-fleet-access-b2-central/` | |
| B2x | `2026-11-15-fleet-access-b2x/` | |
| B3 machine login (sign-in side) | `2026-11-15-fleet-access-b3/` | Its Mac side was handed to the Mac Lead on 20 Nov. Say so on Home. |
| BG getting in and staging | `2026-11-15-fleet-access-bg/` | |
| F1 fuzzing | `2026-11-17-fleet-access-f1-fuzz/` | PR #4. |
| F2 Hegel | `2026-11-17-fleet-access-f2-hegel/` | Merged, PR #3. |
| Sign-in verification | `2026-11-20-sign-in-verification-redesign/` | `design.html` is the design. `ci-workflow.html` is a design page. Plan. Decisions: create it, from the owner decisions recorded in `design.html` and `docs/wip/sign-in-lead-state.md`. Link the spike (`2026-11-20-browser-test-spike/`) and the superseded `2026-11-19-sign-in-verification-script/design.html` as history, from Home. |
| Sign-in navigation UI | `2026-11-20-sign-in-navigation-ui/` | Not written yet. Create Home (state "in design"), a "Mockups" page link to `mockups/index.html`, and Decisions from the "Navigation UI decisions (owner, 20 Nov)" section of `docs/wip/sign-in-lead-state.md`. Leave the design pages for the Lead to write. |

Treat `2026-11-02-fleet-access/` (the older overall design) and `2026-11-15-fleet-access-b2/` (audit only) as history. Link them from the overview Home under "Earlier documents"; give them no set of their own.

## Don't

- Rewrite design content, invent decisions, or mark anything decided that isn't quoted from the owner.
- Delete or move files.
- Touch other Leads' folders.

If an existing page's own embedded nav conflicts with the shared JSON, replace only the nav element.

## Check and hand back

Run `pnpm dlx https://demistify.getagentstudio.dev/v1/demistify-cli-026fa272936ed41161b1c13cbe77edce7970665781faf5b62026946f8007f5e8.tgz check <every changed html>` until it reports 0 errors. Confirm every Map fragment resolves to a real heading id.

Write `reorganize-report.md` beside this file, covering:
- each set and its pages;
- where each decision now lives;
- anything that didn't fit, and why;
- the checker output.

Message the Lead.

## Startup fields (added by the Lead)

- **Verifier:** none, on purpose. For this docs-only slice, the proof is the Demistify checker (0 errors, with every Map fragment resolving to a real heading) plus the Lead's own review.
- **Work log:** no Router record. Your `reorganize-report.md` is the record.
