import { CLIENT_STATIC_PATH } from '@/const/common'
import express from 'express'
import authRouter from './auth'
import { clientRouter } from './client'
import deviceRoutes from './device'
import userRouter from './user'

const appRoute = express.Router()

appRoute.use(express.static(CLIENT_STATIC_PATH))

appRoute.use('/app', authRouter)
appRoute.use('/app/device', deviceRoutes)
appRoute.use('/app/user', userRouter)
appRoute.use('/', clientRouter)

export { appRoute }
