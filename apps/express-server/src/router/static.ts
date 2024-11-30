import { CLIENT_STATIC_PATH } from '@/const/common'
import express from 'express'

const staticRouter = express.Router()

staticRouter.use(express.static(CLIENT_STATIC_PATH))

export { staticRouter }
