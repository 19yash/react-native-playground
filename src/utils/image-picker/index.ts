import * as ImagePicker from 'expo-image-picker'

import { PickedFile } from '@/types/media'

import { ensureMediaPermission } from '../permissions'

export async function pickImage(): Promise<PickedFile | null> {
  const allowed = await ensureMediaPermission()
  if (!allowed) return null

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  })

  if (result.canceled) {
    return null
  }

  const asset = result.assets[0]

  return {
    uri: asset.uri,
    name: asset.fileName ?? 'image.jpg',
    type: asset.mimeType ?? 'image/jpeg',
    size: asset.fileSize,
  }
}
