import { DEVICE_NAME_MAX_LENGTH } from '@/const/device'
import { DeviceValidationError } from '@/errors/device'

class DeviceName {
  readonly value: string
  constructor(name: string) {
    if (name === null || name === undefined || name.trim() === '') {
      throw new DeviceValidationError('device name is empty')
    }
    if (name.length >= DEVICE_NAME_MAX_LENGTH) {
      throw new DeviceValidationError('device name is over max text length')
    }
    this.value = name
  }
}

export { DeviceName }
