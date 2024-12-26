abstract class CustomError extends Error {
  code: number
  errorCode: string
  message: string

  constructor(message: string) {
    super(message)
    this.message = message
    this.code = 400
    this.errorCode = ''
  }
}

export { CustomError }
