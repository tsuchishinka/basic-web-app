import MongoDeviceRepositories from '../repository/mongoDeviceRepository'
import DeviceDomainService from './deviceDomainService'

export const deviceDomainService = new DeviceDomainService(new MongoDeviceRepositories())
