import {
  ApiRequestClient,
  DeleteConfigTypes,
  GetConfigTypes,
  PostConfigTypes,
} from '../../client/ApiRequestClient'

export class DeviceRequestClient {
  private apiClient: ApiRequestClient

  constructor(client: ApiRequestClient) {
    this.apiClient = client
  }

  async get<T>(params: GetConfigTypes): Promise<T> {
    return await this.apiClient.get<T>(params)
  }

  async post<T>(params: PostConfigTypes): Promise<T> {
    return await this.apiClient.post<T>(params)
  }

  async delete<T>(params: DeleteConfigTypes): Promise<T> {
    return await this.apiClient.delete<T>(params)
  }
}
