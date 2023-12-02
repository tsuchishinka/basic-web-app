export type ContentType = 'application/json' | 'application/x-www-form-urlencoded'
//eslint-disable-next-line
type AnyObject = { [key in string]: any }
//eslint-disable-next-line
type Primitives = number | boolean | string | symbol | null | undefined | Function

export const snakeToCamel = (str: string) => {
  return str.replace(/_(\w)/g, (_match, capture: string) => {
    return capture.toUpperCase()
  })
}

export const camelToSnake = (str: string) => {
  return str.replace(/([A-Z])/g, (_match, capture: string) => {
    return '_' + capture.toLowerCase()
  })
}

//eslint-disable-next-line
export const convertParamCase = (data: any) => {
  return convertObjectProperty(data, camelToSnake)
}

//eslint-disable-next-line
export const convertResponseCase = (data: any) => {
  return convertObjectProperty(data, snakeToCamel)
}

export const convertObjectProperty = (
  data: AnyObject | Primitives | Array<AnyObject | Primitives>,
  convertFunction: (str: string) => string,
  //eslint-disable-next-line
): any => {
  if (data === null || typeof data !== 'object') {
    return data
  }
  if (Array.isArray(data)) {
    const newArray = []
    for (const item of data) {
      newArray.push(convertObjectProperty(item, convertFunction))
    }
    return newArray
  }

  // eslint-disable-next-line
  const newObject: any = {}
  const keys = Object.keys(data)
  for (const key of keys) {
    if (Object.prototype.toString.call(data[key]) === '[object Object]') {
      newObject[convertFunction(key)] = convertObjectProperty(data[key], convertFunction)
    } else {
      newObject[convertFunction(key)] = convertObjectProperty(data[key], convertFunction)
    }
  }
  return newObject
}

type UnknownObject = { [property: string]: unknown }

export const encode = (contentType?: ContentType, data?: UnknownObject) => {
  switch (contentType) {
    case 'application/x-www-form-urlencoded':
      return urlEncode(data)
    default:
      return JSON.stringify(data)
  }
}

export const urlEncode = (data?: UnknownObject) => {
  const params = new URLSearchParams()
  if (data) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) !== null) {
        const element = data[key]
        params.append(key, String(element))
      }
    }
  }
  return params
}
