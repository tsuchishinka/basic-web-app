import { ObjectId, WithId } from 'mongodb'

import { User } from '@/domain/user/entity/user'
import { IUserRepository } from '@/domain/user/IUserRepository'
import { MailAddress } from '@/domain/user/value/mailAddress'
import { UserId } from '@/domain/user/value/userId'
import { mongoClient } from '@/repository/mongo/mongoClient'
import { convertUserIdData } from '@/useCase/user/dataTransformObject'
import { toCollectionData, toUser } from './dataTransform'
import { UserCollectionFields } from './UserCollectionField'

const DB_NAME = 'tsuchidaDB'
const USER_COLLECTION_NAME = 'user'

class MongoUserRepository implements IUserRepository {
  getCollection = async () => {
    return await mongoClient.getCollection(DB_NAME, USER_COLLECTION_NAME)
  }

  // fetchUsers = async (
  //   offset: number,
  //   limit: number,
  //   params?:
  //     | {
  //         userName?: UserName | undefined
  //       }
  //     | undefined,
  // ): Promise<{ offset: number; total: number; pageCount: number; list: User[] }> => {
  //   const collection = await this.getCollection()
  //   const colSearchParams = toUserCollectionSearchParams(params)
  //   const total = await collection.countDocuments(colSearchParams)
  //   let collectionUserList = []
  //   if (colSearchParams === undefined) {
  //     collectionUserList = await collection
  //       .find<WithId<UserCollectionFields>>({})
  //       .skip(offset)
  //       .limit(limit)
  //       .toArray()
  //   } else {
  //     collectionUserList = await collection
  //       .find<WithId<UserCollectionFields>>(colSearchParams)
  //       .skip(offset)
  //       .limit(limit)
  //       .toArray()
  //   }
  //   const userList = collectionUserList.map((collectionUser) => {
  //     const user = toUser(collectionUser)
  //     return user
  //   })

  //   return {
  //     offset,
  //     list: userList as User[],
  //     total,
  //     pageCount: userList.length,
  //   }
  // }

  fetchUser = async (params: {
    userId?: UserId
    mailAddress?: MailAddress
  }): Promise<User | undefined> => {
    const collection = await this.getCollection()
    const id = convertUserIdData(params.userId!)
    const fetchedUserFromCollection = await collection.findOne<WithId<UserCollectionFields>>({
      _id: new ObjectId(id),
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

export { MongoUserRepository }
