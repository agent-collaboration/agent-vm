# B2X: the Lead's own end-to-end validation (final READY version ca8b1f21)

Read in full by the Lead: requirements, specification, program design, verification design and plan. Decisions were not reread line by line this time; the device picker was written by the Lead.

Corrected by the Lead:
- L1. M3's slow-down kept the extra 5 s only for the next poll. RFC 8628 §3.5 requires the increase "for this and all subsequent requests". The polling and waiting states now carry the interval, which only grows. The Hegel row adds the wrong build that drops back to the original interval.

Checked and consistent: the V2 and V4 step references match their numbered lists; the access-sync permission and email body; the r3 table's ownership split with Lead A; the plan's dependency on Lead A's rows; the Keychain test only on the owner's Mac with their yes.

For the owner: the --device choice (B recommended). There are no other owner items from this read.
