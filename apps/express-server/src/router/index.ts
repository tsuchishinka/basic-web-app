import express from 'express'
import authRouter from './auth'
import deviceRoutes from './device'
import userRouter from './user'

const appRoute = express.Router()

appRoute.use('/', authRouter)

appRoute.use('/device', deviceRoutes)

appRoute.use('/user', userRouter)

export default appRoute
