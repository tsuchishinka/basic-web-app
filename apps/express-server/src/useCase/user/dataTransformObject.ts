import { User } from '@/domain/user/entity/user'
import { MailAddress } from '@/domain/user/value/mailAddress'
import { UserId } from '@/domain/user/value/userId'

const convertUserData = (user: User) => {
  return {
    id: user.id.value,
    name: user.name.value,
    mailAddress: user.mailAddress.value,
    password: user.password.value,
    salt: user.password.salt,
  }
}

const convertUserIdData = (userId: UserId) => {
  return userId.value
}

const convertMailAddressData = (mailAddress: MailAddress) => {
  return mailAddress.value
}

export { convertMailAddressData, convertUserData, convertUserIdData }
