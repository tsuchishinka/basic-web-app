import UserFetchUseCase from './userFetchUseCase'
import UserRegisterUseCase from './userRegisterUseCase'
import UserFactory from '@/domain/user/factory/userFactory'
import MongoUserRepository from '@/repository/user/mongoUserRepository'

const mongoUserRepository = new MongoUserRepository()
const userFactory = new UserFactory()

const userFetchUseCase = new UserFetchUseCase(mongoUserRepository)
const userRegisterUseCase = new UserRegisterUseCase(mongoUserRepository, userFactory)

export { userFetchUseCase, userRegisterUseCase }
