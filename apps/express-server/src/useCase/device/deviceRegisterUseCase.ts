import IDeviceFactory from '@/domain/device/factory/IDeviceFactory'
import { IDeviceRepository } from '@/domain/device/IDeviceRepository'

class DeviceRegisterUseCase {
  private repository: IDeviceRepository
  private factory: IDeviceFactory
  constructor(repository: IDeviceRepository, factory: IDeviceFactory) {
    this.repository = repository
    this.factory = factory
  }

  registerDevice = async (name: string, modelName: string, description?: string) => {
    const device = this.factory.createDevice(name, modelName, description)
    await this.repository.create(device)
  }
}

export default DeviceRegisterUseCase
