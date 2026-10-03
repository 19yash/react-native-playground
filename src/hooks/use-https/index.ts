import { AxiosError } from 'axios'
import { get } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import { api } from '@/services/api'
import {
  HttpHooksError,
  HttpHooksOptions,
  HttpHooksResponse,
  HttpResponse,
} from '@/types/http'

const handleErrors = (response: any): HttpHooksError => {
  const code = get(response, 'code', '')
  const status = get(response, 'status', 500)
  const errMsg = get(response, 'data.message', '')

  if (status === 404 || code === 'NotFound') {
    return {
      errMsg: errMsg || '404 page not found',
      errResponse: response,
    }
  } else if (status >= 400 && status < 500) {
    return { errMsg, errResponse: response }
  } else {
    return {
      errMsg: errMsg || 'Error!!! Something went wrong',
      errResponse: response,
    }
  }
}

interface HttpsResponse {
  data?: any
  message?: string
  code: number
}

const defaultOptions = {
  lazy: true,
}

const useQuery = <T>(
  path: string,
  options: HttpHooksOptions,
): HttpHooksResponse<T> => {
  const { params, lazy } = { ...defaultOptions, ...options }

  const [response, setResponse] = useState<HttpResponse<T>>()
  const [ok, setOk] = useState<boolean | null>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errorDetails, setErrorDetails] = useState<HttpHooksError | null>(null)

  const execute = useCallback(
    async (paramsOnExecute?: any, pathOnExecute?: any) => {
      setLoading(true)
      setOk(null)
      setErrorDetails(null)
      setError('')
      setResponse(undefined)

      try {
        const res = await api.get<HttpResponse<T>>(pathOnExecute || path, {
          params: paramsOnExecute || params,
        })

        if (!res.data) {
          const errDetails = handleErrors(res)
          setErrorDetails(errDetails)
          setError(errDetails?.errMsg)
          setLoading(false)
          setResponse(res.data)
          setOk(false)

          return
        }

        setResponse(res.data)
        setOk(true)
        setErrorDetails(null)
        setError('')
        setLoading(false)
        return res.data
      } catch (error) {
        const err = error as AxiosError
        console.log('[ERROR RECEIVED]:')
        const response = err?.response?.data as HttpsResponse
        const errDetails = handleErrors(response)
        setResponse(response?.data)
        setError(response?.message || err?.message || '')
        setLoading(false)
        setErrorDetails(errDetails)
        console.log('[Error]:', err, response, errDetails)
        return
      }
    },
    [],
  )

  useEffect(() => {
    if (!lazy) {
      execute()
    }
  }, [lazy, execute])

  return {
    loading,
    response,
    execute,
    error,
    errorDetails,
    ok,
  }
}

const useGet = <T>(
  path: string,
  options?: HttpHooksOptions,
): HttpHooksResponse<T> => {
  return useQuery<T>(path, { ...options })
}

const useMutation = <T>(
  path: string,
  method: 'post' | 'put' | 'patch' | 'delete',
  options?: HttpHooksOptions,
): HttpHooksResponse<T> => {
  const { payload, lazy, headers } = {
    ...defaultOptions,
    ...options,
  }

  const [response, setResponse] = useState<HttpResponse<T>>()
  const [ok, setOk] = useState<boolean | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [errorDetails, setErrorDetails] = useState<HttpHooksError | null>(null)

  const execute = useCallback(
    async (payloadOnExecute?: any, pathOnExecute?: any) => {
      // console.log("[API Call]:", pathOnExecute || path);
      setLoading(true)
      setOk(undefined)
      setErrorDetails(null)
      setError('')
      setResponse(undefined)

      try {
        console.log('[Requesting]::Start::')
        const res = await api[method]<HttpResponse<T>>(
          pathOnExecute || path,
          payloadOnExecute || payload || {},
          headers ? { headers } : undefined,
        )
        console.log('[Requesting]::End::', res)

        if (!res.data) {
          const errDetails = handleErrors(res)
          setErrorDetails(errDetails)
          setError(errDetails?.errMsg)
          setOk(false)
          setLoading(false)
          setResponse(res.data)
          return
        }

        setResponse(res.data)
        setOk(true)
        setErrorDetails(null)
        setError('')
        setLoading(false)
        return res.data
      } catch (error) {
        const err = error as AxiosError
        console.log('[ERROR RECEIVED]:')
        const response = err?.response?.data as HttpsResponse
        const errDetails = handleErrors(response)
        setResponse(response?.data)
        setError(response?.message || err?.message || '')
        setLoading(false)
        setErrorDetails(errDetails)
        console.log('[Error]:', err, response, errDetails)
        return
      }
    },
    [],
  )

  useEffect(() => {
    if (!lazy) {
      execute()
    }
  }, [lazy, execute])

  return {
    loading,
    response,
    execute,
    error,
    errorDetails,
    ok,
  }
}

const usePut = <T>(
  path: string,
  options?: HttpHooksOptions,
): HttpHooksResponse<T> => {
  return useMutation<T>(path, 'put', options)
}

const usePatch = <T>(
  path: string,
  options?: HttpHooksOptions,
): HttpHooksResponse<T> => {
  return useMutation<T>(path, 'patch', options)
}

const usePost = <T>(
  path: string,
  options?: HttpHooksOptions,
): HttpHooksResponse<T> => {
  return useMutation<T>(path, 'post', options)
}

const useDelete = <T>(
  path: string,
  options?: HttpHooksOptions,
): HttpHooksResponse<T> => {
  return useMutation<T>(path, 'delete', options)
}

export { useDelete, useGet, usePatch, usePost, usePut }
