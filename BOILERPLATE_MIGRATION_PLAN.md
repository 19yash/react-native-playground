# Expo React Native Boilerplate Migration Plan

## Goal

Turn this repository into a reusable Expo + React Native + TypeScript starter for building different kinds of apps. Preserve the useful engineering patterns—Expo Router, authentication, reusable UI, theming, asset handling, scripts, and repository conventions—while removing fashion, travel, logistics, and other product-specific flows and content.

The result should be a working starter application, not an empty template. It should include a small authenticated app example and explain how to adapt or extend it. Authentication is part of the default architecture; business features and optional infrastructure should not be imposed on every app.

## Principles and decisions

- Keep the default stack focused on Expo, React Native, TypeScript, Expo Router, styled-components, and the existing theme/UI foundation.
- Keep authentication in the default starter: public sign-in/onboarding routes, protected routes, auth state, and a clearly marked demo implementation that can be replaced by a real identity provider or backend.
- Demonstrate Expo Router conventions with tabs, a stack detail route with a dynamic parameter, a modal route, a not-found route, and deep-link configuration/documentation.
- Treat TanStack Query, Zustand, Axios, storage adapters, media/picker modules, and advanced UI controls as explicit starter choices. Retain a choice when it is already integrated and useful, but document its purpose and removal/replacement steps. Avoid adding another library just to demonstrate an architecture pattern.
- Keep reusable components and patterns, not every component that happens to be in `src/ui` or `src/components` today. Classify each existing item before changing it.
- Do not delete files based only on their names. Check imports, route references, asset indexes, configuration, and package usage first.
- Keep secrets and machine-specific endpoints out of the repository. Commit `.env.example`; ignore actual environment files.
- Do not commit generated native projects unless the repository deliberately adopts a checked-in native workflow. Document the chosen Expo workflow and verify it from a clean checkout.

## Current-state findings to account for

- The current `AGENTS.md` describes a fashion e-commerce app and says to preserve legacy files. It must be replaced as part of this migration, because those instructions conflict with the generic starter objective.
- `readme.md` is also fashion-specific and currently includes a private-network example URL and production environment files as setup instructions. Replace it with generic setup and safe environment guidance.
- `app.config.ts` currently defaults to production and hardcodes the app name fallback, bundle/package identifiers, URL scheme, and an example domain. These need explicit project configuration and safe defaults.
- The current route tree contains protected and unprotected groups, but protected layout logic redirects to product-era routes. Preserve the authenticated/public pattern and replace the redirects with neutral starter routes.
- `src/ui`, `src/components`, `src/constants`, `src/mock`, and `assets` contain a mixture of generic foundations and fashion, travel, and logistics content. A reference audit is required before removal.
- The current pre-commit hook runs a whole-project typecheck and format check as well as lint-staged. Decide whether whole-repository checks belong in CI and keep the commit hook appropriately fast.
- The existing documentation mentions known typecheck errors. Recheck the current baseline during Phase 0 and record exact output instead of assuming those issues remain unchanged.

## Target repository structure

Use this as a target shape, adapting existing paths where a rename would add risk without value:

```text
assets/
  fonts/
  icons/
  images/
src/
  app/                       # Expo Router route files and layouts
    (public)/                # Sign-in, onboarding, password recovery, etc.
    (app)/                   # Authenticated route group
      (tabs)/                # Example Home and Profile tabs
      items/[id].tsx         # Example dynamic detail route
      modal.tsx              # Example modal route
    +not-found.tsx
  components/                # Feature-level reusable compositions
  constants/                 # Theme and app-wide constants only
  hooks/                     # Reusable hooks
  providers/                 # Root and feature providers
  services/                  # API/auth/storage adapters, as applicable
  stores/                     # Client state, if Zustand remains enabled
  theme/                      # Theme definitions and typography
  types/                      # Shared types and declarations
  ui/                         # Generic branded primitives
  utils/                      # Small domain-neutral utilities
```

