import { SQLiteDeviceRepository } from '@/repository/sqlite/sqliteDeviceRepository'
import { DeviceDeleteUseCase } from './deviceDeleteUseCase'
import { DeviceQueryUseCase } from './deviceQueryUseCase'
import { DeviceRegisterUseCase } from './deviceRegisterUseCase'
import { DeviceUpdateUseCase } from './deviceUpdateUseCase'

// const mongoDeviceRepository = new MongoDeviceRepositories()
const sqliteDeviceRepository = new SQLiteDeviceRepository()

const deviceFetchUseCase = new DeviceQueryUseCase(sqliteDeviceRepository)
const deviceDeleteUseCase = new DeviceDeleteUseCase(sqliteDeviceRepository)
const deviceRegisterUseCase = new DeviceRegisterUseCase(sqliteDeviceRepository)
const deviceUpdateUseCase = new DeviceUpdateUseCase(sqliteDeviceRepository)

export { deviceDeleteUseCase, deviceFetchUseCase, deviceRegisterUseCase, deviceUpdateUseCase }
