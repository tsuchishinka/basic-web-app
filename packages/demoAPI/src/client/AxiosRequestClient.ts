import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { ApiRequestClient } from "./IApiRequestClient";
import {
  ContentType,
  DeleteConfigTypes,
  GetConfigTypes,
  PostConfigTypes,
} from "./types";
import encode from "./utils/encode";
import {
  convertReqParamCase,
  convertResponseCase,
} from "./utils/varsCaseConverter";

export class AxiosRequestClient implements ApiRequestClient {
  private contentType: ContentType;
  private axiosInstance: AxiosInstance;

  constructor(config: {
    contentType: ContentType;
    axiosConfig: CreateAxiosDefaults;
  }) {
    this.contentType = config.contentType;
    this.axiosInstance = axios.create(config.axiosConfig);
  }

  async get<T>({ url, headers, params }: GetConfigTypes): Promise<T> {
    const response = await this.axiosInstance.request({
      url,
      method: "GET",
      params: convertReqParamCase(params),
      headers,
    });
    return convertResponseCase(response.data);
  }

  async post<T>({
    url,
    data,
    contentType = this.contentType,
    headers,
  }: PostConfigTypes): Promise<T> {
    const response = await this.axiosInstance.request({
      url,
      method: "POST",
      data: encode(contentType, convertReqParamCase(data)),
      headers,
    });
    return convertResponseCase(response.data);
  }

  async delete<T>({ url, params, headers }: DeleteConfigTypes): Promise<T> {
    const response = await this.axiosInstance.request({
      url,
      method: "DELETE",
      params: convertReqParamCase(params),
      headers,
    });
    return convertResponseCase(response.data);
  }
}
