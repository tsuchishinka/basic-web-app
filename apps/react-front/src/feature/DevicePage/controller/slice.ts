import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import cloneDeep from 'lodash.clonedeep'
import { DevicePageState, getInitialDevicePageState } from './state'

const deviceSlice = createSlice({
  name: 'device',
  initialState: getInitialDevicePageState(),
  reducers: {
    updateDevicePageState: (state, { payload }: PayloadAction<DevicePageState>) => {
      const newState = cloneDeep(payload)
      for (const key in state) {
        if (key in newState) {
          // @ts-expect-error eslint-disable-next-line
          state[key] = newState[key]
        }
      }
    },
  },
})

const { updateDevicePageState } = deviceSlice.actions
const devicePageReducer = deviceSlice.reducer

export { updateDevicePageState, devicePageReducer }
