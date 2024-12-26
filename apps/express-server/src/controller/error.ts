import { CustomError } from '@/errors'
import { NextFunction, Request, Response } from 'express'

const errorHandler = (error: Error, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(error)
  }
  if (error instanceof CustomError) {
    res.status(error.code).json({
      code: error.code,
      errorCode: error.errorCode,
      message: error.message,
    })
  } else {
    res.status(500).json({
      message: error.message,
    })
  }
}

export { errorHandler }
