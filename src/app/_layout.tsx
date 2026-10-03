import { useFonts } from 'expo-font'
import { Stack, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MenuProvider } from 'react-native-popup-menu'
import Toast from 'react-native-toast-message'

import NetworkBoundary from '@/components/network-boundary'
import { customFonts } from '@/constants/theme'
import { ApplicationProvider } from '@/providers/app-provider'
import AuthProvider from '@/providers/auth-provider'
import { ModalProvider } from '@/providers/modal'
import QueryProvider from '@/providers/query-provider'
import StyledThemeProvider from '@/providers/styled-theme-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import UserProvider from '@/providers/user-provider'
import { useAuth } from '@/services/context/auth'

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

// Prevent splash from auto-hiding.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  // console.log("[_Layout]: Initialized.");
  const [fontsLoaded, fontError] = useFonts(customFonts)

  useEffect(() => {
    if (fontError) {
      throw fontError
    }
  }, [fontError])

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#000000' }} />
    )
  }

  return (
    <ThemeProvider>
      <StyledThemeProvider>
        <QueryProvider>
          <AuthProvider>
            <UserProvider>
              <ApplicationProvider>
                <ModalProvider>
                  <MenuProvider>
                    <NetworkBoundary>
                      <RootLayoutContent />
                    </NetworkBoundary>
                  </MenuProvider>
                </ModalProvider>
              </ApplicationProvider>
            </UserProvider>
          </AuthProvider>
        </QueryProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  )
}

function RootLayoutContent() {
  console.log('[ROOT]')
  const { hasUserLoggedIn, isAuthLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthLoading) {
      return
    }

    if (hasUserLoggedIn) {
      // console.log("[RootLayoutContent] redirecting to /protected");
      router.replace('/protected')
    } else {
      // console.log("[RootLayoutContent] redirecting to /unprotected");
      router.replace('/unprotected')
    }
  }, [isAuthLoading, hasUserLoggedIn, router])

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }}></Stack>
      <Toast />
    </GestureHandlerRootView>
  )
}
