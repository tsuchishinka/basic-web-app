import { RequestHandler } from 'express'
import {
  deviceFetchUseCase,
  deviceRegisterUseCase,
  deviceDeleteUseCase,
  deviceUpdateUseCase,
} from '@/useCase'

export const fetchDeviceList: RequestHandler = async (request, response, next) => {
  try {
    const offset = request.body.offset ?? 0
    const limit = request.body.limit ?? 20
    const params: { name?: string; model?: string } = {}
    if ('name' in request.body) {
      params.name = request.body.name
    }
    if ('model' in request.body) {
      params.model = request.body.model
    }

    const deviceListResponse = await deviceFetchUseCase.fetchList(offset, limit, params)

    response.json({
      offset: deviceListResponse.offset,
      total: deviceListResponse.total,
      list: deviceListResponse.list.map((item) => {
        return {
          deviceId: item.id.value,
          name: item.name.value,
          model: item.modelName.value,
        }
      }),
      count: deviceListResponse.pageCount,
    })
  } catch (e) {
    next(e)
  }
}

export const fetchDeviceDetail: RequestHandler = async (request, response, next) => {
  try {
    if (!('id' in request.params)) {
      return response.status(400).send('Not include ID')
    }

    const device = await deviceFetchUseCase.fetchDetail(request.params.id)

    response.json({
      deviceId: device.id.value,
      name: device.name.value,
      modelName: device.modelName.value,
      description: device.description.value,
    })
  } catch (e) {
    next(e)
  }
}

export const createDevice: RequestHandler = async (request, response, next) => {
  if (!('name' in request.body)) {
    return response.status(400).send('Not include ID')
  }
  if (!('model' in request.body)) {
    return response.status(400).send('Not include ID')
  }
  try {
    const result = await deviceRegisterUseCase.registerDevice(
      request.body.name,
      request.body.model,
      request.body.description,
    )
    response.json(result)
  } catch (e) {
    next(e)
  }
}

export const deleteDevice: RequestHandler = async (request, response, next) => {
  try {
    await deviceDeleteUseCase.deleteAll(request.body.deviceIds)
    response.status(200).send('delete successed')
  } catch (e) {
    response.status(500).send('delete failed')
    next(e)
  }
}

export const patchDevice: RequestHandler = async (request, response, next) => {
  try {
    const result = await deviceUpdateUseCase.updateDevice(
      request.body.id,
      request.body.name,
      request.body.model,
      request.body.description,
    )
    response.json(result)
  } catch (e) {
    response.status(500).send('delete failed')
    next(e)
  }
}
