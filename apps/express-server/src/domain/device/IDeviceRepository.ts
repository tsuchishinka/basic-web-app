import Device from './entity/device'
import DeviceId from './value/deviceId'
import DeviceGroupId from '@/domain/deviceGroup/value/deviceGroupId'
import DeviceName from './value/deviceName'
import ModelName from './value/modelName'

export interface IDeviceRepository {
  updateDevice: (device: Device) => void
  registerDevice: (device: Device) => void
  fetchDevices: (
    offset: number,
    limit: number,
    params?: {
      deviceName?: DeviceName
      modelName?: ModelName
    },
  ) => Promise<{
    offset: number
    total: number
    pageCount: number
    list: Device[]
  }>
  fetchDevice: (deviceId: DeviceId) => Promise<Device | undefined>
  deleteDevices: (devices: Device[]) => void
}
