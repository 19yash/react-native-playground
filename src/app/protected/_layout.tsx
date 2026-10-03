import { Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'

import { useAuth } from '@/services/context/auth'

const ProtectedLayout = () => {
  const { hasUserLoggedIn, isAuthLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthLoading) {
      return
    }

    if (!hasUserLoggedIn) {
      router.replace('/unprotected')
    }
  }, [isAuthLoading, hasUserLoggedIn, router])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="items/[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default ProtectedLayout
