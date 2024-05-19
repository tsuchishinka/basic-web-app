import User from './entity/user'
import UserName from './value/userName'

export interface IUserRepository {
  // update: (user: User) => void
  registerUser: (user: User) => void
  fetchUsers: (
    offset: number,
    limit: number,
    params?: {
      userName?: UserName
    },
  ) => Promise<{
    offset: number
    total: number
    pageCount: number
    list: User[]
  }>
  fetchUser: (userId: string) => Promise<User | undefined>
  // delete: (users: User[]) => void
}
