import cloneDeep from 'lodash.clonedeep'
import { LoginPageState } from '../../state'

/**
 * パスワードの状態を変更する
 * @param state ログインページの状態
 * @param value パスワードの更新後の値
 */
const changePassword = (state: LoginPageState, value: string): LoginPageState => {
  const newState = cloneDeep(state)
  return {
    ...newState,
    password: {
      ...newState.password,
      value,
    },
  }
}

export { changePassword }
