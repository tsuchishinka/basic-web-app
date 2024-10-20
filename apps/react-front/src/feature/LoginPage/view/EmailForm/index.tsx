import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputWrapper, TextInput } from '@packages/ui-library'
import { changeEmail } from '../../controller/actions/changeEmail'
import { updateLoginPageState } from '../../controller/slice'
import styles from './index.module.scss'
import { RootState } from '@/store'

const EmailForm = () => {
  const state = useSelector((s: RootState) => s.loginPage)
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newState = changeEmail(state, e.target.value)
    dispatch(updateLoginPageState(newState))
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
