import { ContentType } from "../types";

type UnknownObject = { [property: string]: unknown };

const urlEncode = (data?: UnknownObject) => {
  const params = new URLSearchParams();
  if (data) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) !== null) {
        const element = data[key];
        params.append(key, String(element));
      }
    }
  }
  return params;
};

const encode = (contentType?: ContentType, data?: UnknownObject) => {
  switch (contentType) {
    case "application/x-www-form-urlencoded":
      return urlEncode(data);
    default:
      return JSON.stringify(data);
  }
};

export default encode;
