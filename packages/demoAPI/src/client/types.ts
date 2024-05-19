type ContentType = "application/json" | "application/x-www-form-urlencoded";

type GetConfigTypes = {
  url: string;
  params?: Record<string, unknown> | URLSearchParams;
  // eslint-disable-next-line
  headers?: any;
};

type PostConfigTypes = {
  url: string;
  data?: Record<string, unknown>;
  // eslint-disable-next-line
  headers?: any;
  cancelable?: boolean;
  contentType?: ContentType;
};

type PutConfigTypes = {
  url: string;
  data?: Record<string, unknown>;
  // eslint-disable-next-line
  headers?: any;
  cancelable?: boolean;
  contentType?: ContentType;
};

type DeleteConfigTypes = {
  url: string;
  params?: Record<string, unknown> | URLSearchParams;
  // eslint-disable-next-line
  headers?: any;
  cancelable?: boolean;
  contentType?: ContentType;
};

export type {
  ContentType,
  GetConfigTypes,
  DeleteConfigTypes,
  PostConfigTypes,
  PutConfigTypes,
};
