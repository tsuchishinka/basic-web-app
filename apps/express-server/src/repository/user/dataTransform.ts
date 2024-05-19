import { ObjectId, WithId } from 'mongodb'
import { UserCollectionFields } from './UserCollectionField'
import User from '@/domain/user/entity/user'
import Password from '@/domain/user/value/password'
import UserName from '@/domain/user/value/userName'

const toUserCollectionSearchParams = (params?: { userName?: UserName }) => {
  let collectionParams = {}
  Object.entries({ ...params }).every(([key, value]) => {
    if (value?.value === undefined || value.value.length === 0) {
      return
    }
    const regexValue = new RegExp(value.value)
    if (key === 'userName') {
      collectionParams = { ...collectionParams, name: regexValue }
    }
  })
  return collectionParams
}

const toUser = (collectionData: WithId<UserCollectionFields> | null): User | undefined => {
  if (collectionData === null) {
    return undefined
  }

  const userName = new UserName(collectionData.name)
  const password = new Password(collectionData.password, collectionData.passwordSalt)
  return new User(collectionData._id.toString(), userName, password)
}

const toCollectionData = (user: User): UserCollectionFields => {
  return {
    _id: new ObjectId(user.id),
    name: user.name.value,
    password: user.password.encrypt(),
    passwordSalt: user.password.salt,
  }
}

export { toUserCollectionSearchParams, toUser, toCollectionData }
