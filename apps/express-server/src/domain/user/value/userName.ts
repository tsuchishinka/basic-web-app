import { USER_NAME_MAX_LENGTH } from '@/const/user'
import { UserValidationError } from '@/errors/user'

class UserName {
  readonly value: string
  constructor(value: string) {
    if (value === null || value === undefined || value.trim() === '') {
      throw new UserValidationError('Username cannot be empty')
    }
    if (value.length > USER_NAME_MAX_LENGTH) {
      throw new UserValidationError(`Username must be in ${USER_NAME_MAX_LENGTH} characters`)
    }
    this.value = value
  }
}

export { UserName }