The precise group names are implementation choices. Document that Expo Router maps files and directories under the configured app directory to URLs, route groups in parentheses organize layouts without adding URL segments, `[id]` creates a dynamic segment, and `_layout` files define nested navigation boundaries. Keep route files thin and move reusable screen UI/logic into components or screen modules when useful.

## Inventory method: keep, generalize, optional, remove

Before deleting or moving code, make a migration inventory with these columns: path, current purpose, references/consumers, dependencies, decision, follow-up action. Apply these definitions:

- **Keep:** domain-neutral functionality already used by the starter, such as error handling, generic buttons, text inputs, theme/provider plumbing, or asset transformation.
- **Generalize:** useful behavior with product-specific names, copy, types, visuals, or assumptions that should become neutral.
- **Optional example:** useful but not required in every app, or requires a native/dependency choice. Document it and its dependency rather than presenting it as universally necessary.
- **Remove:** domain-only implementation with no generic reuse value after confirming no remaining route, import, configuration, or asset references.

Audit at minimum:

- Routes, tabs, screen exports, redirects, and deep-link configuration.
- Components, hooks, stores, contexts, providers, services, and constants.
- Image/GIF/SVG/font files and every asset barrel export.
- Package dependencies and native config plugins.
- Scripts, environment files, Git hooks, editor settings, and docs.

Suggested read-only searches include `rg -n "trip|carrier|shipment|fashion|product|travel|booking" src assets app.config.ts app.json readme.md AGENTS.md`, searches for imports of each proposed removal, and package-name searches across source/config files. Search results are review aids; decide from actual use, not keyword matches alone.

## Detailed migration phases

### Phase 0 — Establish baseline and freeze the target

- [x] Confirm the repository is clean or record existing user changes before starting implementation.
- [x] Record current Expo/React Native/Node/npm versions from project config and lockfile. Do not casually upgrade framework dependencies during this migration.
- [x] Record current `npm run typecheck`, `npm run lint`, and `npm run formatcheck` results, plus whether the app starts in Expo Go/development build and which platforms are supported.
- [x] Inspect Expo config, root and nested layouts, auth/user/theme/query providers, scripts, Husky hook, aliases, and SVG/font setup.
- [x] Agree that authentication is included in the default starter and mark the current auth flow as demo/replacement-ready until a real provider is configured.
- [x] Create the keep/generalize/optional/remove inventory before destructive cleanup.

**Exit criteria:** Baseline results and inventory exist; migration scope is explicit; pre-existing failures are distinguishable from new failures.

### Phase 1 — Secure and neutralize project configuration

- [x] Replace the current hardcoded app identity with documented project variables or clearly marked placeholders for display name, iOS bundle identifier, Android package, and URL scheme.
- [x] Avoid a silent production default for local development. Choose a predictable local default and validate unsupported `APP_ENV` values with a clear error.
- [x] Keep app identity separate from environment selection: development/preview/production values should not accidentally change a newly created app's identifiers without an explicit configuration choice.
- [x] Add `.env.example` containing names and safe placeholders only. Document which variables require `EXPO_PUBLIC_` and that those values are embedded in the client bundle and must never be secrets.
- [x] Ensure `.env*` local files are ignored, with `.env.example` explicitly allowed. Do not commit `.env.development`, `.env.preview`, or `.env.production` containing real endpoints or credentials.
- [x] Decide whether dotenv files are needed for the starter at all. For build profiles, document the chosen Expo/EAS mechanism if applicable rather than implying local dotenv files are production secret management.
- [x] Remove or replace `yourdomain.com`, private LAN addresses, `com.anonymous...`, and `reactnativeplayground` values. Explain how to configure associated domains and deep links when an app needs them.
- [x] Review `app.json` and `app.config.ts` for duplicated or conflicting values and keep a clear source of truth.

**Exit criteria:** A fresh clone can configure its identity without editing source logic; no live endpoint or secret is committed; invalid environment configuration fails clearly.

### Phase 2 — Create the generic authenticated route example

