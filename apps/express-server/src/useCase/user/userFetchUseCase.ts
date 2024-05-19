import COMMON_CONST from '@/common/const'
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
    seatchParams?: { name?: string },
  ): Promise<ResponseFetchUsers> => {
    const complementedOffset = offset ?? 0
    const complementedLimit = limit ?? COMMON_CONST.REQUEST_LIMIT_SIZE
    const userName = seatchParams?.name ? new UserName(seatchParams.name) : undefined
    const param = {
      userName,
    }

    const {
      offset: responsedOffset,
      pageCount,
      total,
      list,
    } = await this.repository.fetchUsers(complementedOffset, complementedLimit, param)

    return {
      offset: responsedOffset,
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
