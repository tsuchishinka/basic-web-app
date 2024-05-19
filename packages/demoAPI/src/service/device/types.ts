type ListResponse<T> = {
  offset: number;
  total: number;
  count: number;
  list: Array<T>;
};

type RequestFetchDevice = {
  model?: string;
  name?: string;
  offset?: number;
  limit?: number;
};

type ResponseFetchDevice = {
  offset: number;
  total: number;
  list: {
    deviceId: string;
    name: string;
    model: string;
  }[];
  count: number;
};

export type { ListResponse, RequestFetchDevice, ResponseFetchDevice };
