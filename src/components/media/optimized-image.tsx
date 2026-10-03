import { Image, ImageContentFit, ImageProps } from 'expo-image'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { buildCdnUrl, IMAGE_ASPECT_RATIOS } from '@/services/cdn/image-utils'

// ── Types ────────────────────────────────────────────

interface OptimizedImageProps extends Omit<
  ImageProps,
  'source' | 'placeholder'
> {
  /** Remote image URI */
  uri: string
  /** BlurHash string for progressive loading placeholder */
  blurhash?: string
  /** Explicit width for CDN resizing (optional — used for CDN URL building) */
  width?: number
  /** Explicit height for CDN resizing (optional — used for CDN URL building) */
  height?: number
  /** Aspect ratio override (defaults to 3:4 portrait — fashion standard) */
  aspectRatio?: number
  /** Content fit mode */
  contentFit?: ImageContentFit
  /** Transition duration in ms */
  transitionDuration?: number
  /** Whether to show a fallback color when no blurhash is provided */
  showFallback?: boolean
  /** Fallback background color */
  fallbackColor?: string
}

// ── Component ────────────────────────────────────────

export function OptimizedImage({
  uri,
  blurhash,
  width,
  height,
  aspectRatio = IMAGE_ASPECT_RATIOS.productCard,
  contentFit = 'cover',
  transitionDuration = 400,
  showFallback = true,
  fallbackColor = '#F0F0F0',
  style,
  ...rest
}: OptimizedImageProps) {
  const imageUri = buildCdnUrl(uri, { width, height })

  const placeholder = blurhash ? { blurhash } : undefined

  return (
    <View
      style={[
        { aspectRatio },
        showFallback && !blurhash && { backgroundColor: fallbackColor },
        style,
      ]}
    >
      <Image
        source={{ uri: imageUri }}
        placeholder={placeholder}
        contentFit={contentFit}
        transition={transitionDuration}
        cachePolicy="memory-disk"
        recyclingKey={uri}
        style={StyleSheet.absoluteFill}
        {...rest}
      />
    </View>
  )
}

// ── Preset Variants ──────────────────────────────────

/** Product card image optimized for 2-column grid */
export function ProductCardImage({
  uri,
  blurhash,
  style,
  ...rest
}: Omit<OptimizedImageProps, 'width' | 'height' | 'aspectRatio'>) {
  return (
    <OptimizedImage
      uri={uri}
      blurhash={blurhash}
      width={200}
      aspectRatio={IMAGE_ASPECT_RATIOS.productCard}
      style={style}
      {...rest}
    />
  )
}

/** Product detail hero image */
export function ProductDetailImage({
  uri,
  blurhash,
  style,
  ...rest
}: Omit<OptimizedImageProps, 'width' | 'height' | 'aspectRatio'>) {
  return (
    <OptimizedImage
      uri={uri}
      blurhash={blurhash}
      width={400}
      aspectRatio={IMAGE_ASPECT_RATIOS.productDetail}
      transitionDuration={500}
      style={style}
      {...rest}
    />
  )
}

/** Small thumbnail (square) */
export function ThumbnailImage({
  uri,
  blurhash,
  size = 64,
  style,
  ...rest
}: Omit<OptimizedImageProps, 'width' | 'height' | 'aspectRatio'> & {
  size?: number
}) {
  return (
    <OptimizedImage
      uri={uri}
      blurhash={blurhash}
      width={size}
      height={size}
      aspectRatio={1}
      transitionDuration={300}
      style={[{ width: size, height: size, borderRadius: 8 }, style]}
      {...rest}
    />
  )
}

export default OptimizedImage
