import { IDeviceRepository } from '@/domain/device/deviceRepository'
import { DeviceId } from '@/domain/device/value/deviceId'

class DeviceDeleteUseCase {
  private repository: IDeviceRepository
  constructor(repository: IDeviceRepository) {
    this.repository = repository
  }
  deleteDevices = async (ids: string[]) => {
    const deviceList = ids.map((id) => {
      return new DeviceId(id)
    })
    await this.repository.deleteDevices(deviceList)
  }
}

export { DeviceDeleteUseCase }
