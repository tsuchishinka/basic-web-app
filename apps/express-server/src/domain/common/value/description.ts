import { DESCRIPTION_MAX_LENGTH } from '@/const/common'
import { DeviceValidationError } from '@/errors/device'

class Description {
  readonly value: string | undefined
  constructor(description: string | undefined) {
    if (description && description.length >= DESCRIPTION_MAX_LENGTH) {
      throw new DeviceValidationError('description is over max text length')
    }
    this.value = description
  }
}

export { Description }
