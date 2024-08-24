import { RequestHandler } from 'express'
import { RequestFetchDevices } from './index.type'
import {
  deviceFetchUseCase,
  deviceRegisterUseCase,
  deviceDeleteUseCase,
  deviceUpdateUseCase,
} from '@/useCase/device'

export const fetchDevices: RequestHandler = async (request, response, next) => {
  try {
    const { offset, limit, name, model }: RequestFetchDevices = request.query
    const params = { name, model }
    const responseUseCase = await deviceFetchUseCase.fetchDevices(
      Number(offset),
      Number(limit),
      params,
    )

    response.json(responseUseCase)
  } catch (e) {
    next(e)
  }
}

export const fetchDevice: RequestHandler = async (request, response, next) => {
  try {
    if (request.params.id === undefined) {
      return response.status(400).send('Not include ID')
    }

    const device = await deviceFetchUseCase.fetchDevice(request.params.id)

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
  if (request.body.name === undefined) {
    return response.status(400).send('Not include ID')
  }
  if (request.body.model === undefined) {
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
    await deviceDeleteUseCase.deleteDevices(request.body.deviceIds)
    response.status(200).send('delete succeeded')
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
