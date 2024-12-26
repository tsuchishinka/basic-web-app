import { User } from '@/domain/user/entity/user'
import { IUserRepository } from '@/domain/user/IUserRepository'
import { MailAddress } from '@/domain/user/value/mailAddress'
import { Password } from '@/domain/user/value/password'
import { UserId } from '@/domain/user/value/userId'
import { UserName } from '@/domain/user/value/userName'
import {
  convertMailAddressData,
  convertUserData,
  convertUserIdData,
} from '@/useCase/user/dataTransformObject'
import { db } from './sqliteClient'

class SQLiteUserRepository implements IUserRepository {
  fetchUser = async (params: { userId?: UserId; mailAddress?: MailAddress }) => {
    return new Promise<User | undefined>((resolve, reject) => {
      db.serialize(() => {
        const { userId, mailAddress } = params
        let where = ''
        if (userId) {
          where = ` WHERE id = '${convertUserIdData(userId)}';`
        } else if (mailAddress) {
          where = ` WHERE mailAddress = '${convertMailAddressData(mailAddress)}';`
        }
        db.all(
          'SELECT * FROM user' + where,
          (
            _,
            rows: {
              id: number
              name: string
              mailAddress: string
              password: string
              salt: string
            }[],
          ) => {
            if (rows === undefined || rows.length === 0) {
              return resolve(undefined)
            }
            const data = rows[0]
            const userId = new UserId(data.toString())
            const userName = new UserName(data.name)
            const mailAddress = new MailAddress(data.mailAddress)
            const password = new Password(data.password, data.salt)
            const user = new User(userId, userName, mailAddress, password)
            resolve(user)
          },
        )
      })
    })
  }

  registerUser = async (user: User) => {
    const { name, mailAddress, salt } = convertUserData(user)
    const encryptedPassword = user.password.encrypt()
    await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(
          `INSERT INTO user (name, mailAddress, password, salt) VALUES ('${name}', '${mailAddress}', '${encryptedPassword}', '${salt}');`,
          (err) => {
            if (err) {
              return reject(err)
            }
            resolve(undefined)
          },
        )
      })
      db.exec
    })
  }

  updateUser = async (user: User) => {
    const { id, name, mailAddress, password, salt } = convertUserData(user)
    await new Promise<void>((resolve, reject) => {
      db.serialize(() => {
        db.run(
          `UPDATE user SET name = '${name}', mailAddress = '${mailAddress}', password = '${password}', salt = '${salt}' WHERE id = '${id}'`,
          (err) => {
            if (err) {
              return reject(err)
            }
            resolve()
          },
        )
      })
      db.exec
    })
  }

  deleteUsers = async (userIds: UserId[]) => {
    await new Promise<void>((resolve, reject) => {
      db.serialize(() => {
        db.run(`BEGIN TRANSACTION`)
        for (const userId of userIds) {
          db.run(`DELETE FROM user WHERE id = '${convertUserIdData(userId)}'`, (err) => {
            if (err) {
              return reject(err)
            }
          })
        }
        resolve()
      })
      db.exec
    })
  }
}

export { SQLiteUserRepository }
