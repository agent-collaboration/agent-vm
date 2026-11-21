# Bombadil and Hegel TypeScript: source evidence

17 November 2026. Bounded collection for the Fleet access Lead; no design or implementation.

**The source supports two distinct uses:** Hegel generates inputs and command sequences inside TypeScript tests; Bombadil explores a served UI through Chrome DevTools Protocol (CDP). Hegel 0.4.10 includes a stateful runner. Bombadil 0.7.10 includes replay and experimental shrinking. These are source findings, not observed successful executions against Switchboard. The existing localhost harness appears suitable for a Bombadil driver, but that integration has not been run. See the capability and harness anchors below.

## Inspected targets and limits

| Source | Observed revision/version | Scope of evidence |
| --- | --- | --- |
| Bombadil checkout, `/Users/shravansunder/Documents/dev/open-source/bombadil` | `7c7081b60080d2af39daf45ac66639b02b512f9d`; workspace version **0.7.10** at [Cargo.toml:26–28][b-version] | Local manual, examples, TypeScript library, browser launcher and CLI source |
| Switchboard public main | `b03d35ffeea00f79061353dce1db6231a670c62f` | Hegel test inventory |
| Switchboard B1-C worktree | `91bfdc5a3bf1632f0ffc70f22a2c34f3a9b469b5` | Existing Hegel tests, request schemas, local native-host/browser harness |
| Installed Hegel | **`@hegeldev/hegel` 0.4.10**, [installed package.json:1–9][h-package] | Installed README, declaration files and emitted JavaScript; native engine internals were not inspected |

The installed package is in B1-C's `node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel`, rather than its root `node_modules/@hegeldev` directory. The test-support package pins Hegel 0.4.10, Better Auth 1.7.11 and Vitest 4.1.5 ([package.json:39–61][s-package]). All three source checkouts returned empty `git status --short` at collection time. They were observed, not locked against other writers.

Only this report was written. No installation, build, fuzz campaign, test, browser launch, credential lookup or benchmark was performed. No pass/fail/skip counts exist for a fuzz execution in this assignment. Work log: **no-home**, as supplied in the [governing brief][brief]; no separate trace was opened. The report includes its collection ledger because the brief permits only this output file.

## 1. Bombadil

### Browser control and local targets

**Direct source:** Bombadil launches a system Chrome/Chromium executable, or attaches to an externally managed Chromium/Electron browser. It does not use WebDriver. The managed launcher locates `CHROME`, executable names on PATH, or platform installation locations ([locate.rs:5–40,53–89][b-locate]); launches with a temporary user-data directory and a remote debugging port ([chromium.rs:52–120][b-launch]); retrieves the DevTools WebSocket URL; and connects using its own `cdp::Connection` ([browser.rs:185–218][b-cdp]). Thus the executable package is not evidence that Chrome itself is bundled or installed.

The browser CLI's positional `origin` is the starting URL; without `--allow-url`, exploration stays on that scheme, host and port. Repeated `--allow-url` match patterns replace that default boundary ([CLI browser.rs:193–255][b-target]). A localhost URL is a normal target under this contract. `test-external --remote-debugger http://localhost:9222` attaches to an existing browser; `--create-target` creates/navigates a new tab instead of using an existing page ([CLI browser.rs:107–119][b-external]).

### TypeScript specification and exact syntax

**Manual and implementation:** a specification is a TypeScript/JavaScript ES module whose top-level exports are properties and action generators; imports may be split across files. The specification runtime is limited and Node-dependent packages may not work ([specification manual:23–57][b-spec]). This is a specification consumed by Bombadil, not a Vitest test module.

Extractors run inside the page and produce JSON-serializable values held in cells, read through `.current` ([manual:187–230][b-extract]). Supported formula constructors include `now`, `next`, `always`, `eventually`, `not`; formulas compose with `.and`, `.or`, `.implies`, `.not`. `always` and `eventually` support `.within(n, "milliseconds" | "seconds")` ([index.ts:63–75,135–203,220–252][b-formulas]).

