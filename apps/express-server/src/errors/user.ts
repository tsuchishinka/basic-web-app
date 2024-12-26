import { CustomError } from '.'

class UserValidationError extends CustomError {
  code: 400
  errorCode: string
  constructor(message: string) {
    super(message)
    this.code = 400
    this.errorCode = 'A-000-0002'
  }
}

class UserDuplicateError extends CustomError {
  code: 400
  errorCode: string
  constructor(message: string) {
    super(message)
    this.code = 400
    this.errorCode = 'A-000-0001'
  }
}

class UserNotFoundError extends CustomError {
  code: 404
  errorCode: string
  constructor(message: string) {
    super(message)
    this.code = 404
    this.errorCode = 'A-000-0003'
  }
}

export { UserDuplicateError, UserNotFoundError, UserValidationError }
