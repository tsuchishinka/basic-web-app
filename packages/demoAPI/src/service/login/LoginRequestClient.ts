import { ApiRequestClient } from "@/client";
import { GetConfigTypes } from "@/client/types";

class LoginRequestClient {
  protected apiClient: ApiRequestClient;

  constructor(client: ApiRequestClient) {
    this.apiClient = client;
  }
}

export { LoginRequestClient };
