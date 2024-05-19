import { IDeviceRepository } from '@/domain/device/IDeviceRepository'
import DeviceDescription from '@/domain/device/value/description'
import DeviceId from '@/domain/device/value/deviceId'
import DeviceName from '@/domain/device/value/deviceName'
import ModelName from '@/domain/device/value/modelName'

class DeviceUpdateUseCase {
  private repository: IDeviceRepository
  constructor(repository: IDeviceRepository) {
    this.repository = repository
  }
  updateDevice = async (id: string, name?: string, model?: string, description?: string) => {
    const device = await this.repository.fetchDevice(new DeviceId(id))
    if (device === undefined) {
      // TODO: エラー処理を書く
      return
    }

    if (name) {
      device.changeName(new DeviceName(name))
    }
    if (model) {
      device.changeModelName(new ModelName(model))
    }
    if (description) {
      device.changeDescription(new DeviceDescription(description))
    }
    return this.repository.updateDevice(device)
  }
}

export default DeviceUpdateUseCase
