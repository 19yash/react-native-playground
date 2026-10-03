import { PickedFile } from '@/types/media'

export interface ProfileImagePickerFieldProps {
  value?: PickedFile | null
  onChange?: (file?: PickedFile) => void
  label?: string
  error?: string
}
