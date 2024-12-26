import { Description } from '@/domain/common/value/description'
import { DeviceId } from '../value/deviceId'
import { DeviceName } from '../value/deviceName'
import { Model } from '../value/model'

class Device {
  private _id: DeviceId
  private _name: DeviceName
  private _model: Model
  private _description: Description
  constructor({
    deviceId,
    deviceName,
    model,
    description,
  }: {
    deviceId: DeviceId
    deviceName: DeviceName
    model: Model
    description: Description
  }) {
    this._id = deviceId
    this._name = deviceName
    this._model = model
    this._description = description
  }

  updateName(name: DeviceName) {
    this._name = name
  }

  updateModel(model: Model) {
    this._model = model
  }

  updateDescription(description: Description) {
    this._description = description
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get model() {
    return this._model
  }

  get description() {
    return this._description
  }
}

export { Device }
