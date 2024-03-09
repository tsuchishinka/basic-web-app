import DeviceConst from '../const'

class DeviceDescription {
  private readonly _value: string
  constructor(value: string) {
    if (value === null || value === undefined) {
      throw new Error(DeviceConst.description.NULL_INVALID_MESSAGE)
    }
    if (value.length >= DeviceConst.description.MAX_LENGTH) {
      throw new Error(DeviceConst.description.MAX_LENGTH_MESSAGE)
    }
    this._value = value
  }
  get value() {
    return this._value
  }
}

export default DeviceDescription
