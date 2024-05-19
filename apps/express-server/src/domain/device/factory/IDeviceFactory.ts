import Device from '../entity/device'

interface IDeviceFactory {
  createDevice: (name: string, modelName: string, description: string | undefined) => Device
}

export default IDeviceFactory