The actual `examples/wikipedia.ts` imports `eventually` from `@antithesishq/bombadil`, and `actions`, `extract`, `registerCustomAction` from `@antithesishq/bombadil/browser`. Its property and generator are exactly:

```typescript
export const hasReachedResultsPage = eventually(
  () => title.current === "Bombadil",
).within(10, "seconds");

export const myActions = actions(() => [search("Bombadil"), myWait()]);
```

Here `title` extracts the page heading; `search` is a registered custom action which fills the search field, dispatches an input event and clicks submit. This is an excerpt from a complete repository example, not a newly executed sample ([wikipedia.ts:1–40][b-example]).

Default specification syntax is `export * from "@antithesishq/bombadil/browser/defaults"`. Those defaults are also used when no custom specification is provided ([manual:80–140][b-default-manual]). The actual default properties are:

| Export | What the implementation checks |
| --- | --- |
| `noHttpErrorCodes` | First navigation performance entry's `responseStatus`, when available, is below 400; this is not an assertion over every fetch/subresource response |
| `noUncaughtExceptions` | Captured exception text does not indicate a synchronous uncaught exception |
| `noUnhandledPromiseRejections` | Captured exception text does not start with `Uncaught (in promise)` |
| `noConsoleErrors` | Captured error-level console entries are empty |

See [defaults/properties.ts:4–13,56–70,87–99][b-properties]. The default action mixture weights clicks 100, inputs 100, scroll 50, navigation 10 and wait-once 1 ([defaults.ts:1–24][b-defaults]). Inputs include text, email and number generation; back/forward/reload are navigation choices ([defaults/actions.ts:216–313][b-default-actions]). These defaults do not encode Switchboard authorization or storage invariants.

Generators return declarative **action templates**, not random concrete actions generated by calling a JavaScript RNG. `ActionGenerator`, `actions`, `weighted`, `branch`, `leaf`, `.map`, `.filter`, `.when` and `.flatMap` are implemented in [actions.ts:5–143][b-actions]. Templates accept numeric constants/ranges and string generators such as `{ Text: [1, 100] }`, `"Email"`, `{ Regexp: "..." }` ([actions.ts:146–171][b-string-actions]). The move to templates was a breaking change in 0.7.0 ([CHANGELOG:200–240][b-breaking]).

### Authentication and seeded state

**Direct source:** repeated `--cookie` accepts plain `NAME=VALUE` scoped to the origin, or Set-Cookie syntax with Domain, Path, Secure and HttpOnly attributes. Cookies are installed via CDP `Network.setCookies`; they are real browser cookies. Repeated `--header KEY=VALUE` installs extra request headers ([CLI target options:238–248][b-target]; [browser initialization:267–289][b-cookies]). Managed Chrome starts with a fresh temporary profile ([chromium.rs:52–93][b-launch]). External-browser mode can attach to an already prepared page/session.

**Limit/inference:** cookie injection can carry a synthetic authenticated session if the matching backend session exists. It does not itself create a Switchboard user, organization, membership, confirmation state or database fixture. No app-state reset/seed hook is exposed by the inspected browser CLI option structures. Imported JSON/text/binary reference data is supported in specifications ([manual:59–78][b-import-data]), but that is not a backend fixture reset. Resetting persistent state for replay/shrink remains an integration responsibility, unverified here.

### Headless operation, CI and failure results

**Source-defined command shapes, not executed here:**

```sh
bombadil browser test --headless --time-limit 5m https://example.com
bombadil browser test --exit-on-violation https://example.com spec.ts
bombadil browser test --reproduce my-test https://example.com
bombadil browser shrink --headless --trace my-test https://example.com
bombadil browser inspect my-test
```

These exact examples appear in [CLI browser.rs:51–95][b-cli-examples]. The page argument may be the harness's actual loopback issuer under the URL contract above; this report did not invent or test a persistent port.

