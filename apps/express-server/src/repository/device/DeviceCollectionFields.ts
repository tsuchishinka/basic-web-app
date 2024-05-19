import { ObjectId } from 'mongodb'

type DeviceCollectionFields = {
  _id: ObjectId
  name: string
  model: string
  description: string
}

export type { DeviceCollectionFields }
