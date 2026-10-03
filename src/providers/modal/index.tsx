import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Modal, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ModalRenderer } from './typings'

interface ModalEntry {
  id: string
  render: ModalRenderer
}

interface ModalContextValue {
  open(render: ModalRenderer): void
  close(): void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export const ModalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [stack, setStack] = useState<ModalEntry[]>([])

  const close = useCallback(() => {
    setStack((prev) => prev.slice(0, -1))
  }, [])

  const open = useCallback((render: ModalRenderer) => {
    setStack((prev) => [...prev, { id: '1', render }])
  }, [])

  const value = useMemo(() => ({ open, close }), [open, close])

  const active = stack.at(-1)

  return (
    <ModalContext.Provider value={value}>
      {children}

      {active && (
        <Modal transparent animationType="fade" visible onRequestClose={close}>
          {/* Backdrop */}
          <Pressable style={styles.backdrop} onPress={close}>
            {/* Content wrapper – prevents backdrop click */}
            <SafeAreaView>
              <Pressable onPress={() => {}}>
                {active.render({ close })}
              </Pressable>
            </SafeAreaView>
          </Pressable>
        </Modal>
      )}
    </ModalContext.Provider>
  )
}

export const useModalService = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) {
    throw new Error('useModalService must be used within ModalProvider')
  }
  return ctx
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
})

// import React, {
//   createContext,
//   useCallback,
//   useContext,
//   useMemo,
//   useState,
// } from 'react'
// import { Modal, StyleSheet, View } from 'react-native'

// import { ModalRenderer } from './typings'

// interface ModalEntry {
//   id: string
//   render: ModalRenderer
// }

// interface ModalContextValue {
//   open(render: ModalRenderer): void
//   close(): void
// }

// const ModalContext = createContext<ModalContextValue | null>(null)

// export const ModalProvider: React.FC<React.PropsWithChildren> = ({
//   children,
// }) => {
//   const [stack, setStack] = useState<ModalEntry[]>([])

//   const close = useCallback(() => {
//     setStack((prev) => prev.slice(0, -1))
//   }, [])

//   const open = useCallback((render: ModalRenderer) => {
//     setStack((prev) => [...prev, { id: '1', render }])
//   }, [])

//   const value = useMemo(() => ({ open, close }), [open, close])

//   const active = stack.at(-1)

//   return (
//     <ModalContext.Provider value={value}>
//       {children}

//       {active && (
//         <Modal transparent animationType="fade" visible onRequestClose={close}>
//           <View style={styles.backdrop}>{active.render({ close })}</View>
//         </Modal>
//       )}
//     </ModalContext.Provider>
//   )
// }

// export const useModalService = () => {
//   const ctx = useContext(ModalContext)
//   if (!ctx) {
//     throw new Error('useModalService must be used within ModalProvider')
//   }
//   return ctx
// }

// const styles = StyleSheet.create({
//   backdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })
