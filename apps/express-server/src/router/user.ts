import express from 'express'
import { fetchUser, fetchUsers, registerUser } from '@/controller/user'

const userRouter = express.Router()

userRouter.get('/', fetchUsers)
userRouter.get('/:id', fetchUser)
userRouter.post('/', registerUser)

export default userRouter
