import { LIMIT_DEFAULT } from '@/const/common'
import { ResponseFetchUser, ResponseFetchUsers } from '@/controller/user/index.type'
import { IUserRepository } from '@/domain/user/IUserRepository'
import UserName from '@/domain/user/value/userName'

class UserFetchUseCase {
  private repository: IUserRepository

  constructor(repository: IUserRepository) {
    this.repository = repository
  }

  fetchUser = async (id: string): Promise<ResponseFetchUser> => {
    const user = await this.repository.fetchUser(id)
    if (user === undefined) {
      throw new Error()
    }
    return {
      id: user.id,
      name: user.name.value,
    }
  }

  fetchUsers = async (
    offset: number | undefined,
    limit: number | undefined,
    searchParams?: { name?: string },
  ): Promise<ResponseFetchUsers> => {
    const complementedOffset = offset ?? 0
    const complementedLimit = limit ?? LIMIT_DEFAULT
    const userName = searchParams?.name ? new UserName(searchParams.name) : undefined
    const param = {
      userName,
    }

    const {
      offset: responseOffset,
      pageCount,
      total,
      list,
    } = await this.repository.fetchUsers(complementedOffset, complementedLimit, param)

    return {
      offset: responseOffset,
      total,
      count: pageCount,
      list: list.map((user) => {
        return {
          id: user.id,
          name: user.name.value,
        }
      }),
    }
  }
}

export default UserFetchUseCase
