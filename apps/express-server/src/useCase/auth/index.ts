import { SQLiteUserRepository } from '@/repository/sqlite/sqliteUserRepository'
import { AuthUseCase } from './authUseCase'

const authUseCase = new AuthUseCase(new SQLiteUserRepository())

export { authUseCase }
