import React from 'react'

import { StyledSectionView } from '@/helpers/styles'

import ActionItem from './item'
import { ActionListProps } from './typings'

const ActionList: React.FC<ActionListProps> = ({
  options,
  title,
  spacingTop,
  spacingBottom,
}) => {
  // const navigation = useNavigation()

  // const onPressItem = (option: ActionListOption) => {
  //   option?.onPress?.()

  //   if (!option?.navigateTo) {
  //     return
  //   }

  //   navigation.nativeNavigation.navigate(option.navigateTo as never)
  // }

  return (
    <StyledSectionView spacingTop={spacingTop} spacingBottom={spacingBottom}>
      {options?.map((option, key) => {
        return <ActionItem key={key} option={option} onPress={() => {}} />
      })}
    </StyledSectionView>
  )
}

export default ActionList
