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
- **Messaging:** direct messages only. Don't subscribe to the coordination board.

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
**Outcome.** `DecideDeviceLogin` and `DecideMachineToken` (#11) run through `prepareOrganizationFleetCall` (#12), with the same rules and deadline. Do it on `item2/b3a-device-grant` by merging `item2/b2-sign-in-additions` into it. #11 then carries #12 until #12 merges.

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

  Report to the Lead **before** converting the other pages. A blocker comes back as a design break with evidence.
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
- The Lead checks every picture before the owner sees a gallery.

**Sessions:**
- 🐒 Implementer (WS6): claude-local `20c2febb-6892-4c29-9ed5-a2ca39baa6d3`, Opus/high, worktree as above. Write scope: that worktree only. Push `item2/sign-in-pages-design` (no force) and keep #10 a draft.
- 🔬 The Verifier (01a1cda2-c16d) does the captures. WS5's plain recapture of `41302fc85` is no longer needed; if it's done already, keep it as the "before" set.
