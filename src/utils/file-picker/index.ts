import * as DocumentPicker from 'expo-document-picker'

// import * as FileSystem from 'expo-file-system/legacy'
import { PickedFile } from '@/types/media'

export async function pickDocument(): Promise<PickedFile | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: ['application/pdf', 'image/*'],
    copyToCacheDirectory: true,
  })

  if (result.canceled) {
    return null
  }

  const doc = result.assets[0]

  // const base64 = await FileSystem.readAsStringAsync(doc.uri, {
  //   encoding: 'base64' as const, // Direct string
  // })

  return {
    uri: doc.uri,
    name: doc.name,
    type: doc.mimeType ?? 'application/octet-stream',
    size: doc.size,
    // base64,
  }
}
