import { ContentType } from '../utility/util'

export interface ApiRequestClient {
  get<T>(params: GetConfigTypes): Promise<T>
  post<T>(params: PostConfigTypes): Promise<T>
  delete<T>(params: DeleteConfigTypes): Promise<T>
}

export type GetConfigTypes = {
  url: string
  params?: Record<string, unknown> | URLSearchParams
  // eslint-disable-next-line
  headers?: any
}

export type PostConfigTypes = {
  url: string
  data?: Record<string, unknown>
  // eslint-disable-next-line
  headers?: any
  cancelable?: boolean
  contentType?: ContentType
}

export type PutConfigTypes = {
  url: string
  data?: Record<string, unknown>
  // eslint-disable-next-line
  headers?: any
  cancelable?: boolean
  contentType?: ContentType
}

export type DeleteConfigTypes = {
  url: string
  params?: Record<string, unknown> | URLSearchParams
  // eslint-disable-next-line
  headers?: any
  cancelable?: boolean
  contentType?: ContentType
}
