import express from 'express'
import { fetchDevices, createDevice, deleteDevice, fetchDevice } from '../controller/device'

const router = express.Router()

router.get('/', fetchDevices)

router.get('/:id', fetchDevice)

router.post('/', createDevice)

router.delete('/', deleteDevice)

export default router
