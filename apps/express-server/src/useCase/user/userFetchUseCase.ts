import { LIMIT_DEFAULT } from '@/const/common'
import { ResponseFetchUser, ResponseFetchUsers } from '@/controller/user/type'
import { IUserRepository } from '@/domain/user/IUserRepository'
import { UserId } from '@/domain/user/value/userId'
import { db } from '@/repository/sqlite/sqliteClient'
import { convertUserData } from './dataTransformObject'

class UserFetchUseCase {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  fetchUser = async (id: string): Promise<ResponseFetchUser> => {
    const userId = new UserId(id)
    const user = await this.repository.fetchUser({ userId })
    if (user === undefined) {
      throw new Error()
    }
    const data = convertUserData(user)
    return {
      id: data.id,
      name: data.name,
    }
  }

  fetchUsers = async (params: {
    offset: number | undefined
    limit: number | undefined
    name: string | undefined
    mailAddress: string | undefined
  }): Promise<ResponseFetchUsers> => {
    return new Promise((resolve) => {
      let total = 0
      const { name, mailAddress } = params
      const limit = params.limit ?? LIMIT_DEFAULT
      const offset = params.offset ?? 0
      db.serialize(() => {
        let whereQuery = ''
        if (name !== undefined && mailAddress !== undefined) {
          whereQuery = ` WHERE name LIKE '%${name}%' AND mailAddress LIKE '%${mailAddress}%'`
        } else if (name !== undefined) {
          whereQuery = ` WHERE name LIKE '%${name}%'`
        } else if (mailAddress !== undefined) {
          whereQuery = ` WHERE mailAddress LIKE '%${mailAddress}%'`
        }
        db.each(
          `SELECT COUNT(*) as total FROM user ${whereQuery} LIMIT ${limit} OFFSET ${offset}`,
          (_, row: { total: number }) => {
            total = row.total ?? 0
          },
        )
        db.all(
          `SELECT * FROM user ${whereQuery} LIMIT ${limit} OFFSET ${offset}`,
          (_: unknown, rows: { id: number; name: string; mailAddress: string }[]) => {
            resolve({
              offset,
              total,
              count: rows.length,
              list: rows.map(({ id, name, mailAddress }) => {
                return { id: id.toString(), name, mailAddress }
              }),
            })
          },
        )
      })
    })
  }
}

export { UserFetchUseCase }
