import { NextFunction, Request, Response } from 'express'
import { RequestLogin } from './index.type'
import { authUseCase } from '@/useCase/auth'

const login = async (req: Request, res: Response) => {
  try {
    const { name, password }: RequestLogin = req.body

    const loginCallback = () => {
      req.session.login = true
    }
    await authUseCase.login(name, password, loginCallback)

    res.status(200).json({
      message: 'success',
    })
  } catch (e) {
    res.status(401).send('Authenticate failed')
  }
}

const checkSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.login === undefined) {
    res.status(401).send('Authenticate failed')
    next('error')
  }
  next()
}

export { login, checkSession }
