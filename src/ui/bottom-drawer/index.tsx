import BottomSheet, {
  BottomSheetFooter,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import React, { FC } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { useTheme } from 'styled-components/native'

import { ColorKey } from '@/constants/colors'

import Dock from './dock'
import { styles } from './styles'
import { BottomDrawerProps } from './typings'

const BottomDrawer: FC<BottomDrawerProps> = ({
  onChange,
  index = 0,
  children,
  snapPoints = [72, '55%', '85%'],
  header,
  sheetRef,
  dockComponent,
  footer,
  showVerticalScroll = true,
  marginBottom = 80,
  backgroundColor,
  minHeaderHeight,
  showHandle = true,
}) => {
  const theme = useTheme()
  const animatedIndex = useSharedValue(0)
  const animatedPosition = useSharedValue(0)

  return (
    <>
      {dockComponent && (
        <Dock
          height={50}
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
        >
          {dockComponent}
        </Dock>
      )}
      <BottomSheet
        ref={sheetRef}
        onChange={onChange}
        snapPoints={snapPoints}
        index={index}
        backgroundStyle={{
          ...styles.sheetStyle,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 12, // Android
          ...(backgroundColor && {
            backgroundColor: theme.colors[
              backgroundColor as ColorKey
            ] as string,
          }),
        }}
        animatedPosition={animatedPosition}
        animatedIndex={animatedIndex}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        footerComponent={(props) => {
          return footer ? (
            <BottomSheetFooter
              animatedFooterPosition={props.animatedFooterPosition}
            >
              {footer}
            </BottomSheetFooter>
          ) : (
            <></>
          )
        }}
        keyboardBehavior="interactive"
        enableDynamicSizing={false}
        handleComponent={!showHandle ? () => null : undefined}
      >
        {header && (
          <BottomSheetView
            style={{ ...styles.sheetHeaderStyle, minHeight: minHeaderHeight }}
          >
            {header}
          </BottomSheetView>
        )}

        {showVerticalScroll ? (
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            style={{
              marginBottom,
              ...(backgroundColor && {
                backgroundColor: theme.colors[
                  backgroundColor as ColorKey
                ] as string,
              }),
            }}
          >
            {children}
          </BottomSheetScrollView>
        ) : (
          <>{children}</>
        )}
      </BottomSheet>
    </>
  )
}

export default BottomDrawer
