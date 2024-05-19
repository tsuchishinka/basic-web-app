import { GetConfigTypes, PostConfigTypes, DeleteConfigTypes } from "./types";

export interface ApiRequestClient {
  get<T>(params: GetConfigTypes): Promise<T>;
  post<T>(params: PostConfigTypes): Promise<T>;
  delete<T>(params: DeleteConfigTypes): Promise<T>;
}
