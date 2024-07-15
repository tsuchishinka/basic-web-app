type Device = {
  id: string
  name: string
  model: string
}

type DeviceSearchParam = {
  name?: string
  model?: string
}

type DevicePageState = {
  offset: number
  total: number
  pageSize: number
  devices: Device[]
  searchParam: DeviceSearchParam
}

export type { Device, DeviceSearchParam, DevicePageState }
