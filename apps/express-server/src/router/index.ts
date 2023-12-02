import express from 'express'
import deviceRoutes from './device'

const appRoute = express.Router()
appRoute.use('/device', deviceRoutes)
export default appRoute
