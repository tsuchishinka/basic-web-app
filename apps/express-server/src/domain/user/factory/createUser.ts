import { EMPTY_ID } from '@/const/common'
import crypto from 'crypto'
import { User } from '../entity/user'
import { MailAddress } from '../value/mailAddress'
import { Password } from '../value/password'
import { UserId } from '../value/userId'
import { UserName } from '../value/userName'

const createUser = (params: { name: string; mailAddress: string; password: string }) => {
  const id = new UserId(EMPTY_ID)
  const userName = new UserName(params.name)
  const mailAddress = new MailAddress(params.mailAddress)
  const salt = crypto.randomBytes(16).toString('hex')
  const password = new Password(params.password, salt)
  return new User(id, userName, mailAddress, password)
}

export { createUser }
