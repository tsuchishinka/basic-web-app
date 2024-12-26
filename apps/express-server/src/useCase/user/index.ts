import { SQLiteUserRepository } from '@/repository/sqlite/sqliteUserRepository'
import { UserFetchUseCase } from './userFetchUseCase'
import { UserRegisterUseCase } from './userRegisterUseCase'

// const mongoUserRepository = new MongoUserRepository()
const sqliteUserRepository = new SQLiteUserRepository()

const userFetchUseCase = new UserFetchUseCase(sqliteUserRepository)
const userRegisterUseCase = new UserRegisterUseCase(sqliteUserRepository)

export { userFetchUseCase, userRegisterUseCase }
