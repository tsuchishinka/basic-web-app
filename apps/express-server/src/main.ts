import cors from 'cors'
import env from 'dotenv'
import express from 'express'
import appRoute from './router/index'

env.config()
const port = process.env.PORT || 8000
console.log(port)

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: /^http:\/\/localhost.*$/,
    credentials: true,
  }),
)
app.use('/', appRoute)

app.listen(port, () => {
  console.log(`start http://localhost:${port}`)
})
