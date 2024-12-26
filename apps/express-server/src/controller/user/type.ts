type RequestFetchUsers = {
  offset?: number
  limit?: number
  name?: string
  mailAddress?: string
}

type ResponseFetchUsers = {
  offset: number
  total: number
  list: {
    id: string
    name: string
  }[]
  count: number
}

type RequestFetchUser = {
  id: string
}

type ResponseFetchUser = {
  id: string
  name: string
}

type RequestRegisterUser = {
  name: string
  mailAddress: string
  password: string
}

export type {
  RequestFetchUser,
  RequestFetchUsers,
  RequestRegisterUser,
  ResponseFetchUser,
  ResponseFetchUsers,
}
