import { EmailForm } from './EmailForm'
import { ExecuteButton } from './ExecuteButton'
import styles from './index.module.scss'
import { PasswordForm } from './PasswordForm'

const LoginPage = () => {
  return (
    <div className={styles['login-page']}>
      <div>
        <EmailForm />
        <PasswordForm />
        <ExecuteButton />
      </div>
    </div>
  )
}

export { LoginPage }
