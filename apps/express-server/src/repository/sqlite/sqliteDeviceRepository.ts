import { IDeviceRepository } from '@/domain/device/deviceRepository'
import { Device } from '@/domain/device/entity/device'
import { createDevice } from '@/domain/device/factory/createDevice'
import { DeviceId } from '@/domain/device/value/deviceId'
import { DeviceNotFoundError } from '@/errors/device'
import { convertDeviceData, convertDeviceIdData } from '@/useCase/device/dataTransformObject'
import { db } from './sqliteClient'

class SQLiteDeviceRepository implements IDeviceRepository {
  fetchDevice = (deviceId: DeviceId) => {
    return new Promise<Device>((resolve, reject) => {
      db.serialize(() => {
        db.all(
          `SELECT * FROM device WHERE id = '${convertDeviceIdData(deviceId)}'`,
          (_, rows: { id: number; name: string; model: string; description?: string }[]) => {
            if (rows.length === 0) {
              return reject(
                new DeviceNotFoundError(`device id ${convertDeviceIdData(deviceId)} not found`),
              )
            }
            const { id, name, model, description } = rows[0]
            resolve(createDevice({ id: id.toString(), name, model, description }))
          },
        )
      })
    })
  }

  registerDevice = async (device: Device) => {
    const { name, model, description } = convertDeviceData(device)
    await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(
          `INSERT INTO device (name, model, description) VALUES ('${name}', '${model}', '${description}');`,
          (err) => {
            if (err) {
              return reject(err)
            }
            resolve(undefined)
          },
        )
      })
      db.exec
    })
  }

  updateDevice = async (device: Device) => {
    const { id, name, model, description } = convertDeviceData(device)
    await new Promise<void>((resolve, reject) => {
      db.serialize(() => {
        db.run(
          `UPDATE device SET name = '${name}', model = '${model}', description = '${description}' WHERE id = '${id}'`,
          (err) => {
            if (err) {
              return reject(err)
            }
            resolve()
          },
        )
      })
      db.exec
    })
  }

  deleteDevices = async (deviceIds: DeviceId[]) => {
    await new Promise<void>((resolve, reject) => {
      db.serialize(() => {
        db.run(`BEGIN TRANSACTION`)
        for (const deviceId of deviceIds) {
          db.run(`DELETE FROM device WHERE id = ${convertDeviceIdData(deviceId)}`, (err) => {
            if (err) {
              return reject(err)
            }
          })
        }
        resolve()
      })
      db.exec
    })
  }
}

export { SQLiteDeviceRepository }
