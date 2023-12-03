import { DeviceService } from '@/lib/service/device/DeviceService'
import { AxiosRequestClient } from '@/lib/client/AxiosRequestClient'

const axiosClient = new AxiosRequestClient({
  contentType: 'application/json',
  axiosConfig: { baseURL: 'http://localhost:8000' },
})

export const deviceService = new DeviceService(axiosClient)
