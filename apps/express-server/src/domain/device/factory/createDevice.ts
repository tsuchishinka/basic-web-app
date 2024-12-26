import { Description } from '@/domain/common/value/description'
import { Device } from '../entity/device'
import { DeviceId } from '../value/deviceId'
import { DeviceName } from '../value/deviceName'
import { Model } from '../value/model'

const createDevice = (params: {
  id: string
  name: string
  model: string
  description: string | undefined
}) => {
  const deviceId = new DeviceId(params.id)
  const deviceName = new DeviceName(params.name)
  const model = new Model(params.model)
  const description = new Description(params.description)
  return new Device({ deviceId, deviceName, model, description })
}

export { createDevice }
