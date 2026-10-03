import { PickedFile } from '@/types/media'
import { SpacingNames } from '@/types/theme'

export interface EmptyStateProps {
  title?: string
  description?: string
}

export interface DocumentPickerProps extends EmptyStateProps {
  value?: PickedFile | null
  label?: string
  onChange?: (document?: PickedFile) => void
  spacingTop?: SpacingNames
  spacingBottom?: SpacingNames
  error?: string
  /**
   * in bytes.
   */
  sizeLimit?: number
}