`--headless` hides the managed browser. `--time-limit` bounds a test; without a bound, the introductory test runs until interrupted. `--exit-on-violation` stops on the first property violation. `--reproduce` conflicts with both `--time-limit` and `--exit-on-violation` ([RunSharedOptions:155–190][b-run-options]). The manual supplies a GitHub Actions example using `antithesishq/bombadil-action@v2`, `driver`, `origin`, `specification`, `time-limit`, `exit-on-violation` and `output-path` ([getting started:113–128][b-ci]); the action's own repository was not inspected.

For **browser test**, exit code 0 means normal completion (including a time limit), 1 means another error, and 2 means property violations ([CLI reference:7–13][b-exit-doc]). Implementation exits 2 if any violations were counted, otherwise 1 on a stall, otherwise returns normally ([browser.rs:747–774][b-exit-code]). Thus `--exit-on-violation` controls when a test stops, not whether a counted violation yields failure at its end. These observations do not establish identical semantics for the experimental `fuzz` and `shrink` subcommands.

`--output-path` names a **trace file** with embedded screenshots, not a directory. Parent directories must exist; overwrite requires `--output-path-overwrite`. The CLI prints inspect/reproduce commands. Inspect shows before/after states, actions, timeline, violations and extracted snapshots; `bombadil trace` can output JSON and extract screenshots ([RunSharedOptions:160–176][b-run-options]; [workflows:76–105][b-inspect]).

### Determinism, replay and shrinking

**Direct source:** normal testing selects `RandomWalk`; `--reproduce` loads actions from a trace ([browser.rs:592–603][b-mode]). The runner uses `AntithesisRng`; the inspected public browser options expose no `--seed` flag ([browser.rs:925–969][b-rng]; [options:155–306][b-run-options]). The getting-started manual places full-stack deterministic testing inside Antithesis ([manual:3–9][b-install]). A local trace is therefore a best-effort action replay, not evidence of deterministic browser/backend execution.

The workflow manual explicitly says reproduction can diverge and then fails; matching the original options matters ([workflows:7–31][b-replay]). `shrink` searches for a shorter trace violating the same property and is **experimental**, including its CLI/output stability. It calibrates replay flakiness, then confirms candidates ([workflows:33–74][b-shrink]). Source defaults are 3 calibration runs, up to 5 confirmation runs and parallelism 1; the parallelism documentation requires isolation between runs ([shrink.rs:19–52][b-shrink-options]). Shrinking is a separate command, not something the normal test automatically completes.

### Installation, platforms and maturity

The exact npm name is **`@antithesishq/bombadil`**. At this checkout, the package generation derives **0.7.10** from Cargo's workspace version and includes type exports plus a `bombadil` executable wrapper ([npm-package.nix:9–59][b-npm]; [Cargo.toml:26–28][b-version]). This is a source version; npm registry availability/latest version and binary artifact integrity were not checked.

The manual documents npm dev-dependency installation (also providing TypeScript definitions), downloadable macOS `bombadil-aarch64-darwin` and Linux `bombadil-x86_64-linux` binaries, Nix flake execution and Docker ([getting started:11–190][b-install]). The npm wrapper explicitly maps **darwin-arm64, linux-x64 and linux-arm64** and rejects other platform keys ([npm-package.nix:133–168][b-platform]). macOS arm64 and Linux therefore have source-defined distribution routes; neither was installed or launched in this assignment. `%version%` in the manual is a documentation substitution placeholder, not a literal version to pass to an installer.

Maturity evidence: 0.7.10 adds shrink and exposes experimental fuzz; 0.7.9 fixes browser state-capture/navigation/replay issues; 0.7.6 fixes replay rejecting generated text; 0.7.0 changes action generators incompatibly; 0.6.0 moves browser commands; 0.4.0 changes trace format ([CHANGELOG:3–20,26–59,99–110,200–240,277–280,393–396][b-changelog]). Those are maintenance/breaking-change facts, not a measured reliability rate.

## 2. Hegel TypeScript 0.4.10

### Generators and Vitest

**Installed source:** ordinary Vitest tests call `hegel.test(tc => ...)` or await/return `hegel.testAsync(async tc => ...)`. Values are drawn with `tc.draw(generator)`; throwing an assertion failure supplies the property failure. No special Vitest adapter is required by the documented pattern ([README:27–78][h-readme]; [index.d.ts:242–250][h-entry]).

