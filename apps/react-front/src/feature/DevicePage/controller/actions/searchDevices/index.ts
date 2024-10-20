import { DeviceService } from '@packages/demo-api'
import { DevicePageState } from '../../state'
import fetchDevices from '../fetchDevices'

const searchDevices = async (
  state: DevicePageState,
  deviceService: DeviceService,
  params: {
    name?: string
    model?: string
  },
): Promise<DevicePageState> => {
  const newState = { ...state }
  newState.searchParam = params
  return await fetchDevices(newState, deviceService)
}

export default searchDevices
