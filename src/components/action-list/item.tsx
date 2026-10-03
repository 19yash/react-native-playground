import React, { useState } from 'react'

import { ColorKey } from '@/constants/colors'
import Icon from '@/ui/icon'
import { SvgIconName } from '@/ui/svg-icon'
import Text from '@/ui/text'

import {
  StyledActionItem,
  StyledActivityIndicator,
  StyledLeftItemView,
  StyledRightItemView,
  StyledRightTitleContainer,
} from './styles'
import { ActionItemProps } from './typings'

const ActionItem: React.FC<ActionItemProps> = ({ option, onPress }) => {
  const [copyIconName, setCopyIconName] = useState<SvgIconName>('copy')

  const copy = () => {
    if (!option?.copyEnabled) {
      return
    }

    // Clipboard?.setString(option?.rightTitle?.toString() ?? '')
    setCopyIconName('checkDouble')
    setTimeout(() => setCopyIconName('copy'), 1000)
  }

  const handleItemPress = () => {
    onPress(option)
    copy()
  }

  const copyIconColor = `color-${
    copyIconName === 'copy' ? 'basic' : 'success'
  }-500`

  return (
    <StyledActionItem onPress={handleItemPress}>
      <StyledLeftItemView>
        {option?.leftTitle && (
          <Text
            i18n={option?.leftTitle}
            variant="body_xs.medium"
            numberOfLines={1}
            color={(option?.leftTitleColor ?? 'color-neutral-600') as ColorKey}
          />
        )}
      </StyledLeftItemView>
      <StyledRightItemView>
        {(option?.rightTitle || option?.rightTitlePlaceholder) && (
          <StyledRightTitleContainer>
            {option?.activityIndicatorEnabled && (
              <StyledActivityIndicator
                isActive={!!option?.activityIndicatorStatus}
              />
            )}
            {option?.rightIconName && (
              <Icon
                name={option?.rightIconName}
                color={option?.rightIconColor ?? 'color-primary-500'}
              />
            )}
            <Text
              i18n={option?.rightTitle ?? option?.rightTitlePlaceholder}
              variant="body_xs.regular"
              color={
                `color-neutral-${option?.rightTitle ? '900' : '500'}` as ColorKey
              }
              numberOfLines={1}
            />
          </StyledRightTitleContainer>
        )}
        {option?.copyEnabled && (
          <Icon name={copyIconName} color={copyIconColor} />
        )}
      </StyledRightItemView>
    </StyledActionItem>
  )
}

export default ActionItem
