import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Tabs } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Tab from '@/navigation/bottom-tab'
import { TabBarProvider, useTabBar } from '@/services/context/tab-bar'
import { useTheme } from '@/services/context/theme'
import { SvgIconName } from '@/ui/svg-icon'

const getTab = (
  focused: boolean,
  items: {
    iconName: SvgIconName
    label: string
  },
) => {
  return (
    <Tab
      active={focused}
      icon={items.iconName}
      name={items.iconName}
      label={items.label}
    />
  )
}

function AnimatedTabBar(props: BottomTabBarProps) {
  const { translateY } = useTabBar()

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        animatedStyle,
      ]}
    >
      <BottomTabBar {...props} />
    </Animated.View>
  )
}

function TabLayoutContent() {
  const { uikit } = useTheme()
  const { setTabHeight } = useTabBar()
  const insets = useSafeAreaInsets()
  const bottomPadding = insets.bottom > 0 ? insets.bottom : 12
  const tabHeight = 64 + bottomPadding

  useEffect(() => {
    setTabHeight(tabHeight)
  }, [tabHeight, setTabHeight])

  const dynamicStyles = StyleSheet.create({
    tabBar: {
      height: tabHeight,
      paddingTop: 10,
      paddingHorizontal: 24,
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.05)',
      backgroundColor: uikit.colors['color-surface-bg-primary'] || '#ffffff',
      elevation: 8,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
    },
  })

  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: uikit.colors['color-primary-300'],
        tabBarInactiveTintColor: uikit.colors['color-neutral-400'],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          flex: 1,
          width: '100%',
          height: '100%',
        },
        tabBarItemStyle: {
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
        },
        tabBarStyle: dynamicStyles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarIcon: ({ focused }) =>
            getTab(focused, {
              iconName: 'home',
              label: 'Home',
            }),
        }}
      />
      <Tabs.Screen
        name="explore/index"
        options={{
          tabBarIcon: ({ focused }) =>
            getTab(focused, {
              iconName: 'magnifyingGlass',
              label: 'Explore',
            }),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          tabBarIcon: ({ focused }) =>
            getTab(focused, {
              iconName: 'userAvatar',
              label: 'Profile',
            }),
        }}
      />
    </Tabs>
  )
}

export default function TabLayout() {
  return (
    <TabBarProvider>
      <TabLayoutContent />
    </TabBarProvider>
  )
}
