import { IUserRepository } from '../IUserRepository'
import { MailAddress } from '../value/mailAddress'
import { Password } from '../value/password'

class UserService {
  repository: IUserRepository
  constructor(repository: IUserRepository) {
    this.repository = repository
  }
  async authenticate(mailAddress: MailAddress, password: Password) {
    const user = await this.repository.fetchUser({ mailAddress })
    if (user === undefined) {
      return false
    }
    const salt = user.password.salt
    const inputPassword = new Password(password.value, salt)
    return inputPassword.encrypt() === user.password.value
  }

  async exist(mailAddress: MailAddress) {
    const user = await this.repository.fetchUser({ mailAddress })
    return user !== undefined
  }
}

export { UserService }
