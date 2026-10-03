import { PixelRatio } from 'react-native'

// ── Types ────────────────────────────────────────────

interface ImageTransformOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
  fit?: 'cover' | 'contain' | 'fill' | 'inside'
}

// ── Constants ────────────────────────────────────────

const DEFAULT_QUALITY = 80
const DEFAULT_FORMAT = 'auto'

// Product image aspect ratios used throughout the app
export const IMAGE_ASPECT_RATIOS = {
  /** Product card in grid (3:4 portrait) */
  productCard: 3 / 4,
  /** Product card in horizontal scroll (2:3 portrait) */
  productCardWide: 2 / 3,
  /** Product detail hero (3:4 portrait) */
  productDetail: 3 / 4,
  /** Category banner (16:9 landscape) */
  categoryBanner: 16 / 9,
  /** Collection hero (4:5 portrait) */
  collectionHero: 4 / 5,
  /** Thumbnail (1:1 square) */
  thumbnail: 1,
} as const

// ── CDN URL Builder ──────────────────────────────────
// Centralizes image transformation parameters.
// Adapt the URL building logic based on your CDN provider:
// - Cloudinary: /c_fill,w_300,h_400,f_auto,q_80/
// - ImageKit: /tr:w-300,h-400,f-auto,q-80/
// - Imgix: ?w=300&h=400&auto=format&q=80
// Currently uses query-parameter style (compatible with most CDNs).

export function buildCdnUrl(
  uri: string,
  options: ImageTransformOptions = {},
): string {
  // Don't transform local/bundled assets or data URIs
  if (!uri || uri.startsWith('file://') || uri.startsWith('data:')) {
    return uri
  }

  const params = new URLSearchParams()

  if (options.width) {
    // Scale for device pixel ratio to serve retina-quality images
    const scaledWidth = Math.round(options.width * PixelRatio.get())
    params.set('w', String(scaledWidth))
  }

  if (options.height) {
    const scaledHeight = Math.round(options.height * PixelRatio.get())
    params.set('h', String(scaledHeight))
  }

  params.set('f', options.format ?? DEFAULT_FORMAT)
  params.set('q', String(options.quality ?? DEFAULT_QUALITY))

  if (options.fit) {
    params.set('fit', options.fit)
  }

  const separator = uri.includes('?') ? '&' : '?'
  return `${uri}${separator}${params.toString()}`
}

// ── Preset Builders ──────────────────────────────────
// Convenience functions for common image sizes.

export function productCardUrl(uri: string, gridColumns: number = 2): string {
  // Approximate card width based on grid columns (screen width / columns)
  const cardWidth = gridColumns === 2 ? 200 : 130
  const cardHeight = Math.round(cardWidth / IMAGE_ASPECT_RATIOS.productCard)
  return buildCdnUrl(uri, {
    width: cardWidth,
    height: cardHeight,
    fit: 'cover',
  })
}

export function productDetailUrl(uri: string): string {
  return buildCdnUrl(uri, { width: 400, quality: 90, fit: 'cover' })
}

export function productZoomUrl(uri: string): string {
  return buildCdnUrl(uri, { width: 800, quality: 95, fit: 'cover' })
}

export function thumbnailUrl(uri: string, size: number = 80): string {
  return buildCdnUrl(uri, { width: size, height: size, fit: 'cover' })
}

export function categoryBannerUrl(uri: string): string {
  return buildCdnUrl(uri, { width: 400, height: 225, fit: 'cover' })
}
