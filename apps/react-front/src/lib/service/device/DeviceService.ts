import { Device } from '../../../store/DevicePage/state'
import { DeviceRequestClient } from './DeviceRequestClient'

export interface IDeviceService {
  fetchDeviceList: (params: { name?: string; offset?: number; limit?: number }) => Promise<Device[]>
}

export class DeviceService extends DeviceRequestClient implements IDeviceService {
  async fetchDeviceList(params: {
    name?: string | undefined
    offset?: number | undefined
    limit?: number | undefined
  }) {
    const response = await this.get<Device[]>({
      url: '/device',
      params,
    })
    return response
  }
}
