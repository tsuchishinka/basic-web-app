import env from 'dotenv'
import express from 'express'
import corsRouter from './middleware/cors'
import sessionRouter from './middleware/session'
import appRoute from './router/index'

env.config()
const port = process.env.PORT || 8000

const app = express()

app.use(express.json())

app.use(corsRouter)

app.use(sessionRouter)

app.use('/', appRoute)

app.listen(port, () => {
  console.log(`start http://localhost:${port}`)
})
