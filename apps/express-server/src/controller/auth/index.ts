import { AuthentificError } from '@/errors/auth'
import { authUseCase } from '@/useCase/auth'
import { NextFunction, Request, Response } from 'express'
import { RequestLogin } from './type'

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mail_address, password }: RequestLogin = req.body

    const successResult = await authUseCase.login({
      mailAddress: mail_address,
      password,
    })
    req.session.login = true

    res.status(200).json(successResult)
  } catch (e) {
    next(e)
  }
}

const checkSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.login === undefined) {
    next(new AuthentificError('Authenticate failed'))
  }
  next()
}

export { checkSession, login }
