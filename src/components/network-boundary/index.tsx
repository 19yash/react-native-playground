import { ReactNode } from 'react'

import { useNetwork } from '@/hooks/use-network'

import NetworkErrorScreen from './screen'

type Props = {
  children: ReactNode
}

export default function NetworkBoundary({ children }: Props) {
  const { isOnline } = useNetwork()

  // console.log("Network status:", isOnline);

  if (!isOnline) {
    return <NetworkErrorScreen />
  }

  return <>{children}</>
}
