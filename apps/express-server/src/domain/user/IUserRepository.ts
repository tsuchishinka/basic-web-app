import { User } from './entity/user'
import { MailAddress } from './value/mailAddress'
import { UserId } from './value/userId'

interface IUserRepository {
  update?: (user: User) => void
  registerUser: (user: User) => void
  fetchUser: (params: { userId?: UserId; mailAddress?: MailAddress }) => Promise<User | undefined>
  delete?: (users: User[]) => void
}

export type { IUserRepository }
