import * as uuid from 'uuid'
import Device from '../entity/device'
import DeviceDescription from '../value/description'
import DeviceId from '../value/deviceId'
import DeviceName from '../value/deviceName'
import ModelName from '../value/modelName'
import IDeviceFactory from './IDeviceFactory'

class MongoDeviceFactory implements IDeviceFactory {
  constructor() {}
  createDevice = (name: string, modelName: string, description: string | undefined) => {
    const deviceName = new DeviceName(name)
    const deviceModelName = new ModelName(modelName)
    const deviceDescription = new DeviceDescription(description ?? '')
    return new Device(
      new DeviceId(uuid.v4().slice(0, 12)),
      deviceName,
      deviceModelName,
      deviceDescription,
    )
  }
}

export default MongoDeviceFactory
