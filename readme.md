# Expo React Native Starter Boilerplate

A production-grade, universal mobile starter boilerplate built with **React Native**, **Expo (SDK 55)**, **TypeScript**, and **Expo Router**.

Designed to give engineering teams and solo builders a clean, scalable architectural baseline for any mobile application—with authentication guards, atomic UI primitives, dynamic routing, type-safe theming, and automated code quality gates pre-configured.

---

## Features

- **Expo Router Navigation:** File-based navigation featuring authenticated route guards, custom bottom tabs, dynamic segments (`items/[id]`), modal presentations, and universal 404 handling.
- **26 Atomic UI Primitives (`src/ui`):** Comprehensive design system primitives (`Button`, `Card`, `TextInput`, `Badge`, `Icon`, `BottomDrawer`, `Toggle`, `SegmentToggle`, `Loader`, etc.) completely decoupled from business logic.
- **Figma-Aligned Token Theming:** Type-safe theme engine supporting instant Dark and Light mode switching with semantic color tokens and typography variants.
- **Authentication System:** Public onboarding and OTP sign-in flows with SecureStore JWT persistence and a zero-friction **Demo Sign In** mode for immediate testing.
- **State & Data Stack:** TanStack React Query v5 for server caching and Axios with automatic JWT token refresh interceptors + Zustand v5 for client persistence.
- **Performance First:** Built with `@shopify/flash-list` (v2), `react-native-reanimated` (v4), and `react-native-gesture-handler`.
- **SVG & Asset Pipeline:** Automatic SVG icon compilation (`react-native-svg-transformer`) with dynamic theme color tinting and splash-screen-synchronized font loading.
- **Quality Gates:** Husky pre-commit hooks, `lint-staged`, ESLint 9, Prettier, and strict TypeScript checks.

---

## Quick Start

### 1. Prerequisites

- **Node.js:** v20+ (recommended v20.20+ or v24 as defined in `.nvmrc`)
- **Package Manager:** npm (v10+)
- **Expo Go** app on your physical device OR an iOS Simulator / Android Emulator

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd expo-react-native-starter

# Install dependencies exactly as locked
npm install
```

### 3. Environment Configuration

Copy the example environment template:

```bash
cp .env.example .env.development
```

Configure your variables in `.env.development`:

```properties
APP_ENV=development
EXPO_PUBLIC_BASE_URL=https://api.example.com/v1
EXPO_PUBLIC_APP_VARIANT=development
```

> **Note on Security:** Variables prefixed with `EXPO_PUBLIC_` are embedded into the client bundle at build time. Never place private secrets or sensitive API credentials in `EXPO_PUBLIC_` variables.

### 4. Running the App

Launch the Expo Metro development bundler:

```bash
npm start
# or explicitly in dev mode:
npm run start:dev
```

In the interactive terminal:

- Press `i` to launch on the **iOS Simulator** (macOS with Xcode)
- Press `a` to launch on an **Android Emulator**
- Scan the displayed QR code with the **Expo Go** app on your physical iOS or Android phone

---

## How to Customize & Rebrand for Your New App

### 1. Rename App Identity & Bundle Identifiers

Open `app.json` and `app.config.ts`:

- **App Display Name:** Change `"name": "Your App Name"`
- **Project Slug:** Change `"slug": "your-app-slug"`
- **iOS Bundle ID:** Update `"bundleIdentifier": "com.yourcompany.yourapp"`
- **Android Package:** Update `"package": "com.yourcompany.yourapp"`
- **Deep Link Scheme:** Update `"scheme": "yourapp"`

You can also override these dynamically via environment variables in `.env.development` or CI:

```properties
APP_NAME="My New App"
APP_SCHEME="mynewapp"
APP_BUNDLE_ID="com.mycompany.app"
```

### 2. Replace Icons & Splash Screens

Replace the default placeholders in `assets/images/`:

- `icon.png`: 1024x1024 app icon
- `adaptive-icon.png`: 1024x1024 Android adaptive foreground icon
- `splash-icon.png`: Splash screen brand icon

### 3. Customize Colors & Themes

- Edit semantic color tokens in `src/constants/colors.ts`.
- Adjust spacing, radius, and typography scales in `src/constants/theme.ts`.

---

## Route Architecture Overview

```text
src/app/
├── _layout.tsx              # Root shell: Splash screen, Theme, Auth, Query providers
├── index.tsx                # Entry router (redirects to /protected or /unprotected)
├── +not-found.tsx           # 404 unmapped route handler
├── unprotected/             # Public authentication flow
│   ├── onboarding/          # Welcome screen (has Demo Sign In button)
│   ├── authentication/      # Phone entry form
│   └── otp/                 # Verification code screen
└── protected/               # Authenticated application
    ├── (tabs)/              # Main tab navigation
    │   ├── home/            # Overview dashboard demonstrating UI primitives
    │   ├── explore/         # FlashList search & filter list
    │   └── profile/         # Account details, theme switcher, sign out
    ├── items/[id].tsx       # Dynamic detail screen demonstrating route params
    └── modal.tsx            # Modal presentation screen (options={{ presentation: 'modal' }})
```

---

## Adding New Features

### Adding an SVG Icon

1. Drop your `.svg` file into `assets/icons/`.
2. Add a named export to `assets/icons/index.ts`:
   ```ts
   export { default as myIcon } from './my-icon.svg'
   ```
3. Use anywhere in JSX:
   ```tsx
   <Icon name="myIcon" color="color-primary-300" size={24} />
   ```

### Creating a New Component

Follow the repository's decoupled component convention:

```text
src/components/user-card/
├── index.tsx      # Main component code
├── styles.ts      # Local styled-components
├── typings.ts     # TypeScript interfaces
└── helpers.ts     # Local helper utilities (if needed)
```

---

## Available Scripts

| Command                 | Description                                                    |
| :---------------------- | :------------------------------------------------------------- |
| `npm start`             | Starts Metro bundler in development mode                       |
| `npm run start:dev`     | Starts bundler with `APP_ENV=development`                      |
| `npm run start:preview` | Starts bundler with `APP_ENV=preview`                          |
| `npm run start:prod`    | Starts bundler with `APP_ENV=production`                       |
| `npm run android`       | Compiles and launches app on connected Android emulator/device |
| `npm run ios`           | Compiles and launches app on iOS simulator (macOS only)        |
| `npm run typecheck`     | Runs TypeScript static type analysis (`tsc --noEmit`)          |
| `npm run lint`          | Runs ESLint 9 across all project files                         |
| `npm run lint:fix`      | Automatically fixes auto-resolvable lint issues                |
| `npm run format`        | Automatically formats the entire codebase with Prettier        |
| `npm run formatcheck`   | Verifies code formatting complies with Prettier                |

---

## Code Quality & Pre-commit Hooks

This repository uses **Husky** and **lint-staged**. Whenever you make a git commit:

1. Staged code files are verified and auto-fixed with ESLint.
2. Code style is formatted with Prettier.
3. Commits are rejected if there are unresolved lint or syntax errors.

---

## License

MIT
