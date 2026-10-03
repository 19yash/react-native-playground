import { Typography } from '@/types/theme'

import { bebasTypography } from './bebas'
import { manropeTypography } from './manrope'
import { montserratTypography } from './montserrat'

export const typography: Typography = {
  ...manropeTypography,
  ...bebasTypography,
  ...montserratTypography,
}

// Re-export all font config for direct access
export * from './fonts'
