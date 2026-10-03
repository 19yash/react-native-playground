import NetInfo from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'

export function useNetwork() {
  const [isConnected, setIsConnected] = useState(true)
  const [isInternetReachable, setIsInternetReachable] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(Boolean(state.isConnected))
      setIsInternetReachable(Boolean(state.isInternetReachable))
    })

    return unsubscribe
  }, [])

  return {
    isOnline: isConnected,
  }
}
