import { Icons } from 'assets/images'
import { useState } from 'react'

import { StyledSectionView } from '@/helpers/styles'
import { PickedFile } from '@/types/media'
import Icon from '@/ui/icon'
import Image from '@/ui/image'
import Pressable from '@/ui/pressable'
import Text from '@/ui/text'
import { pickDocument } from '@/utils/file-picker'
import { formatBytes } from '@/utils/formatters'

import {
  StyledDashedView,
  StyledDocumentDescriptionView,
  StyledDocumentDetailsView,
  StyledDocumentPickerView,
  StyledEmptyView,
} from './styles'
import { DocumentPickerProps, EmptyStateProps } from './typings'

const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <StyledEmptyView>
      <Icon name="upload" color="color-neutral-700" />
      {title && (
        <Text
          i18n={title}
          color="color-neutral-600"
          variant="body_xs.regular"
        />
      )}
      {description && (
        <Text
          i18n={description}
          color="color-neutral-400"
          variant="body_xs.regular"
        />
      )}
    </StyledEmptyView>
  )
}

const DocumentPicker: React.FC<DocumentPickerProps> = ({
  value,
  label,
  title,
  description,
  onChange,
  spacingBottom,
  spacingTop,
  error,
  sizeLimit = 2000000,
}) => {
  // fallback only if uncontrolled
  const [internalValue, setInternalValue] = useState<PickedFile | null>(null)
  const [internalError, setInternalError] = useState('')
  const [isPicking, setIsPicking] = useState(false)

  const selectedDocument = value !== undefined ? value : internalValue

  const handlePickDocumentRequest = async () => {
    if (isPicking) return

    try {
      setIsPicking(true)

      const doc = await pickDocument()

      // If not selected, dissmiss it.
      if (!doc) {
        return
      }

      // If the size exceeds the allowed limit, show error.
      if (doc.size && doc.size > sizeLimit) {
        setInternalError(
          `Size limit exceeded, must be < ${formatBytes(sizeLimit)}`,
        )
        return
      }

      // As everything is fine, now we will update the states.
      setInternalError('')

      if (value === undefined) {
        setInternalValue(doc)
      }
      onChange?.(doc)
    } finally {
      setIsPicking(false)
    }
  }

  const handleCancel = () => {
    console.log('[Cancel]')
    setInternalError('')
    setInternalValue(null)
    onChange?.(undefined)
  }

  console.log('[PICKING]:', isPicking)

  return (
    <StyledDocumentPickerView
      spacingBottom={spacingBottom}
      spacingTop={spacingTop}
    >
      <Text
        i18n={label}
        variant="body_xs.regular"
        color="color-neutral-500"
        spacingBottom="xxs"
      />
      <StyledDashedView isError={!!error}>
        {!selectedDocument ? (
          <Pressable onPress={handlePickDocumentRequest} disabled={isPicking}>
            <StyledSectionView padding="xl">
              <EmptyState title={title} description={description} />
            </StyledSectionView>
          </Pressable>
        ) : (
          <StyledDocumentDetailsView>
            <Image
              source={Icons.PdfIcon}
              width={20}
              height={20}
              resizeMode="contain"
            />
            <StyledDocumentDescriptionView>
              <Text i18n={selectedDocument?.name} variant="body_sm.regular" />
              <Text
                i18n={formatBytes(selectedDocument?.size || 0)}
                variant="body_xs.regular"
              />
            </StyledDocumentDescriptionView>
            <Icon
              name="close"
              color="color-neutral-700"
              onPress={handleCancel}
            />
          </StyledDocumentDetailsView>
        )}
      </StyledDashedView>
      {error && <Text size={12} i18n={error} color="color-danger-200" />}
      {internalError && (
        <Text size={12} i18n={internalError} color="color-danger-200" />
      )}
    </StyledDocumentPickerView>
  )
}

export default DocumentPicker
