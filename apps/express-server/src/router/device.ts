import express from 'express'
import { fetchDevices, createDevice, deleteDevice, fetchDevice } from '../controller/device'
import { checkSession } from '@/controller/auth'

const router = express.Router()

router.use(checkSession)

router.get('/', fetchDevices)

router.get('/:id', fetchDevice)

router.post('/', createDevice)

router.delete('/', deleteDevice)

export default router
