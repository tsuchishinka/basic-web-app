import { fetchClientHTML } from '@/controller/client'
import express from 'express'

const clientRouter = express.Router()

clientRouter.use('/', fetchClientHTML)

export { clientRouter }
