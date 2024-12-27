import { IUserRepository } from '@/domain/user/IUserRepository'
import { UserService } from '@/domain/user/service/userService'
import { MailAddress } from '@/domain/user/value/mailAddress'
import { Password } from '@/domain/user/value/password'

class AuthUseCase {
  private repository: IUserRepository
  private userService: UserService

  constructor(repository: IUserRepository) {
    this.repository = repository
    this.userService = new UserService(this.repository)
  }

  async login(params: { mailAddress: string; password: string }) {
    const mailAddress = new MailAddress(params.mailAddress)
    const password = new Password(params.password, '')
    if (!(await this.userService.authenticate(mailAddress, password))) {
      throw new Error('Authenticate failed')
    }
    return { result: 'sucess' }
  }
}

export { AuthUseCase }
