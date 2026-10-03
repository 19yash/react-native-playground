import * as ImagePicker from 'expo-image-picker'
import { Alert, Linking } from 'react-native'

export async function ensureMediaPermission(): Promise<boolean> {
  const permission = await ImagePicker.getMediaLibraryPermissionsAsync()

  if (permission.granted) return true

  if (permission.canAskAgain) {
    const request = await ImagePicker.requestMediaLibraryPermissionsAsync()
    return request.granted
  }

  Alert.alert(
    'Permission Required',
    'Please allow storage access from settings to continue.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Open Settings',
        onPress: () => Linking.openSettings(),
      },
    ],
  )

  return false
}
