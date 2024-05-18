import Device from './entity/device'
import DeviceId from './value/deviceId'
import DeviceName from './value/deviceName'
import ModelName from './value/modelName'
import DeviceGroupId from '@/domain/deviceGroup/value/deviceGroupId'

export interface IDeviceRepository {
  update: (device: Device) => void
  create: (device: Device) => void
  fetchList: (
    offset: number,
    limit: number,
    params?: {
      deviceId?: DeviceId
      deviceName?: DeviceName
      modelName?: ModelName
      parentDeviceGroupId?: DeviceGroupId
    },
  ) => Promise<{
    offset: number
    total: number
    pageCount: number
    list: Device[]
  }>
  fetch: (deviceId: DeviceId) => Promise<Device | undefined>
  delete: (devices: Device[]) => void
}
