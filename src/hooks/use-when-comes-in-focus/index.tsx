import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'

export function useWhenComesInFocus(fn: Parameters<typeof useCallback>[0]) {
  const memoizedFn = useCallback(fn, [])

  useFocusEffect(
    useCallback(() => {
      return memoizedFn()
    }, [memoizedFn]),
  )
}
