import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputWrapper, TextInput } from '@packages/ui-library'
import styles from './index.module.scss'
import { updateEmailValue } from '@/store/redux/login/loginSlice'
import { RootState } from '@/store/redux/store'

const EmailForm = () => {
  const state = useSelector((s: RootState) => s.loginPage)
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateEmailValue(e.target.value))
  }

  return (
    <div className={styles['email-form']}>
      <InputWrapper
        label={<div>メールアドレス</div>}
        labelPosition='top'
        errorMessage={state.email.errorMessage}
      >
        <TextInput value={state.email.value} onChange={handleChange} />
      </InputWrapper>
    </div>
  )
}

export { EmailForm }
