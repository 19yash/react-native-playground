import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import {
  SharedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export type TabBarState = 'transparent' | 'solid-white'

interface TabBarContextType {
  tabBarState: TabBarState
  setTabBarState: (state: TabBarState) => void
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  resetTabBarState: () => void
  translateY: SharedValue<number>
  setTabHeight: (h: number) => void
  onTabFocus: (tabName: string, defaultState: TabBarState) => void
}

const TabBarContext = createContext<TabBarContextType | undefined>(undefined)

export const TabBarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tabBarState, setTabBarState] = useState<TabBarState>('transparent')
  const prevY = useRef<number>(0)
  const translateY = useSharedValue(0)
  const tabHeightRef = useRef<number>(76)
  const activeTab = useRef<string | null>(null)

  const setTabHeight = useCallback((h: number) => {
    tabHeightRef.current = h
  }, [])

  const onTabFocus = useCallback(
    (tabName: string, defaultState: TabBarState) => {
      if (tabName !== activeTab.current) {
        // Tab switch → apply the default state and show the tab bar
        setTabBarState(defaultState)
        translateY.value = withTiming(0, { duration: 250 })
        prevY.current = 0 // fresh scroll tracking
      }
      // Push-screen return → same tab, do nothing, preserve state
      activeTab.current = tabName
    },
    [translateY],
  )

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y
      const delta = y - prevY.current
      const threshold = 5

      if (y <= 10) {
        // At or near the top — show tab bar, make transparent
        setTabBarState('transparent')
        translateY.value = withTiming(0, { duration: 250 })
      } else if (Math.abs(delta) > threshold) {
        if (delta > 0) {
          // Scrolling down — hide the tab bar
          translateY.value = withTiming(tabHeightRef.current, { duration: 250 })
        } else {
          // Scrolling up — show tab bar, solid style
          setTabBarState('solid-white')
          translateY.value = withTiming(0, { duration: 250 })
        }
      }
      prevY.current = y
    },
    [translateY],
  )

  const resetTabBarState = useCallback(() => {
    setTabBarState('transparent')
    prevY.current = 0
    translateY.value = withTiming(0, { duration: 200 })
    activeTab.current = null
  }, [translateY])

  return (
    <TabBarContext.Provider
      value={{
        tabBarState,
        setTabBarState,
        handleScroll,
        resetTabBarState,
        translateY,
        setTabHeight,
        onTabFocus,
      }}
    >
      {children}
    </TabBarContext.Provider>
  )
}

export const useTabBar = () => {
  const context = useContext(TabBarContext)
  if (!context) {
    throw new Error('useTabBar must be used within a TabBarProvider')
  }
  return context
}