The generator exports include integers/bigIntegers/floats/booleans; text/characters/binary/fromRegex; emails/URLs/domains/IPs/dates/times/datetimes/UUIDs; arrays/sets/maps; just/sampledFrom/oneOf/optional; tuples; and composite/record ([generators/index.d.ts:6–18][h-generators]). Generators support `.map`, `.flatMap` and `.filter`; filtering retries up to 3 times before rejecting a case ([core.d.ts:11–35][h-generator-core]). `record` maps field names to generators; `composite` may draw dependent fields ([index.d.ts:106–161][h-compose]). `tc.assume` rejects a case and `tc.note` supplies final-replay diagnostics ([testCase.d.ts:95–117][h-testcase]).

### Existing Switchboard uses

`rg --files ... -g '*.hegel.unit.test.ts'` found **one file on main**, `sign-in-response-release.hegel.unit.test.ts`, and **four files in B1-C**, all below `packages/sign-in-test-support/src/core-tests/`:

| B1-C file | Observed pattern |
| --- | --- |
| [sign-in-response-release.hegel.unit.test.ts:798][s-release] | `testAsync`, 10,000 cases; draw grant/audience/client/failure combinations, compare the actual response-release call with the test's model, and require all named decision labels to be reached |
| [invitation-view.hegel.unit.test.ts:56][s-invitation] | 1,000 cases; 0–40 selected events, generated expiry offsets; compare each transition with an independent reference table |
| [checked-read-transitions.hegel.unit.test.ts:111][s-checked] | 1,000 cases; generated event prefixes for lookup/list; independent reference outcomes, with additional deterministic state/event coverage |
| [request-lifecycle-transitions.hegel.unit.test.ts:111][s-lifecycle] | 1,000 cases per lookup/list family; 0–40 events selected from the current state, including stale generations; compare each prefix and also enumerate state/event pairs |

One exact existing pattern is:

```typescript
const count = testCase.draw(generators.integers({ minValue: 0, maxValue: 40 }));
```

All four use `{ testCases: ..., derandomize: true, database: hegel.Database.disabled }`; the table's linked source anchors show the settings and assertions. The release test uses `generators.sampledFrom` as well as bounded integers ([release test:133–180][s-release-draw]). Its effect observation calls `releaseSignInResponse` with injected ports ([release test:718–787][s-release-observe]); it is not real HTTP, database or provider proof. The other three are transition tests. Their existence and configured counts are not evidence that they passed today.

### Shrinking, seeds, persistence and replay

The installed README demonstrates automatic minimization to a failing input ([README:52–59][h-shrink]). `Settings` exposes `testCases`, `seed: number | null`, `derandomize`, `database`, verbosity, health checks and multiple-failure reporting ([runnerCore.d.ts:17–44][h-settings]). Node defaults are 100 cases, seed null; detected CI enables derandomize and disables the database. Outside CI the database setting is unset, delegated to the engine ([nodeRuntime.js:7–39][h-default-settings]).

The runner passes the chosen seed as `BigInt`, applies derandomization and supports disabled or explicit-path databases; its database key is the test function's source text ([runnerCore.js:275–302][h-configure]). On failure, the engine's reproduction blob is replayed as a final case. Missing blobs or a failure that does not reproduce cause errors ([runnerCore.js:395–435][h-replay]). Final drawn values are printed by the Node runtime ([nodeRuntime.js:80–88][h-final-values]).

**Limit:** the public `test`/`testAsync` settings expose seed and database controls, not a `reproduceFailure` blob-input setting. No `reproduceFailure` declaration was found in the installed `.d.ts` files. Engine-level reproduction exists internally; it should not be described as an established public blob replay API. Likewise, fixed seeds/derandomization control generated choices, not arbitrary external clocks, database history or provider responses. The exact native database persistence/reuse algorithm and cross-version reproducibility were not verified from native engine source.

### Request-schema fuzzing

