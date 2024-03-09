import DeviceDomainService from './deviceDomainService'
import MongoDeviceRepositories from '../repository/mongoDeviceRepository'

export const deviceDomainService = new DeviceDomainService(new MongoDeviceRepositories())
