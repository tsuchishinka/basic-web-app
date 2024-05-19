import User from '../entity/user'

interface IUserFactory {
  createUser: (name: string, password: string) => User
}

export default IUserFactory
