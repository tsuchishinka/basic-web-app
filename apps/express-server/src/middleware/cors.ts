import cors from 'cors'
import express from 'express'

const corsRouter = express.Router()
const originPaths = process.env.ORIGIN_PATH?.split(',') ?? []
corsRouter.use(
  cors({
    origin: [/^http:\/\/localhost.*/, ...originPaths],
    credentials: true,
  }),
)

export { corsRouter }
