import crypto from 'crypto'
import * as uuid from 'uuid'
import User from '../entity/user'
import Password from '../value/password'
import UserName from '../value/userName'
import IUserFactory from './IUserFactory'

class UserFactory implements IUserFactory {
  constructor() {}

  createUser(name: string, password: string) {
    const userName = new UserName(name)
    const salt = crypto.randomBytes(16).toString('hex')
    const passwordValue = new Password(password, salt)
    return new User(uuid.v4().slice(0, 12), userName, passwordValue)
  }
}

export default UserFactory
