import DeviceConst from '../const'

class DeviceName {
  private readonly _value: string
  constructor(value: string) {
    if (value === null || value === undefined) {
      throw new Error(DeviceConst.modelName.NULL_INVALID_MESSAGE)
    }
    if (value.length >= DeviceConst.deviceName.MAX_LENGTH) {
      throw new Error(DeviceConst.deviceName.MAX_LENGTH_MESSAGE)
    }
    this._value = value
  }
  get value() {
    return this._value
  }
}

export default DeviceName
