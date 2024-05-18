import { WithId } from 'mongodb'
import { ObjectId } from 'mongodb'

import { toUserCollectionSearchParams, toCollectionData } from './dataTransform'
import { toUser } from './dataTransform'
import { UserCollectionFields } from './UserCollectionField'
import { mongoClient } from '@/common/db/mongoClient'
import User from '@/domain/user/entity/user'
import { IUserRepository } from '@/domain/user/IUserRepository'
import UserName from '@/domain/user/value/userName'

const DB_NAME = 'tsuchidaDB'
const USER_COLLECTION_NAME = 'user'

class MongoUserRepository implements IUserRepository {
  getCollection = async () => {
    return await mongoClient.getCollection(DB_NAME, USER_COLLECTION_NAME)
  }

  fetchUsers = async (
    offset: number,
    limit: number,
    params?:
      | {
          userName?: UserName | undefined
        }
      | undefined,
  ): Promise<{ offset: number; total: number; pageCount: number; list: User[] }> => {
    const collection = await this.getCollection()
    const colSearchParams = toUserCollectionSearchParams(params)
    const total = await collection.countDocuments(colSearchParams)
    let collectionUserList = []
    if (colSearchParams === undefined) {
      collectionUserList = await collection
        .find<WithId<UserCollectionFields>>({})
        .skip(offset)
        .limit(limit)
        .toArray()
    } else {
      collectionUserList = await collection
        .find<WithId<UserCollectionFields>>(colSearchParams)
        .skip(offset)
        .limit(limit)
        .toArray()
    }
    const userList = collectionUserList.map((collectionUser) => {
      const user = toUser(collectionUser)
      return user
    })

    return {
      offset,
      list: userList as User[],
      total,
      pageCount: userList.length,
    }
  }

  fetchUser = async (userId: string): Promise<User | undefined> => {
    const collection = await this.getCollection()
    const fetchedUserFromCollection = await collection.findOne<WithId<UserCollectionFields>>({
      _id: new ObjectId(userId),
    })
    return toUser(fetchedUserFromCollection)
  }

  registerUser = async (user: User) => {
    const collection = await this.getCollection()
    const collectionData = toCollectionData(user)
    try {
      await collection.insertOne(collectionData)
      // eslint-disable-next-line
    } catch (e) {}
  }
}

export default MongoUserRepository
