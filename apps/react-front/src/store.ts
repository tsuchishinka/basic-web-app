import { configureStore } from '@reduxjs/toolkit'
import { devicePageReducer } from './feature/DevicePage/controller/slice'
import { loginPageReducer } from './feature/LoginPage/controller/slice'

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
