import { Device } from '@/domain/device/entity/device'
import { createDevice } from '@/domain/device/factory/createDevice'
import { DeviceId } from '@/domain/device/value/deviceId'
import { DeviceNotFoundError } from '@/errors/device'
import { mongoClient } from '@/repository/mongo/mongoClient'
import { convertDeviceData, convertDeviceIdData } from '@/useCase/device/dataTransformObject'
import { ObjectId } from 'mongodb'
import { IDeviceRepository } from '../../domain/device/deviceRepository'

const DB_NAME = 'tsuchidaDB'
const DEVICE_COLLECTION_NAME = 'device'

class MongoDeviceRepositories implements IDeviceRepository {
  getCollection = async () => {
    return await mongoClient.getCollection(DB_NAME, DEVICE_COLLECTION_NAME)
  }

  fetchDevice = async (deviceId: DeviceId) => {
    const collection = await this.getCollection()
    const id = convertDeviceIdData(deviceId)
    const response = await collection.findOne({
      _id: new ObjectId(id),
    })
    if (response === null) {
      throw new DeviceNotFoundError(`device id ${id} is not found`)
    }
    return createDevice({
      id: response._id.toString(),
      name: response.name,
      model: response.model,
      description: response.description,
    })
  }

  registerDevice = async (device: Device) => {
    const collection = await this.getCollection()
    try {
      await collection.insertOne(convertDeviceData(device))
      // eslint-disable-next-line
    } catch (e) {}
  }

  updateDevice = async (device: Device) => {
    const collection = await this.getCollection()
    const { id, name, model, description } = convertDeviceData(device)
    try {
      await collection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name,
            model,
            description,
          },
        },
      )
    } catch (e) {
      // TODO: エラー処理を書く
    }
  }

  deleteDevices = async (deviceIds: DeviceId[]) => {
    const collection = await this.getCollection()
    await Promise.all(
      deviceIds.map(async (deviceId) => {
        return await collection.deleteOne({ _id: new ObjectId(convertDeviceIdData(deviceId)) })
      }),
    )
  }
}

export { MongoDeviceRepositories }
