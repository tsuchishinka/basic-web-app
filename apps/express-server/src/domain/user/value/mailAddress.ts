import { MAIL_ADDRESS_MAX_LENGTH, MAIL_ADDRESS_REGIX } from '@/const/user'
import { UserValidationError } from '@/errors/user'

class MailAddress {
  readonly value: string
  constructor(mailAddress: string) {
    if (!MAIL_ADDRESS_REGIX.test(mailAddress)) {
      throw new UserValidationError('mail address is invalid format')
    }
    if (mailAddress.length > MAIL_ADDRESS_MAX_LENGTH) {
      throw new UserValidationError('Mailaddress is over max length')
    }
    this.value = mailAddress
  }

  equal = (mailAddress: string) => {
    return mailAddress === this.value
  }
}

export { MailAddress }
