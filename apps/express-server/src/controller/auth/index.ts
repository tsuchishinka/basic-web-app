import { AuthentificateError } from '@/errors/auth'
import { authUseCase } from '@/useCase/auth'
import { NextFunction, Request, Response } from 'express'
import { RequestLogin } from './index.type'

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mail_address, password }: RequestLogin = req.body

    const loginCallback = () => {
      req.session.login = true
    }
    await authUseCase.login(
      {
        mailAddress: mail_address,
        password,
      },
      loginCallback,
    )

    res.status(200).json({
      message: 'success',
    })
  } catch (e) {
    next(new AuthentificateError('Authenticate failed'))
  }
}

const checkSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.login === undefined) {
    next(new AuthentificateError('Authenticate failed'))
  }
  next()
}

export { checkSession, login }
