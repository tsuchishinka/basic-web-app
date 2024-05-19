import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import cloneDeep from 'lodash.clonedeep'
import { DevicePageState } from '@/store/state/devicePageState'

const initialState: DevicePageState = {
  offset: 0,
  total: 1,
  pageSize: 50,
  devices: [],
  searchParam: { name: '', model: '' },
}

const deviceSlice = createSlice({
  name: 'device',
  initialState: initialState,
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

export { updateDevicePageState }
export default deviceSlice.reducer