**Capability supported, endpoint completeness unverified:** Hegel can generate structured candidates and call any synchronous validator, including a Zod schema's `safeParse`. The installed public generator exports and package dependencies expose no Zod-to-Hegel generator integration ([generator exports][h-generators]; [package.json][h-package]). Generator composition is explicit TypeScript code, not automatic enumeration of every public request body.

Switchboard's own examples include a strict lookup body with organization ID and normalized email, and a strict people-list schema with coerced integer, nonnegative, multiple-of-50 offset ([organization-membership.ts:38–52][s-request-schemas]). These illustrate why valid, invalid and coercion-boundary inputs are distinct cases. Hegel's primitives and combinators can express those candidate families; an oracle must still specify expected acceptance/rejection and normalization.

This collection did not inventory all public endpoints or Better Auth's complete endpoint/schema surface. It therefore does **not** establish “every public endpoint body is fuzzed,” or even that each body has a directly exported Zod schema. JSON candidates alone also do not exercise invalid JSON text, transport headers, method routing or admission controls.

### HTTP-level fuzzing

**Capability supported by APIs; integration not run:** `testAsync` can await request calls ([README:61–78][h-async]). The existing harness returns `auth(pathname, RequestInit)` and selects `SIGN_IN_TEST_HOST` as `node` or `cloudflare` ([local-auth-harness.ts:225–229,726–738][s-harness-auth]). Its local browser helper applies cookie/origin headers and performs real fetches ([local-auth-browser.ts:8–38][s-local-fetch]). The loopback listener forwards to the Node listener or the selected Miniflare worker and compares Node invocation receipts ([local-auth-harness.ts:328–364][s-forward]). Thus a Hegel async property can submit generated request bodies through the existing host entry path; that is a source-based fit inference, not an existing campaign receipt.

HTTP/storage cases have side effects. Shrinking and final replay rerun the property body; a reproducible starting state must be supplied for each case/replay. Hegel supplies input search, not an automatic Switchboard backend reset. Source for repeated invocation is [runnerCore.js:363–435][h-replay]; the stateful API explicitly constructs fresh state in each test body ([stateful.d.ts:197–229][h-stateful-run]). No HTTP campaign runtime or reset contract was exercised here.

### Stateful/model-based storage testing

**Yes, a first-class API is installed:** `hegel.stateful.StateMachine<S>` has named `rules` and optional named `invariants`; `run` executes synchronous rules, while `runAsync` awaits asynchronous rules inside `testAsync`. `Pool` stores values produced by earlier rules and offers reusable/consumed generators ([stateful.d.ts:83–137,180–229][h-stateful]). The documented default step budget is 50; swarm selection enables a random subset of rules per case; failing sequences shrink and are reported step by step ([stateful.d.ts:47–79][h-stateful-semantics]).

**Critical condition:** all invariants run initially and finally, but bare invariants are sampled between steps, with probability `1 / stepCount`. `{ check, alwaysCheck: true }` checks each intermediate step. Assumption rejection is not transactional: effects performed before rejection remain ([stateful.d.ts:55–71,100–112][h-stateful-semantics]). The implementation awaits each async operation before moving on ([stateful.js:326–339][h-stateful-async]); the test-case contract calls this a sequential state machine, concurrency 1 ([testCase.d.ts:84–93][h-sequential]).

**Fit inference:** state can contain both an independent model and a real storage adapter, and rules can apply operations to both and compare observed invariants. The library provides sequence search/minimization, pools and invariant scheduling. The model, storage setup/teardown and assertions remain test code. This can investigate sequential storage invariants; it does not by itself prove concurrent transactions, forced interleavings, persistence after restart or host parity. No storage state-machine campaign was implemented or executed in this assignment. Existing B1-C transition-prefix tests manually draw sequences rather than using this stateful runner.

## 3. Fit, cost and risk

