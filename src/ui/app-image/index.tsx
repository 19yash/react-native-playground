import { Image } from 'expo-image'
import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

import * as ImageAssets from '../../../assets/images'
import { AppImageProps } from './typings'

/**
 * AppImage — renders a local image asset from the registry by name.
 * Analogous to SvgIcon for SVG icons.
 *
 * Usage:
 *   <AppImage name="heroMain" />
 *   <AppImage name="bannerDenim" width={200} height={150} />
 */
const AppImage: FC<AppImageProps> = ({
  name,
  width,
  height,
  contentFit = 'cover',
  style,
  ...rest
}) => {
  // eslint-disable-next-line import/namespace
  const source = ImageAssets[name as keyof typeof ImageAssets]

  if (!source || typeof source !== 'number') return null

  return (
    <Image
      source={source}
      contentFit={contentFit}
      cachePolicy="memory-disk"
      style={[
        width !== undefined || height !== undefined
          ? { width, height }
          : StyleSheet.absoluteFill,
        style,
      ]}
      {...rest}
    />
  )
}

export default AppImage
export * from './typings'
