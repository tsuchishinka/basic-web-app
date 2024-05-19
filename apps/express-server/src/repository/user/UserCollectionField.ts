import { ObjectId } from 'mongodb'

type UserCollectionFields = {
  _id: ObjectId
  name: string
  password: string
  passwordSalt: string
}

export type { UserCollectionFields }