| Tool / path | What executed tests could establish | What the collected evidence cannot establish | Runtime cost and risks |
| --- | --- | --- | --- |
| Hegel schema/transition properties | A generated candidate or event prefix violates a supplied schema/model assertion | Exhaustive endpoint coverage, wire parsing, storage effects, browser rendering or deployed provider acceptance | Configurable case count: 100 default; existing tests specify 1,000 or 10,000. Failure adds shrinking/final replay. No timings measured. Over-filtering can reject cases; health checks include too-slow and too-much-filtering ([settings][h-settings], [defaults][h-default-settings], [generator filter][h-generator-core]). |
| Hegel HTTP/storage properties | A generated body/command sequence violates an assertion through the selected real host/storage path, if that path is actually called | Other host parity, concurrency/restart behavior, hosted identity, or correctness of an oracle copied from production | Each case/step pays real request/storage/setup cost; replay multiplies side effects. Stateful invariants default to sampling, and operations are sequential. Magnitude unmeasured; supported by [async][h-async], [stateful semantics][h-stateful-semantics], [runner replay][h-replay]. |
| Bombadil UI exploration | An observed page/action trace violates an exported DOM/console/navigation or domain-specific temporal property | Hidden backend authorization/storage invariants without an observable oracle; all fetch status codes from `noHttpErrorCodes`; all UI states from a bounded campaign; real provider/hosted acceptance on fixture hosts | A real Chrome process, state capture, screenshots and backend are involved. Test wall time is configurable; shrink adds repeated browser replays, with calibration/confirmation. No Switchboard throughput or duration measured ([launcher][b-launch], [run flags][b-run-options], [shrink defaults][b-shrink-options]). |

**Maturity:** Hegel's installed README explicitly says beta and permits breaking changes ([README:1–6][h-beta]). Node uses Koffi/native distribution; the package declares platform-specific optional dependencies ([package.json][h-package]). Bombadil's changelog and shrink manual explicitly document breaking changes and experimental commands, as anchored above. Neither package's version is a substitute for integration validation.

**Flakiness and oracle risks (inferences from those contracts):** external state/time can defeat replay in either tool. Bombadil documents divergence explicitly. Intentional error-page navigation or console errors can violate generic defaults without establishing a Switchboard defect; the actual property must match the behavior being tested. UI action reachability also matters: the default input generator handles text/email/number/textarea and skips file inputs and other input types ([defaults/actions.ts:240–288][b-default-actions]); it cannot be assumed to complete authenticated enrollment from a blank page. Hegel generation cannot independently establish the truth of a reference model copied from production.

### Existing harness compatibility

The harness binds port 0 on `127.0.0.1` and exposes its actual HTTP issuer ([local-auth-harness.ts:417–424][s-loopback]). Its normal browser journey starts that harness, launches Chrome and navigates to `issuer + '/sign-in'` ([native-browser-scenario.ts:111–165][s-native-browser]); a permanent test runs the journey for both Node and Cloudflare ([sign-in-native-browser.host.e2e.test.ts:6–18][s-native-test]). The Node test host uses the real sign-in listener on a loopback dynamic port ([node-auth-proof-host.ts:550–624][s-node-listener]).

**Supported inference:** Bombadil can target this served issuer regardless of which runtime handles it. It needs the harness kept alive, the correct host selected, synthetic state/auth prepared for the intended exploration, and teardown/artifact handling around its process. No adapter or runnable driver was added, and no exact launch/reset/cookie handoff was validated. Bombadil would be another driver over the existing server boundary; its TS specification cannot simply import the Node harness into the limited specification runtime.

The local recipe describes controlled provider/Turnstile responses, software authenticator, injected clock and central models, and explicitly excludes hosted provider/physical-authenticator/central acceptance ([native-browser recipe:22–44][s-native-limits]). Fuzzing those local hosts retains the same proof limits. Browser traces can contain sensitive UI values; the recipe explicitly treats screenshots and session material as private ([recipe:36–44][s-native-limits]).

## Collection ledger and remaining gaps

The five questions collected were browser control/specification, operational replay/install contracts, Hegel API/test adoption, schema/HTTP/stateful fit, and evidence/cost limits. Source classes were local application code and package metadata; OSS architecture lookup followed by primary local source; and installed package source. Saved research, session history, live UI and benchmarks were not needed/authorized. A quick memory keyword lookup supplied no fuzz-testing evidence used in this report. No independent helper was commissioned under this bounded assignment.

