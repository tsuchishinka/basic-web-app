import { LoginService } from '@packages/demo-api'
import { LoginPageState } from '../../state'

const login = async (
  state: LoginPageState,
  loginService: LoginService,
): Promise<LoginPageState> => {
  await loginService.login({
    email: state.email.value,
    password: state.password.value,
  })
  return state
}

export { login }
