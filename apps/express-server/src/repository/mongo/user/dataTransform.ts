import { User } from '@/domain/user/entity/user'
import { MailAddress } from '@/domain/user/value/mailAddress'
import { Password } from '@/domain/user/value/password'
import { UserId } from '@/domain/user/value/userId'
import { UserName } from '@/domain/user/value/userName'
import { ObjectId, WithId } from 'mongodb'
import { UserCollectionFields } from './UserCollectionField'

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

  const userId = new UserId(collectionData._id.toString())
  const userName = new UserName(collectionData.name)
  const mailAddress = new MailAddress(collectionData.mailAddress)
  const password = new Password(collectionData.password, collectionData.passwordSalt)
  return new User(userId, userName, mailAddress, password)
}

const toCollectionData = (user: User): UserCollectionFields => {
  return {
    _id: new ObjectId(user.id.value),
    name: user.name.value,
    password: user.password.encrypt(),
    mailAddress: user.mailAddress.value,
    passwordSalt: user.password.salt,
  }
}

export { toCollectionData, toUser, toUserCollectionSearchParams }
