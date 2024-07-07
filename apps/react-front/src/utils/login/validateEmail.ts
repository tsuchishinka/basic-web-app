import { isEmail } from '../common/textValidation'

const validateEmail = (
  text: string,
): {
  hasError: boolean
  errorType?: 'InvalidEmail' | 'InvalidEmoji' | 'OverMaxLength' | 'Empty'
} => {
  console.log(`eeeee`)
  if (!isEmail(text)) {
    return {
      hasError: true,
      errorType: 'InvalidEmail',
    }
  }
  return { hasError: false }
}

export { validateEmail }
