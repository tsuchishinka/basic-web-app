export type DateTimeValues = {
  year?: number
  month?: number
  day?: number
  hour?: number
  minute?: number
  second?: number
}

export type DateTimeDetail = {
  year: {
    value: number | undefined
    preZeroCount: number
  }
  month: {
    value: number | undefined
    preZeroCount: number
  }
  day: {
    value: number | undefined
    preZeroCount: number
  }
  hour: {
    value: number | undefined
    preZeroCount: number
  }
  minute: {
    value: number | undefined
    preZeroCount: number
  }
  second: {
    value: number | undefined
    preZeroCount: number
  }
}
