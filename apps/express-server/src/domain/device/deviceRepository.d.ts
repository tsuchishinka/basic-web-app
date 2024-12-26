import { Device } from './entity/device'
import { DeviceId } from './value/deviceId'

export interface IDeviceRepository {
  updateDevice: (device: Device) => Promise<void>
  registerDevice: (device: Device) => Promise<void>
  fetchDevice: (deviceId: DeviceId) => Promise<Device | undefined>
  deleteDevices: (devices: DeviceId[]) => Promise<void>
}
