import DeviceFetchUseCase from './device/deviceFetchUseCase'
import DeviceDeleteUseCase from './device/deviceDeleteUseCase'
import MongoDeviceRepositories from '@/domain/device/repository/mongoDeviceRepository'
import DeviceRegisterUseCase from './device/deviceRegisterUseCase'
import MongoDeviceFactory from '@/domain/device/factory/mongoDeviceFactory'
import DeviceUpdateUseCase from './device/deviceUpdateUseCase'

const deviceFetchUseCase = new DeviceFetchUseCase(new MongoDeviceRepositories())
const deviceDeleteUseCase = new DeviceDeleteUseCase(new MongoDeviceRepositories())
const deviceRegisterUseCase = new DeviceRegisterUseCase(
  new MongoDeviceRepositories(),
  new MongoDeviceFactory(),
)
const deviceUpdateUseCase = new DeviceUpdateUseCase(new MongoDeviceRepositories())

export { deviceFetchUseCase, deviceDeleteUseCase, deviceRegisterUseCase, deviceUpdateUseCase }
