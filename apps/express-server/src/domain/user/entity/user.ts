import { MailAddress } from '../value/mailAddress'
import { Password } from '../value/password'
import { UserId } from '../value/userId'
import { UserName } from '../value/userName'

class User {
  readonly id: UserId
  private _name: UserName
  private _mailAddress: MailAddress
  private _password: Password
  constructor(id: UserId, userName: UserName, mailAddress: MailAddress, password: Password) {
    this.id = id
    this._name = userName
    this._mailAddress = mailAddress
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

  get mailAddress() {
    return this._mailAddress
  }
}

export { User }
