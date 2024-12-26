import { EMPTY_ID } from '@/const/common'

class DeviceId {
  readonly value: string
  constructor(id: string) {
    this.value = id
  }
  isEmpty() {
    return this.value === EMPTY_ID
  }
}

export { DeviceId }