**External discovery:** DeepWiki was asked for `antithesishq/bombadil` with the exact local commit and requested pointers to browser/CDP, TypeScript/LTL/defaults/actions, localhost/auth, headless/CI, exits/seeds/replay/shrink and installation/platform files. It returned old `src/` pointers and said it lacked the requested manual/lib contents. The local tree contradicts that layout; primary local anchors above govern. A second query to `hegeldev/hegel-typescript` requested 0.4.10 generator, runner, seed/database/replay, Zod and stateful API pointers; result: **“Repository not found.”** Installed source was the fallback. No current web release/registry survey was performed.

**Verbatim local queries with material results:**

- `rg --files <Switchboard checkout> -g '*.hegel.unit.test.ts'`: one main file, four B1-C files listed above.
- `rg -n 'seed|random' <Bombadil>/lib/bombadil-cli/src <Bombadil>/lib/bombadil/src/random.rs`: browser/terminal `AntithesisRng` and reproduction matches; `random.rs` does not exist. Browser options and runner were then inspected directly; no public seed flag found there.
- `rg -n 'zod|reproduceFailure|reproduce_failure' <installed Hegel>/dist --glob '*.d.ts'`: no matches (exit 1). Public export declarations and settings were separately opened; this is a bounded package API search, not a claim about every third-party adapter.
- `rg -n 'fresh|reset|seed|on.*start|setup' <Bombadil>/docs/manual/src <Bombadil>/lib/bombadil-cli/src/browser.rs`: no application-state seed/reset facility found; matches were unrelated manual introduction/CSS. CLI options were inspected directly.
- Initial `ls` of root B1-C `node_modules/@hegeldev/hegel` failed; the installed package was located in pnpm's store. An initial Bombadil `scripts/*` glob failed because that directory did not exist; package generation was found under `lib/nix/npm-package.nix` instead. These are discovery gaps, not tool execution failures.

**Unverified and left to the Lead:** actual Bombadil binary installation and Chrome startup; live npm/release availability and artifact integrity; localhost integration and synthetic authenticated-state handoff; replay/shrink with restored backend state; HTTP/body endpoint completeness; native Hegel engine persistence/reuse and cross-version seed behavior; actual performance/flakiness; any campaign's execution and pass/fail counts. This report supplies evidence for the Lead's design work and makes no acceptance or shipping claim.

