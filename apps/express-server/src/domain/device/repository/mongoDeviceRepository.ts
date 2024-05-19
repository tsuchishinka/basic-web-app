import { ObjectId } from 'mongodb'
import { WithId } from 'mongodb'
import Device from '../entity/device'
import NullDevice from '../entity/noDevice'
import DeviceDescription from '../value/description'
import DeviceId from '../value/deviceId'
import DeviceName from '../value/deviceName'
import ModelName from '../value/modelName'
import { IDeviceRepository } from './IDeviceRepository'
import { mongoClient } from '@/common/db/mongoClient'
import DeviceGroupId from '@/domain/deviceGroup/value/deviceGroupId'

interface CollectionColumns {
  name: string
  model: string
  description: string
}

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

const toDevice = (collectionData: WithId<CollectionColumns>): Device => {
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

const DB_NAME = 'tsuchidaDB'
const DEVICE_COLLECTION_NAME = 'device'

class MongoDeviceRepositories implements IDeviceRepository {
  getCollection = async () => {
    return await mongoClient.getCollection(DB_NAME, DEVICE_COLLECTION_NAME)
  }
  fetchList = async (
    offset: number,
    limit: number,
    params?: {
      deviceId?: DeviceId
      deviceName?: DeviceName
      modelName?: ModelName
      parentDeviceGroupId?: DeviceGroupId
    },
  ): Promise<{
    offset: number
    total: number
    pageCount: number
    list: Device[]
  }> => {
    const collection = await this.getCollection()
    const total = await collection.countDocuments(params)

    let list = []
    const collectionSearchParams = getCollectionSearchParams(params)
    if (collectionSearchParams) {
      list = await collection
        .find<WithId<CollectionColumns>>(collectionSearchParams)
        .skip(offset)
        .limit(limit)
        .toArray()
    } else {
      list = await collection
        .find<WithId<CollectionColumns>>({})
        .skip(offset)
        .limit(limit)
        .toArray()
    }

    const deviceList: Device[] = list.map((item) => toDevice(item))
    return {
      offset,
      list: deviceList,
      total,
      pageCount: list.length,
    }
  }

  fetch = async (deviceId: DeviceId) => {
    const collection = await this.getCollection()
    const deviceCollectionItem = await collection.findOne<WithId<CollectionColumns>>({
      _id: new ObjectId(deviceId.value),
    })
    if (deviceCollectionItem === null) {
      return NullDevice
    }
    return toDevice(deviceCollectionItem)
  }

  create = async (device: Device) => {
    const collection = await this.getCollection()
    const collectionData = toCollectionData(device)
    try {
      const result = await collection.insertOne(collectionData)
    } catch (e) {}
  }

  update = async (device: Device) => {
    const collection = await this.getCollection()
    const collectionData = toCollectionData(device)
    try {
      await collection.updateOne(
        { _id: collectionData._id },
        {
          $set: {
            ...collectionData,
          },
        },
      )
      return toDevice(collectionData)
    } catch (e) {}
  }

  delete = async (devices: Device[]) => {
    const collection = await this.getCollection()
    await Promise.all(
      devices.map(async (device) => {
        return await collection.deleteOne({ _id: new ObjectId(device.id.value) })
      }),
    )
  }
}

export default MongoDeviceRepositories
