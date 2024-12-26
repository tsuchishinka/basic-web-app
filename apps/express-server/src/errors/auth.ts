import { CustomError } from '.'

class AuthentificateError extends CustomError {
  code: 401
  constructor(message: string) {
    super(message)
    this.code = 401
  }
}

export { AuthentificateError }
