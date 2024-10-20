import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@packages/ui-library'
import { login } from '../../controller/actions/login'
import { updateLoginPageState } from '../../controller/slice'
import styles from './index.module.scss'
import { loginService } from '@/service'
import { RootState } from '@/store'

const ExecuteButton = () => {
  const state = useSelector((s: RootState) => s.loginPage)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = async () => {
    try {
      const newState = await login(state, loginService)
      dispatch(updateLoginPageState(newState))
    } catch (error: unknown) {
      alert('APIエラーが発生しました')
      return
    }
    navigate('/device')
  }

  return (
    <div className={styles['execute-button']}>
      <Button size='medium' onClick={handleClick}>
        ログイン
      </Button>
    </div>
  )
}

export { ExecuteButton }
