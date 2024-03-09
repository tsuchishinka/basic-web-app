import Device from '../entity/device'
import DeviceDescription from '../value/description'
import DeviceName from '../value/deviceName'
import ModelName from '../value/modelName'

interface IDeviceFactory {
  createDevice: (
    deviceName: DeviceName,
    modelName: ModelName,
    description: DeviceDescription,
  ) => Device
}

export default IDeviceFactory
