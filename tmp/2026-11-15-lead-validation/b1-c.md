# B1-C: the Lead's own end-to-end validation (final READY version ca8b1f21)

Read in full by the Lead: requirements, specification, program design, verification design and plan, plus the opening and calls of decisions. Checked against switchboard f3b2b88b and the Fleet transcript.

Confirmed against source:
- organization:view exists and only the owner holds it (organization-access-control.ts:7,16; organization-permission-check.ts:20).
- Today's page model offers choices only for more than one membership with no valid current choice (sign-in-http-handler.ts, the block from about line 238), as the design states.

Corrected by the Lead:
- L1. V2's wrong builds pointed at the wrong steps (off by one). Each now names the step that actually fails.
- L2. A sole member whose current choice was cleared later gets no switcher, and their CLI Continue is refused. Today's page has the same gap. The design implied that "Continue works" whenever a choice exists, but never named this case. S2 now names it as unchanged in B1-C and closed by BG's select-first, and V's coverage table lists it as unproven in B1-C.

For the owner:
- L3. B1-C's Requirements and Decisions treat the owner's 4 Nov "yes you need anytnhign?" as approval of the overall design, B1 and B2. That message answered "Still waiting on you: approve the overall design, B1 and B2" (transcript 71226, 71230). It is a bare yes plus a question. Ask the owner to confirm it was that approval.

Not found: any leak path, a missing permission check or a gap in either host's proof.
