import { CustomError } from '.'

class DeviceValidationError extends CustomError {
  code: 400
  errorCode: string
  constructor(message: string) {
    super(message)
    this.code = 400
    this.errorCode = 'D-000-0001'
  }
}

class DeviceNotFoundError extends CustomError {
  code: 404
  errorCode: string
  constructor(message: string) {
    super(message)
    this.code = 404
    this.errorCode = 'D-000-0002'
  }
}

export { DeviceNotFoundError, DeviceValidationError }
