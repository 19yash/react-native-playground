declare module '*.jpg' {
  const value: number
  export default value
}

declare module '*.png' {
  const value: number
  export default value
}

declare module '*.gif' {
  const value: number
  export default value
}

declare module '*.svg' {
  import React from 'react'
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}
