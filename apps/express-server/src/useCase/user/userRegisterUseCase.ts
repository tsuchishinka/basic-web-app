import { createUser } from '@/domain/user/factory/createUser'
import { IUserRepository } from '@/domain/user/IUserRepository'
import { UserService } from '@/domain/user/service/userService'
import { UserDuplicateError } from '@/errors/user'

class UserRegisterUseCase {
  private repository: IUserRepository
  private userService: UserService

  constructor(repository: IUserRepository) {
    this.repository = repository
    this.userService = new UserService(repository)
  }

  registerUser = async (params: {
    name: string
    mailAddress: string
    password: string
  }): Promise<void> => {
    const user = createUser(params)
    if (await this.userService.exist(user.mailAddress)) {
      throw new UserDuplicateError('Already exist user')
    }
    await this.repository.registerUser(user)
  }
}

export { UserRegisterUseCase }
