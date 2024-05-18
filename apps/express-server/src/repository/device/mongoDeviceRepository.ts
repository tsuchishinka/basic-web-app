import { ObjectId } from 'mongodb'
import { WithId } from 'mongodb'
import Device from '../../domain/device/entity/device'
import { IDeviceRepository } from '../../domain/device/IDeviceRepository'
import DeviceId from '../../domain/device/value/deviceId'
import DeviceName from '../../domain/device/value/deviceName'
import ModelName from '../../domain/device/value/modelName'
import { getCollectionSearchParams, toCollectionData, toDevice } from './dateTransform'
import { DeviceCollectionFields } from './DeviceCollectionFields'
import { mongoClient } from '@/common/db/mongoClient'
import DeviceGroupId from '@/domain/deviceGroup/value/deviceGroupId'

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
    const collectionSearchParams = getCollectionSearchParams(params)

    const total = await collection.countDocuments(collectionSearchParams)
    let list = []
    if (collectionSearchParams) {
      list = await collection
        .find<WithId<DeviceCollectionFields>>(collectionSearchParams)
        .skip(offset)
        .limit(limit)
        .toArray()
    } else {
      list = await collection
        .find<WithId<DeviceCollectionFields>>({})
        .skip(offset)
        .limit(limit)
        .toArray()
    }
    const deviceList = list.map((item) => toDevice(item)).filter((item) => item !== undefined)
    return {
      offset,
      list: deviceList as Device[],
      total,
      pageCount: list.length,
    }
  }

  fetch = async (deviceId: DeviceId) => {
    const collection = await this.getCollection()
    const deviceCollectionItem = await collection.findOne<WithId<DeviceCollectionFields>>({
      _id: new ObjectId(deviceId.value),
    })
    return toDevice(deviceCollectionItem)
  }

  create = async (device: Device) => {
    const collection = await this.getCollection()
    const collectionData = toCollectionData(device)
    try {
      await collection.insertOne(collectionData)
      // eslint-disable-next-line
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
    } catch (e) {
      // TODO: エラー処理を書く
    }
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