<!-- Absolute primary-source anchors. Labels include line ranges for reading; links select the decisive first line. -->
[brief]: /Users/shravansunder/code/projects/agent-vm.design-portal-remediation/tmp/2026-11-17-fuzz-research/brief.md:1
[b-version]: /Users/shravansunder/Documents/dev/open-source/bombadil/Cargo.toml:26
[b-locate]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-browser/src/chromium/locate.rs:5
[b-launch]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-browser/src/chromium.rs:52
[b-cdp]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-browser/src/browser.rs:185
[b-target]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/browser.rs:193
[b-external]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/browser.rs:107
[b-spec]: /Users/shravansunder/Documents/dev/open-source/bombadil/docs/manual/src/03-specification-language.md:23
[b-extract]: /Users/shravansunder/Documents/dev/open-source/bombadil/docs/manual/src/03-specification-language.md:187
[b-formulas]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil/src/specification/index.ts:63
[b-example]: /Users/shravansunder/Documents/dev/open-source/bombadil/examples/wikipedia.ts:1
[b-default-manual]: /Users/shravansunder/Documents/dev/open-source/bombadil/docs/manual/src/03-specification-language.md:80
[b-properties]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil/src/specification/browser/defaults/properties.ts:4
[b-defaults]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil/src/specification/browser/defaults.ts:1
[b-default-actions]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil/src/specification/browser/defaults/actions.ts:216
[b-actions]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil/src/specification/actions.ts:5
[b-string-actions]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil/src/specification/actions.ts:146
[b-breaking]: /Users/shravansunder/Documents/dev/open-source/bombadil/CHANGELOG.md:200
[b-cookies]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-browser/src/browser.rs:267
[b-import-data]: /Users/shravansunder/Documents/dev/open-source/bombadil/docs/manual/src/03-specification-language.md:59
[b-cli-examples]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/browser.rs:51
[b-run-options]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/browser.rs:155
[b-ci]: /Users/shravansunder/Documents/dev/open-source/bombadil/docs/manual/src/02-getting-started.md:113
[b-exit-doc]: /Users/shravansunder/Documents/dev/open-source/bombadil/docs/manual/src/partials/cli-reference.md:7
[b-exit-code]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/browser.rs:747
[b-inspect]: /Users/shravansunder/Documents/dev/open-source/bombadil/docs/manual/src/04-workflows.md:76
[b-mode]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/browser.rs:592
[b-rng]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/browser.rs:925
[b-replay]: /Users/shravansunder/Documents/dev/open-source/bombadil/docs/manual/src/04-workflows.md:7
[b-shrink]: /Users/shravansunder/Documents/dev/open-source/bombadil/docs/manual/src/04-workflows.md:33
[b-shrink-options]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/bombadil-cli/src/shrink.rs:19
[b-npm]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/nix/npm-package.nix:9
[b-platform]: /Users/shravansunder/Documents/dev/open-source/bombadil/lib/nix/npm-package.nix:133
[b-install]: /Users/shravansunder/Documents/dev/open-source/bombadil/docs/manual/src/02-getting-started.md:3
[b-changelog]: /Users/shravansunder/Documents/dev/open-source/bombadil/CHANGELOG.md:3
[h-package]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/package.json:1
[h-readme]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/README.md:27
[h-entry]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/index.d.ts:242
[h-generators]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/generators/index.d.ts:6
[h-generator-core]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/generators/core.d.ts:11
[h-compose]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/index.d.ts:106
[h-testcase]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/testCase.d.ts:95
[h-shrink]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/README.md:52
[h-settings]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/runnerCore.d.ts:17
[h-default-settings]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/nodeRuntime.js:7
[h-configure]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/runnerCore.js:275
[h-replay]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/runnerCore.js:363
[h-final-values]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/nodeRuntime.js:80
[h-async]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/README.md:61
[h-stateful]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/stateful.d.ts:83
[h-stateful-run]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/stateful.d.ts:197
[h-stateful-semantics]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/stateful.d.ts:47
[h-stateful-async]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/stateful.js:326
[h-sequential]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/dist/testCase.d.ts:84
[h-beta]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/node_modules/.pnpm/@hegeldev+hegel@0.4.10/node_modules/@hegeldev/hegel/README.md:1
[s-package]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/package.json:39
[s-release]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/core-tests/sign-in-response-release.hegel.unit.test.ts:798
[s-invitation]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/core-tests/invitation-view.hegel.unit.test.ts:56
[s-checked]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/core-tests/checked-read-transitions.hegel.unit.test.ts:111
[s-lifecycle]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/core-tests/request-lifecycle-transitions.hegel.unit.test.ts:111
[s-release-draw]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/core-tests/sign-in-response-release.hegel.unit.test.ts:133
[s-release-observe]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/core-tests/sign-in-response-release.hegel.unit.test.ts:718
[s-request-schemas]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-core/src/contracts/organization-membership.ts:38
[s-harness-auth]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/local-auth-harness.ts:726
[s-local-fetch]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/local-auth-browser.ts:8
[s-forward]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/local-auth-harness.ts:328
[s-loopback]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/local-auth-harness.ts:417
[s-native-browser]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/native-browser-scenario.ts:111
[s-native-test]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/sign-in-native-browser.host.e2e.test.ts:6
[s-node-listener]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/packages/sign-in-test-support/src/test-fixtures/node-auth-proof-host.ts:550
[s-native-limits]: /Users/shravansunder/code/projects/switchboard-public.b1c-organizations-finished/.agents/skills/verify-auth/references/native-browser.md:22
