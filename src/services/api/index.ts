import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { Config } from '@/configs'
import { POST_REFRESH_TOKEN_REQUEST } from '@/constants/api-endpoints'
import { AuthVerificationResponse } from '@/types/http'

import {
  getAccessToken,
  getRefreshToken,
  removeUserData,
  setAccessToken,
  setRefreshToken,
} from '../secure-storage'

let isRefreshing = false
let refreshQueue: ((token: string) => void)[] = []

const processQueue = (token: string) => {
  refreshQueue.forEach((cb) => cb(token))
  refreshQueue = []
}

export const api = axios.create({ baseURL: Config.apiBaseURL })

api.interceptors.request.use(async (config) => {
  console.log('→ REQUEST', config.method, config.url)
  const token = getAccessToken()
  const contentAccessToken = Config.contentAccessKey

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (contentAccessToken) {
    config.headers['x-authorization'] = contentAccessToken
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    console.log('← Response', response.status)
    return response
  },
  async (error: AxiosError) => {
    // console.log("← ERROR", error.response?.data);
    console.log('← ERROR', error.status, error.code)
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      console.log('0.Is retry:', originalRequest._retry)

      return Promise.reject(error)
    }

    originalRequest._retry = true

    // If refresh already in progress, put it in queue.
    if (isRefreshing) {
      console.log('0. Is already refreshing.')
      return new Promise((resolve) => {
        refreshQueue.push((token: string) => {
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${token}`
          }
          resolve(api(originalRequest))
        })
      })
    }

    // Start token refresh.
    isRefreshing = true
    console.log('1. Refreshing.')

    try {
      const refreshToken = await getRefreshToken()

      console.log('3. Refresh token', refreshToken)

      if (!refreshToken) {
        throw new Error('Missing refresh token.')
      }

      console.log('4. Calling for new token.')
      const { data } = await axios.post<AuthVerificationResponse>(
        POST_REFRESH_TOKEN_REQUEST,
        { refresh: refreshToken },
        {
          baseURL: Config.apiBaseURL,
          timeout: 15000,
        },
      )

      const access = data.data.access
      const refresh = data.data.refresh

      await setAccessToken(access)
      await setRefreshToken(refresh)

      processQueue(access)

      if (originalRequest.headers) {
        originalRequest.headers['Authorization'] = `Bearer ${access}`
      }

      console.log('5. Original request.')
      return api(originalRequest)
    } catch (refreshError) {
      console.log('6. Is already refreshing.')
      await removeUserData()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

export const fetchItemsApi = async () => {
  const { data } = await api.get('/items')
  return data
}
