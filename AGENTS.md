# AGENTS.md

## Purpose & Overview

This repository is a **production-ready, universal React Native + Expo Starter Boilerplate** designed for rapidly scaffolding new mobile applications with clean architecture, enterprise authentication guards, a comprehensive atomic UI design system, type-safe theming, and modern DevOps tooling.

Use this file as the primary technical reference and architectural blueprint for building features, adding screens, and maintaining code quality.

---

## Technology Stack

- **Framework:** [Expo](https://expo.dev) (SDK 55) with [React Native](https://reactnative.dev) (0.83) and React (19)
- **Navigation & Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (v55, file-based routing with typed routes)
- **Language:** TypeScript (strict mode enabled)
- **Styling & Theming:** `styled-components/native` with Figma-aligned semantic tokens
- **Primitives Library:** `@rneui/base` encapsulated exclusively through `src/ui`
- **Server State & Networking:** `@tanstack/react-query` (v5) + Axios with automatic JWT refresh interceptors
- **Client State:** [Zustand](https://github.com/pmndrs/zustand) (v5) with AsyncStorage persistence
- **Performance:** `@shopify/flash-list` (v2), `react-native-reanimated` (v4), `react-native-gesture-handler`
- **Asset Pipeline:** `react-native-svg-transformer` + typed SVG icon registry

---

## Repository Structure & Folder Map

```text
assets/
  fonts/                   # Custom fonts (SpaceMono, Google Fonts)
  icons/                   # Raw SVG icon assets + typed barrel export index.ts
  images/                  # App icon, adaptive icon, splash screen, raster assets
src/
  app/                     # Expo Router file-based route definitions and layouts
    _layout.tsx            # Root layout: font loading, splash screen sync, root providers
    index.tsx              # Root entry redirect (routes to /protected or /unprotected)
    +not-found.tsx         # Universal 404 unmapped route handler
    unprotected/           # Public authentication group
      _layout.tsx          # Public stack layout with authenticated-user redirect
      onboarding/          # Welcome screen with Demo Sign In action
      authentication/      # Phone input and login/signup mode selection
      otp/                 # Passcode verification with demo fallback
    protected/             # Authenticated route group
      _layout.tsx          # Guard layout (redirects unauthenticated sessions)
      index.tsx            # Redirects to /(tabs)/home
      modal.tsx            # Modal presentation example (presentation: 'modal')
      (tabs)/              # Bottom tab navigator
        _layout.tsx        # Bottom tab bar with animated indicator
        home/              # Starter dashboard showcasing atoms & state
        explore/           # Search & list template powered by FlashList
        profile/           # User profile, theme toggle (Dark/Light), sign out
      items/
        [id].tsx           # Dynamic detail route reading route params
  components/              # Reusable molecular & organism feature components
    action-list/           # Settings and list item rows with icon/switch
    document-picker/       # File upload & document selection wrapper
    error-boundary/        # React error handling boundary
    media/                 # Optimized remote image handling with CDN sizing
    network-boundary/      # Offline detection banner with NetInfo
    profile-image-picker-view/ # Avatar upload and presentation
    profile-photo/         # User avatar display
    skeleton/              # Generic animated shimmer & placeholder cards
  configs/                 # Environment and build runtime configuration
  constants/               # Global constants, colors, theme tokens, starter datasets
  helpers/                 # Layout primitives (StyledSafeAreaView, StyledRowView, StyledPageWrapper)
  hooks/                   # Custom reusable React hooks (queries, networking, lifecycle)
  navigation/              # Custom tab bar button components and layout styles
  providers/               # Context providers (Theme, StyledTheme, Query, Auth, User, App, Modal)
  services/                # Core infrastructure (Axios API client, SecureStore, Toast)
  stores/                  # Zustand client stores (e.g., app-store.ts)
  theme/                   # styled-components theme objects and typography engines
  types/                   # Shared TypeScript interfaces, HTTP payloads, and declarations
  ui/                      # 26 atomic UI primitives (Button, Card, TextInput, Badge, Icon, etc.)
  utils/                   # Small domain-neutral utility functions (datetime, formatting)
```

---

## Routing & Navigation Guidelines (Expo Router)

1. **Route Groups & URL Segments:**
   - Parentheses (e.g. `(tabs)`) group routes and assign layouts without adding segments to the URL path.
   - Dynamic route segments use square brackets: `items/[id].tsx` captures `useLocalSearchParams<{ id: string }>()`.
   - Modals are registered in the parent Stack layout with `options={{ presentation: 'modal' }}`.
2. **Thin Route Files:**
   - Keep files inside `src/app/` thin. Route files should focus on layout coordination, parameter retrieval, and rendering a view component from `src/tabs/`, `src/screens/`, or direct compositions.
3. **Route Guards & Auth Boundary:**
   - `src/app/protected/_layout.tsx` checks `hasUserLoggedIn` from `useAuth()`. If `false`, it safely redirects to `/unprotected` without flashing protected content.
   - Public screens in `src/app/unprotected/_layout.tsx` redirect to `/protected` if the user is already authenticated.
   - For frictionless local development, the demo auth adapter provides instant entry via **Demo Sign In**.

---

## UI System & Theming Architecture

### Strict Atomic Primitives (`src/ui/`)

Always prefer existing atoms from `src/ui/` rather than creating redundant wrappers or importing directly from third-party UI libraries:

- **Buttons:** `import Button from '@/ui/button'` (types: `'solid' | 'outline' | 'clear'`)
- **Typography:** `import Text from '@/ui/text'` (variants: `h1`, `h2`, `h3`, `h4`, `body_xl`, `body_lg`, `body_md`, `body_sm`, `body_xs`)
- **Cards:** `import Card from '@/ui/card'` (props: `paddingVertical`, `paddingHorizontal`, `radius`, `color`)
- **Inputs:** `import TextInput from '@/ui/text-input'`, `OtpInput from '@/ui/otp-input'`
- **Badges & Tags:** `import Badge from '@/ui/badge'`
- **Toggles & Switches:** `import { Toggle } from '@/ui/toggle'`, `SegmentedToggle from '@/ui/segment-toggle'`
- **Drawers & Sheets:** `import BottomDrawer from '@/ui/bottom-drawer'`
- **Icons:** `import Icon from '@/ui/icon'` or `SvgIcon from '@/ui/svg-icon'`

### Styling Standards

1. **Use `styled-components/native`:**
   Always import `styled` as a named import:
   ```ts
   import { styled } from 'styled-components/native'
   ```
   _(Do NOT use `import styled from 'styled-components/native'`)_.
2. **Never Hardcode Colors or Spacing:**
   Always use semantic theme tokens:
   - Colors: `props.theme.colors['color-surface-bg-primary']`, `props.theme.colors['color-primary-300']`, `props.theme.colors['color-neutral-800']`.
   - Spacing: `props.theme.spacing.sm`, `props.theme.spacing.md`, `props.theme.spacing.lg`.
   - Border Radius: `props.theme.borderRadius.md`.
3. **Shared Layout Bases:**
   Use layout helpers from `@/helpers/styles` for consistent page padding and safe areas:
   - `StyledSafeAreaView`: Safe area container with theme background
   - `StyledPageWrapper`: Consistent horizontal and vertical screen padding
   - `StyledRowView`: Flex row with align-items center

### Component Folder Convention

Every new screen or major feature component should live in its own directory:

```text
src/components/my-feature/
├── index.tsx          # Component presentation & JSX
├── styles.ts          # Local styled components
├── typings.ts         # TypeScript interfaces (MyFeatureProps)
└── helpers.ts         # (Optional) local utilities or pure transform functions
```

Avoid coupling styles across different screens. Keep local `styles.ts` decoupled to avoid side effects during refactoring.

---

## Asset & Icon Pipeline

### Adding SVG Icons

1. Place the raw `.svg` file into `assets/icons/`.
2. Add a camelCase export in `assets/icons/index.ts`:
   ```ts
   export { default as myNewIcon } from './my-new-icon.svg'
   ```
3. Use anywhere in the application via:
   ```tsx
   <Icon name="myNewIcon" color="color-primary-300" size={24} />
   ```
   Icons automatically inherit tint colors from theme semantic tokens.

### Adding Images

1. Place raster assets (`.png`, `.jpg`, `.webp`) in `assets/images/`.
2. Add a prefixed named export in `assets/images/index.ts`.
3. Render with `<AppImage name="myImage" />` or standard `Image` from `@/ui/image`.

---

## State & Data Management

1. **Server State (TanStack React Query v5):**
   - Place query hooks in `src/hooks/queries/` (e.g. `use-items.ts`).
   - Define query keys in `src/services/query-keys.ts`.
   - Use Axios client in `src/services/api/index.ts` which handles authorization headers and token refresh queueing.
2. **Client State (Zustand v5):**
   - Place client stores in `src/stores/` (e.g. `src/stores/app-store.ts`).
   - Use `persist` middleware with `AsyncStorage` for state that survives app restarts.
3. **Auth & User Context:**
   - Access session state using `useAuth()` (`hasUserLoggedIn`, `authenticateUser`, `logoutUser`).
   - Access user profile using `useUser()` (`userProfile`, `setUser`, `resetUser`).

---

## Quality Gates & Verification

Before finalizing or committing any changes, run the project quality checks:

```bash
npm run typecheck    # Verifies TypeScript integrity with zero errors
npm run lint         # Runs ESLint 9 checks
npm run formatcheck  # Verifies Prettier code formatting
```

### Pre-Commit Hooks (Husky)

The repository automatically executes `lint-staged` on staged files upon commit. Staged `.ts`, `.tsx`, `.json`, and `.md` files are formatted with Prettier and fixed with ESLint before the commit is accepted.
