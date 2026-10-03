import { PickedFile } from '@/types/media'

export interface ProfileImagePickerViewProps {
  value?: PickedFile | null
  onPress?: () => void
  label?: string
  error?: string
  size?: number
}
