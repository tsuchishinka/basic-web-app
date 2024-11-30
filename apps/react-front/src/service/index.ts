import { AxiosRequestClient, DeviceService, LoginService } from '@packages/demoAPI'

const baseURL = import.meta.env.VITE_API_HOST ?? 'http://localhost:8000/app'
const axiosClient = new AxiosRequestClient({
  contentType: 'application/json',
  axiosConfig: { baseURL, withCredentials: true },
})

const deviceService = new DeviceService(axiosClient)
const loginService = new LoginService(axiosClient)

export { deviceService, loginService }
