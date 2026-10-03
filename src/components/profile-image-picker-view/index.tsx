import React from 'react'
import { StyleSheet, View } from 'react-native'

import Icon from '@/ui/icon'
import Image from '@/ui/image'
import Pressable from '@/ui/pressable'
import Text from '@/ui/text'

import { StyledImagePlaceholderView } from './styles'
import { ProfileImagePickerViewProps } from './typings'

export const ProfileImagePickerView: React.FC<ProfileImagePickerViewProps> = ({
  value,
  onPress,
  label,
  error,
  size = 84,
}) => {
  return (
    <View style={styles.imageContainer}>
      <Pressable onPress={onPress}>
        {value ? (
          <StyledImagePlaceholderView size={size}>
            <Image
              width={size}
              height={size}
              borderRadius={size / 2}
              source={{ uri: value.uri }}
            />
          </StyledImagePlaceholderView>
        ) : (
          <StyledImagePlaceholderView size={size}>
            <Icon name="user" size={28} color="#666" />
          </StyledImagePlaceholderView>
        )}
      </Pressable>

      {label && <Text i18n={label} variant="body_xs.regular" />}

      {error && (
        <Text i18n={error} variant="body_xs.regular" color="color-danger-200" />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    gap: 2,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  avatarImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
})
