import { AxiosRequestClient, DeviceService, LoginService } from '@packages/demo-api'

const axiosClient = new AxiosRequestClient({
  contentType: 'application/json',
  axiosConfig: { baseURL: 'http://localhost:8000', withCredentials: true },
})

const deviceService = new DeviceService(axiosClient)
const loginService = new LoginService(axiosClient)

export { deviceService, loginService }
