export type Device = {
    id: string
    name: string
    model: string
}

export type DeviceSearchParam = {
    name: string
    model: string
}

export type DevicePageState = {
    deviceList: Device[]
    searchParam: DeviceSearchParam
}