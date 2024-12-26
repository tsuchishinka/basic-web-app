import { checkSession } from '@/controller/auth'
import express from 'express'
import { createDevice, deleteDevice, fetchDevice, fetchDevices } from '../controller/device'

const router = express.Router()

router.use(checkSession)

router.get('/', fetchDevices)

router.get('/:id', fetchDevice)

router.post('/', createDevice)

router.delete('/', deleteDevice)

export { router as deviceRouter }
