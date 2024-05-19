import IUserFactory from '@/domain/user/factory/IUserFactory'
import { IUserRepository } from '@/domain/user/IUserRepository'

class UserRegisterUseCase {
  private repository: IUserRepository
  private factory: IUserFactory

  constructor(repository: IUserRepository, factory: IUserFactory) {
    this.repository = repository
    this.factory = factory
  }

  registerUser = async (name: string, password: string): Promise<void> => {
    const user = this.factory.createUser(name, password)
    await this.repository.registerUser(user)
  }
}

export default UserRegisterUseCase
