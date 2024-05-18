import { Request, Response } from 'express'
import { RequestFetchUsers, RequestFetchUser, RequestRegisterUser } from './index.type'
import { userFetchUseCase, userRegisterUseCase } from '@/useCase/user'

const fetchUsers = async (req: Request, res: Response) => {
  try {
    const { offset, limit, name }: RequestFetchUsers = req.body
    const searchParams = { name }
    const response = await userFetchUseCase.fetchUsers(offset, limit, searchParams)
    res.json(response)
  } catch {
    //
  }
}

const fetchUser = async (req: Request<RequestFetchUser>, res: Response) => {
  try {
    const { id } = req.params
    const response = await userFetchUseCase.fetchUser(id)
    res.json(response)
  } catch {
    //
  }
}

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, password }: RequestRegisterUser = req.body
    await userRegisterUseCase.registerUser(name, password)
    res.status(200).send(`User ${name} register successly`)
  } catch {
    res.status(500).send(`User Registration failed`)
  }
}

export { fetchUsers, fetchUser, registerUser }
