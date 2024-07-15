import { Dispatch } from '@reduxjs/toolkit'
import { updateDevicePageState } from './deviceSlice'
import { deviceService } from '@/service'
import fetchDevicesAction from '@/store/actions/device/fetchDevices'
import searchDevicesAction from '@/store/actions/device/searchDevices'
import { DevicePageState } from '@/store/state/devicePageState'

const fetchDevices = () => {
  return async (dispatch: Dispatch, getState: () => DevicePageState) => {
    const state = getState()
    const newState = await fetchDevicesAction(state, deviceService)
    dispatch(updateDevicePageState(newState))
  }
}

const searchDevices = (payload: { model?: string; name?: string }) => {
  return async (dispatch: Dispatch, getState: () => DevicePageState) => {
    const state = getState()
    const newState = await searchDevicesAction(state, deviceService, payload)
    dispatch(updateDevicePageState(newState))
  }
}

export { fetchDevices, searchDevices }
