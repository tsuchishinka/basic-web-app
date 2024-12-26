import { Device } from '@/domain/device/entity/device'
import { DeviceId } from '@/domain/device/value/deviceId'

const convertDeviceData = (device: Device) => {
  return {
    id: device.id.value,
    name: device.name.value,
    model: device.model.value,
    description: device.description.value,
  }
}

const convertDeviceIdData = (deviceId: DeviceId) => {
  return deviceId.value
}

export { convertDeviceData, convertDeviceIdData }
