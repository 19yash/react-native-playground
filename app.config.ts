import * as dotenv from 'dotenv'
import { ConfigContext, ExpoConfig } from 'expo/config'
import fs from 'fs'
import path from 'path'

// Supported environments
const VALID_ENVS = ['development', 'preview', 'production'] as const
type AppEnv = (typeof VALID_ENVS)[number]

// Determine environment. Default to 'development' for local safety.
const APP_ENV = (process.env.APP_ENV || 'development') as AppEnv

if (!VALID_ENVS.includes(APP_ENV)) {
  throw new Error(
    `[app.config.ts] Invalid APP_ENV="${APP_ENV}". Expected one of: ${VALID_ENVS.join(', ')}`,
  )
}

const IS_DEV = APP_ENV === 'development'
const IS_PREVIEW = APP_ENV === 'preview'

// Safely load environment file if it exists
const envFile = `.env.${APP_ENV}`
const envFilePath = path.resolve(__dirname, envFile)
if (fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath, override: true })
}

// Fallback to default .env if specific file doesn't exist
const defaultEnvPath = path.resolve(__dirname, '.env')
if (fs.existsSync(defaultEnvPath)) {
  dotenv.config({ path: defaultEnvPath, override: false })
}

// Neutral default identities - configure these for your new application
const APP_DISPLAY_NAME = process.env.APP_NAME || 'Expo Starter'
const APP_SCHEME = process.env.APP_SCHEME || 'expostarter'
const BASE_BUNDLE_ID = process.env.APP_BUNDLE_ID || 'com.starter.app'

export default ({ config }: ConfigContext): ExpoConfig => {
  const getAppName = () => {
    if (IS_DEV) return `${APP_DISPLAY_NAME} (Dev)`
    if (IS_PREVIEW) return `${APP_DISPLAY_NAME} (Preview)`
    return APP_DISPLAY_NAME
  }

  const getBundleId = () => {
    if (IS_DEV) return `${BASE_BUNDLE_ID}.dev`
    if (IS_PREVIEW) return `${BASE_BUNDLE_ID}.preview`
    return BASE_BUNDLE_ID
  }

  const getScheme = () => {
    if (IS_DEV) return `${APP_SCHEME}dev`
    if (IS_PREVIEW) return `${APP_SCHEME}preview`
    return APP_SCHEME
  }

  return {
    ...config,
    name: getAppName(),
    slug: 'expo-starter',
    scheme: getScheme(),
    ios: {
      ...config.ios,
      bundleIdentifier: getBundleId(),
    },
    android: {
      ...config.android,
      package: getBundleId(),
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [{ scheme: getScheme() }],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    extra: {
      ...config.extra,
      APP_ENV,
    },
  } as ExpoConfig
}
