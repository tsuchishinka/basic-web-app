import { CLIENT_STATIC_PATH } from '@/const/common'
import express from 'express'
import { authRouter } from './auth'
import { clientRouter } from './client'
import { deviceRouter } from './device'
import { userRouter } from './user'

const appRouter = express.Router()

appRouter.use(express.static(CLIENT_STATIC_PATH))

appRouter.use('/app', authRouter)
appRouter.use('/app/device', deviceRouter)
appRouter.use('/app/user', userRouter)
appRouter.use('/', clientRouter)

export { appRouter }
