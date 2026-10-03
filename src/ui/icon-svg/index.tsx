import React, { FC, useMemo } from 'react'
import { Path, Rect, Svg } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

import { getSVGs } from './icon-svg-paths'
import { Children, SVGIconProps } from './typings'

const IconSVG: FC<SVGIconProps> = ({
  name,
  color = 'color-neutral-500',
  width = 20,
  height = 20,
}) => {
  const theme = useTheme()
  const fill =
    (theme.colors[color] as string) ?? theme.colors['color-primary-500']

  const svgInfo = useMemo(() => getSVGs(fill)[name], [fill, name])

  if (!svgInfo || !svgInfo?.children?.length) {
    return null
  }

  return (
    <Svg width={width} height={height} viewBox={svgInfo.viewBox} fill="none">
      {svgInfo.children.map((element: Children, index: number) => {
        if (element.type === 'rect') {
          return <Rect key={index} {...element.properties} />
        } else if (element.type === 'path') {
          return (
            <Path
              key={index}
              strokeLinecap="round"
              strokeLinejoin="round"
              fillRule="evenodd"
              clipRule="evenodd"
              {...element.properties}
            />
          )
        }
      })}
    </Svg>
  )
}

export default IconSVG
