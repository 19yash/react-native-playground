import React, { useRef, useState } from 'react'
import {
  ColorValue,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'

import { ColorKey } from '@/constants/colors'
import { useTheme } from '@/services/context/theme'

import Icon from '../icon'
import Text from '../text'
import {
  StyledItemBottomBorder,
  StyledItemContainer,
  StyledItemIconView,
  StyledItemTextView,
} from './styles'
import { PopupMenuProps } from './typings'

const PopupMenu: React.FC<PopupMenuProps> = ({
  children,
  options = [],
  containerWidth = 220,
  containerBorderRadius = 12,
  containerBackgroundColor = 'color-neutral-100',
  optionsTextColor = 'color-neutral-1100',
  itemBottomBorderColor = 'color-gray-300',
  activeBackgroundColor = '',
  onClose,
}) => {
  const { uikit } = useTheme()
  const triggerRef = useRef<View>(null)
  const [menuPosition, setMenuPosition] = useState<'top' | 'bottom'>('bottom')
  const [triggerHeight, setTriggerHeight] = useState(0)

  const handleOpen = () => {
    triggerRef.current?.measureInWindow((__, y, _, height) => {
      const screenHeight = Dimensions.get('window').height
      const spaceBelow = screenHeight - (y + height)
      const spaceAbove = y
      setTriggerHeight(height + 8)
      setMenuPosition(
        spaceBelow < 300 - 50 && spaceAbove > spaceBelow ? 'top' : 'bottom',
      )
    })
  }

  const renderItem = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {options.map((item, index) => {
        const isLast = options.length === index + 1

        return (
          <MenuOption
            style={{ padding: 0, borderRadius: containerBorderRadius }}
            value={item.value}
            key={item.value}
            onSelect={() => item.onSelect?.()}
          >
            <StyledItemContainer
              backgroundColor={activeBackgroundColor as ColorKey}
              isActive={false}
              radius={containerBorderRadius}
            >
              <StyledItemTextView>
                <Text
                  variant="body_md.regular"
                  color={(item.color || optionsTextColor) as ColorKey}
                  numberOfLines={1}
                  i18n={item.label}
                />
              </StyledItemTextView>
              <StyledItemIconView width={20} height={20}>
                {item.icon && (
                  <Icon
                    name={item.icon}
                    width={20}
                    height={20}
                    color="color-neutral-700"
                  />
                )}
              </StyledItemIconView>
            </StyledItemContainer>
            {!isLast && (
              <StyledItemBottomBorder
                borderColor={itemBottomBorderColor as ColorKey}
              />
            )}
          </MenuOption>
        )
      })}
    </ScrollView>
  )

  return (
    <Menu onOpen={handleOpen} onClose={onClose}>
      <MenuTrigger
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
        }}
      >
        <View ref={triggerRef}>{children}</View>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            marginTop: menuPosition === 'top' ? -triggerHeight : triggerHeight,
          },
        }}
        optionsContainerStyle={{
          borderRadius: containerBorderRadius,
          width: containerWidth,
          maxHeight: 300,
          ...(containerBackgroundColor && {
            backgroundColor: uikit.colors[
              containerBackgroundColor as ColorKey
            ] as ColorValue,
            borderColor: uikit.colors[
              containerBackgroundColor as ColorKey
            ] as ColorValue,
          }),
          // iOS shadow
          shadowColor: uikit.colors[
            'color-basic-1100' as ColorKey
          ] as ColorValue,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 32,
          // Android shadow
          elevation: 12,
        }}
        renderOptionsContainer={renderItem}
      />
    </Menu>
  )
}

export default PopupMenu
