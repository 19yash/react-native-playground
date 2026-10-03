import React, { FC } from 'react'

import { useTabBar } from '@/services/context/tab-bar'
import { ColorNames } from '@/types/theme'
import Icon from '@/ui/icon'
import Text from '@/ui/text'

import { TabContainer } from './styles'
import { TabProps } from './typings'

const getIconColor = (tabBarState: string, active: boolean): ColorNames => {
  if (active) {
    return 'color-primary-600'
  }

  switch (tabBarState) {
    case 'transparent':
      return 'color-neutral-800'
    case 'solid-white':
    default:
      return 'color-neutral-600'
  }
}

const Tab: FC<TabProps> = ({ active, icon, label, showLabel = false }) => {
  const { tabBarState } = useTabBar()
  const color = getIconColor(tabBarState, active)

  return (
    <TabContainer>
      <Icon name={icon} color={color} size={24} width={24} height={24} />
      {showLabel && (
        <Text
          i18n={label}
          variant="body_xs.regular"
          color={color}
          numberOfLines={1}
        />
      )}
    </TabContainer>
  )
}

export default Tab
