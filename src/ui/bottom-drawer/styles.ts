import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  sheetStyle: {
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  handleIndicatorStyle: {
    backgroundColor: '#ccc',
  },
  sheetHeaderStyle: {
    backgroundColor: 'transparent',
    minHeight: 48,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  dockContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
    paddingBottom: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
