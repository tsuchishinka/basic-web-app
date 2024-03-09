import DeviceGroupConst from '../const'

class DeviceGroupId {
  private _value: string
  constructor(value: string) {
    if (value === null) {
      throw new Error(DeviceGroupConst.deviceGroupId.NULL_INVALID_MESSAGE)
    }
    this._value = value
  }
  get value() {
    return this._value
  }
}

export default DeviceGroupId