- [x] Keep a public auth flow in the default starter, with sign-in and at least one supporting example such as onboarding or password recovery. Keep the UI generic and label mock/demo behavior honestly.
- [x] Keep an authenticated app group guarded by the auth state. Ensure loading, signed-out, signed-in, and sign-out transitions do not flash protected content or create redirect loops.
- [x] Replace product-specific tabs with a deliberately small example, such as Home and Profile. Include a clear logout action. The route structure should be easy to change without requiring the starter's exact tab taxonomy.
- [x] Add a dynamic route such as `items/[id].tsx`; document reading and typing the route parameter, validation for missing/invalid IDs, and navigation with a parameter.
- [x] Add a modal route and show how it is registered/presented in the relevant `_layout` stack. Document dismiss and deep-link behavior.
- [x] Add `+not-found.tsx` and a way to return to a valid route.
- [x] Configure a neutral URL scheme and document testing a deep link on iOS and Android. Include how route paths, query parameters, dynamic segments, and app scheme/associated domains relate.
- [x] Document filesystem routing: route files become screens; `_layout.tsx` nests Stack/Tabs; `(group)` folders organize without affecting the URL; dynamic `[param]` folders capture path segments; special files such as `+not-found.tsx` handle unmatched paths.
- [x] Keep route modules focused on navigation and screen composition; do not place API/business behavior in layouts unless it is cross-route access control/provider logic.

**Exit criteria:** Public and protected navigation works; auth state transitions are demonstrable; dynamic detail, modal, unknown route, and deep-link examples are documented and manually verified.

### Phase 3 — Clean up domain implementation and assets

- [x] Use the inventory to remove fashion/travel/logistics routes and feature modules, including legacy names such as `create-trip`, `review-trip`, and `search-carrier`, after confirming references.
- [x] Generalize or remove e-commerce/travel mock data and constants. Keep a tiny neutral mock dataset only if it supports the generic list/detail example.
- [x] Review `src/components` individually. Likely generic candidates (subject to usage audit) include error boundary, network boundary, profile photo, action list, and skeleton foundations. Product-specific media, trip cards, offer, sizing, and widget modules should be removed or retained only as documented optional examples when they offer reusable value.
- [x] Review `src/ui` individually. Keep core primitives that are neutral and used by the starter. Mark specialized OTP, date/time, week-calendar, media, gradient, drawer, and picker dependencies as optional where appropriate; remove unused packages only after checking transitive and native config use.
- [x] Replace the current fashion-specific token names/palette with neutral semantic tokens while preserving light/dark theme support and the existing token-driven styling approach. Keep sample brand colors clearly identified as easy-to-replace defaults.
- [x] Decide which typography/font assets are starter defaults. Remove unused Bebas Neue/Montserrat/Manrope fonts if no generic sample needs them; document how to add fonts and avoid requiring external download at runtime.
- [x] Remove unused fashion, travel, carrier, sender, and transport imagery/GIFs. Preserve app icon/splash placeholders needed to boot, and provide explicit replacement instructions.
- [x] Update `assets/icons/index.ts`, image/GIF indexes, SVG module declarations, and component references together. Confirm every exported asset exists and no removed asset is imported.
- [x] Check `metro.config.js`, `babel.config.js`, `tsconfig.json`, Expo config plugins, and package dependencies against remaining features. Remove only packages proven unused; do not reduce useful native setup blindly.

**Exit criteria:** No domain-specific user-facing route/copy or unused domain asset exports remain; retained optional modules and dependencies are documented; the starter still builds its neutral examples.

### Phase 4 — Define and document architecture and conventions

