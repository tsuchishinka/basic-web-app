import express from 'express'
import {
  fetchDeviceList,
  createDevice,
  deleteDevice,
  fetchDeviceDetail,
} from '../controller/device'

const router = express.Router()

router.get('/', fetchDeviceList)

router.get('/:id', fetchDeviceDetail)

router.post('/', createDevice)

router.delete('/', deleteDevice)

export default router
