import { Device } from '../../../store/DevicePage/state'
import { DeviceRequestClient } from './DeviceRequestClient';
import { GetConfigTypes } from '@/lib/client/ApiRequestClient';

export interface IDeviceService {
  fetchDeviceList: (params: { name?: string; offset?: number; limit?: number }) => Promise<Device[]>
}

export class DeviceService implements IDeviceService {
  client: DeviceRequestClient
  constructor(client: DeviceRequestClient) {
    this.client = client
  }
  async fetchDeviceList(params: { name?: string | undefined; offset?: number | undefined; limit?: number | undefined; }) {
    return await this.client.get<Device[]>({
      url: '/device',
      params
    })
  }
}
