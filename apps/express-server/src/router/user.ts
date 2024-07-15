import express from 'express'
import { fetchUser, fetchUsers, registerUser } from '@/controller/user'
import { checkSession } from '@/controller/auth'

const userRouter = express.Router()

userRouter.post('/', registerUser)

userRouter.use(checkSession)
userRouter.get('/', fetchUsers)
userRouter.get('/:id', fetchUser)

export default userRouter
