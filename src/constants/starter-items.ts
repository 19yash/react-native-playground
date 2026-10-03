export interface StarterItem {
  id: string
  title: string
  subtitle: string
  description: string
  tag: string
  date: string
}

export const STARTER_ITEMS: StarterItem[] = [
  {
    id: '1',
    title: 'Atomic UI Primitives',
    subtitle: '26 prebuilt, decoupled components',
    description:
      'All atomic components in src/ui are generic, theme-aware, and ready for immediate reuse across any mobile application.',
    tag: 'Design System',
    date: 'Updated today',
  },
  {
    id: '2',
    title: 'Expo Router Navigation',
    subtitle: 'File-based routing with layouts',
    description:
      'Demonstrates nested stack layouts, tab bars, dynamic route segments ([id]), modal presentations, and deep links.',
    tag: 'Routing',
    date: 'Updated today',
  },
  {
    id: '3',
    title: 'Authentication Boundary',
    subtitle: 'Guarded public and protected flows',
    description:
      'Complete auth flow including onboarding, sign-in, token storage with SecureStore, and protected route protection.',
    tag: 'Security',
    date: 'Updated today',
  },
  {
    id: '4',
    title: 'State & Networking',
    subtitle: 'Zustand + TanStack React Query',
    description:
      'Full state management setup with TanStack Query v5 for server cache and Zustand v5 for local persistent state.',
    tag: 'State',
    date: 'Updated today',
  },
  {
    id: '5',
    title: 'Multi-Environment Setup',
    subtitle: 'Dev, preview, and production configs',
    description:
      'Dynamic configuration through app.config.ts and .env.example with automatic bundle ID and app scheme management.',
    tag: 'DevOps',
    date: 'Updated today',
  },
]
