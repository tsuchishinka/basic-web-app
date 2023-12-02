export type ListResponse<T> = {
  offset: number
  total: number
  count: number
  list: Array<T>
}
