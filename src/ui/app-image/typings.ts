import { ImageContentFit, ImageProps } from 'expo-image'
import { DimensionValue, ImageStyle, StyleProp } from 'react-native'

import * as ImageAssets from '../../../assets/images'

export type AppImageName = Exclude<
  keyof typeof ImageAssets,
  'fillers' | 'Icons' | 'Lookbook' | 'Banners'
>

export interface AppImageProps extends Omit<ImageProps, 'source' | 'style'> {
  /** Typed image name with autocomplete support */
  name: AppImageName
  /** Explicit width */
  width?: DimensionValue
  /** Explicit height */
  height?: DimensionValue
  /** Content fit mode (default: 'cover') */
  contentFit?: ImageContentFit
  /** Style override */
  style?: StyleProp<ImageStyle>
}
