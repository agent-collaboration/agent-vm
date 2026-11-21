# Commission: shadcn inventory of the sign-in navigation design

Role: 🔎 Checker, review duty. This is independent: you did not make the mockups. Model gpt-6.2-sol, xhigh effort. Runs on Sunbook.
Lead: claude-local `cd5902e2-2105-4472-adde-031ae6496e30`, service `0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89`.

## The owner's rule (20 Nov)

"Use shadcn components, do not make anything snowflake." Every element on every screen must be an actual shadcn/ui component, or a documented composition of them (shadcn `ui/` or an official block), or a Better Auth UI view as shipped. Hand-styled elements with a borrowed class recipe don't count.

## Inputs

- The mockups and their component map: `mockups/index.html`, `mockups/NOTES.md` and the 13 PNGs beside this file.
- The agreed structure:
  - tabs Me / People / Machines / Workspaces, with the organization as a header switcher whose menu holds settings, audit and delete;
  - a workspace opens with in-page tabs: Agents, Allowed machines, Live sessions;
  - the person-CLI sign-in is a banner that can't be dismissed (Continue / Cancel) and expires at the CLI's deadline;
  - pending machine logins appear in Machines as "Waiting for approval" with Approve / Deny;
  - after an org switch you land on the first page you're allowed to see (a plain member sees only Me).
- The code: switchboard main `7e32e00e`, read-only in `/Users/shravansunder/code/projects/switchboard-public.verify-sign-in-script` (`git show origin/main:<path>`). Find the repo's shadcn setup: `components.json`, the existing `components/ui/*` in `packages/auth-ui`, `packages/tool-access-ui` and any other UI package, the Tailwind config, and Better Auth UI's version and views.
- shadcn's current docs and registry (ui.shadcn.com, the components and blocks such as the sidebar blocks), and Better Auth UI's docs or source. Cite the URL or file:line.

## Produce `shadcn-inventory.md` beside this file

1. **An inventory table.** For every element on every screen (header, switcher, desktop nav, phone nav, page header, cards, tables, rows, badges, buttons, banner, in-page tabs, empty states, dialogs for Revoke / Approve / Deny / Add passkey / Replace recovery codes, toasts), give:
   - the exact shadcn component or block, with its doc URL;
   - whether it is already in the repo (path) or needs `shadcn add <name>`;
   - the Better Auth UI view it reuses, if any;
   - a verdict: **stock**, **composition** (stock parts, documented pattern) or **snowflake** (hand-made).
2. **For every snowflake,** the shadcn-native replacement, with options from least to most machinery. The phone bottom tab bar is the known one: shadcn has no stock bottom nav. Evaluate options such as:
   - the `Sidebar` mobile `Sheet` (`SidebarTrigger`);
   - `Tabs`;
   - `NavigationMenu`;
   - an official or registry block;
   - a documented composition of `Button` + `Link`.

   For each option, say what it looks like and what it costs. Recommend one.
3. **Better Auth UI:** which of our screens a Better Auth UI view should render as shipped (for example account settings, security, organization members), and where we would diverge, with the reason.
4. **Layout-shift check:** the Me passkey list must not move its controls when it loads. Name the shadcn mechanism used: `Skeleton`, or the action placed in the card header.

Read only. Write only `shadcn-inventory.md`. Message the Lead when done.
