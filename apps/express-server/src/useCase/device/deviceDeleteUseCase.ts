import { IDeviceRepository } from '@/domain/device/repository/IDeviceRepository'
import DeviceId from '@/domain/device/value/deviceId'
import Device from '@/domain/device/entity/device'

class DeviceDeleteUseCase {
  private repository: IDeviceRepository
  constructor(repository: IDeviceRepository) {
    this.repository = repository
  }
  deleteAll = async (ids: string[]) => {
    const deviceList = ids.map((id) => {
      return new Device(new DeviceId(id))
    })
    await this.repository.delete(deviceList)
  }
}

export default DeviceDeleteUseCase
