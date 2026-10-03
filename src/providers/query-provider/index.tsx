import NetInfo from '@react-native-community/netinfo'
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect } from 'react'
import { AppState, Platform } from 'react-native'

// ── React Native Integrations ────────────────────────

// Auto-refetch when app comes back to foreground
function onAppStateChange(status: string) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

// Track online/offline state via NetInfo
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})

// ── Query Client ─────────────────────────────────────

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Products don't change frequently — 5 min stale time
      staleTime: 5 * 60 * 1000,
      // Keep unused data in memory for 30 min before garbage collection
      gcTime: 30 * 60 * 1000,
      // Retry failed requests twice with exponential backoff
      retry: 2,
      // Refetch when app regains focus
      refetchOnWindowFocus: true,
      // Refetch when device reconnects
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
})

// ── Provider Component ───────────────────────────────

interface QueryProviderProps {
  children: React.ReactNode
}

export default function QueryProvider({ children }: QueryProviderProps) {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)
    return () => subscription.remove()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

// Export for use in tests or manual cache operations
export { queryClient }
