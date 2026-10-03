import { useEffect, useState } from 'react'

import { GET_ME } from '@/constants/api-endpoints'
import { api } from '@/services/api'
import { useAuth } from '@/services/context/auth'
import { UserContext } from '@/services/context/user'
import { UserProfileData } from '@/types/http'
import Loader from '@/ui/loader'

const fetchUserProfile = async () => {
  try {
    const response = await api.get(GET_ME)

    if (response.data) {
      return response.data?.data as UserProfileData
    }

    throw response
  } catch (error) {
    console.log('[Error fetching user data]:', error)
    return null
  }
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthLoading, hasUserLoggedIn, logoutUser } = useAuth()
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null)

  const setUser = (userData: UserProfileData) => {
    setUserProfile(userData)
  }

  const resetUser = () => {
    setUserProfile(null)
  }

  const fetchUser = async () => {
    const userData = await fetchUserProfile()
    const isUserVerificationRejected =
      userData?.user?.verification_process_status === 'DECLINED'

    if (userData?.user && isUserVerificationRejected) {
      logoutUser()
      resetUser()
      return
    }

    setUserProfile(userData)
    return
  }

  useEffect(() => {
    const hydrateUserUponAuthentication = async () => {
      if (isAuthLoading || !hasUserLoggedIn || userProfile) {
        return
      }

      if (hasUserLoggedIn) {
        console.log('[UserLoading...]')
        setIsUserLoading(true)
        await fetchUser()
        setIsUserLoading(false)
        console.log('[UserLoaded...]')
      }
    }

    hydrateUserUponAuthentication()
  }, [isAuthLoading, hasUserLoggedIn, userProfile])

  const isUserReady =
    !isAuthLoading && !isUserLoading && (hasUserLoggedIn ? !!userProfile : true)

  if (!isUserReady) {
    console.log('[UserProvider]: Loading...')
    return <Loader />
  }

  return (
    <UserContext.Provider
      value={{
        isUserLoading,
        userProfile,
        fetchUser,
        setUser,
        resetUser,
        isUserReady,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
