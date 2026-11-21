# BG: the Lead's own end-to-end validation (final READY version cac4ec63)

Read in full by the Lead: specification, program design, verification design and plan.

Corrected by the Lead:
- L1. /account/confirm defined only the enrolled case. The CLI's person token outlives the browser session, so a step-up often lands signed out. The confirm handler now covers four cases from the same facts as M1: signed out → sign-in, then back to confirm; unavailable → 503; never enrolled → /setup; enrolled → the forms. V2 journey 2 adds the signed-out and never-enrolled cases, plus the wrong build that leaves out the signed-out case.

Checked and consistent: M1's row order against S1's pending-step rule and the invitation exception; select-first (F4) flowing into M3; Decline's conditional write; Central cleanup named as Lead A's dependency; production module check by metafile.

For the owner: the three 30 Oct assumption groups.
