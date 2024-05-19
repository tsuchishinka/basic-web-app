import AuthUseCase from './authUseCase'
import MongoUserRepository from '@/repository/user/mongoUserRepository'

const authUseCase = new AuthUseCase(new MongoUserRepository())

export { authUseCase }
