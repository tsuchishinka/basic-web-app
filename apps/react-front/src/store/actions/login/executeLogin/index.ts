import { LoginService } from '@packages/demo-api'
import { LoginPageState } from '@/store/state/loginPageState'

const executeLogin = async (
  state: LoginPageState,
  loginService: LoginService,
): Promise<LoginPageState> => {
  await loginService.login({
    email: state.email.value,
    password: state.password.value,
  })
  return state
}

export default executeLogin
