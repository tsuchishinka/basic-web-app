import express from 'express'
import {
  getAllDevice,
  getDeviceSearch,
  createDevice,
  autoCreateDevice,
  deleteDevice,
} from '../controller/device'

const router = express.Router()
router.get('/', getAllDevice)

router.get('/search', getDeviceSearch)

router.post('/', createDevice)

router.post('/auto-data', autoCreateDevice)

router.delete('/', deleteDevice)

export default router
