import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputWrapper, TextInput } from '@packages/ui-library'
import { changePassword } from '../../controller/actions/changePassword'
import { updateLoginPageState } from '../../controller/slice'
import styles from './index.module.scss'
import { RootState } from '@/store'

const PasswordForm = () => {
  const state = useSelector((s: RootState) => s.loginPage)
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newState = changePassword(state, e.target.value)
    dispatch(updateLoginPageState(newState))
  }

  return (
    <div className={styles['password-form']}>
      <InputWrapper
        label={<div>パスワード</div>}
        labelPosition='top'
        errorMessage={state.password.errorMessage}
      >
        <TextInput type='password' value={state.password.value} onChange={handleChange} />
      </InputWrapper>
    </div>
  )
}

export { PasswordForm }
