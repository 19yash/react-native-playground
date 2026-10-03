import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// ── Types ────────────────────────────────────────────

interface AppStore {
  // Recently viewed item IDs
  recentlyViewed: string[]
  addRecentlyViewed: (id: string) => void
  clearRecentlyViewed: () => void

  // Search history
  searchHistory: string[]
  addSearchHistory: (query: string) => void
  removeSearchHistoryItem: (query: string) => void
  clearSearchHistory: () => void

  // Ephemeral active search query
  searchQuery: string
  setSearchQuery: (query: string) => void

  // Onboarding flag
  hasCompletedOnboarding: boolean
  setOnboardingCompleted: () => void
}

// ── Constants ────────────────────────────────────────

const MAX_RECENTLY_VIEWED = 20
const MAX_SEARCH_HISTORY = 15

// ── Store ────────────────────────────────────────────

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // ── Recently Viewed ──
      recentlyViewed: [],
      addRecentlyViewed: (id) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((item) => item !== id)
          return {
            recentlyViewed: [id, ...filtered].slice(0, MAX_RECENTLY_VIEWED),
          }
        }),
      clearRecentlyViewed: () => set({ recentlyViewed: [] }),

      // ── Search History ──
      searchHistory: [],
      addSearchHistory: (query) =>
        set((state) => {
          const trimmed = query.trim()
          if (!trimmed) return state
          const filtered = state.searchHistory.filter(
            (q) => q.toLowerCase() !== trimmed.toLowerCase(),
          )
          return {
            searchHistory: [trimmed, ...filtered].slice(0, MAX_SEARCH_HISTORY),
          }
        }),
      removeSearchHistoryItem: (query) =>
        set((state) => ({
          searchHistory: state.searchHistory.filter((q) => q !== query),
        })),
      clearSearchHistory: () => set({ searchHistory: [] }),

      // ── Search Query (ephemeral) ──
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // ── Onboarding ──
      hasCompletedOnboarding: false,
      setOnboardingCompleted: () => set({ hasCompletedOnboarding: true }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        recentlyViewed: state.recentlyViewed,
        searchHistory: state.searchHistory,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
    },
  ),
)
