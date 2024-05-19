import { AxiosRequestClient, DeviceService } from '@packages/demo-api'

const axiosClient = new AxiosRequestClient({
  contentType: 'application/json',
  axiosConfig: { baseURL: 'http://localhost:8000' },
})

const deviceService = new DeviceService(axiosClient)

export { deviceService }
