import { configureStore } from '@reduxjs/toolkit'
import devicePageReducer from './device/deviceSlice'
import loginPageReducer from './login/loginSlice'

const store = configureStore({
  reducer: {
    devicePage: devicePageReducer,
    loginPage: loginPageReducer,
  },
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
export { store }
