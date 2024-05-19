import express from 'express'
import session from 'express-session'

declare module 'express-session' {
  interface SessionData {
    logined: boolean
  }
}

const sessionRouter = express.Router()

sessionRouter.use(
  session({
    secret: process.env.SECRET_KEY ?? 'secret_key',
    name: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      sameSite: 'strict',
      // secure: true,
      maxAge: 60 * 60 * 24 * 3 * 1000,
    },
  }),
)

export default sessionRouter
