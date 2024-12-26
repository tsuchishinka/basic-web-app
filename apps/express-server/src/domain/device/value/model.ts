import { MODEL_MAX_LENGTH } from '@/const/device'

class Model {
  readonly value: string
  constructor(model: string) {
    if (model === null || model === undefined || model.length === 0) {
      throw new Error('model is empty')
    }
    if (model.length > MODEL_MAX_LENGTH) {
      throw new Error('model is over max text length')
    }
    this.value = model
  }
}

export { Model }
