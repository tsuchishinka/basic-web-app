import DeviceGroupId from '@/domain/deviceGroup/value/deviceGroupId'
import Device from '../entity/device'
import DeviceId from '../value/deviceId'
import DeviceName from '../value/deviceName'
import ModelName from '../value/modelName'
import NullDevice from '../entity/noDevice'

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
  fetch: (deviceId: DeviceId) => Promise<Device | NullDevice>
  delete: (devices: Device[]) => void
}
