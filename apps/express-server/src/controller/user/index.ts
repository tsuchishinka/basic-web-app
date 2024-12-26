import { userFetchUseCase, userRegisterUseCase } from '@/useCase/user'
import { NextFunction, Request, Response } from 'express'
import { RequestFetchUser, RequestFetchUsers, RequestRegisterUser } from './type'

const fetchUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { offset, limit, name, mailAddress }: RequestFetchUsers = req.query
    const response = await userFetchUseCase.fetchUsers({
      offset,
      limit,
      name,
      mailAddress,
    })
    res.json(response)
  } catch (e) {
    next(e)
  }
}

const fetchUser = async (req: Request<RequestFetchUser>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const response = await userFetchUseCase.fetchUser(id)
    res.json(response)
  } catch (e) {
    next(e)
  }
}

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, mailAddress, password }: RequestRegisterUser = req.body
    await userRegisterUseCase.registerUser({ name, mailAddress, password })
    res.status(200).send(`User ${name} register succeeded`)
  } catch (e) {
    next(e)
  }
}

export { fetchUser, fetchUsers, registerUser }
