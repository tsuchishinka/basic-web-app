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

const getInitialDevicePageState = (): DevicePageState => {
  return {
    offset: 0,
    total: 1,
    pageSize: 50,
    devices: [],
    searchParam: { name: '', model: '' },
  }
}

export { getInitialDevicePageState }
export type { Device, DeviceSearchParam, DevicePageState }
