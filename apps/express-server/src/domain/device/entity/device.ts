import DeviceId from '../value/deviceId'
import DeviceName from '../value/deviceName'
import ModelName from '../value/modelName'
import DeviceDescription from '../value/description'

class Device {
  private _id: DeviceId
  private _name: DeviceName
  private _modelName: ModelName
  private _description: DeviceDescription
  constructor(
    deviceId: DeviceId,
    deviceName?: DeviceName,
    modelName?: ModelName,
    description?: DeviceDescription,
  ) {
    this._id = deviceId
    this._name = deviceName ?? new DeviceName('')
    this._modelName = modelName ?? new ModelName('')
    this._description = description ?? new DeviceDescription('')
  }

  changeName = (name: DeviceName) => {
    this._name = name
  }

  changeModelName = (modelName: ModelName) => {
    this._modelName = modelName
  }

  changeDescription = (description: DeviceDescription) => {
    this._description = description
  }

  get name() {
    return this._name
  }

  get id() {
    return this._id
  }

  get modelName() {
    return this._modelName
  }

  get description() {
    return this._description
  }
}

export default Device
