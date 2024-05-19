import DeviceId from '../../domain/device/value/deviceId'
import Device from '@/domain/device/entity/device'
import NullDevice from '@/domain/device/entity/noDevice'
import { IDeviceRepository } from '@/domain/device/repository/IDeviceRepository'
import DeviceName from '@/domain/device/value/deviceName'
import ModelName from '@/domain/device/value/modelName'

class DeviceFetchUseCase {
  private repository: IDeviceRepository
  constructor(repository: IDeviceRepository) {
    this.repository = repository
  }
  fetchDetail = async (id: string): Promise<Device> => {
    const deviceId = new DeviceId(id)
    const device = await this.repository.fetch(deviceId)
    if (device instanceof NullDevice) {
      throw new Error()
    }
    return device
  }
  fetchList = async (
    offset: number,
    limit: number,
    searchParams?: { name?: string; model?: string; parentDeviceGroupId?: string },
  ) => {
    const deviceName = searchParams?.name ? new DeviceName(searchParams.name) : undefined
    const modelName = searchParams?.model ? new ModelName(searchParams.model) : undefined
    const params = {
      deviceName,
      modelName,
    }
    return await this.repository.fetchList(offset, limit, params)
  }
}

export default DeviceFetchUseCase
