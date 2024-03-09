import DeviceConst from '../const'

class DeviceId {
  private readonly _value: string
  constructor(value: string) {
    if (value === null) {
      throw new Error(DeviceConst.deviceId.NULL_INVALID_MESSAGE)
    }
    this._value = value
  }
  get value() {
    return this._value
  }
}

export default DeviceId
