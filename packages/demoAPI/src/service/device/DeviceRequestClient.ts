import { ApiRequestClient } from "../../client/IApiRequestClient";
import {
  DeleteConfigTypes,
  GetConfigTypes,
  PostConfigTypes,
} from "@/client/types";

export class DeviceRequestClient {
  private apiClient: ApiRequestClient;

  constructor(client: ApiRequestClient) {
    this.apiClient = client;
  }

  protected async get<T>(params: GetConfigTypes): Promise<T> {
    return await this.apiClient.get<T>(params);
  }

  protected async post<T>(params: PostConfigTypes): Promise<T> {
    return await this.apiClient.post<T>(params);
  }

  protected async delete<T>(params: DeleteConfigTypes): Promise<T> {
    return await this.apiClient.delete<T>(params);
  }
}
