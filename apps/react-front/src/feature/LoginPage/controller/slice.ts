import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import cloneDeep from 'lodash.clonedeep'
import { getInitialLoginPageState, LoginPageState } from './state'

const loginSlice = createSlice({
  name: 'login',
  initialState: getInitialLoginPageState(),
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
  },
})

const { updateLoginPageState } = loginSlice.actions
const loginPageReducer = loginSlice.reducer

export { updateLoginPageState, loginPageReducer }
