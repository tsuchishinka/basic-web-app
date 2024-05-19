import express from 'express'
import { checkSession, login } from '@/controller/auth'

const authRouter = express.Router()

authRouter.post('/', login)

authRouter.use(checkSession)

export default authRouter
