import { LIMIT_DEFAULT } from '@/const/common'
import { IDeviceRepository } from '@/domain/device/deviceRepository'
import { DeviceId } from '@/domain/device/value/deviceId'
import { DeviceNotFoundError } from '@/errors/device'
import { db } from '@/repository/sqlite/sqliteClient'
import { convertDeviceData } from './dataTransformObject'

class DeviceQueryUseCase {
  private repository: IDeviceRepository
  constructor(repository: IDeviceRepository) {
    this.repository = repository
  }

  fetchDevice = async (
    id: string,
  ): Promise<{ id: string; name: string; model: string; description?: string }> => {
    const device = await this.repository.fetchDevice(new DeviceId(id))
    if (device === undefined) {
      throw new DeviceNotFoundError(`Device id ${id} is not found`)
    }
    return convertDeviceData(device)
  }

  // 複雑なクエリに対しては、直接SQLスクリプトを書く
  fetchDevices = async (params: {
    offset?: number
    limit?: number
    name?: string
    model?: string
    parentDeviceGroupId?: string
  }): Promise<{
    offset: number
    total: number
    count: number
    list: { id: string; name: string; model: string; description?: string }[]
  }> => {
    return new Promise((resolve) => {
      let total = 0
      const { name, model } = params
      const limit = params.limit ?? LIMIT_DEFAULT
      const offset = params.offset ?? 0
      db.serialize(() => {
        let whereQuery = ''
        if (name !== undefined && model !== undefined) {
          whereQuery = ` WHERE name LIKE '%${name}%' AND model LIKE '%${model}%'`
        } else if (name !== undefined) {
          whereQuery = ` WHERE name LIKE '%${name}%'`
        } else if (model !== undefined) {
          whereQuery = ` WHERE model LIKE '%${model}%'`
        }
        db.each(
          `SELECT COUNT(*) as total FROM device ${whereQuery} LIMIT ${limit} OFFSET ${offset}`,
          (_, row: { total: number }) => {
            total = row.total ?? 0
          },
        )
        db.all(
          `SELECT * FROM device ${whereQuery} LIMIT ${limit} OFFSET ${offset}`,
          (
            _: unknown,
            rows: { id: number; name: string; model: string; description: string }[],
          ) => {
            resolve({
              offset,
              total,
              count: rows.length,
              list: rows.map(({ id, name, description, model }) => {
                return { id: id.toString(), name, description, model }
              }),
            })
          },
        )
      })
    })
  }
}

export { DeviceQueryUseCase }
