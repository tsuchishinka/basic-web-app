import { IUserRepository } from '@/domain/user/IUserRepository'
import UserService from '@/domain/user/service/userService'
import UserName from '@/domain/user/value/userName'

class AuthUseCase {
  private repository: IUserRepository
  private userService: UserService

  constructor(repository: IUserRepository) {
    this.repository = repository
    this.userService = new UserService(this.repository)
  }

  async login(userName: string, password: string, loginCallback: () => void) {
    const userNameValue = new UserName(userName)
    if (!(await this.userService.existFromAuthAttribute(userNameValue, password))) {
      throw new Error('Authenticate failed')
    }
    loginCallback()
  }

  async checkLoginUserExisting(userId: string) {
    if (!(await this.userService.exist(userId))) {
      throw new Error('User is not exists')
    }
  }
}

export default AuthUseCase
