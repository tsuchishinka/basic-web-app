import { EMPTY_ID } from '@/const/common'
import { IDeviceRepository } from '@/domain/device/deviceRepository'
import { createDevice } from '@/domain/device/factory/createDevice'

class DeviceRegisterUseCase {
  private repository: IDeviceRepository
  constructor(repository: IDeviceRepository) {
    this.repository = repository
  }

  registerDevice = async (name: string, model: string, description?: string) => {
    const device = createDevice({ id: EMPTY_ID, name, model, description })
    await this.repository.registerDevice(device)
  }
}

export { DeviceRegisterUseCase }
