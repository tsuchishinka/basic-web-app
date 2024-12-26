import { Description } from '@/domain/common/value/description'
import { IDeviceRepository } from '@/domain/device/deviceRepository'
import { DeviceId } from '@/domain/device/value/deviceId'
import { DeviceName } from '@/domain/device/value/deviceName'
import { Model } from '@/domain/device/value/model'
import { DeviceNotFoundError } from '@/errors/device'

class DeviceUpdateUseCase {
  private repository: IDeviceRepository
  constructor(repository: IDeviceRepository) {
    this.repository = repository
  }
  updateDevice = async (id: string, name?: string, model?: string, description?: string) => {
    const device = await this.repository.fetchDevice(new DeviceId(id))
    if (device === undefined) {
      // TODO: エラー処理を書く
      throw new DeviceNotFoundError('device not found')
    }

    if (name) {
      device.updateName(new DeviceName(name))
    }
    if (model) {
      device.updateModel(new Model(model))
    }
    if (description) {
      device.updateDescription(new Description(description))
    }
    return this.repository.updateDevice(device)
  }
}

export { DeviceUpdateUseCase }
