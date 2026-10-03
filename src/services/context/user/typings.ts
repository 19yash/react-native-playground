import { UserProfileData } from '@/types/http'

export type UserContextType = {
  isUserLoading: boolean

  userProfile: UserProfileData | null
  setUser: (userData: UserProfileData) => void
  resetUser: () => void
  fetchUser: () => Promise<void>
  isUserReady: boolean
}
