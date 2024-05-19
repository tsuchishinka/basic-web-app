import cors from 'cors'
import express from 'express'

const corsRouter = express.Router()
corsRouter.use(
  cors({
    origin: /^http:\/\/localhost.*/,
    credentials: true,
  }),
)

export default corsRouter
