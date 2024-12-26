import { ObjectId } from 'mongodb'

type UserCollectionFields = {
  _id: ObjectId
  name: string
  password: string
  passwordSalt: string
  mailAddress: string
}

export type { UserCollectionFields }
