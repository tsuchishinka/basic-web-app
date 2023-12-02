export interface DeviceRequest {
  name: string
  model: string
}

export interface Device extends Document, DeviceRequest {
  _id: string
}
