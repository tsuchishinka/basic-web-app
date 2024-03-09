import { IDeviceRepository } from '@/domain/device/repository/IDeviceRepository'
import IDeviceFactory from '@/domain/device/factory/IDeviceFactory'
import DeviceName from '@/domain/device/value/deviceName'
import ModelName from '@/domain/device/value/modelName'
import DeviceDescription from '@/domain/device/value/description'

class DeviceRegisterUseCase {
  private repository: IDeviceRepository
  private factory: IDeviceFactory
  constructor(repository: IDeviceRepository, factory: IDeviceFactory) {
    this.repository = repository
    this.factory = factory
  }

  registerDevice = async (name: string, modelName: string, description?: string) => {
    const deviceName = new DeviceName(name)
    const deviceModelName = new ModelName(modelName)
    const deviceDescription = new DeviceDescription(description ?? '')
    const device = this.factory.createDevice(deviceName, deviceModelName, deviceDescription)
    await this.repository.create(device)
  }
}

export default DeviceRegisterUseCase
