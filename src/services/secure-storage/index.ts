import * as SecureStore from 'expo-secure-store'

import { SECURE_STORE_KEY } from '@/constants'

const get = (key: string) => {
  return SecureStore.getItem(key)
}

const set = (key: string, value: string) => {
  return SecureStore.setItem(key, value)
}

export const remove = (key: string) => {
  return SecureStore.deleteItemAsync(key)
}

export const getRefreshToken = () => {
  return get(SECURE_STORE_KEY.REFRESH_TOKEN)
}

export const getAccessToken = () => {
  return get(SECURE_STORE_KEY.ACCESS_TOKEN)
}

export const setAccessToken = (value = '') => {
  return set(SECURE_STORE_KEY.ACCESS_TOKEN, value)
}

export const setRefreshToken = (value = '') => {
  return set(SECURE_STORE_KEY.REFRESH_TOKEN, value)
}

export const removeUserData = () => {
  return Promise.all([
    remove(SECURE_STORE_KEY.ACCESS_TOKEN),
    remove(SECURE_STORE_KEY.REFRESH_TOKEN),
  ])
}
