import DeviceDeleteUseCase from './deviceDeleteUseCase'
import DeviceFetchUseCase from './deviceFetchUseCase'
import DeviceRegisterUseCase from './deviceRegisterUseCase'
import DeviceUpdateUseCase from './deviceUpdateUseCase'
import MongoDeviceFactory from '@/domain/device/factory/deviceFactory'
import MongoDeviceRepositories from '@/repository/device/mongoDeviceRepository'

const mongoDeviceRepository = new MongoDeviceRepositories()
const deviceFactory = new MongoDeviceFactory()

const deviceFetchUseCase = new DeviceFetchUseCase(mongoDeviceRepository)
const deviceDeleteUseCase = new DeviceDeleteUseCase(mongoDeviceRepository)
const deviceRegisterUseCase = new DeviceRegisterUseCase(mongoDeviceRepository, deviceFactory)
const deviceUpdateUseCase = new DeviceUpdateUseCase(mongoDeviceRepository)

export { deviceFetchUseCase, deviceDeleteUseCase, deviceRegisterUseCase, deviceUpdateUseCase }