- [x] Rewrite `AGENTS.md` as durable project guidance for contributors and coding agents, not a product brief. Include stack, source-of-truth folder map, route rules, auth boundary, state/data ownership, UI/theming, assets/icons, scripts/hooks, aliases, naming, and safe migration practices.
- [x] Explain separation of concerns with examples: route/layout handles navigation and access boundaries; screen composes feature UI; `ui` holds generic primitives; `components` composes primitives for reusable features; services handle external I/O; hooks expose reusable behavior; stores hold client state; query cache holds server state when enabled.
- [x] Document file naming and component folder conventions. Avoid requiring empty `styles.ts`, `typings.ts`, or `helpers.ts` files when a component does not need them.
- [x] Document styling: theme tokens, styled-components conventions, type-safe style props, safe-area/keyboard handling, and when inline styles are appropriate for dynamic/animated values.
- [x] Document the icon pipeline: add SVG under `assets/icons`, add typed export, use the shared icon wrapper, and verify SVGs avoid unsupported constructs. Document raster asset exports and font loading too.
- [x] Rewrite `readme.md` into a practical getting-started guide: prerequisites, clone/install, configure app identity/env, run iOS/Android/web if supported, auth demo behavior, route examples, theme/UI examples, asset process, quality scripts, native build/EAS guidance, and common troubleshooting.
- [x] Explain each script and whether it expects generated `ios/`/`android/` directories. Remove or update scripts like `android:build:prod` if they assume native folders that are not checked in.
- [x] Document choices and replacement instructions for TanStack Query, Zustand, Axios, storage, network status, animations, and optional UI packages. State which are core, which are examples, and how to remove them cleanly.

**Exit criteria:** A developer unfamiliar with the repository can create a new screen, protected route, dynamic route, modal, themed component, and SVG icon by following only the docs.

### Phase 5 — Right-size scripts and hooks

- [x] Keep scripts consistently named and environment-aware where environment selection is actually needed. Provide clear `start`, `android`, `ios`, `typecheck`, `lint`, and `formatcheck` commands, plus optional platform/build commands that match the supported workflow.
- [x] Decide whether `lint-staged` runs ESLint and Prettier on staged source and formatting on docs/config. Keep the pre-commit hook fast; move full project typecheck/format checks to CI or a documented pre-push/CI command unless measured runtime is acceptable.
- [x] Ensure Husky setup works after a clean dependency install (`prepare`) and explain that hooks may depend on Git being initialized.
- [x] Add/adjust CI only if the repository's chosen hosting setup is known; otherwise document the commands required for CI without baking in a provider.
- [x] Check `.gitignore`, `.prettierignore`, ESLint config, VS Code settings, `.nvmrc`, and lockfile policy. Keep machine-independent editor defaults only.

**Exit criteria:** Hook behavior is clear and proportionate; scripts work in the documented workflow; no script relies on undocumented local files.

### Phase 6 — Verify, review, and publish the starter baseline

- [x] Install from the lockfile using the documented package manager.
- [x] Run typecheck, lint, and format check; compare against Phase 0 and resolve migration-caused failures.
- [x] Start Expo and verify public auth, protected route, logout, tab navigation, dynamic parameter, modal presentation/dismissal, not-found fallback, and deep-link entry.
- [x] Verify the app icon, splash, fonts, SVG icons, and at least one image render after cleanup.
- [x] Search for stale fashion/travel/logistics copy, old route names, old app identifiers, old URLs, and references to removed modules.
- [x] Check `git diff` for accidental secrets, generated output, lockfile churn unrelated to the migration, and deletions outside the approved inventory.
- [x] Record any platform limitation or remaining baseline issue in the README with reproduction details; do not claim a clean baseline if a check still fails.

**Exit criteria:** The documented clean-clone workflow succeeds on the supported platform(s), all retained example routes work, and remaining limitations are explicit and reproducible.

## Completion checklist

- [x] Neutral Expo app identity and safe environment setup.
- [x] Authentication included with replaceable demo adapter and protected route example.
- [x] Public/protected layouts, example tabs, dynamic detail route, modal route, not-found route, and deep-link guidance.
- [x] Generic UI/theme/icon/font/image foundations retained and documented.
- [x] Product-specific code/assets removed only after reference audit.
- [x] `AGENTS.md` and README describe the generic boilerplate rather than the old fashion application.
- [x] Scripts, dependencies, Husky hooks, and documented Expo native workflow agree with the actual repository.
- [x] Clean-clone verification completed and results recorded.
