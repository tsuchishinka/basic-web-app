import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'
import {
  GetConfigTypes,
  PostConfigTypes,
  DeleteConfigTypes,
  ApiRequestClient,
} from './ApiRequestClient'
import { ContentType, encode, convertParamCase, convertResponseCase } from '../utility/util'

export class AxiosRequestClient implements ApiRequestClient {
  private contentType: ContentType
  private axiosInstance: AxiosInstance

  constructor(config: { contentType: ContentType; axiosConfig: CreateAxiosDefaults }) {
    this.contentType = config.contentType
    this.axiosInstance = axios.create(config.axiosConfig)
  }

  async get<T>({ url, headers, params }: GetConfigTypes): Promise<T> {
    const response = await this.axiosInstance.request({
      url,
      method: 'GET',
      params: convertParamCase(params),
      headers,
    })
    return convertResponseCase(response)
  }

  async post<T>({
    url,
    data,
    contentType = this.contentType,
    headers,
  }: PostConfigTypes): Promise<T> {
    const response = await this.axiosInstance.request({
      url,
      method: 'POST',
      data: encode(contentType, convertParamCase(data)),
      headers,
    })
    return convertResponseCase(response)
  }

  async delete<T>({ url, params, headers }: DeleteConfigTypes): Promise<T> {
    const response = await this.axiosInstance.request({
      url,
      method: 'DELETE',
      params: convertParamCase(params),
      headers,
    })
    return convertResponseCase(response)
  }
}
