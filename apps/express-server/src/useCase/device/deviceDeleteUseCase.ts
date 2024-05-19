import Device from '@/domain/device/entity/device'
import { IDeviceRepository } from '@/domain/device/IDeviceRepository'
import DeviceId from '@/domain/device/value/deviceId'

class DeviceDeleteUseCase {
  private repository: IDeviceRepository
  constructor(repository: IDeviceRepository) {
    this.repository = repository
  }
  deleteDevices = async (ids: string[]) => {
    const deviceList = ids.map((id) => {
      return new Device(new DeviceId(id))
    })
    await this.repository.deleteDevices(deviceList)
  }
}

export default DeviceDeleteUseCase
