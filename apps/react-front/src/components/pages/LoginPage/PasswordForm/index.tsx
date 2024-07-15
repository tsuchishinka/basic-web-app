import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputWrapper, TextInput } from '@packages/ui-library'
import styles from './index.module.scss'
import { updatePasswordValue } from '@/store/redux/login/loginSlice'
import { RootState } from '@/store/redux/store'

const PasswordForm = () => {
  const state = useSelector((s: RootState) => s.loginPage)
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updatePasswordValue(e.target.value))
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
