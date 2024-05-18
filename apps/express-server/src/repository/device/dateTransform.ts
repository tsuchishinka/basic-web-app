import { ObjectId } from 'mongodb'
import { WithId } from 'mongodb'
import Device from '../../domain/device/entity/device'
import DeviceDescription from '../../domain/device/value/description'
import DeviceName from '../../domain/device/value/deviceName'
import ModelName from '../../domain/device/value/modelName'
import { DeviceCollectionFields } from './DeviceCollectionFields'
import DeviceId from '@/domain/device/value/deviceId'

const getCollectionSearchParams = (params?: {
  deviceId?: DeviceId
  deviceName?: DeviceName
  modelName?: ModelName
}) => {
  const tempParams = { ...params }
  const noContent = Object.values(tempParams).every((value) => {
    return value === undefined || value === null
  })
  if (!params || noContent || Object.keys(params).length === 0) {
    return undefined
  }
  return {
    _id: new ObjectId(params.deviceId?.value ?? ''),
    name: params.deviceName?.value,
    model: params.modelName?.value,
  }
}

const toDevice = (collectionData: WithId<DeviceCollectionFields> | null): Device | undefined => {
  if (collectionData === null) {
    return undefined
  }
  const deviceId = new DeviceId(collectionData._id.toString())
  const name = new DeviceName(collectionData.name)
  const model = new ModelName(collectionData.model)
  const description = new DeviceDescription(collectionData.description)
  return new Device(deviceId, name, model, description)
}

const toCollectionData = (device: Device) => {
  return {
    _id: new ObjectId(device.id.value),
    name: device.name.value,
    model: device.modelName.value,
    description: device.description.value,
  }
}

export { toCollectionData, toDevice, getCollectionSearchParams }
