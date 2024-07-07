type LoginPageState = {
  email: {
    value: string | undefined
    errorMessage: string | undefined
  }
  password: {
    value: string | undefined
    errorMessage: string | undefined
  }
  success: boolean
}

export type { LoginPageState }
