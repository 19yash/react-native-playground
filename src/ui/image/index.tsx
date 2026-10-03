import { Image as RNEImage } from '@rneui/base'
import React, { FC } from 'react'

import { StyledImageView } from './styles'
import { ImageProps } from './typings'

const Image: FC<ImageProps> = ({
  width = 100,
  height = 100,
  borderRadius = 50,
  style,
  ...props
}) => {
  return (
    <StyledImageView width={width} height={height}>
      <RNEImage
        placeholderStyle={{
          backgroundColor: 'transparent',
        }}
        borderRadius={borderRadius}
        style={[
          {
            width: '100%',
            height: '100%',
          },
          style,
        ]}
        {...props}
      />
    </StyledImageView>
  )
}

export default Image
