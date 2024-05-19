import { configureStore } from '@reduxjs/toolkit'
import devicePageReducer from './device/deviceSlice'

const store = configureStore({
  reducer: {
    devicePage: devicePageReducer,
  },
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type { RootState, AppDispatch }
export { store }
