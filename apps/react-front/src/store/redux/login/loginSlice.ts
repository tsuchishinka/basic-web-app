import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import cloneDeep from 'lodash.clonedeep'
import { LoginPageState } from '@/store/state/loginPageState'

const initialState: LoginPageState = {
  email: {
    value: undefined,
    errorMessage: undefined,
  },
  password: {
    value: undefined,
    errorMessage: undefined,
  },
  success: false,
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    updateLoginPageState: (state, { payload }: PayloadAction<LoginPageState>) => {
      const newState = cloneDeep(payload)
      for (const key in state) {
        if (key in newState) {
          // @ts-expect-error eslint-disable-next-line
          state[key] = newState[key]
        }
      }
    },
    updateEmailValue: (state, { payload }: PayloadAction<string>) => {
      state.email.value = payload
    },
    updateEmailErrorMessage: (state, { payload }) => {
      state.email.errorMessage = payload
    },
    updatePasswordValue: (state, { payload }: PayloadAction<string>) => {
      state.password.value = payload
    },
  },
})

const { updateEmailValue, updateLoginPageState, updatePasswordValue, updateEmailErrorMessage } =
  loginSlice.actions

export { updateEmailValue, updateLoginPageState, updatePasswordValue, updateEmailErrorMessage }
export default loginSlice.reducer
