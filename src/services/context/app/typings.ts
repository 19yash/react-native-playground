export interface ApplicationState {
  isAppReady: boolean
}

export interface ApplicationContextValue extends ApplicationState {
  setAppReady: (ready: boolean) => void
}
