import React, { useCallback, useEffect, useState } from 'react'

import { PickedFile } from '@/types/media'
import { pickImage } from '@/utils/image-picker'

import { ProfileImagePickerView } from '../profile-image-picker-view'
import { ProfileImagePickerFieldProps } from './typings'

const ProfileImagePicker: React.FC<ProfileImagePickerFieldProps> = ({
  value,
  onChange,
  label,
  error,
}) => {
  const [internalValue, setInternalValue] = useState<PickedFile | null>(
    value ?? null,
  )

  /**
   * Keep internal state in sync with external value
   */
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value ?? null)
    }
  }, [value])

  const handlePickImageRequest = useCallback(async () => {
    const imageFile = await pickImage()
    if (!imageFile) return

    // uncontrolled
    if (value === undefined) {
      setInternalValue(imageFile)
    }

    // controlled
    onChange?.(imageFile)
  }, [onChange, value])

  // console.log("[PROFILE IMAGE PICKER]", internalValue);

  return (
    <ProfileImagePickerView
      value={internalValue}
      onPress={handlePickImageRequest}
      label={label}
      error={error}
    />
  )
}

export default ProfileImagePicker
