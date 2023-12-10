import { Request, Response, RequestHandler } from 'express'
import * as uuid from 'uuid'
import { Device, DeviceRequest } from '../models/device'
import { getCollection, closeDB } from './db'
import { createDeviceData } from '../common/createData'

export const getAllDevice: RequestHandler = async (req, res) => {
  const col = await getCollection<Device>()
  const result = await col?.find().toArray()
  res.json(result)
}

export const getDeviceSearch: RequestHandler = async (req, res) => {
  const col = await getCollection<Device>()
  let searchObj = {}
  const reqBody = req.body
  Object.keys(reqBody).forEach((key) => {
    if (key === 'name') {
      searchObj = { ...searchObj, name: new RegExp(reqBody['name']) }
    }
    if (key === 'model') {
      searchObj = { ...searchObj, model: new RegExp(reqBody['model']) }
    }
  })
  const result = await col?.find(searchObj).toArray()
  await closeDB()
  res.json(result)
}

export const createDevice: RequestHandler = async (req, res) => {
  const reqBody = req.body as DeviceRequest
  const col = await getCollection<Device>()
  const result = await col?.insertOne({
    _id: uuid.v4(),
    name: reqBody.name,
    model: reqBody.model,
  } as Device)
  await closeDB()
  res.json(result)
}

export const autoCreateDevice: RequestHandler = async (req, res) => {
  const col = await getCollection<Device>()
  const dataList: Device[] = []
  for (let i = 0; i < (req.body as { dataSize: number }).dataSize; i++) {
    const deviceData: DeviceRequest = createDeviceData()
    const data = {
      _id: uuid.v4(),
      model: deviceData.model,
      name: deviceData.name,
    } as Device
    dataList.push(data)
  }
  const result = await col?.insertMany(dataList)
  await closeDB()
  res.json(result)
}

export const deleteDevice: RequestHandler = async (req, res) => {
  const col = await getCollection<Device>()
  let result
  if ('name' in req.body && 'model' in req.body) {
    result = await col?.deleteMany({ name: req.body.name, model: req.body.model })
  } else {
    result = await col?.deleteMany({
      $or: [{ name: req.body?.name }, { model: req.body?.model }],
    })
  }
  await closeDB()
  res.json(result)
}
