import cloneDeep from 'lodash.clonedeep'
import { LoginPageState } from '../../state'

/**
 * e-mailの状態を変更する
 * @param state ログインページの状態
 * @param value e-mailの更新後の値
 */
const changeEmail = (state: LoginPageState, value: string): LoginPageState => {
  const newState = cloneDeep(state)
  return {
    ...newState,
    email: {
      ...newState.email,
      value,
    },
  }
}

export { changeEmail }
