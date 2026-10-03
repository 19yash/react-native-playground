export const formatBytes = (bytes: number, decimals = 2, k = 1000): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 B'
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  const value = bytes / Math.pow(k, i)

  return `${parseFloat(value.toFixed(decimals))} ${units[i]}`
}

export const getCityCode = (city?: string): string => {
  if (!city) return ''

  return city.trim().slice(0, 3).toUpperCase()
}
