import { ContentType } from "../types";

//eslint-disable-next-line
type AnyObject = { [key in string]: any };
//eslint-disable-next-line
type Primitives =
  | number
  | boolean
  | string
  | symbol
  | null
  | undefined
  | Function;

const snakeToCamel = (str: string) => {
  return str.replace(/_(\w)/g, (_match, capture: string) => {
    return capture.toUpperCase();
  });
};

const camelToSnake = (str: string) => {
  return str.replace(/([A-Z])/g, (_match, capture: string) => {
    return "_" + capture.toLowerCase();
  });
};

//eslint-disable-next-line
const convertReqParamCase = (data: any) => {
  return convertObjectProperty(data, camelToSnake);
};

//eslint-disable-next-line
const convertResponseCase = (data: any) => {
  return convertObjectProperty(data, snakeToCamel);
};

const convertObjectProperty = (
  data: AnyObject | Primitives | Array<AnyObject | Primitives>,
  convertFunction: (str: string) => string
  //eslint-disable-next-line
): any => {
  if (data === null || typeof data !== "object") {
    return data;
  }
  if (Array.isArray(data)) {
    const newArray = [];
    for (const item of data) {
      newArray.push(convertObjectProperty(item, convertFunction));
    }
    return newArray;
  }

  // eslint-disable-next-line
  const newObject: any = {};
  const keys = Object.keys(data);
  for (const key of keys) {
    if (Object.prototype.toString.call(data[key]) === "[object Object]") {
      newObject[convertFunction(key)] = convertObjectProperty(
        data[key],
        convertFunction
      );
    } else {
      newObject[convertFunction(key)] = convertObjectProperty(
        data[key],
        convertFunction
      );
    }
  }
  return newObject;
};

export { convertReqParamCase, convertResponseCase };
