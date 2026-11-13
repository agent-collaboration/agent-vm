# Sign-in: the owner's 9 Nov decisions (switchboard #11 and #12)

Issued by the 🦁 Fleet access Lead (claude-local `cd5902e2-2105-4472-adde-031ae6496e30`) on 2026-11-12, at the owner's direction ("can you work on 1 and 2", "use an opus implementer and sol verify and sol reviewer"). This file is the governing assignment for the three sessions below. Corrections arrive as edits to this file, followed by a fresh role/files call.

## Outcome

Two switchboard draft PRs carry the owner's decisions of 9 Nov and pass the repository's checks on both sign-in hosts (Cloudflare/workerd with D1, and Node with better-sqlite3):

- **WS1, #11 (B3a, machine device login)**, branch `item2/b3a-device-grant`, at `227e6217f` when this was written.
- **WS2, #12 (B2 sign-in side)**, branch `item2/b2-sign-in-additions`, at `1668129fe` when this was written.

Order: WS1 first, then WS2. WS2's build starts only once the Reviewer's design pass (R-design below) has no open blocking finding on the B2 renew-on-use section. **Status (Lead, 12 Nov):** R-design is cleared. It found no blocking finding on B2 renew-on-use. F1 (the `Approved` field names) and O1 were fixed in agent-vm `1b6791c4`. WS1's product is frozen at `55636ebb`, with Sunclaw receipts pending. **WS2 may start now,** in its own worktree. The WS1 handback is still due once the receipts are in.

