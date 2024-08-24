import USER_CONST from '../const'

class UserName {
  readonly value: string
  constructor(value: string) {
    if (value.length < USER_CONST.USERNAME.MIN_LENGTH) {
      throw new Error('Username cannot be empty')
    }
    if (value.length > USER_CONST.USERNAME.MAX_LENGTH) {
      throw new Error(`Username must be in ${USER_CONST.USERNAME.MAX_LENGTH} characters`)
    }
    this.value = value
  }
}

export default UserName
