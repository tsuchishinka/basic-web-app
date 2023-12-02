import { createSlice } from '@reduxjs/toolkit'
import { DevicePageState } from '../store/DevicePage/state'
import { PayloadAction } from '@reduxjs/toolkit'

const initialState: DevicePageState = {
  deviceList: [],
  searchParam: { name: '', model: '' },
}

export const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    updateState: (state, action: PayloadAction<DevicePageState>) => {
      for (const key in state) {
        if (key in action.payload) {
          // @ts-expect-error 今後any型で怒られないやり方を模索する
          state[key] = action.payload[key]
        }
      }
    },
  },
})

export const { updateState } = appSlice.actions
export default appSlice.reducer