**WS1 accepted by the Lead (12 Nov) for review at switchboard `55636ebb584b87437f47a813e4f22de2ffd15904`** (#11), with Verifier apparatus #14 at `7176db2ce7a9130430af4003ee509d7c5be9a988`. **R-code for WS1 is now due.** The Reviewer reviews the diff `227e6217f..55636ebb`, read-only, against WS1 items 1–5, the pinned proof basis and the receipts in `switchboard.item2-b3a-verify-auth/tmp/2026-11-12-ws1-verifier-7176/` and `switchboard.item2-b3a-device-grant/tmp/2026-11-ws1/`. WS1 R-code result: READY, zero findings.

**WS2 reopened (12 Nov): the Reviewer's R-code found no deadline on the request-path renewal. D7 below is the repair, and WS2 needs a new frozen target, Verifier observation, Lead acceptance and R-code on the repair.** **Repair accepted by the Lead (12 Nov) at switchboard `6606005733fdb19ef119b509a91e749e86f28d32`** (#12), with apparatus #13 at `711a8102ee8ee155a5f11f4c557c423b2fe768e8`. **R-code on the correction is due:** review the diff `f2218a988..66060057` and its apparatus against F1–F3, D7 and its proof layers. Handback: agent-vm `tmp/2026-11-12-ws1-handbacks/verifier-ws2-d7-handback.md`. Earlier: **WS2 accepted by the Lead (12 Nov) for review at switchboard `f2218a9883ddbd98613b728d2eb12a632352c457`** (#12), with Verifier apparatus #13 at `7bf583c9ed28e1eb14332edee40a4ad037760d1e`. **R-code for WS2 is now due.** The Reviewer reviews the diff `1668129fe..f2218a988`, read-only, against WS2 items 1–4, the WS2 Lead rulings (D1–D6, cron, the edge), the pinned proof basis, and the receipts in `switchboard.item2-b2-verify-auth/tmp/2026-11-12-ws2-verifier-7bf5/`. Handbacks: `tmp/2026-11-12-ws1-handbacks/verifier-ws2-handback.md` and `implementer-ws2-handback.md` in agent-vm.

## Governing sources (read in full before editing)

- B3 deliverable: `docs/specs/2026-11-02-fleet-access/deliverables/b3-machine-login.source.html`, especially `#b3-flows` (the device-login sequence) and `#b3-unknowns` ("Your decisions of 9 Nov").
- Program Design: `docs/specs/2026-11-02-fleet-access/program-design.source.html`, the `DecideDeviceLogin` / `DeviceLoginDecision` contract (around line 870) and the device-code states (around line 1590).
- B2 deliverable: `docs/specs/2026-11-02-fleet-access/deliverables/b2-central-organizations.source.html`, the section "Renewing the stamp when the organization is used", and its proof rows (`#b2-proof`).
- Owner decision pages: `tmp/2026-11-09-b3-decisions/b3-open.html` (rev .4) and `tmp/2026-11-09-b3-decisions/stamp-renew-on-use.html` (rev .4).
- The design commit carrying these changes: agent-vm `016a5e69` on `design/portal-remediation`. Diff it against `9b0be67d`.
- The switchboard `AGENTS.md` in each worktree.

All paths above are relative to `/Users/shravansunder/code/projects/agent-vm.design-portal-remediation` unless stated.

## WS1: #11, what changes (sign-in side only)

1. `DecideDeviceLogin` carries `codeExpiresAt`, the device code record's own expiry. Central stores it and refuses the first Grant at or after it. That central half is **not** built here.
2. `Approved` carries what central stored: `enrollmentId`, `label`, `allowedWorkspaces`. A repeat of the same request id returns the first approval unchanged. **Lead decision (12 Nov, the Implementer's option A):** no served approval page exists yet. So `POST /api/auth/machine-login/approve` returns central's stored label and workspaces (never the submitted form), and that response *is* the approval result, proven as the HTTP response on both hosts. The served `/device` page is a later slice of #11, with its own design pass. It is not in WS1, and it renders only that response.
3. No stamp pin anywhere: no column, field or check.
4. Token lifetime stays central's per-organization setting. No issuer copy.
5. The central side is a **stand-in** that honours this contract. Name it in the handback as unverified until B3 central lands.

## WS2: #12, what changes (sign-in side only)

1. Remove the daily renewal trigger (Cloudflare scheduled handler / cron) and the Node daily timer, with their wiring and tests. It's a hard cutover, with no flag.
2. Renew-on-use exactly as the B2 section's rules 1–6 say:
   - the stamp record in extra organization columns via Better Auth `additionalFields` with `input: false`, like `fleetState`;
   - at most one sent stamp in doubt, re-sent byte-identical;
   - set and clear by conditional update;
   - unanswered and refused tries counted apart;
   - a valid stamp still makes the call, and an expired one answers the existing unavailable "try again shortly";
   - key-change re-sign of every organization kept.
3. The guard runs before each sign-in→Fleet call that exists on this branch. WS1's calls adopt it when the two branches meet. Whichever PR merges second wires the other's calls, and the handback says which calls were wired.
4. The schema change goes through the repository's existing Drizzle migration route for both hosts.

### WS2 Lead rulings (12 Nov; the source is the Implementer's proposals, pushes 01a1cdc1 and 01a1cdc9, accepted by the Lead)

- **Cron:** renewal comes off the Cloudflare `0 0 * * *` cron, the Node timer and their wiring and tests. The cron stays, firing **only** `runAuthorizationRevisionBackfill`, because that is accepted B2 recovery. Dropping the cron is an open owner question, not part of this work.
- **D1, guard placement:** one server-only endpoint, `prepareOrganizationFleetCall`, runs before:
  - the revision drainer's `pushAuthorizationRevision`;
  - `forwardFleetAdminRequest`;
  - `relayFleetAdminRequest`, which reads `organization_id` from sign-in's own DPoP access token for the guard only. An undecodable token skips the guard, and central still verifies everything.

  Not guarded: setup `provisionOrganization`, and the guard's own digest read.
- **D2, definite non-stale refusals** (`organization-mismatch`, `invalid-statement`): one refused try, and the sent stamp is cleared under its conditional update. Stale refusals reconcile per B2 rule 3.
- **D3, empty record on a ready organization:** the first guarded use seeds the confirmed stamp from central's digest read, by a conditional write only where the digest is null, then applies the rules. If that read is unavailable, the call proceeds without the guard, and central's own stamp check still fails closed.
- **D4, counters (clarified 12 Nov):** two cumulative counts, unanswered and refused, that never reset. Beside them sits **one** latest-try record covering both kinds (`fleetStampLastTryAt` and its outcome or reason). A later try of either kind replaces it. This matches the owner page's single "last time and reason". There is no separate last time or reason per kind.
- **D5, setup (final Lead ruling, 12 Nov, the Implementer's option B, push 01a1cdd5).** Central's wire answers `{"result":"provisioned"}` both when it stores the bytes and when it already holds a stamp (`provisioning.rs:140`, `organization_link_transport.rs:82`). So sign-in can't tell the two apart, and the earlier "record only on `Provisioned`" ruling is withdrawn.
  - After a `provisioned` answer, setup reads central's digest at once and records central's facts (digest, `exp`, `kid`) by a conditional write where the digest is null.
  - If that read fails, the record stays empty and D3 seeds it on first use.
  - **Why B over A:** the stamp is fresh at setup, so the read nearly always succeeds. An organization unused for its stamp's whole life can then still renew on its first later use, because central accepts a new stamp naming an expired one. Under A, any organization idle for 120 days after setup couldn't recover on its own.
  - The cost is one extra link call at setup.
- **D6, key change (clarified 12 Nov):** today's server-only entry stays, and no host trigger is added. On a key change, **every ready organization whose stamp isn't signed by the current key** goes through the same guard and is re-signed. That includes idle ones and ones with more than 60 days left, which is what `force` means: ignore the 60-day window. An organization whose stamp is already signed by the current key is **not force re-signed** (`currentSends: 0` is correct for one outside its window). If it is inside its 60-day window, the ordinary renewal applies, exactly as it would on its next use, with the same in-doubt rules. That is intended, not a D6 breach (Lead, 12 Nov, on the Reviewer's WS2 candidate). Then the old key is retired only after each central holds a current-key statement and passes a cold restart (B2 rule 6). An old-key statement still unanswered and pending does **not** count as re-signed.
- **D7, a bounded renewal attempt (Lead, 12 Nov, on the Reviewer's WS2 R-code finding).** Renewal now runs inside the original request, so it must end on its own.
  - **One deadline per guard run** covers its central calls: the replace/re-send and the seed or reconcile digest read. The default is **5 seconds**, held in the sign-in configuration.
  - At the deadline the in-flight link request is aborted (the clients already map `TimeoutError` to `timeout`). It counts as one **unanswered** try with reason `unanswered-timeout`. The pending sent bytes are kept. Then rule 4 decides: a valid stamp makes the original call; an expired one answers the existing unavailable "try again shortly".
  - The deadline runs on the **injected** clock or timer, and tests drive it with no wall clock.
  - **Proof:** on both host paths, with the renewal peer deliberately held open and never answering:
    - a valid stamp inside its window still completes the original call;
    - an expired one answers unavailable;
    - the pending bytes and the unanswered count survive;
    - the next use re-sends the identical bytes.
  - The Implementer picks the mechanism (an `AbortSignal` from an injected deadline source, or the repository's equivalent).
  - **The deadline must end the guard's wait even if the transport ignores the abort.** Race the deadline against the call; don't rely only on the abort reaching the peer. So a service binding or socket that never honours the signal still can't hang the original call.
  - **Any** deadline in a guard run counts as `unanswered-timeout`, including during a stale reconcile read. It is never counted as `refused`.
  - **Proof layers (Lead ruling, 12 Nov, on the Verifier's D7 challenge):**
    - **Node:** the built host, through the Unix transport, with a held peer, and the original drain dispatched or not dispatched.
    - **workerd:** the real server-only guard and client in the storage Worker, with a held `CentralTransport`, plus the original Fleet call's dispatch observed through the existing workerd host path where the harness allows it.
    - **Named unverified:** whether an abort propagates over the production `CENTRAL` service binding. The harness rebuilds incoming `CENTRAL` requests without a signal. This is acceptable only because the deadline ends the wait by itself (above), and the Verifier checks that property directly.
- **WS2 proof preservation (Lead, 12 Nov, the Reviewer's R-code findings; both accepted, and both restore removed coverage):**
  1. **Keep the real-central stale-predecessor negative.** `b2e-joint-journey.host.e2e.test.ts` lost its case of two distinct signed proposals (200, then 409), with the winning stamp and records unchanged. The new identical-replay case (200/200) stays as well. B2 `#b2-proof` "renewal can't go backwards" requires both, against real central on both builds. The old daily job isn't needed for this.
  2. **Restore the post-close assertions** in `sign-in-node-host.integration.test.ts`: the listener stopped, and the configured provider-secret, account and path canaries are absent from logs. Only `renewalTimerCancelled` is correctly removed.
- **Edge: an empty record and an already-expired stamp at first use.** This happens only when setup's digest read failed and the organization then went unused for the stamp's whole life. The seed read is refused, because central's digest read refuses an expired stamp. That counts one **unanswered** try with reason `seed-unavailable`, and the call proceeds. Central then refuses it, failing closed, and the caller gets the existing unavailable answer. This is the documented limit: sign-in can't recover on its own, and the counters make it visible. It is never treated as success or as a renewed stamp.

## Limits

- **Write scope:** `/Users/shravansunder/code/projects/switchboard.item2-b3a-device-grant` (WS1) and `/Users/shravansunder/code/projects/switchboard.item2-b2-sign-in-additions` (WS2) only. **The Verifier's own write scope (apparatus only, no product code):** `.agents/skills/verify-auth/**` and its driver under `scripts/` or `tests/` as the skill places it, in `/Users/shravansunder/code/projects/switchboard.item2-b3a-verify-auth` (#14, the machine-login journeys) and `/Users/shravansunder/code/projects/switchboard.item2-b2-verify-auth` (#13, the renew-on-use journeys). It may push those two branches, and merge the matching WS branch into them to run against it. **Verification apparatus in test support (Lead, 12 Nov):** in those two verify-auth worktrees only, also the existing verification drivers and their helpers under `packages/sign-in-test-support/src/test-fixtures/` and `packages/sign-in-test-support/src/storage-cases/` (e.g. `device-grant-verification-cli.ts`), their apparatus tests (e.g. `device-grant-verification.unit.test.ts`), and new verification-only files there, including a machine-login Node listener driver. **Not** product code, and **not** product tests the Implementer owns. If a helper is shared with product tests, ask the Implementer before changing it. The full `startNodeSignInHost` has no machine-decision injection, so name that wiring limit in observations rather than working around it. Nothing in codex-router, agent-fleet-sync, agent-vm (except the Verifier's own notes under its worktree `tmp/`), staging or production.
- **Commands:** the repository's own scripts (`pnpm install`, `pnpm check`, `pnpm test:unit`, `pnpm test:integration`, `pnpm lint`, `pnpm lint:types`, the `verify-auth` journeys), `git` on those two branches, and `gh pr` view/edit on #11–#14. Pushing to those two branches is allowed. Not allowed: `--force`, amend, stash, `--no-verify`, merging any PR, or deploying.
- Standing rules:
  - no wall clock in tests (inject the clock, wait on events);
  - UUIDv7 only, from the injected id source;
  - Drizzle injected, no raw SQL;
  - follow Better Auth's own grain;
  - no new or changed check gates or CI steps;
  - checked-in scripts are TypeScript;
  - no secrets, `op://` refs or test-account addresses in repos or PRs.
- Heavy or long runs go to the **Sunclaw test agent**, never ssh: SessionRef serviceId `8b61218b-d5f3-4ae9-a2db-d2fb4075dbc2`, endpoint `codex-local`, session `01a1b755-5c31-7690-b2b4-5b116d355a7a` (Sunclaw's own Router service, not this Mac's). Send a self-contained packet with exact commands, its own debug root and port, and what to report. This applies if the Mac's free disk is under 30 GiB or a run is long (a full suite or many connections). Focused unit, integration and listener runs may stay on the Mac.

## Sessions (agent-router SessionRefs, service `0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89`)

| Role | Session | Model / effort |
|---|---|---|
| 🐒 Implementer | claude-local `ccc121df-1cb9-4803-8100-ab588e93951b` | Claude Opus (`opus` alias), high |
| 🔬 Verifier (paired Checker) | codex-local `01a1cda2-c16d-74f2-a19d-423ad7ea3497` | OpenAI Sol `gpt-6.1-sol`, high |
| 🔎 Reviewer (independent Checker) | codex-local `01a1cda2-c280-7840-b852-6c6e054309b8` | OpenAI Sol `gpt-6.1-sol`, high |

The Implementer and Verifier work as a pair and talk directly. The Reviewer stays outside that loop.

## Proof basis (pinned for the Verifier)

The Verification Design (`verification-design.source.html`, revision `2026-10-30.1`) predates these decisions and is **not** updated for them. That refresh is deferred, and the Lead owns it. For this work the proof basis is:
- **WS1:**
  - the B3 deliverable's `#b3-proof` table at the agent-vm commit carrying this file's latest edit: the rows "a code is used once", "the code's deadline reaches central (N10)", "a repeat returns the first approval (N03)", plus the sign-in halves of "a login reaches only its machine and organization" and "the real journey";
  - the sign-in halves of Verification Design U31 (only you log machines in), U21 (approving a code) and U33 (login by device code).
  - The central halves of N10 and N03 are observed against the stand-in central only, and named unverified.
- **WS2:**
  - the B2 deliverable's `#b2-proof` rows "renewal can't go backwards", "renewal happens on use" and "a lost answer can't strand renewal";
  - Verification Design U14's renewal clause (fail closed).
- **Both hosts for every row:** Cloudflare/workerd with D1, and Node with better-sqlite3, on a controlled clock.
- **Declared targets:**
  - **workerd:** the WS branch head, through the existing dual-storage suite (real handler and Better Auth on workerd with D1);
  - **Node:** the same head, through the built Node listener with better-sqlite3.
  - The Implementer names the exact commit when it declares a target.
  - The lasting journeys go into `verify-auth` on #14 (WS1) and #13 (WS2), with each run's receipts saved in that worktree's `tmp/`.

## Checker duties

- **Verifier (paired verification):**
  - before each workstream's build, challenge whether the proof can tell a correct build from a wrong one;
  - after it, observe the adopted outcome on **both hosts** through the repository's harness and the `verify-auth` journeys (#13/#14 hold their maintenance), against the B2/B3 proof rows;
  - no product repairs, no changing an expected outcome.
- **Reviewer (independent review):**
  - **R-design (now):** review agent-vm `016a5e69` against `9b0be67d` for alignment with the owner's decisions on the two pages above, and with the switchboard code as it stands on the two branches. Flag anything in the docs that the code, Better Auth 1.7.x or central's existing replace path contradicts.
  - **R-code (later):** after the Lead accepts each PR, review its head. Read-only.

## Stop condition

- A workstream ends when its branch is pushed with `pnpm check` green, the Verifier's two-host observations recorded, and the handback sent.
- Stop and return to the Lead at once on:
  - a design break (a contract or owner decision that doesn't fit the code);
  - a needed change outside the write scope;
  - a failing gate you would have to weaken.

## Return and work log

- **Return:** the role handback to the Lead (claude-local `cd5902e2-2105-4472-adde-031ae6496e30`). For each claim, give the commit, the command or observation, and what it doesn't cover.
- **Work log:** no Router log. The Lead's trace is `~/dev/session-logs/projects/2026/2026-10-agent-vm/planbooks/2026-10-18-tool-portal-identity-advisor-claude-2febb449.md`. Helpers return their rows in the handback, and the Lead records them.
- **Messaging:** direct messages for work. The Fleet access work thread is `01a1cfd4-034e-7abd-bbaa-2ccc976db77d` (project `01a1b6f0-c6bd`). Any board subscription uses `quietSeconds: 1200`, `capSeconds: 1200` (owner, 12 Nov: 20 minutes, no constant messages).

## Next workstreams (Lead, 12 Nov, after the owner's correction "you should have never done cloudflare crons")

### WS3: no scheduled triggers (owner decision, 12 Nov)
**Outcome.** The sign-in service has **no Cloudflare cron triggers and no Node timers** for its own jobs. Remove `triggers.crons` and the `scheduled` handler, and remove the Node drain/backfill timers. Each job they did happens **on use or at deploy** instead. The runtime-free core holds the logic, and both hosts behave the same.
- **Authorization revision drain** (today: after each fence-changing response, plus every 5 minutes as recovery for a lost hint). Keep the after-response drain. The recovery becomes **on use**: before any sign-in→Fleet call for an organization (the D1 guard point), drain that organization's pending revisions first, inside the same D7 run deadline. Order matters, so central sees revisions before later calls.
- **Authorization fence backfill** (today: deploy step, plus daily cron safety net, plus Node startup). Keep the deploy step and Node startup. **The Implementer proposes** how a failed backfill recovers without a timer. The preferred direction is that a fenced write meeting a missing fence runs the backfill for that organization first and fails closed if it can't. Bring the proposal to the Lead before building it.
- Proof: both hosts. No cron or timer exists in config or code. A lost after-response hint is drained by the next Fleet call. The deadline bounds the drain. Backfill recovery follows the accepted proposal.
- Branch: `item2/b2-sign-in-additions` (#12), on top of `87b4d5a89`. #12 reopens; WS2's review stands for its earlier diff.
- **Lead rulings on the Implementer's WS3 proposal (push 01a1cf4a-efa5):**
  - **Backfill recovery accepted.** On a failed fenced batch, run the organization-scoped insert-or-ignore backfill, retry the same statements once, and otherwise fail closed. The deploy step and the Node startup backfill stay.
  - **Drain on use accepted as designed.** Inside one guard run and one D7 deadline: the stamp step, then the organization's pending revisions (organization fence, then its person pairs). Pushes carry the run's signal. The drainer becomes "guard each organization with pending rows". No recursion or double push.
  - **Q1 = A, fail closed:** if a pending revision isn't acknowledged by the deadline, the original Fleet call answers the existing unavailable "try again shortly". Ordering protects revocations: a removal must reach central before any call that could depend on it.
  - The Node startup drain is dropped, because on use covers it.
  - **Q2 (12 Nov): keep one budget per guard run.** If renewal uses up the deadline while revisions are pending, the pushes don't go and the call answers unavailable (Q1 = A). That holds even over a valid stamp, because the same peer didn't answer the renewal, and the next use starts a fresh budget. D7's "a valid stamp completes the call" holds when nothing is pending.
  - Proof changes:
    - the D7 host-path case uses a forward or relay with no pending revisions (valid → the call goes out, expired → withheld);
    - a new case: renewal times out with a revision pending → unavailable.
  - Everything listed for removal goes: both crons, `scheduled`, the triggers, `startPeriodicHostJob`, the Node drain timer and the `drainScheduler` injection.

### WS4: wire #11's machine calls through #12's guard (after WS3)
**Outcome.** `DecideDeviceLogin` and `DecideMachineToken` (#11) run through `prepareOrganizationFleetCall` (#12), with the same rules and deadline. **Also the WebSocket connect** (owner, 12 Nov: "the rest of the calls are via websocket after it's established via sign-in"): sign-in runs the guard before it forwards `<sign-in>/fleet/v1/session` to central, wherever that forward lives (#11 or B3). Calls over the open WebSocket don't pass sign-in; central's own stamp and token checks cover them. Token refresh (`DecideMachineToken`) runs the guard, so organizations with long-lived connections still renew. A central restart drops connections, and the reconnect's guard recovers (WS7). Do it on `item2/b3a-device-grant` by merging `item2/b2-sign-in-additions` into it. #11 then carries #12 until #12 merges.

### WS5: recapture the #10 screenshots (Verifier, now)
The screenshots in `switchboard.item2-sign-in-pages-design/tmp/2026-11-sign-in-pages/screenshots/` are from `66f478e6`. They predate `3921fe0f` (step-specific headings) and `edc5ede8` (organization creation hidden until the factor is confirmed), so they misrepresent the PR.
- Recapture the same ten scenes at #10 head `41302fc85`, on Node and workerd, at 1280 and 390 CSS px. Use the existing `start-visual-hosts.ts` / `visual-entry.ts`.
- Save them to `.../tmp/2026-11-sign-in-pages/screenshots-41302fc8/` with the same file names.
- Report one line per scene saying what it shows.
- Write scope for this: that new folder only, plus starting and stopping your own preview processes, by exact PID.

### WS6: redesign the sign-in pages (#10), replacing WS5's plain recapture (Lead, 12 Nov, after the owner flagged the page as "very ugly")
**Branch:** `item2/sign-in-pages-design` (#10), from `41302fc85`. **Worktree:** `/Users/shravansunder/code/projects/switchboard.item2-sign-in-pages-design`.

**What's wrong now** (the owner's screenshot of the second-factor page):
1. The page heading is repeated as the first card's title.
2. Two primary buttons compete, with different alignment.
3. "Your session" sits between the setup steps.
4. "Create your organization" is a card with no action.
5. A wide column is pinned to the left.
6. The page says "Tool Portal"; the product is **Switchboard** (owner OD12).

**Outcome.** Every served sign-in page (sign-in, organization chooser, second-factor setup, authenticator setup, recovery codes, confirm, confirmed, owner ready, too-many-attempts, confirmation-needed) follows one layout:
- a narrow, centred column with one page heading and the name "Switchboard";
- multi-step flows show their steps **in order**, with only the current one active; later steps are shown as upcoming, not as empty cards;
- **one primary action per page**; secondary actions (the current session, continue to the management CLI, back) are quiet links in a footer line;
- error pages: one clear message, what to do, and one action.

**Owner direction (12 Nov): use Better Auth UI** ("if better auth has ui why not just use this"). This replaces "redesign with our own components".
- **What it is:** Better Auth UI's shadcn flavour is copied into our shadcn project (`shadcn add @better-auth-ui/auth`). `tool-access-ui` is that project (`components.json`, shadcn 4.22.0), so the components become ours, in our theme. Sources and pins: `tmp/2026-11-06-onboarding-research/research.md` and `sources/ui/` (better-auth-ui at `cb5b4dc8`).
- **Step 1, a trial before converting anything:**
  - add the Better Auth UI shadcn components to `tool-access-ui` at a pinned version, compatible with Better Auth 1.7.11 (their 1.7 migration guide);
  - render the two-factor setup page with it on **both** hosts;
  - report:
    1. how a client React bundle is served under the existing CSP and nonces;
    2. Turnstile before social sign-in still enforced;
    3. our server rules unchanged (the form hidden until confirmed, the 15-minute step-up message);
    4. bundle size;
    5. what the existing served-page host tests need.
    6. **No Radix, ever (owner, 12 Nov: "definitely do not want radix … that's a no go").** Take the auth components from Better Auth UI's **Base UI variant**, `examples/start-shadcn-baseui-example/src/components/auth/**` (style `base-nova`, only `@base-ui/react`), pinned at better-auth-ui commit `2b028ec5256d`. Don't use the default `shadcn add @better-auth-ui/auth` registry: it's built from the Radix example (`radix-nova`). The components import `@/components/ui/*`, which must resolve to `tool-access-ui`'s existing Base UI primitives and `panel-theme.css`. **The trial fails** if any `@radix-ui/*` or `radix-ui` package appears in any `package.json` or `pnpm-lock.yaml`. Report the new dependencies it does need (e.g. `@better-auth-ui/react`, `@tanstack/react-query`, `input-otp`, `sonner`) with versions.

  Report to the Lead **before** converting the other pages. A blocker comes back as a design break with evidence.
- **Trial result (12 Nov, local `ws6-ba-ui-trial` at `9232a353`, report `switchboard.item2-sign-in-pages-design/tmp/2026-11-12-ws6/ws6-trial-report.md`):** the Base UI components compile and render in our theme on both hosts, with zero Radix. Lead rulings:
  - **A:** a new package `packages/auth-ui` with its own `components.json` whose `ui` alias points at `tool-access-ui`'s primitives. The panel's boundary gate stays unchanged.
  - **C:** compile the sonner and input-otp CSS into our stylesheet and pass input-otp the nonce. No CSP change.
  - **D:** fix the copied code to repository lint standards (no lint override), and cut the `additional-field` edge.
  - **E:** trim, then accept the weight.
  - **F:** a browser journey on both hosts against real Better Auth; the Verifier owns the driver (CDP, not Playwright).
  - **The Step 2 page→pattern map is approved.**
  - **B, decided by the owner (12 Nov, "sure its fine"):** open `GET /api/auth/get-session` and `GET /api/auth/list-accounts`, read-only. Nothing else is added to the allowlist.
    - **Lead condition:** Better Auth 1.7.11 returns `session.token` in the get-session JSON. Core field `token` has no `returned: false`, and `parseSessionOutput` keeps it. Strip it with a Better Auth `after` hook on `/get-session`, covering both the normal and the refreshed-session paths, so JavaScript never sees the token, as today with the httpOnly cookie.
    - Prove it on both hosts: the response has no `token`; the cookie stays httpOnly; a cross-site request gets no session; the bearer plugin stays off.
    - Step 2 is unblocked.
    - **Turnstile scope (owner OK 12 Nov, on my recommendation, after "scripts on the page can read get-session"):** only the sign-in page's CSP allows `https://challenges.cloudflare.com`. Every signed-in page (owner, factor, confirm, chooser, create, error) drops it from `script-src` and `frame-src`. Proof on both hosts: the signed-in pages' CSP header has no `challenges.cloudflare.com`, and the sign-in page's Turnstile still works.
- **Step 2:** convert every sign-in page to Better Auth UI components. Build the pages it doesn't cover (the `/device` approval page, the step-up message, the organization setup state) from its copied components in the same style.

**Learn from Clerk and Better Auth UI first (owner, 12 Nov: "learning Clerk's design with the shadcn component system … best practices"):**
- **Read before designing:**
  - `agent-vm.design-portal-remediation/tmp/2026-11-06-onboarding-research/research.md`, the onboarding research from 6 Nov;
  - its pinned sources under `sources/clerk/` (Clerk's session tasks: `TaskChooseOrganization`, `TaskSetupMFA` with the QR/manual view, verify, recovery codes, an explicit finish), and `sources/ui/` (Better Auth UI's current shadcn components for organization create/switch, two-factor enable, backup codes and passkeys).
- **Take their interaction patterns and best practices, not their branding:**
  - one task at a time after sign-in;
  - a centred auth card;
  - a QR code with a manual key fallback;
  - a one-time-code input;
  - recovery codes with copy and download, and an explicit "I've saved them" finish;
  - a clear error with one recovery action;
  - organization name with the slug derived from it.
- **Build with the shadcn component system already in `tool-access-ui`** (`components.json`, shadcn 4.22.0). Where a needed shadcn primitive is missing (e.g. `input-otp`), add it through that package's shadcn setup, so it becomes part of the shared design system rather than page-specific code.
- **Before building:** send the Lead a short note mapping each page to the Clerk/Better Auth UI pattern it follows, plus any shadcn component you'll add. The Lead approves, then you build.

**Constraints:**
- Use only `tool-access-ui`'s existing components and theme. No new visual language and no page-specific CSS beyond layout.
- Avoid the owner's banned defaults: cream backgrounds, italic accent words, "01 / 02" section labels, monospace labels, pill buttons, gratuitous gradients, predictable card grids. A step list may number its steps if that's the design system's list pattern; otherwise use step names.
- Behaviour is unchanged: the form stays hidden until the factor is confirmed, the CSP nonces and the controllers stay as they are, and existing host tests keep passing (update their text expectations only where the copy changes).

**Proof:**
- `pnpm check`, plus the existing unit tests and sign-in host tests on both hosts.
- The **Verifier** captures every scene at the new head, on Node and workerd, at 1280 and 390 CSS px, into `tmp/2026-11-sign-in-pages/screenshots-<head>/`, and reports one line per scene saying what it shows.
- **UI acceptance grid (Lead, per role-lead `ui-acceptance.md`):** every page × its states (normal, error, loading where it exists) × widths 1280 and 390 × hosts Node and workerd, plus any dialog or toast it opens. The Verifier returns one frame per cell with a one-line read. The Lead opens and judges **every** frame, writing two verdicts: working, and quality (readable, nothing clipped or overlapping, grouping as designed, one primary action). Missing cells are named, never passed. #10 is ready only when every cell passes quality.

**Sessions:**
- 🐒 Implementer (WS6): claude-local `20c2febb-6892-4c29-9ed5-a2ca39baa6d3`, Opus/high, worktree as above. Write scope: that worktree only. Push `item2/sign-in-pages-design` (no force) and keep #10 a draft.
- 🔬 The Verifier (01a1cda2-c16d) does the captures. WS5's plain recapture of `41302fc85` is no longer needed; if it's done already, keep it as the "before" set.

### WS7: sign-in recovers when central starts empty (Lead, 12 Nov; owner decision relayed by Lead A: the new central starts EMPTY, with no data migration; Lead A's redesign Specification R29)
**Outcome.** When central has no stamp for an organization that sign-in marks ready, sign-in recovers by itself, with no person involved.
- Central has no stamp when the stamp read answers `none`, or when a replace is refused because the named digest is unknown and the read then says `none`.
- Sign-in clears that organization's stamp record (a conditional update), signs a **fresh setup statement** (no `replaces`), sends `ProvisionOrganization`, and on `provisioned` seeds the record from central's digest read (D5). The original call then proceeds, all inside the same D7 budget. If that fails, the caller gets the existing unavailable answer and the next use retries.
- ~~Revision pushes need nothing extra.~~ **Superseded (13 Nov), see R-floors below:** an empty central holds no floors and refuses every person request until it has them.

**Proof:** both hosts. A ready organization whose central forgot it recovers on the next Fleet call. Revisions and admin calls then succeed. A central that's just slow (no answer) is **not** treated as empty.

**Confirmed by Lead A (12 Nov, R29):** the new central answers "no stamp" (`none`) for an unknown organization on the digest read, not an error. Key on it.

**Branch:** `item2/b2-sign-in-additions` (#12), after WS3. Implementer: the WS3 Implementer (claude-local `ccc121df`).

### Verifier order and tools (Lead, 13 Nov 02:45Z)
The Verifier was stuck on a Codex approval prompt for the computer-use tool (`cua_repl`) from 12 Nov 10:30Z, recapturing for WS5, which is superseded. I interrupted that turn.
- **WS5 is cancelled** (WS6 replaces it).
- **No computer-use (`cua_repl`) or desktop tools.** They need owner approval in the Codex app, which nobody can answer unattended. For screenshots use a headless Chrome CDP driver (as WS6's `trial-observe.ts` does) or the Sunclaw Operator. If a tool asks for approval, stop and tell the Lead at once; don't wait on it.
- **Order:**
  1. **WS3 observation** on #12 at `6a5ad8a6`, plus B2e on both pairings via Sunclaw. This unblocks the WS7 push and the #12 merge.
  2. **WS7** once the Implementer pushes it.
  3. **WS6 UI grid** on #10 at `e22b08bc`.

### WS3 repair R-batch (Lead, 13 Nov; the Verifier's finding at `6a5ad8a6`)
**Defect:** `deliverOrganizationRevisions` reads only `authorizationRevisionDrainBatchSize` (100) pending rows and reports "delivered" from that batch alone. With 101 pending person pairs, 100 are acknowledged, the original call proceeds and the 101st (possibly a revocation) stays unsent. That violates Q1 = A.

**Fix, at the owning boundary:**
- Keep delivering batches for that organization **until none are pending**, all inside the same D7 run deadline.
- Before returning ready, **re-read** that organization's pending count. Ready only when it's zero; a row that advanced while being acknowledged counts as pending.
- If the deadline hits while any remain pending, answer unavailable (fail closed).
- Don't raise or remove the batch size as the fix.

**Proof:** a permanent case on **both storage legs** with more than 100 pending pairs (e.g. 101, and 250 to cross two batches): every row is delivered before the call, and when the deadline cuts in mid-way the call is refused. Show it red at `6a5ad8a6` first.

**Then:** rebase WS7 onto the repaired WS3, freeze a new target for the Verifier, and hold my WS3 acceptance until it's observed.

### WS6 B-sync: the design system comes from Agent Studio's Bridge (owner, 13 Nov: "proper shadcn and proper design with the themes i asked … from bridge in agent studio, it provides that with base ui")
**Finding (Lead, 13 Nov):** `tool-access-ui` is a copy of BridgeWeb's design system (`panel-theme.css` header: "BridgeWeb design-token source of truth"; both are shadcn `base-mira` on Base UI), but it has drifted from BridgeWeb at agentstudio `d77e97bb3` (origin/main):
- `card` 123 lines, `input-group` 100, `field` 63, `button` 47, `sonner` 47, `input` 31, `alert` 26 (diff lines);
- `--background` n2 against Bridge's n1;
- Bridge-only components: `status-badge`, `item-content`, `combobox`, `dropdown-menu`, `popover`, `switch`, `toggle`, `scroll-area`, typography roles.

**Outcome, before the WS6 UI grid:** `tool-access-ui`'s shadcn primitives and design tokens match BridgeWeb (`~/code/projects/agentstudio/BridgeWeb`) at **`d77e97bb3`**.
- **Primitives:** copy BridgeWeb `src/components/ui/*` for every primitive we use, plus any Bridge component the sign-in pages need.
- **Tokens:** the token layers of `src/app/bridge-app.css` and `src/design-tokens/*` (palette, typography roles, row metrics), keeping Bridge's primitives → roles → contexts layering.
- **Base UI only, no Radix.**
- Keep our import alias (`cn`), and record every intentional difference from Bridge in a short `BRIDGE_SYNC.md` in `tool-access-ui`, with the commit.
- `auth-ui` keeps aliasing `ui` to these primitives, so the sign-in pages pick up Bridge's look unchanged.
- The admin panel also uses `tool-access-ui`, so its look moves to Bridge too. That's intended.

**Proof:**
- `pnpm check`, plus the panel and sign-in host tests.
- A component diff against BridgeWeb at `d77e97bb3` is empty except for the recorded differences.
- Then the Verifier's UI grid at the new frozen head.

**Implementer:** WS6 (claude-local `20c2febb`). The Verifier's WS6 grid waits for this freeze.

### WS3 accepted, R-code due (Lead, 13 Nov)
The Lead accepted WS3 at switchboard `887c9abe` (apparatus #13 `3fde8337`); see `tmp/2026-11-12-ws1-handbacks/lead-acceptance.md`.
- **Reviewer:** review the diff `66060057..887c9abe` (WS3 plus R-batch) read-only, against the WS3 rulings (Q1 = A, Q2, wholly-unfenced backfill, R-batch) and the B2 rules.
- **Implementer:** push WS7 (`ee3fcd8b`) and freeze it for the Verifier's WS7 observation, including B2e on both pairings.

### WS7 ruling R-notdue (Lead, 13 Nov; the Verifier's WS7 source challenge on `ee3fcd8b`)
**Gap:** a ready organization whose stamp isn't due (more than 60 days left) skips the digest read, so recovery never runs. After central restarts empty, its calls are refused until the renewal window.

**Fix, no extra read on normal calls:** when **the original Fleet call** comes back with central's refusal meaning "this Fleet holds no stamp / is not provisioned for this organization", the guard treats the record as forgotten. Within the same D7 budget it clears the record (CAS), signs a fresh setup statement, provisions, seeds from central's digest read, and **retries the original call once**.
- A second refusal, or no time left, answers unavailable.
- Any other refusal is returned unchanged.
- The refusal kind is central's existing unstamped-store refusal (B2 design: "the unstamped-store refusal covers B2's own public surfaces"). Use its exact wire form from the B2e pinned central (`e847a888`).
- Lead A will be asked to keep that kind distinct in R29.

**Proof:** a permanent not-due empty-central case on both storage legs and on the host: the call recovers and succeeds on the first use. A refusal of any other kind is not retried.

**R-notdue, revised (Lead, 13 Nov, the Verifier's proposal):** pinned central `e847a888` answers every unstamped public or link route with HTTP 503 and a null body (`organization_unstamped_routes.rs:244–301`). There is no distinct refusal kind, so don't key on one.
- Instead, after the original call returns that **503**, probe central's digest read within the **same remaining D7 budget**.
- Recover and retry once **only** if the probe answers explicit `none` (R29, confirmed by Lead A).
- Any other probe outcome (a valid stamp, unavailable, timeout) returns the original refusal unchanged.

Normal calls get no extra read. This supersedes the "unstamped refusal kind" wording above.

**WS7 recovery-setup uncertainty (Lead ruling, 13 Nov, on the Verifier's question about `unansweredSetupWaits`):**
- **Sent slot: not used for recovery setup.** Setup (`ProvisionOrganization` with no `replaces`) is idempotent at central: if a setup already landed, central keeps it and answers `provisioned`. The digest seed read right after records central's actual stamp. So a lost recovery-setup reply leaves digest = null and sent = null, and the next use signs a fresh setup again. That's the intended expectation.
- **Counters: still recorded.** A deadline or lost reply during recovery adds **one unanswered try** with reason `unanswered-timeout`, and updates the latest-try record per D4/D7, so the owner's tracking shows it. A refused setup counts one refused try with its reason.
- `reprovisionFresh` must record that outcome, not return `central-empty` silently.
- The proof includes the counter assertion on both storage legs.

### WS7 rulings R-floors and R-push503 (Lead, 13 Nov; the Implementer's design break against pinned central `e847a888`)
**R-floors.**
- **The break:** `person_request/request_admission.rs` `admit` refuses any person request without an organization floor and a person floor (`AuthorizationSyncRequired`). A freshly provisioned central has none. Sign-in's fence rows are acknowledged, so they're never pushed again.
- **Fix:** when a recovery setup lands (`none` → `provisioned`), sign-in sets that organization's fence ACKs (the organization row and every person pair) back to 0, in one store write in the same run. Delivery then pushes their **current** revisions, organization fence first, through the R-batch loop, before the call or its retry. If the budget runs out, the rows stay pending (Q1 = A), and the next use continues.
- **The ACK-lowering exception:** this is the **only** place an ACK lowers. An ACK means "central holds this revision", and central has just been shown to hold nothing for this organization. Revisions themselves don't change, so tokens still match.
- **Rejected:** central re-deriving floors, because it would change central's contract.

**R-push503.** On an empty central, the guard's own revision push also gets the unstamped 503 (the push route is among `organization_unstamped_routes.rs:244–301`). Treat a push answered 503 like the original call:
- probe the digest within the same budget;
- on `none`: recover (plus R-floors), deliver again, then send the call;
- on any other outcome: unchanged (unavailable).

**One run budget (clarified 13 Nov, the Verifier's reading confirmed):** the budget bounds the guard's own work (renewal, delivery) and, after a 503, the probe, the recovery and the one retry. **The first original call isn't bounded or aborted by it.** D7 and Q2 still hold: over a valid stamp with nothing pending, the call goes out even if renewal used up the budget. The probe, recovery and retry only start with budget left. If it's exhausted, the original refusal is returned unchanged.

**Proof:**
- With a controlled central that **models admission against floors**, an organization that isn't due recovers on first use after an empty restart, and the retried admin call succeeds. Show it red without R-floors.
- A push 503 followed by a `none` probe recovers.
- A push 503 with any other probe outcome stays unavailable.
- B2e against pinned central on both pairings.

**R-floors timing (Lead, 13 Nov, the Verifier's recommendation and the Implementer's source agree):**
- **When:** reset the organization's fence ACKs to 0 **when the authoritative `none` is observed**, while this run conditionally owns clearing the old stamp record (CAS), **before** attempting the idempotent setup. Not after setup is confirmed.
- **Reason:** if setup commits but its reply is lost, the next use reads a stamp rather than `none`. An after-confirmation reset would then never happen, and the floors would stay missing.
- **Safe:** `none` proves central holds nothing for the organization, floors included. The rows stay pending until a setup lands, then go in the same or the next use.
- **Proof:** a "setup applied, reply lost" case: the next use delivers the floors and the call succeeds.

### WS7 acceptance prerequisite: a real-central empty-restart case (Lead, 13 Nov)
WS7 is frozen at `f58d79a7`, proven against a controlled central (unstamped 503, floors required). That's a stand-in. Since recovering from an emptied central is WS7's whole purpose, **add one permanent B2e case against pinned central `e847a888` on both pairings** (Node + Tokio, workerd + workerd):
1. provision an organization, and push its floors;
2. **restart central with empty storage** (a fresh store or object, not the same database), so it doesn't know the organization;
3. make an ordinary admin call through sign-in.

It passes when the call succeeds on that first use, after sign-in observes the 503, probes `none`, resets its ACKs, sets up fresh, re-pushes the floors, then retries. A second case uses a not-due stamp. A build without R-floors or R-notdue must fail it.
- **Implementer:** add the case (product test, B2e harness).
- **Verifier:** observe it on both pairings.

WS7 acceptance waits for it.

**Recovery-setup counter reason (Lead clarification, 13 Nov, on the Verifier's question):** "adds one unanswered try with reason `unanswered-timeout`" meant the deadline case. The rule is that any unanswered recovery setup counts **one unanswered try with its actual reason**:
- a deadline is `unanswered-timeout`;
- a transport loss or lost reply is `unanswered-unavailable`, as current production (`postPrivately`, `reprovisionFresh`) records it.

No code change. The proof should include one generic-loss case (not only the timeout stand-in) that asserts `unanswered-unavailable` and the count.

### WS7 accepted, R-code due; WS6 grid starts (Lead, 13 Nov)
- **WS7 accepted** at switchboard `8cff80933`; see `tmp/2026-11-12-ws1-handbacks/lead-acceptance.md`.
- **Reviewer:** review the diff `887c9abe..8cff80933` read-only, against the WS7 rulings (R-notdue, R-floors and its timing, R-push503, the budget wording, the recovery counter reason, the real-central empty-restart cases).
- **WS6 grid can start** on #10 at `3c6c69e3`. The chooser-journey update (rows instead of a select) is a **product host test** on #10, so the **WS6 Implementer** applies the Verifier's prepared patch (from its message `01a1d321`), takes the journey to 32/32 on both hosts, and freezes the target. Then the Verifier runs the UI grid (headless CDP or Sunclaw, no computer-use tools).
- **WS4 released (Lead, 13 Nov), to the Implementer `ccc121df`:**
  - on `item2/b3a-device-grant` (#11), merge `item2/b2-sign-in-additions` at `8cff80933`;
  - wire `DecideDeviceLogin`, `DecideMachineToken`, and the WebSocket connect forward (where it exists on #11) through the guard runner, with the same D7 budget, R-notdue/R-push503 recovery and Q1 = A;
  - #11's own N10/N03 proof must stay green.
  - **Proof:** both hosts; a machine-token refresh renews a due stamp; an empty-central 503 on `DecideMachineToken` recovers.
  - Freeze for the Verifier after the WS6 grid. If #12 changes under review, merge it again.

### WS7 repair R-retrysignal (Lead, 13 Nov; the Reviewer's R-code candidate, accepted)
**Defect:** `organization-fleet-call.ts` hands the retry its deadline `AbortSignal`, but both callers drop it: `fleet-admin-forwarding.ts` `send: async () => sendFleetAdminRequest(...)` and `fleet-admin-relay.ts` `send: async () => relayFleetAdminRequest(...)`. `FleetAdminLinkClient` takes no signal. The caller stops at the deadline, but the retried request keeps going on the transport.

**Fix:**
- Add an optional `signal` to those private admin-client methods, and pass it to the internal `Request` / transport.
- Pass the retry's signal **only on the retry**. The first send stays unbounded (D7, Q2).
- The wire body is unchanged.

**Proof:** an actual-client held-retry case observes the signal reach the transport and the request aborted at the deadline, on both hosts' client paths.

**Order:** this goes on #12 (`item2/b2-sign-in-additions`) **before** WS4 continues. Then refreeze; the Verifier runs a focused observation and the Reviewer runs a correction check.
- **WS4 built at #11 `909c8ef1` (Lead rulings, 13 Nov):**
  - **WebSocket connect:** `<sign-in>/fleet/v1/session` doesn't exist on #11, so its guard stays an obligation for the code that adds the forward (B3d/B4). It's recorded in the B3 rows.
  - **Proof layer:** #11's machine proof runs on storage cases on both legs, with no HTTP host lane. That's accepted for WS4; machine host-lane cases come with B3 central.
  - **Fixture:** the machine product stand-in now acknowledges revision pushes. No assertion changed.
  - **The single `ECONNRESET`** in "people: a lost provisioning reply" (Node, `e8311b01`) is recorded as a flake candidate. The Verifier watches for a repeat; it's not ignored.
  - The Verifier observes WS4 after the WS6 grid and R-retrysignal.

### WS6 grid capture route (Lead, 13 Nov 08:20Z)
The Verifier's send of the capture packet to Sunclaw was **rejected by automatic approval review**: private source to a remote recipient, with no first-hand owner authorization in that transcript. The Lead's earlier commit-reference ruling is **withdrawn** (it would bypass the rejection), and the question goes to the owner at 09:00 ET.

**Interim route, no remote and no approval:**
- The **WS6 Implementer** (claude-local `20c2febb`), whose session already runs headless Chrome over CDP locally, captures the full grid at **#10 `e5ea5c13`**:
  - every page and state;
  - 1280×900 and 390×844;
  - the Node and workerd visual hosts;
  - any dialog or toast opened.
- It writes the PNGs plus a metadata file into `switchboard.item2-sign-in-pages-design/tmp/2026-11-13-ws6-grid/`. For each frame: scene, state, width, host, URL, commit and SHA-256.
- It stops its own processes by exact PID.

**Independence limit:** these frames are captured by the author, and that's labelled. The **Verifier** checks frame identity against the metadata and the target independently and reads every frame. The **Lead** judges every frame (ui-acceptance).

### WS6 correction R-ui (Lead, 13 Nov 08:50Z; the Lead's judgment of the grid at #10 `cd60464e`)
**Judgment:** `agent-vm.design-portal-remediation/tmp/2026-11-12-ws1-handbacks/lead-ui-judgment-ws6.md`. Working passes for all 21 captured cells; quality fails on four groups, so #10 is not ready.

**Fix, on #10 (`item2/sign-in-pages-design`), product code:**
- **Q1, one flow keeps its steps.** A new person who enrols sees the same step list from enrolment to creating the organization. Today `signInFlowSteps` adds "Confirm your second factor" as done once `factorPage` is `confirmed`, so the create step shows a step the person never did. A returning person who needs a step-up confirmation (`confirm/*`) may still see the confirm step. The choice of how (what the server knows about "confirmed by enrolling" versus "confirmed by step-up") is the Implementer's; it must not change the factor rules themselves.
- **Q2, the create step is one task.** While the organization is being created, the page shows the steps and the organization form only. The Security block (passkeys, recovery codes, authenticator app) stays on the account page (`confirmed` with no organization task). The factor rules and the hidden-until-confirmed form are unchanged.
- **Q3, the refused-continue error.** "Owner sign-in was refused" becomes an error in the same destructive style as `limited` and `refused`, with what to do and one action.
- **Q4, replacement recovery codes.** `recovery-codes/new-codes` gets the same Copy / Download .txt / Print actions and the "I've saved my recovery codes" finish as the enrolment codes screen, from the same component.
- **Polish if cheap:** P1, Turnstile `size: "flexible"` so it lines up with the buttons; P2, an instruction line on `confirm/confirm-recovery-code` like its app-code sibling.

**Recapture, same route as before (author-captured, labelled), into a new `tmp/2026-11-13-ws6-grid-r1/` at the new freeze:**
- all 21 cells again, plus these missing cells:
  - the finish transitions: enroll-app finish → the next page, confirm success → the next page;
  - `app-setup/no-script-setup` with "Setup URI" expanded;
  - keep full-page capture for long pages (the first grid already had it; the Lead's below-the-fold gap is withdrawn);
  - replacement recovery codes while pending;
  - a wrong code and a step-up refusal with their real toasts or inline errors, through a stand-in mode that refuses (visual-entry only; no product change for it).
- Gates: `pnpm check`, the unit tests, and the sign-in host tests on both hosts; update text expectations only where copy changes.
- Then the Verifier checks identity and reads every frame, and the Lead judges again.

**Not in R-ui:** the `/device` page (after #10 merges, by plan) and any new visual language. Everything stays within `tool-access-ui`'s Bridge-synced components.

**Verifier order changed (Lead, 13 Nov 08:52Z):** WS4 no longer waits for WS6. The R-ui loop touches only #10; WS4 is on #11. The Verifier runs the WS4 observation now with the #14 apparatus at `2eefc72c` against #11 product `e5b5a175`, then checks the R-ui recapture's identity and reads its frames when the author posts it. R-ui replaces the Verifier's supplement request to the author.

### WS6 correction R-ui2 (Lead, 13 Nov 09:35Z; the recapture judged at #10 `9e2b8a01`)
**Judgment:** `tmp/2026-11-12-ws1-handbacks/lead-ui-judgment-ws6.md`, "Round 2". R-ui's Q1–Q4 and P1–P2 are closed. Four new findings:
- **R1, a wrong code is said once, in our words.** Errors tied to a field show inline only, with no toast. Toasts are only for errors with no field (Lead decision; the Implementer asked). Override Better Auth UI's strings: "That code didn't work. Enter the current code from your app." and "That recovery code didn't work. Each code works once."
- **R2, the step-up refusal on the create step has its action.** It says why in words that don't contradict the done step, and gives the one action that confirms.
- **R3, the authenticator app shows Switchboard.** Set Better Auth's `appName: 'Switchboard'`. Today it's unset, so the TOTP issuer is "Better Auth". Use Switchboard in the preview stand-in URI too. Check that nothing else keyed on the app name changes meaning (passkey relying-party *name* only; the relying-party ID is unchanged).
- **R4, one title for the factor step** in every state (e.g. "Your second factor").
- **P3:** a spinner on the pending "Replace recovery codes" button.

**Recapture** (same route, `tmp/2026-11-13-ws6-grid-r2/`): the changed cells and their siblings (refusals, `organization-create-refusing`, `app-setup/*`, `confirm/*`, `organization-create/*`, `confirmed/loading-replace-recovery-codes`), plus one unchanged control cell (`sign-in/normal`). The refusal predicate waits for the inline error. Gates: `pnpm check` and the page host tests on both hosts.

### WS4 accepted, R-code due (Lead, 13 Nov 09:45Z)
- WS4 is accepted at #11 `e5b5a175` (`tmp/2026-11-12-ws1-handbacks/lead-acceptance.md`, WS4).
- **Reviewer:** review WS4's own changes read-only: `08390db6` (the guard wrapper and its wiring) and `e5b5a175` (test-only ordering). The #12 merges in between were reviewed on #12. Check them against the WS4 rulings (13 Nov: shared runner, R-retrysignal, connect forward deferred to B3d/B4, storage-leg proof) and the B3 rows. Return READY, or findings anchored to file and line.
- **Gates note for WS6:** the unit suite (`pnpm test:unit`) is a required gate alongside `pnpm check` and the page host tests. It was red at `9e2b8a01` (a stale list-accounts row) and was fixed test-only at `955c22cd`.
- **WS4 R-code READY** (Reviewer, 13 Nov ~09:55Z): zero findings at `e5b5a175`. WS4 is done; #11 stays held until B3 central.

### WS6 ruling F is still open (Lead, 13 Nov ~10:00Z; raised by the Verifier)
No receipt closes trial ruling F ("a browser journey on both hosts against real Better Auth; the Verifier owns the driver, CDP not Playwright"). The 128 preview frames use stand-ins, and the 32 page host tests read the served DOM without a browser. **F is a merge prerequisite for #10.**
- **Verifier:** at the R-ui2 freeze, run a local headless-Chrome CDP journey on the Node and workerd visual hosts, with real Better Auth behind them (no visual-entry stand-in). It runs locally on the Mac, because the Sunclaw route waits on the owner.
- **Minimum path:** sign-in page loads with Turnstile (test key); an existing session reaches the owner page. Then:
  - enrol the authenticator (real TOTP from the returned secret), save the codes, finish;
  - a wrong code is refused inline;
  - a right code confirms;
  - create the organization;
  - replace recovery codes;
  - `get-session` returns no `token`.
- **Return:** a per-step pass/fail on both hosts with screenshots at the error and finish states, as the Verifier's evidence, labelled as observation. No product changes.
- Social sign-in through Google or GitHub stays out of scope for F; the owner-side real sign-in per release covers it.

### WS6 ruling R-mount (Lead, 13 Nov; the Implementer's break at #10 `72340468`)
- **Assumed:** a page that a factor form writes with `document.write` behaves like a fresh load.
- **Found:**
  - the island bundle is a module, and `document.open` keeps the window and its module map, so the bundle doesn't run again and nothing mounts;
  - after a real "Replace recovery codes", people get the server fallback list, with no copy, download or finish (`probe-replace-node-island.json`);
  - r1 closed Q4 on a direct load, which hid this.
- **Whose assumption:** an agent inference in the WS6 build, not an owner decision.

**Decision: option A.** The island entry exports `mountSignInIslands(document)`. Each island page loads it through a small inline module carrying the page nonce, which imports the bundle and calls it. Inline modules run on every write, while the bundle import is reused.
- **Why:** it is the smallest change, it fixes every page a factor form writes rather than one card (B), and the no-script fallbacks stay as they are. C, accepting the fallback, would leave Q4's design unseen.
- **Bounds:**
  - mounting must be idempotent, so a root that is already mounted is not mounted twice;
  - no CSP change: the inline module uses the existing per-response nonce;
  - the served-page assets test is updated for the bootstrap.
- **Proof:**
  - a unit or host test that fails on `72340468`;
  - a headless-Chrome probe on both hosts showing a real Replace recovery codes mounting the island (Copy, Download, Print and the finish button present);
  - the cell `confirmed/replace-recovery-codes-next-page` valid in the r3 grid.

**Also recorded:** the nonce fix at `72340468` (`setAttribute('nonce', …)`) repairs a defect present since `66f478e6`: Chrome blocked the scripts on every page a factor form wrote. It is on this branch only, not on main.
- **Ruling F's real-browser journey adds a step:** Replace recovery codes, then the island is present and "I've saved my recovery codes" finishes.

**Recapture r3:** the changed cells and their siblings, as R-ui2 listed, plus `confirmed/replace-recovery-codes-next-page`. Gates: check, unit, and the page host tests on both hosts.

### WS6 grid passes; ruling F route (Lead, 13 Nov 10:02Z)
**Grid:** the r3 grid at #10 `07740c65` passes working and quality on all 34 cells (`lead-ui-judgment-ws6.md`, Round 3). What's left before #10 merges: **ruling F**, then CI.

**F, the Chrome capability gap.** In the Verifier's local run (apparatus `71a084ab`, local-only), both owned Chrome instances exited with SIGABRT before DevTools came up. Zero browser steps ran. The Verifier's sandbox can't start Chrome, and no escalation was attempted. The Implementer's session runs headless Chrome locally.

**Route (Lead decision, the same pattern as the grid):** the Verifier hands the Implementer the exact F command at the local apparatus (its driver, oracle and expected results unchanged). The Implementer runs it once at `07740c65` on both hosts and returns the raw outputs and logs untouched. The Verifier audits identity and reads every result; the Lead judges.
- Labelled **author-run**. The Implementer may not edit the driver or the expected results.
- If a step fails, the Verifier interprets the failure and the Implementer repairs the product.

**The taxonomy audit (`scripts/audit-test-taxonomy.ts`) is not changed now.** Registering the dedicated `native-browser.host.e2e.test.ts` there is a check-script change, which needs the owner's approval. The apparatus stays local-only until the owner answers. The F run itself doesn't need the audit, since it runs through its dedicated config.

### WS6 accepted; #10 R-code due (Lead, 13 Nov)
- **F SUPPORTED** (Verifier audit of author-run packet 04 at `07740c65`). **WS6 is accepted** at `07740c65` (`tmp/2026-11-12-ws1-handbacks/lead-acceptance.md`, WS6), subject to CI E2E (host) at that head.
- **Reviewer:** review #10 (`origin/main...07740c65`) read-only against the WS6 rulings:
  - Base UI only, no Radix, in any `package.json` or lockfile;
  - `auth-ui` resolves its `ui` alias to `tool-access-ui`, and Bridge sync matches BRIDGE_SYNC.md;
  - decision B and its token-stripping `after` hook, on both the normal and refreshed paths;
  - the Turnstile CSP scope;
  - the R-ui/R-ui2/R-mount changes;
  - the nonce fix;
  - `appName` and the passkey RP fields (RP ID unchanged);
  - lint or test weakening.

  Return READY, or findings anchored to file and line.
- **Merge:** the Lead merges after READY, green CI and a mergeable PR. Before merging, the title and body name Switchboard and list the limits.

### WS6 ruling R-print (Lead, 13 Nov; the Reviewer's R-code candidate on #10 `07740c65`, accepted)
- **Finding (confirmed by the Lead from source):** "Print" on the recovery-codes block calls Better Auth UI core's `printTextFile` (`auth-ui/.../two-factor/backup-codes.tsx:80`). That function prints a `blob:` text file through an iframe. Signed-in pages send `default-src 'none'` with no `frame-src` (`sign-in-core/src/pages/page-document.tsx:150–163`), so the frame is blocked and Print does nothing, on enrolment and on replacement. F checked only that the button is there.
- **Decision: print in the page, with no CSP change.** Replace `printTextFile` in our copied `backup-codes.tsx` with an in-page print: a print stylesheet in the served CSS (`style-src 'self'`) shows only the codes block, then `window.print()`. No iframe, no `blob:` frame, no new CSP source. Adding `frame-src blob:` was rejected: it widens a security boundary for a convenience action. Removing Print was rejected: the codes block's pattern has it.
- **Also, as a report only:** identify the 16 console errors the F journey logged per host (the grid saw blocked inline-style messages under `style-src 'self'`). Say where they come from and whether any visible behaviour depends on the blocked styles. Fix only if the cause is our own code and the fix needs no CSP change. Otherwise report it to the Lead.
- **Proof:**
  - a unit test that fails on `07740c65`: Print calls `window.print` and creates no iframe or `blob:` URL;
  - a headless-Chrome check on both hosts that emulates print media on the replacement-codes page and shows only the codes, with no CSP violation logged on clicking Print;
  - gates: check, unit, and the page host tests on both hosts.
- **After it:** the Reviewer re-checks only this change, CI runs at the new head, then the merge.

### WS6 R-print review (Lead, 13 Nov 10:40Z; #10 `4351d782`)
I read the diff (`07740c65..4351d782`, 6 files):
- `backup-codes.tsx` now calls `window.print()`, with the codes list marked `data-backup-codes-print`.
- `auth-ui.css` adds an `@media print` block.
- The island turns zod JIT off (`z.config({ jitless: true })`) before any schema exists, which removes the `Function('')` CSP probe. The same validation runs without the eval fast path.
- The two to three remaining console lines per island page are sonner's and input-otp's injected `<style>` tags, whose CSS is already served. The rest are expected 401/403/429 refusals. Accepted as a named library limit.

**One small correction (R-print2):** the print block hides `body *` on **every** page that loads `auth-ui.css`, so printing any other sign-in page gives a blank sheet. Scope it to pages that contain the codes list, e.g. `body:has([data-backup-codes-print]) *`, so other pages print as they look. Add a unit or host assertion that the hiding rule is scoped.

**Then, at the new head:**
- gates: check, unit, and the page host tests on both hosts;
- the Chrome print-media check on both hosts, as before, plus one non-codes page printing visibly;
- **one more author-run of the Verifier's F packet, unchanged except for the target head.** The island bundle changed (zod config and print), so F at `07740c65` no longer covers the shipped bundle.

After that: the Reviewer's correction check, CI at the head, then the merge.

### WS6 R-print2 frozen; the correction check starts (Lead, 13 Nov)
- **Freeze: #10 `ee137e5f`.** I read the CSS diff `4351d782..ee137e5f`. Print-hiding and the visible codes rule are both scoped by `body:has([data-backup-codes-print])`, with the visible rule one step more specific. `transition: none` is set under print.
- **Author gates:** check 12/12, unit 2187/2187, page host tests 33/33 on both hosts.
- **Chrome on both hosts:** Replace mounts the island; Print calls `window.print` once; under print only the codes show; other pages print as they look; no eval or `Function`.
- `05799aa1` is superseded and defective (codes hidden), and is kept.
- **In parallel now:**
  - **Verifier:** the F author-run packet at `ee137e5f`, with only the target head changed. The Implementer runs it once and the Verifier audits.
  - **Reviewer:** correction check of `07740c65..ee137e5f` (R-print, zod jitless, R-print2) against R-print and R-print2. Return READY or findings.
  - **CI** at `ee137e5f`.
- **Merge** when all three pass.

### Owner decisions, 13 Nov 11:01Z (first-hand, in the Lead's session)
The owner, answering the three open items ("yes run this stuff"; on Sunclaw: "i asked you to delegate … why have to keep approve"):
1. **Test-taxonomy audit: yes, option A.** Register only `scripts/verify-auth/native-browser.host.e2e.test.ts` in `scripts/audit-test-taxonomy.ts`, as run by its dedicated `native-browser.config.ts` and kept out of the default suites. That single file, with no general exemption, plus the script's unit regression. The Verifier may then push its F apparatus to #13 with `pnpm check` green.
2. **Sunclaw: yes.** Switchboard source, the visual-preview harnesses and verification packets may be sent to the owner's Sunclaw test agent (codex-local `01a1b755`) for test runs. This is a standing permission for this work; helpers cite this entry. Credentials, `op://` refs and test-account addresses still never go in packets.
3. **Leftover preview processes 87857 and 87898: yes to stopping them.** By the time I checked, both had already exited (`ps` showed neither), so nothing was killed.

### Correction to owner decision 1: follow the repo's Vitest standard (Lead, 13 Nov 11:02Z)
- **Owner:** "why would you not use my standard for vitest? unit.test.ts? integration.test.ts or integration folders?"
- **What the standard says:** host e2e tests are `packages/**/*.host.e2e.test.ts` (AGENTS.md:155; vitest `e2e-host` project, `vitest.config.ts:176–177`). They "must be included in the default `pnpm test:e2e` proof lane so coverage is not lost" (AGENTS.md:207–213), and CI "E2E (host)" runs that lane on every PR.
- **Why option A is withdrawn:** the F browser journey placed in `scripts/` with a dedicated config kept it out of that lane, against the standard. **Decision 1 (option A) is superseded:** `scripts/audit-test-taxonomy.ts` is **not** changed.
- **Verifier, #13:**
  - move the F journey to `packages/sign-in-test-support/src/` as `<name>.host.e2e.test.ts`, next to the existing sign-in host e2e tests;
  - drop `native-browser.config.ts`;
  - keep its harness inside Vitest with the injected clock.
- **Proof:**
  - `pnpm test:taxonomy` and `pnpm check` green with no audit change;
  - `pnpm test:e2e:host` runs it on both hosts locally (author-run if the Verifier's sandbox still can't start Chrome);
  - CI "E2E (host)" on #13 runs it on ubuntu-latest. If Chrome needs a flag or isn't present there, report before changing any workflow, because a workflow change needs the owner.
- **Integration boundary for the relocated F test (Lead, 13 Nov 11:04Z):** do **not** merge the open #10 branch into #13. Make the test portable now: a same-checkout host test, existing fixtures, private temp evidence, Chrome found through the environment, with no Mac path and no private target file. Wait for #10 to merge to main, then merge `origin/main` into #13 and run it there.

### #10 merged (Lead, 13 Nov 11:15Z)
#10 was merged to `main` as merge commit `6375b1e6`, at the verified head `ee137e5f`. The gates at that head: Lead acceptance; R-code READY; F packet 05 SUPPORTED; CI Validation, E2E (host) and check all green; mergeable and clean, 0 commits behind. The merge deploys nothing; production deploy is the owner's step.

**Next:**
- **Verifier:** merge `origin/main` into #13 and run the relocated F host e2e (an author-run if Chrome is still blocked in its sandbox; Sunclaw is allowed). Then push #13; its CI E2E (host) runs it.
- **Lead:** the `/device` page build (deferred until after #10), by plan.

### WS8: the `/device` approval page on #11 (Lead, 13 Nov; starts now that #10 is on main)
- **Governing design:** `deliverables/b3-machine-login.source.html#b3-device-page` (Lead design, 13 Nov): its sketch, states, rules and data. The page goes in the switchboard B3 PR, #11 (`item2/b3a-device-grant`, worktree `switchboard.item2-b3a-device-grant`), as "B3a plus the approval page".
- **Branch upkeep first:** merge `origin/main` (with #10) into #12 (`item2/b2-sign-in-additions`), then #12 into #11, so the stack stays main ← #12 ← #11. Read both sides on conflicts. #11 and #12 stay draft and held until B3 central, unchanged.
- **Build:** use #10's shell and `packages/auth-ui` components only, with no new visual language. States:
  - enter code;
  - review: the code shown large, machine label and organization, Approve primary and Deny secondary;
  - confirm again: on `secondFactorRequired`, run #10's `ConfirmSecondFactorStep` inline, then retry Approve with the **same** request ID;
  - approved: render central's `Approved{label, allowedWorkspaces}` reply, never the form;
  - denied;
  - the four errors (code expired or used, not permitted, machine in another organization, unknown workspace), each with one message and one action;
  - unavailable.
  - No Turnstile. A second tab or a retry shows the first approval (N03).
- **Workspace picker: none in this slice.** Central's workspace-list call doesn't exist yet (asked of Lead A's redesign). The page approves with no workspaces, and says so: "approve the login now, add workspaces later". The picker is a later step once the call exists.
- **Stand-ins:** central's `DecideDeviceLogin` replies through #11's existing machine stand-ins, as in WS1/WS4.
- **Proof:**
  - unit tests per state;
  - page host tests on both hosts, including N03 (two tabs give the same approval) and the confirm-again retry carrying the same request ID;
  - a WS6-style UI grid (every state × node/workerd × 1280/390, author-captured, Verifier identity check, Lead judges every frame);
  - gates: check, unit, and the page and machine host tests on both hosts.
- **Sessions:** the WS6 pair, with 🐒 Implementer claude-local `20c2febb` (Opus high, knows `auth-ui` and the island mount) and the 🔬 Verifier `01a1cda2-c16d` (Sol high). Write scope: the #11 and #12 worktrees.
- **Stop:** when the grid passes the Lead's judgment and the gates are green; then the Lead's acceptance and R-code. No merge (held until B3 central).

### WS8 integration route: B2's Fleet setup status in the new shell (Lead, 13 Nov 11:18Z; the Verifier's #13 merge conflict)
- **Found:** merging `origin/main` (with #10) into the B2 stack conflicts in `minimal-owner-pages.ts` and `sign-in-http-handler.ts`. The B2 branches render `organizationSetup`, the organization's Fleet setup status with a retry control, in the old owner page. #10's React `OwnerPageProps` has no such field. Taking main's side would drop B2 behaviour.
- **Owner of the fix:** the WS8 Implementer, on **#12** (`item2/b2-sign-in-additions`), as the first step of WS8's branch upkeep.
  - Keep both import sides in the handler.
  - Carry `organizationSetup` into `OwnerPageProps`, and render its states (pending, failed with retry, done) in #10's shell with `auth-ui`/`tool-access-ui` components, following WS6's rules (one message, what to do, one action).
  - No behaviour change to setup or retry.
  - Add those states to the WS8 grid and to the page host tests on both hosts.
- **Verifier:** abort your own in-progress `origin/main` merge on #13 (no resolution there). Once the Implementer freezes the #12 resolution, merge that #12 head (which contains main) into #13, then run the relocated F host e2e.
- **Skips at #12 `fb2c9673` (Lead, 13 Nov 11:32Z):** none are new.
  - 12 tests on both hosts are the B2e joint-central files, which run only with pinned central artifacts.
  - 2 tests are Node-only `runIf(cloudflare)` cases.
  - The skip conditions are byte-identical to `5d3f9772`.
  - **Carried:** the B2e joint (both pairings) must run again at the merged #12 head before #12 is released. The owner page and handler changed in the main merge, and the last joint run was at `cc6acc86`.

### WS8 rulings A–C (Lead, 13 Nov 11:36Z; the Implementer's brief `switchboard.item2-b3a-device-grant/tmp/2026-11-13-ws8-device-page/ws8-design-brief.md`)
- **A, a fresh tab after approval: A1.** The page handler sees the code is approved and bound to this person, and renders "approved (loading)". The island posts Approve once with the same `userCode`, so the server sends central the same `record.id`. Central's stored reply is shown (N03).
  - No stored-data change. A2 would add `deviceCode` fields, a persisted-data change; A3 would drop central's reply.
  - Bound: only for the bound person and only while the code record still exists. Any other answer renders the matching error state.
- **B, `formerServiceLinkedElsewhere`: its own state, `former-linked`.** It means this machine's former service id is already linked to a different machine (the re-key rule, b3-machine-login:101/234), not another organization. Folding it into "machine in another organization" would misstate the cause.
  - Message: "This machine's earlier identity is already linked to a different machine. Remove that machine in Switchboard, then log in again from this machine."
  - Action: "Back to your account".
- **C, signed out on arrival: C1, bounded.** A signed-out `/device` shows "Sign in to approve this machine", linking to `/sign-in?device=<user_code>`.
  - Sign-in accepts `device` only if it matches the user-code format. It builds the provider `callbackURL` **server-side** as `<issuer>/device?user_code=<code>` from that fixed path. No caller-supplied URL or path is ever used.
  - Turnstile stays on the sign-in page as it is, `trustedOrigins` is unchanged, and any other value is ignored, falling back to the existing return.
  - A host test proves that a non-matching `device` value and an attempted URL both fall back, and that the right one returns to `/device?user_code=`.
- The rest of the brief (server-rendered page, one `device-approval` island, `[]` workspaces with the "add workspaces later" line, selectors, proof plan) is accepted as written.

### #13 CI route (Lead, 13 Nov 11:54Z)
- **Found:** CI runs only for PRs into `main` and pushes to `main` (`.github/workflows/ci.yml:3–7`). #13 is based on #12, so its push schedules no CI.
- **Ruling:**
  - no workflow change and no rebasing of #13;
  - the proof for #13 now is the Sunclaw run at `f9ca8011`: full host lane 471 passed / 0 failed / 12 designed B2e skips, both F cases 12/12, check 12/12, once the Verifier's receipt audit passes;
  - push #13 as a draft after that audit;
  - CI's E2E (host), including F on ubuntu-latest, runs when the stack's PRs are retargeted to `main` at release. Until then, "F passes in GitHub CI" is listed as **not yet observed**.

### WS8 correction R-device (Lead, 13 Nov 12:23Z; grid judged at #11 `b0b1b874`)
- **Judgment:** `tmp/2026-11-12-ws1-handbacks/lead-ui-judgment-ws8.md`. Working passes for all 23 cells; quality fails on D1–D4.
  - **D1:** no raw workspace IDs. The stand-in replies `[]` for `[]`; an empty list shows "none yet"; a non-empty list shows a count until names can be listed.
  - **D2:** the code shown large.
  - **D3:** the organization name wraps at spaces.
  - **D4:** one Fleet-setup message in product words, with no "Central".
  - **P1:** Deny disabled while Approve is pending.
- **Recapture:** the changed cells and their siblings (review*, approved*, confirm-again*, fleet-*). Gates: check, unit, and the device and page host tests on both hosts.
- **`/device` as a lasting verify-auth journey (Lead, 13 Nov 12:33Z; the Verifier's gap):** not now. The WS8 grid and component observation are temporary proof for this slice. The lasting journey is B3e's "real journey": two Routers log in by device code through the sign-in page against both central builds. That journey and its `verify-auth` skill entry are commissioned with B3e, when central exists. Recorded in the B3 rows; no skill write now.

### WS8 accepted; R-code due (Lead, 13 Nov 12:44Z)
- The R-device grid passes, and WS8 is accepted at #11 `35e7b9b0` and #12 `c1ad4759` (`lead-acceptance.md`, WS8).
- **Reviewer:** review read-only:
  - **#12:** `5d3f9772..c1ad4759`, the main merge resolution (B2 `organizationSetup` in #10's shell) plus D4;
  - **#11:** `3424fd99..35e7b9b0`, the `/device` page.
- Check them against the WS8 design and rulings A–C (C1's server-built callback in particular), the R-device corrections, and no behaviour change to the setup/retry controller. Return READY or findings. No merge; #11 and #12 stay held.

### WS8 correction R-race (Lead, 13 Nov 12:52Z; the Reviewer's candidate, confirmed from source)
- **Found:** `device-approval-page.ts:95–100`. When Better Auth's verify returns 200 without machine context (a second tab's claim lost), the page reads the stored code only as `pending`.
  - Better Auth 1.7.11 (`device-authorization/routes.mjs:529`) takes its record snapshot before the conditional claim.
  - So this order fails: tab B reads pending → tab A claims, reviews and approves → B's claim loses and gets a bare 200 → B's fallback finds the code **approved** and shows "expired".
  - That breaks N03 and A1 for the same person.
- **Fix:** the same protected fallback read resolves either way, keeping the person, client and expiry guards:
  - `pending` → review;
  - `approved`, for this person and unexpired → A1 approved-loading;
  - anything else → expired.
- **Proof:**
  - a host test on both hosts that forces this cross-phase interleaving (B's verify snapshot before A approves, B's claim after). It must fail on `35e7b9b0`. The existing two-tab test awaits both page loads first, so it can't catch this.
  - gates: check, unit, and the device host files on both hosts. No grid recapture: this adds no new screen state.
- The Reviewer's review continues. Its correction check covers R-race together with any other findings.
