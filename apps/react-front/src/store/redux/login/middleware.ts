import { Dispatch } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { updateLoginPageState } from './loginSlice'
import { loginService } from '@/service'
import executeLoginAction from '@/store/actions/login/executeLogin'

const executeLogin = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState()
    try {
      console.log(`before api`)
      const newState = await executeLoginAction(state.loginPage, loginService)
      console.log(`before dispatch`)
      dispatch(updateLoginPageState(newState))
    } catch (error) {
      console.log('error')
      throw new Error()
    }
  }
}

export { executeLogin }
