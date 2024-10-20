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

const getInitialLoginPageState = (): LoginPageState => {
  return {
    email: {
      value: undefined,
      errorMessage: undefined,
    },
    password: {
      value: undefined,
      errorMessage: undefined,
    },
    success: false,
  }
}

export { getInitialLoginPageState }
export type { LoginPageState }
