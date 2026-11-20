# Switchboard signed-in navigation mockups

Open [the contact sheet](index.html) for side-by-side comparisons and annotations. Each image links to its full-size PNG. The 13 raster mockups use fictional data. They illustrate navigation and component placement. The controls in the images are static.

## Component map

| Region | Parts and intended behavior |
| --- | --- |
| Desktop navigation | Switchboard’s shadcn `SidebarProvider`, `Sidebar`, `SidebarMenu`, `SidebarMenuItem`, and `SidebarMenuButton` render four route links for the illustrated owner. Use the active style and `aria-current="page"` for the selected destination. |
| Phone navigation | A fixed semantic `nav` contains a list of route links, styled with the shadcn `Button` recipe and Lucide icons above labels. Space the visible links evenly, reserve bottom safe-area space, and pad the scroll content so its last control clears the bar. The plain-member mockup uses one centered Me link. |
| Header and switcher | An outlined `Button` triggers shadcn Base UI `DropdownMenu`. Use a radio group and checked indicator for the current organization, with a separator before the owner actions that apply to it. Adapt Better Auth UI’s `OrganizationSwitcher` menu presentation and use Switchboard’s existing activation and authoritative readback. See [shadcn’s Base UI DropdownMenu](https://ui.shadcn.com/docs/components/base/dropdown-menu). |
| Organization actions | Organization settings can embed Better Auth UI’s `OrganizationSettings` profile pattern. Delete opens a confirmation using the `DeleteOrganizationDialog` pattern and Switchboard’s authorization. Audit is a Switchboard view. |
| Me security | `Card`, `CardHeader`, `CardContent`, `Button`, `Separator`, and `Skeleton` frame Switchboard’s local Better Auth UI-derived components. Keep `PasskeyManager` and the guarded authenticator and recovery actions in `SecurityManagement`. Use `TwoFactorSettings` as the control pattern and `BackupCodes` to display the new codes after replacement. |
| My sessions and invitations | Embed the upstream Base UI examples `ActiveSessions` and `UserInvitations` as standalone sections. Use an explicit shadcn `Button` to start current-session sign-out, following upstream `SignOut` or its `useSignOut` action. The invitation rows expose Accept and Decline. These sections are scoped to the person. |
| People | Keep Switchboard’s `OrganizationPeople` island and its shadcn `Card`, `Table`, role `Badge`, pagination `Button`s, and email `Field` with `InputGroupInput`. The phone version stacks email under name. Better Auth UI’s `OrganizationPeople` is a possible source for member and invitation management controls. The lookup stays with Switchboard’s composition. |
| Machines | Switchboard inventory using `Table` and `Button`. Enroll Mac and Token lifetime sit above the inventory. Each row shows a last-seen value. Revoke would use `AlertDialog` with the Mac’s name and the scope of the action. |
| Workspaces | A primary `Button` for creation and route links separated within a `Card`. Inside a workspace use `TabsList variant="line"`, `TabsTrigger`, and `TabsContent` for Agents, Allowed machines, and Live sessions. Allowed machines has Allow Mac and per-Mac Withdraw. Live sessions is where the permitted Remove session action belongs. |
| CLI sign-in | Place `Alert` and `AlertTitle` below the header while the sign-in is pending. A primary `Button` uses the existing continuation form. Put the dismiss icon `Button` in `AlertAction` and give it an accessible name. |

## Passkey loading and the Add passkey position

The addendum reports a **22 px** shift after the empty-state paragraph appears. [Commission addendum](../mockup-commission.md#addendum-lead-2026-11-20-layout-shift-on-the-passkey-list).

**Choice:** Put Add passkey in the card header, above a divider and outside the changing list. Reserve a row of space below it for a loading `Skeleton`, then use that space for the empty message or first passkey. Match the loading row to the empty row’s minimum block size. Additional passkeys can grow the list downward, below Add passkey. The phone shows the empty row and desktop shows the populated list. The images demonstrate the placement. Browser geometry would need to be measured against the implemented loading and empty states.

## What the drawings surfaced

- **Machines and Allowed machines look similar.** A Mac name can appear in both. Stay visibly under Workspaces on the detail page and name the workspace above its local tabs. Treat **Revoke** as organization-wide and **Withdraw** as workspace-specific in the eventual confirmation copy. A narrow three-column phone table fits the sample data, but longer Mac names may need the last-seen value under the name.
- **The switcher combines selection and administration.** The Owner label beside Acme and the separator make the scopes visible at a glance. In a long menu, those cues can become detached from the owner actions. Keep the action group tied to the currently confirmed organization and open Delete in a named confirmation.
- **A single Me item looks sparse in a full-width bar.** The mockup keeps it for continuity and shows what happens when the other destinations disappear. Removing the bar for a one-destination membership is a separate design choice.
- **Switching from People to a member organization needs a landing rule.** Birch Labs has no People tab in this example. Me is the suggested fallback after readback. The commission settles what destinations the member can see and leaves the route transition open.
- **The CLI alert competes with the Me heading.** A short banner with one action and one dismiss control keeps the rest of the page readable. The drawing leaves the meaning of dismissal and how someone can resume a still-pending sign-in for the design to settle.

## Checked in source

### Switchboard at `7e32e00e993af5ecfcdb8ce366c5f0dea47bf335`

- The local checkout’s `origin/main` and the commissioned short SHA resolved to the same commit. The served theme imports tool-access-ui and auth-ui styles. The tokens define system typography, compact spacing and type, dark neutrals, and blue actions. [Sign-in theme](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/sign-in-core/src/pages/sign-in-theme.css#L1-L7) · [Theme typography](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/tool-access-ui/src/panel-theme.css#L18-L42) · [Theme colors](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/tool-access-ui/src/panel-theme.css#L104-L152).
- The owner role adds organization view and audit, machine actions, workspace creation, and workspace administration to Better Auth’s owner statements. The member role is empty. [Organization access control](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/sign-in-core/src/better-auth/organization-access-control.ts#L4-L21).
- The current chooser posts the selected organization to the provider and reloads to read back the result, including after an ambiguous response. The existing CLI form is wired into the account page and has distinct readiness logic. [Organization chooser island](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/sign-in-core/src/pages/islands/person-organization-choice.tsx#L14-L55) · [Current CLI continuation](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/sign-in-core/src/pages/owner-page.tsx#L228-L260).
- The served factor UI retains a confirmation path and requires one working app or passkey. `PasskeyManager` renders the empty message after query success and places the Add button below it. `TwoFactorSettings` includes enable, disable and recovery regeneration controls. The served factor flow uses its own guarded actions. `BackupCodes` renders returned recovery codes for copying, downloading, or printing. [Served security controls](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/sign-in-core/src/pages/factor-page.tsx#L274-L401) · [PasskeyManager empty state](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/auth-ui/src/components/auth/passkey/passkey-manager.tsx#L65-L72) · [Current Add passkey button](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/auth-ui/src/components/auth/passkey/passkey-manager.tsx#L131-L154) · [TwoFactorSettings](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/auth-ui/src/components/auth/two-factor/two-factor-settings.tsx#L40-L122) · [BackupCodes](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/auth-ui/src/components/auth/two-factor/backup-codes.tsx#L26-L85).
- People already has paginated members, roles, invitations, and membership lookup; selecting an email runs a lookup. The images show a short result set. [Member table and pagination](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/sign-in-core/src/pages/islands/organization-people.tsx#L236-L335) · [Invitations and lookup](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/sign-in-core/src/pages/islands/organization-people.tsx#L336-L425).
- The checkout has a local shadcn Sidebar, the line Tabs variant, and Alert with `AlertAction`. The checked tool-access-ui primitive directory does not contain `dropdown-menu.tsx`. The switcher therefore maps to the matching shadcn Base UI recipe. [Sidebar](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/tool-access-ui/src/components/ui/sidebar.tsx#L441-L533) · [Tabs](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/tool-access-ui/src/components/ui/tabs.tsx#L22-L81) · [Alert](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/tool-access-ui/src/components/ui/alert.tsx#L31-L89) · [Primitive directory](https://github.com/agent-collaboration/switchboard/tree/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/tool-access-ui/src/components/ui).

### Current Better Auth UI Base UI examples at `5767ba5568cf4798b2a222652bfefbf8d57f0152`

- Switchboard’s auth-ui package pins Better Auth UI Core and React at `1.7.34` and records its copied component provenance separately. The upstream checks below concern current example sources. They do not establish that Switchboard ships these additional components. [Switchboard package manifest](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/auth-ui/package.json) · [Local exports and provenance](https://github.com/agent-collaboration/switchboard/blob/7e32e00e993af5ecfcdb8ce366c5f0dea47bf335/packages/auth-ui/src/index.ts#L1-L23).
- The current shadcn Base UI account shell is `Settings`. Its Account and Security tabs, plus optional plugin views, can be hidden with `hideNav`. `SecuritySettings` composes active sessions with optional password, account-link and plugin controls. Use its `ActiveSessions` child with the product’s existing security cards for the pictured Me layout. Upstream `SignOut` signs out on mount, so it belongs behind an explicit action. [Settings navigation](https://github.com/better-auth-ui/better-auth-ui/blob/5767ba5568cf4798b2a222652bfefbf8d57f0152/examples/start-shadcn-baseui-example/src/components/auth/settings/settings.tsx#L66-L139) · [SecuritySettings](https://github.com/better-auth-ui/better-auth-ui/blob/5767ba5568cf4798b2a222652bfefbf8d57f0152/examples/start-shadcn-baseui-example/src/components/auth/settings/security/security-settings.tsx#L22-L36) · [ActiveSessions](https://github.com/better-auth-ui/better-auth-ui/blob/5767ba5568cf4798b2a222652bfefbf8d57f0152/examples/start-shadcn-baseui-example/src/components/auth/settings/security/active-sessions.tsx#L35-L80) · [SignOut](https://github.com/better-auth-ui/better-auth-ui/blob/5767ba5568cf4798b2a222652bfefbf8d57f0152/examples/start-shadcn-baseui-example/src/components/auth/sign-out.tsx#L12-L45).
- `UserInvitations` renders the personal invitation list, loading and empty states. Its row calls the accept and reject mutations. It fits directly under Me. [UserInvitations](https://github.com/better-auth-ui/better-auth-ui/blob/5767ba5568cf4798b2a222652bfefbf8d57f0152/examples/start-shadcn-baseui-example/src/components/auth/organization/user-invitations.tsx#L23-L60) · [UserInvitationRow](https://github.com/better-auth-ui/better-auth-ui/blob/5767ba5568cf4798b2a222652bfefbf8d57f0152/examples/start-shadcn-baseui-example/src/components/auth/organization/user-invitation-row.tsx#L32-L89).
- The current organization shell is `Organization`. It supports `hideNav` and composes Settings, People, optional Teams and Roles, and plugin tabs. The shadcn Base UI example’s similarly named `OrganizationView` instead renders the organization’s identity. `OrganizationPeople` composes the member and invitation tables. `OrganizationSwitcher` uses `DropdownMenu` and exposes a `setActive` callback. `OrganizationSettings` and `DeleteOrganizationDialog` provide the profile and confirmation patterns. Use these narrowly so Switchboard owns the page destinations, membership lookup, and activation readback. [Organization navigation](https://github.com/better-auth-ui/better-auth-ui/blob/5767ba5568cf4798b2a222652bfefbf8d57f0152/examples/start-shadcn-baseui-example/src/components/auth/organization/organization.tsx#L125-L247) · [OrganizationView](https://github.com/better-auth-ui/better-auth-ui/blob/5767ba5568cf4798b2a222652bfefbf8d57f0152/examples/start-shadcn-baseui-example/src/components/auth/organization/organization-view.tsx#L21-L68) · [OrganizationPeople](https://github.com/better-auth-ui/better-auth-ui/blob/5767ba5568cf4798b2a222652bfefbf8d57f0152/examples/start-shadcn-baseui-example/src/components/auth/organization/organization-people.tsx#L14-L28) · [OrganizationSwitcher](https://github.com/better-auth-ui/better-auth-ui/blob/5767ba5568cf4798b2a222652bfefbf8d57f0152/examples/start-shadcn-baseui-example/src/components/auth/organization/organization-switcher.tsx#L33-L115) · [OrganizationSettings](https://github.com/better-auth-ui/better-auth-ui/blob/5767ba5568cf4798b2a222652bfefbf8d57f0152/examples/start-shadcn-baseui-example/src/components/auth/organization/organization-settings.tsx#L20-L51) · [DeleteOrganizationDialog](https://github.com/better-auth-ui/better-auth-ui/blob/5767ba5568cf4798b2a222652bfefbf8d57f0152/examples/start-shadcn-baseui-example/src/components/auth/organization/delete-organization-dialog.tsx#L25-L97).

## Assumptions and limits

- The phone tab-bar pattern, desktop sidebar, inline workspace tabs and names in the images are presentation choices for review. The four destinations and member visibility come from the commission.
- Machines and Workspaces illustrate the assigned organization and workspace action scopes. The images assume inventory, last-seen, allowed-machine, agent and session data for their views. Availability of those product read paths is unverified here.
- The separate Sign out action targets the current browser session in this proposal. Other sessions and invitations use the upstream section patterns. Integration, accessibility, and authorization are outside this static evidence.
- Existing factor warnings, confirmation steps, People pagination, and initial organization selection and Fleet setup still matter. These illustrations cover the assigned post-sign-in destinations and switcher states.
- Image generation approximates the theme and can vary text sizes, selected fills and row density. The pinned product CSS is the reference for tokens. The mockups give layout and interaction placement.

## Generation brief

Used the built-in image generator. The common prompt requested a flat, edge-to-edge Switchboard viewport with charcoal BridgeWeb surfaces, quiet borders, blue actions, system type, compact rectangular controls, a Switchboard header and an Acme switcher. Phone prompts asked for an icon-and-label bottom strip. Desktop prompts asked for a left sidebar. Both used Me, People, Machines and Workspaces in that order and highlighted one destination.

| Images | Prompt focus |
| --- | --- |
| Me, phone and desktop | Put Add passkey in the Passkeys header above the list divider. Show an empty row on phone and one MacBook Pro with Rename and Remove on desktop. Include Recovery codes, Authenticator app, My sessions with Sign out, and a Northstar Studio invitation with Accept and Decline. |
| People, phone and desktop | Show Acme members with roles, a pending invitation and lookup by email. Show email below the name on phone and in a separate column on desktop. |
| Machines, phone and desktop | Include Enroll Mac, Token lifetime, two enrolled Macs, last-seen values and a Revoke action per Mac. |
| Workspaces, phone and desktop | Show Create workspace and linked rows for Release tooling and Design systems. |
| Opened workspace, phone and desktop | Keep Workspaces selected. Show a back link, the Release tooling heading and three local tabs with Allowed machines selected. Include Allow Mac and two Withdraw actions. |
| Switcher open, desktop | Use the People image as the edit target. Overlay the Acme menu with Acme checked as Owner, Birch Labs as Member, and the three current-org owner actions. |
| CLI pending, phone | Use the Me image as the edit target. Insert a CLI sign-in pending alert with the continuation button and a close icon. Preserve the personal controls and four destinations. |
| Plain member, phone | Use the Me image as the edit target. Keep personal content and the Acme switcher. Show only the centered Me destination. |

<details>
<summary>Exact final prompts</summary>

For each new image, concatenate the common prompt, the shared destinations, its viewport prompt, and its scene text in that order with a space between each. The three state images instead use the full edit prompts below with their listed references.

**Common prompt**

> Create one polished, flat, edge-to-edge raster UI mockup for Switchboard's existing signed-in web app. Fill the entire canvas with the UI viewport, without phone hardware, browser chrome, outer margins, title card, or perspective. Match the real app's dark BridgeWeb/shadcn theme: charcoal blue-gray #252a32 page, #252a32 panels, crisp thin #444c59 borders, off-white #ededee text, #bfc4ce supporting text, blue #3b97f5 actions and links, compact practical system sans type, selected nav blue, small Lucide-style outline icons. 8px corner card radius, small rectangular buttons. No gradients, glass, cream, monospace labels, decorative copy, or pill buttons. Top header has 'Switchboard' on left and outlined 'Acme ▾' on right.

**Shared destinations**

> Use exactly four primary destinations, in this order: 'Me', 'People', 'Machines', 'Workspaces'. One selected destination. Icons are person outline, users outline, laptop outline, and folder outline respectively.

**Phone viewport**

> Portrait canvas, target viewport 400×850 in proportion. Header 54px, modest 16px content padding. Primary destinations fill a fixed rectangular bottom navigation strip with four equally spaced icon-above-label links and a thin top border. Ensure the bottom bar and all four labels are complete at the bottom edge.

**Desktop viewport**

> Landscape canvas, target viewport 1280×800 in proportion. Full-width 58px top header, 205px left sidebar with icon-and-label link rows below it, thin sidebar divider, main content starts 40px after divider in a left-aligned column with substantial readable type; use generous negative space appropriately.

**me-phone.png**

> Select Me and show heading 'Me', then 'Security'. The Passkeys card has a SINGLE title header row with 'Passkeys' on its left and a compact outline 'Add passkey' button on the right, at the exact same vertical position as the heading. This header with button is above a horizontal separator. Below that separator is a reserved list row inside the Passkeys card. Show an empty reserved row with text 'No passkeys yet.' in the row. After the passkeys card, stack a separate 'Recovery codes' card with 'Replace recovery codes', then 'Authenticator app' with 'Configured' and 'Manage'. Below, show 'My sessions' with 'Safari on Mac', 'Current', and 'Sign out'. Then 'My invitations' with 'Northstar Studio', 'Accept', 'Decline'. Make the actions and navigation legible. The Passkeys header row is the ONLY place Add passkey appears. The list is below the button. No CLI banner.

**me-desktop.png**

> Select Me and show heading 'Me', then 'Security'. The Passkeys card has a SINGLE title header row with 'Passkeys' on its left and a compact outline 'Add passkey' button on the right, at the exact same vertical position as the heading. This header with button is above a horizontal separator. Below that separator is a reserved list row inside the Passkeys card. Show one list row 'MacBook Pro' with 'Rename' and 'Remove'. After the passkeys card, stack a separate 'Recovery codes' card with 'Replace recovery codes', then 'Authenticator app' with 'Configured' and 'Manage'. Below, show 'My sessions' with 'Safari on Mac', 'Current', and 'Sign out'. Then 'My invitations' with 'Northstar Studio', 'Accept', 'Decline'. Make the actions and navigation legible. The Passkeys header row is the ONLY place Add passkey appears. The list is below the button. No CLI banner.

**people-phone.png**

> Select People. Heading 'People', muted 'Acme'. Show Members table with three rows 'Alex Chen' 'Owner', 'Jules Park' 'Member', 'Morgan Lee' 'Member', with emails on desktop and email under name on phone. A Members section, a separate Invitations section listing 'sam@example.test' as 'Pending', and a 'Membership lookup' section with field label 'Email' and blue 'Look up' button. Keep all three regions visible. Only use legible copy.

**people-desktop.png**

> Select People. Heading 'People', muted 'Acme'. Show Members table with three rows 'Alex Chen' 'Owner', 'Jules Park' 'Member', 'Morgan Lee' 'Member', with emails on desktop and email under name on phone. A Members section, a separate Invitations section listing 'sam@example.test' as 'Pending', and a 'Membership lookup' section with field label 'Email' and blue 'Look up' button. Keep all three regions visible. Only use legible copy.

**machines-phone.png**

> Select Machines. Heading 'Machines', muted 'Acme'. Primary blue 'Enroll Mac' button and a smaller 'Token lifetime' button. Desktop table labels 'Mac', 'Last seen', 'Actions'. Phone stacked rows showing the same data. Two Macs 'Design MacBook Pro', 'Build Mac mini', last seen '2 min ago', 'Yesterday', actions 'Revoke' for each. Restrained status badges optional. No agents or sessions on this screen.

**machines-desktop.png**

> Select Machines. Heading 'Machines', muted 'Acme'. Primary blue 'Enroll Mac' button and a smaller 'Token lifetime' button. Desktop table labels 'Mac', 'Last seen', 'Actions'. Phone stacked rows showing the same data. Two Macs 'Design MacBook Pro', 'Build Mac mini', last seen '2 min ago', 'Yesterday', actions 'Revoke' for each. Restrained status badges optional. No agents or sessions on this screen.

**workspaces-phone.png**

> Select Workspaces. Heading 'Workspaces', muted 'Acme', primary blue 'Create workspace' button. Simple full-width two-row directory or table with chevrons, 'Release tooling' and 'Design systems'. Each row can open its workspace. Do not show global agent or session tables. Keep simple negative space below the list.

**workspaces-desktop.png**

> Select Workspaces. Heading 'Workspaces', muted 'Acme', primary blue 'Create workspace' button. Simple full-width two-row directory or table with chevrons, 'Release tooling' and 'Design systems'. Each row can open its workspace. Do not show global agent or session tables. Keep simple negative space below the list.

**workspace-phone.png**

> Select Workspaces. Use a compact back link '‹ Workspaces' and heading 'Release tooling'. Below its heading, show a small in-page underline tab strip 'Agents', 'Allowed machines', 'Live sessions', with 'Allowed machines' selected. Add a blue 'Allow Mac' button and two rows 'Design MacBook Pro' and 'Build Mac mini', each with a compact 'Withdraw' action. Do not mark the primary Machines link active. Keep local and primary navigation visually distinct.

**workspace-desktop.png**

> Select Workspaces. Use a compact back link '‹ Workspaces' and heading 'Release tooling'. Below its heading, show a small in-page underline tab strip 'Agents', 'Allowed machines', 'Live sessions', with 'Allowed machines' selected. Add a blue 'Allow Mac' button and two rows 'Design MacBook Pro' and 'Build Mac mini', each with a compact 'Withdraw' action. Do not mark the primary Machines link active. Keep local and primary navigation visually distinct.

**switcher-desktop.png · edit people-desktop.png**

> Edit this Switchboard People desktop UI mockup. Preserve all original layout, People content, desktop viewport 1280:800 landscape, nav, and colors. Add only the open menu directly below the Acme switcher on the right, overlaying the People view in the foreground without removing any page content. Compact solid charcoal rectangular DropdownMenu with small 8px corner radius and thin border. Menu contains 'Switch organization' heading; 'Acme' checked with 'Owner' aligned right; 'Birch Labs' with 'Member' aligned right; separator; 'Organization settings'; 'Audit'; 'Delete organization' in muted destructive coral. Keep sidebar and People context visible. No additional changes.

**cli-phone.png · edit me-phone.png**

> Edit this Switchboard Me phone UI mockup. Preserve the same screen dimensions, 400:850 portrait aspect, header, four bottom nav links and the full content, typography, labels, locations within cards, passkey button in its card header, and dark styling. Insert one compact dark bordered Alert immediately below the global header and above the Me heading, shifting Me content down as one block so everything still fits above the fixed bottom navigation. Alert title exactly 'CLI sign-in pending', small close X at right, and one prominent blue rectangular button exactly 'Continue to the management CLI'. No additional explanatory sentence. Keep the other content and component structure identical. No hardware or frame.

**member-phone.png · edit me-phone.png**

> Edit this Switchboard Me phone UI mockup. Preserve the same screen dimensions, 400:850 portrait aspect, header, Acme switcher, full personal content and all 'Me' card controls and labels as given. Change only the bottom navigation: remove the other three destinations entirely and show the active blue Me icon and label centered in the existing strip. No empty slots, separators for other tabs, or text beyond Me in the bottom nav. This is a member role version of precisely the same Me screen. No additional UI. No hardware or frame.

</details>


## Work record

- The 🦁 Lead confirmed that they review these design mockups directly and designated this file as the work log. The [commission](../mockup-commission.md) supplies the artifact scope. No separate execution thread was supplied for this assignment.
- Read the four commissioned reference images and pinned Switchboard sources. DeepWiki provided package pointers. The current upstream Base UI sources provided the component names and navigation behavior used above.
- Incorporated the passkey addendum into both Me views and reused the revised phone layout for the pending CLI and member variants. Used the desktop People image behind the switcher so the open menu stays in context.
- Selected 13 images after visual inspection and resized each to the requested width. The contact sheet pairs the ten core views and annotates all three state examples. It uses local relative image links and opens directly from disk.
- Final artifact check exited 0. A strict HTML5 parse and local link audit passed. All 13 PNGs had a unique linked figure, a mockup label, alt text and a caption. PNG header dimensions matched the HTML attributes and the requested widths for seven phone and six desktop assets. The Machines phone illustration is 400 × 664. The other phone illustrations are 400 × 850.

