import React from 'react'

export interface ModalControls {
  close: () => void
}

export type ModalRenderer = (controls: ModalControls) => React.ReactNode
