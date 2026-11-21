# Sign-in design sets reorganization

The [Sign-in overview](index.html) lists 11 deliverables. Each row gives the recorded state, the Sign-in Lead, any named delivery PR and a link to the deliverable’s Home. Homes link back to the overview. The original sequencing diagram and dependency table remain under [Planning dependencies](index.html#order).

The [commission](reorganize-commission.md) grants documentation edits and names this report as the work record. The pinned checker and the Lead’s review are the proof for this slice. The starting head was `225461190242893492e6adcbad5d4450d3be60dc` on `design/portal-remediation`. At the final check it was `473b8af880a5ec4490157125e41afb85d580ed88`, which added two Markdown files for the PR #10 delta review outside the checked HTML and JSON set.

## Sets and Pages

For the standard design sequence below, Pages lists **Home → Requirements → Specification → Program design → Verification design → Plan → Decisions → Back to the overview**. Each list comes from the set’s own `navigation.json`.

| Set | Pages |
|---|---|
| [Sign-in overview](index.html) | Home |
| [B1-A core sign-in](../2026-11-15-fleet-access-b1/b1-a-core/index.html) | Standard design sequence, with Work log before the return link |
| [B1-B passkeys](../2026-11-15-fleet-access-b1/b1-b-passkey/index.html) | Standard design sequence |
| [B1-C organizations](../2026-11-15-fleet-access-b1/b1-c-organizations/index.html) | Standard design sequence |
| [B2 central statements](../2026-11-15-fleet-access-b2-central/index.html) | Standard design sequence |
| [B2x person tokens and revocation](../2026-11-15-fleet-access-b2x/index.html) | Standard design sequence |
| [B3 machine login](../2026-11-15-fleet-access-b3/index.html) | Standard design sequence. Home records the 20 November handover of the Mac Router side. |
| [BG getting in and staging](../2026-11-15-fleet-access-bg/index.html) | Standard design sequence |
| [F1 fuzzing](../2026-11-17-fleet-access-f1-fuzz/index.html) | Standard design sequence |
| [F2 Hegel](../2026-11-17-fleet-access-f2-hegel/index.html) | Standard design sequence |
| [Sign-in verification](../2026-11-20-sign-in-verification-redesign/index.html) | Home → Design → CI workflow → Plan → Decisions → Back to the overview |
| [Sign-in navigation UI](../2026-11-20-sign-in-navigation-ui/index.html) | Home → Mockups → Decisions → Back to the overview |

## Decision homes

| Set | Decision record |
|---|---|
| B1-A | [Owner decisions and Better Auth scope](../2026-11-15-fleet-access-b1/b1-a-core/decisions.html#owner) |
| B1-B | [Owner decisions and click-only passkeys](../2026-11-15-fleet-access-b1/b1-b-passkey/decisions.html#owner) |
| B1-C | [Organization switching, People lookup and refused-switch behavior](../2026-11-15-fleet-access-b1/b1-c-organizations/decisions.html#decided) |
| B2 | [Lost replies, key rotation, restart, repair console and maintenance entry](../2026-11-15-fleet-access-b2-central/decisions.html#open) |
| B2x | [Device login with a real session](../2026-11-15-fleet-access-b2x/decisions.html#device) |
| B3 | [PR scope, enrollment storage, workspace allowances and re-keying](../2026-11-15-fleet-access-b3/decisions.html#open). The [allowance entry](../2026-11-15-fleet-access-b3/decisions.html#allow) includes the owner’s exact 20 November reaffirmation. |
| BG | [Getting-in and staging assumptions](../2026-11-15-fleet-access-bg/decisions.html#assumptions) |
| F1 | [Hegel, Bombadil and the CI sequencing call](../2026-11-17-fleet-access-f1-fuzz/decisions.html#f1-1) |
| F2 | [Hegel for critical systems and the Lead’s choice of targets](../2026-11-17-fleet-access-f2-hegel/decisions.html#decided) |
| Sign-in verification | [D1–D8](../2026-11-20-sign-in-verification-redesign/decisions.html#verification-choices), [test timing](../2026-11-20-sign-in-verification-redesign/decisions.html#wall-clock), [verification ownership](../2026-11-20-sign-in-verification-redesign/decisions.html#verification-ownership) and [CI approval and calls](../2026-11-20-sign-in-verification-redesign/decisions.html#ci-approval). Design, CI workflow and Plan link to the decision record. Original Design fragments `#d1`–`#d8` still serve as links. |
| Sign-in navigation UI | [Switcher, landing, shadcn and pending sign-ins](../2026-11-20-sign-in-navigation-ui/decisions.html). [Open choices](../2026-11-20-sign-in-navigation-ui/decisions.html#open-choices) cover Workspaces versus Agents, phone navigation and the current plain-member landing assumption. |

The Lead supplied the [verbatim 20 November excerpts](owner-quotes-2026-11-20.md) after the first check. The final decisions preserve those excerpts, including the original spelling. Existing design rules, proof and historical evidence retain their source text. The B1-B and B1-C Homes link to the later ruling that supersedes their original browser-driver restriction.

## Placement and limits

- Home links to the deliverable audits. B1-A links to the original R1 B1 audit because it covers the pre-split baseline, including work that later went to B1-B and B1-C. That audit retains its historical navigation.
- B1-A’s Work log page reads the existing `work/implementer-log.md`. The other deliverables have work materials or evidence where applicable. The commission covers existing work logs, so no other log wrapper was created.
- The navigation UI’s Mockups entry opens the existing standalone contact sheet. Its Home also links to the shadcn inventory. The Lead owns the forthcoming UI design and plan.
- Earlier documents links to the 2 November fleet-access design and the old B2 audit. Verification Home links to the local spike commission and the superseded verification script design. The spike result’s Sunclaw report path and checksum are retained in [D1](../2026-11-20-sign-in-verification-redesign/decisions.html#d1).
- Delivery status reflects the commission and Lead state dated 20 November. B2, B2x and BG are shown as designed, with staging pending on BG. Local shared navigation requires HTTP serving. The proof here is source validation and target resolution.

## Checks

Ran the commissioned Demistify 1.25.2 archive under Node 26.12.1 and pnpm 10.33.0 with a writable pnpm cache. The input was all 79 changed HTML files, including the seven deliverable audits.

```text
79 files: 0 errors, 0 warnings
Exit 0
```

The first invocation failed before the checker started because pnpm’s default dlx cache was read-only. With the writable cache, the initial HTML check found 161 errors caused by icon values outside the shared navigation schema. The final result above followed the icon corrections and incorporation of the owner’s verbatim quotes.

An independent HTML parse resolved all 47 Map entries to unique authored heading IDs within their respective sets. It checked 12 sets, all 84 Pages entries, one current Home for each of the 11 overview rows, all 123 new local links, and that 60 existing files match the base outside their navigation elements. The report links resolved and all 10 excerpts from the Lead’s verbatim source appeared once across their decision homes. `git diff --check` exited 0.

The authoring skill’s advisory nudges reported 0 errors and 194 warnings. They exited 1 with an incomplete section-picture observation on the existing B1-A Program design. The warnings on the new verification Decisions page concern retained decision prose. Its design diagrams remain linked from the set’s Design and CI workflow pages. The final targeted nudge run on the B1-B and B1-C Homes exited 0 with 0 errors and 0 warnings.
