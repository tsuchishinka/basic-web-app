import express from 'express'
import { checkSession } from '@/controller/auth'
import { fetchUser, fetchUsers, registerUser } from '@/controller/user'

const userRouter = express.Router()

userRouter.post('/', registerUser)

userRouter.use(checkSession)
userRouter.get('/', fetchUsers)
userRouter.get('/:id', fetchUser)

export default userRouter
