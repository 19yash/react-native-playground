import AsyncStorage from '@react-native-async-storage/async-storage'

import { ASYNC_STORE_KEY } from '@/constants'

export const get = (key: string) => {
  return AsyncStorage.getItem(key)
}

export const set = (key: string, value: string) => {
  return AsyncStorage.setItem(key, value)
}

export const remove = (key: string) => {
  return AsyncStorage.removeItem(key)
}

export const getPreferredTheme = () => {
  return get(ASYNC_STORE_KEY.PREFERRED_THEME)
}

export const setPreferredTheme = (val = '') => {
  return set(ASYNC_STORE_KEY.PREFERRED_THEME, val)
}

export const removeUserData = () => {
  return Promise.all([remove(ASYNC_STORE_KEY.PREFERRED_THEME)])
}
