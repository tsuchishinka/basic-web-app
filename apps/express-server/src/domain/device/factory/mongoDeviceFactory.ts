import Device from '../entity/device'
import DeviceDescription from '../value/description'
import DeviceId from '../value/deviceId'
import DeviceName from '../value/deviceName'
import ModelName from '../value/modelName'
import IDeviceFactory from './IDeviceFactory'
import * as uuid from 'uuid'
import { UUID } from 'crypto'

class MongoDeviceFactory implements IDeviceFactory {
  constructor() {}
  createDevice = (deviceName: DeviceName, modelName: ModelName, description: DeviceDescription) => {
    return new Device(new DeviceId(uuid.v4().slice(0, 12)), deviceName, modelName, description)
  }
}

export default MongoDeviceFactory
