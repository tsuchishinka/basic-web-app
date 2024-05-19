import crypto from 'crypto'

class Password {
  readonly value: string
  readonly salt: string
  constructor(password: string, salt: string) {
    this.value = password
    this.salt = salt
  }
  encrypt = () => {
    return crypto
      .createHash('sha256')
      .update(this.value + this.salt)
      .digest('hex')
  }
}

export default Password
