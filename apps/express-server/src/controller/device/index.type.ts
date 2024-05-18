type RequestFetchDevices = {
  offset?: number
  limit?: number
  name?: string
  modelName?: string
}

type ResponseFetchDevices = {
  offset: number
  total: number
  list: {
    id: string
    name: string
    modelName: string
    description: string | undefined
  }[]
  count: number
}

export type { RequestFetchDevices, ResponseFetchDevices }
