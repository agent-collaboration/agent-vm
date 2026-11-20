# Commission: sign-in navigation UI mockups

Role: 🐒 Implementer for a design-evidence task (no product code). Model gpt-6.2-sol, high effort. Runs on Sunbook.
Lead: claude-local `cd5902e2-2105-4472-adde-031ae6496e30`, service `0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89`. The Lead authors the design; you produce the mockups and the evidence behind them.

## Goal

Mock up the navigation for Switchboard's signed-in pages: the account and organization area. Use generated images (your image generation tool) plus annotated examples, so the owner can see and judge the layout before any build.

## Today's problem

These screenshots come from the real app. They are in `reference/` beside this file.
- `cf-passkey-signin.png`: "Your account" crams in the organization, passkeys, recovery codes, the authenticator app and "Continue to the management CLI".
- `cf-org-chooser.png`: the organization chooser.
- `cf-people.png`: People, reachable only from an unstyled admin page. There is no navigation between any of these pages.
- `owner-example-ios-tab-bar.png`: the owner's example of the feel they want, the iOS "Find My" bottom tab bar (People / Devices / Items / Me).

## The agreed structure

The owner confirmed on 20 Nov: four tabs, with the organization as a switcher. The groups follow the permissions in `packages/sign-in-core/src/better-auth/organization-access-control.ts` (switchboard main `7e32e00e`).

| Tab | Responsibility | Contents | Permission |
|---|---|---|---|
| **Me** | The person, in every organization | Passkeys, authenticator app, recovery codes, my sessions and **Sign out**, my invitations (accept/decline) | everyone |
| **People** | Membership | Members, roles, invitations, membership lookup | owner (member and invitation statements) |
| **Machines** | Macs joined to the org | Enrolled Macs, last seen, revoke, token lifetime | `machine: enroll · revoke · setTokenLifetime` |
| **Workspaces** | Where agents work | Create a workspace. Per workspace: its agents, the machines allowed in, live sessions | `workspace: create`, `workspaceAdmin: allowMachine · withdrawMachine · removeSession` |

- **Header:** an organization switcher (`[Acme ▾]`). Its menu holds owner-only Organization settings, Audit and Delete.
- **"Continue to the management CLI":** a dismissible banner, shown only while a CLI sign-in is pending. It is not a tab.
- **A plain member** (the member role has no permissions) sees only **Me**. Mock that state too.

## Design system (use it as shipped)

- **Packages:** shadcn/ui components on Tailwind, with Better Auth UI patterns, in `packages/auth-ui` (`passkey-manager.tsx`, `two-factor-settings.tsx`, `backup-codes.tsx`, …) and the served pages in `packages/sign-in-core/src/pages/`. Read them in a switchboard checkout at main `7e32e00e`: `/Users/shravansunder/code/projects/switchboard-public.verify-sign-in-script` (`git show origin/main:<path>`; don't edit that checkout).
- **Name the exact parts for each region.** For example: shadcn `Sidebar` (desktop), a bottom navigation bar (phone; say how it's built, since shadcn has no stock one), `DropdownMenu` for the switcher, `Tabs`, `Card`, `Table`, `Badge`, `Alert` for the CLI banner, and Better Auth UI's own settings and organization views where they fit. Check Better Auth UI's current account and organization views, and their section navigation, in its source or docs (Better Auth docs MCP or DeepWiki). If a view of theirs already does what we need, say so and use it.
- **Keep the existing look:** the colours, type and spacing in the screenshots, and the product name Switchboard. Avoid the owner's banned defaults: cream backgrounds, italic accent words, "01/02/03" labels, monospace labels, pill buttons, gratuitous gradients, predictable card grids.

## Deliverables (all in `mockups/` beside this file)

1. Generated images, at least:
   - phone (400 px wide) and desktop (1280 px) for each tab: Me, People, Machines, Workspaces, and one workspace opened;
   - the switcher menu open;
   - the CLI-pending banner;
   - the member-only view.
2. For each image, a short annotation: which shadcn and Better Auth UI part makes each region, and what the user can do there.
3. `mockups/NOTES.md`:
   - the component map;
   - anything in the structure above that feels wrong once drawn (say why);
   - what you checked in source or docs (file:line or URL), kept separate from what you assumed.
4. One HTML contact sheet, `mockups/index.html`, showing the images side by side with their annotations. A plain page is fine.

Generated images are illustrations, not screenshots. Label them "mockup". No product code, no commits, no pushes. Message the Lead when done.

## Addendum (Lead, 2026-11-20): layout shift on the passkey list

The PR #10 diagnosis found that the passkey list's empty-state paragraph arrives after the page renders and pushes the **Add passkey** button down by 22 px. A user, or a test, can click where the button used to be. In the Me tab mockup, reserve the list area so that controls don't move when the list loads: a skeleton or a fixed slot, or the action placed above the list. Say which one you chose and why.
