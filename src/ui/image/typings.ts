import { ImageProps as RNEImageProps } from '@rneui/base'
import { DimensionValue } from 'react-native'

export interface ImageProps extends Omit<RNEImageProps, 'width' | 'height'> {
  width?: DimensionValue
  height?: DimensionValue
  children?: React.ReactNode
}
