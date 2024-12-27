import { CustomError } from '.'

class AuthentificError extends CustomError {
  code: 401
  constructor(message: string) {
    super(message)
    this.code = 401
  }
}

export { AuthentificError }
