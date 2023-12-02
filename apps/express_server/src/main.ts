import env from 'dotenv'
import express from 'express'
import appRoute from './router/index'
import { createDeviceData } from './common/createData'

env.config()
const port = process.env.PORT || 8000
console.log(port)

const app = express()
app.use(express.json())
app.use('/', appRoute)

app.listen(port, () => {
  console.log(`start http://localhost:${port}`)
})

createDeviceData()
