import { UserValidationError } from '@/errors/user'
import crypto from 'crypto'

class Password {
  readonly value: string
  readonly salt: string

  constructor(password: string | undefined, salt: string) {
    if (password === undefined || password.trim() === '') {
      throw new UserValidationError('Password is cannot be empty')
    }
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

export { Password }
