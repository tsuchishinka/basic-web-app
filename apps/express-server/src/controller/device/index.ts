import {
  deviceDeleteUseCase,
  deviceFetchUseCase,
  deviceRegisterUseCase,
  deviceUpdateUseCase,
} from '@/useCase/device'
import { RequestHandler } from 'express'
import { RequestFetchDevices } from './type'

export const fetchDevices: RequestHandler = async (req, res, next) => {
  try {
    const { offset, limit, name, model }: RequestFetchDevices = req.query
    const responseUseCase = await deviceFetchUseCase.fetchDevices({ offset, limit, name, model })

    res.json(responseUseCase)
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
    response.json(device)
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
    await deviceDeleteUseCase.deleteDevices(request.body.device_ids)
    response.status(200).send('delete succeeded')
  } catch (e) {
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
    next(e)
  }
}
