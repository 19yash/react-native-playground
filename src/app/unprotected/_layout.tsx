import { Stack, useRouter } from 'expo-router'
import { useEffect } from 'react'

import { useAuth } from '@/services/context/auth'
import { useUser } from '@/services/context/user'

const UnprotectedLayout = () => {
  console.log('[UnprotectedLayout]: Initialized.')
  const { hasUserLoggedIn, isAuthLoading } = useAuth()
  const { isUserLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isAuthLoading || isUserLoading) {
      return
    }

    if (hasUserLoggedIn) {
      router.replace('/protected')
    }
  }, [isAuthLoading, isUserLoading, hasUserLoggedIn, router])

  return <Stack screenOptions={{ headerShown: false }}></Stack>
}

export default UnprotectedLayout
