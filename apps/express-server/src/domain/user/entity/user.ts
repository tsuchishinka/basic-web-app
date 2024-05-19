import Password from '../value/password'
import UserName from '../value/userName'

class User {
  readonly id: string
  private _name: UserName
  private _password: Password
  constructor(id: string, userName: UserName, password: Password) {
    this.id = id
    this._name = userName
    this._password = password
  }

  changeName = (name: UserName) => {
    this._name = name
  }

  changePassword = (password: Password) => {
    this._password = password
  }

  get name() {
    return this._name
  }

  get password() {
    return this._password
  }
}

export default User
