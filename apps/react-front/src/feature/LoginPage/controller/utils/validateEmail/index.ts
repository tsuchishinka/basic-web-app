import { isEmail } from '@/common/controller/utils/textValidation'

const validateEmail = (
  text: string,
): {
  hasError: boolean
  errorType?: 'InvalidEmail' | 'InvalidEmoji' | 'OverMaxLength' | 'Empty'
} => {
  if (!isEmail(text)) {
    return {
      hasError: true,
      errorType: 'InvalidEmail',
    }
  }
  return { hasError: false }
}

export { validateEmail }
