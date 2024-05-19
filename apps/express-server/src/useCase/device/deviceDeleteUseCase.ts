import Device from '@/domain/device/entity/device'
import { IDeviceRepository } from '@/domain/device/repository/IDeviceRepository'
import DeviceId from '@/domain/device/value/deviceId'

class DeviceDeleteUseCase {
  private repository: IDeviceRepository
  constructor(repository: IDeviceRepository) {
    this.repository = repository
  }
  deleteAll = async (ids: string[]) => {
    const deviceList = ids.map((id) => {
      const deviceId = new DeviceId(id)
      return new Device(deviceId)
    })
    try {
      await this.repository.delete(deviceList)
      return true
    } catch (e) {
      return false
    }
  }
}

export default DeviceDeleteUseCase
