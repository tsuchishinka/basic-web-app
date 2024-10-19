import { createBrowserRouter, Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './components/layout/DefaultLayout'
import { DevicePage } from './components/pages/DevicePage'
import { LoginPage } from './components/pages/LoginPage'
import { ROUTER } from './const/ROUTER'

const APP_ROUTERS = [
  {
    path: ROUTER.DEVICE,
    element: <DevicePage />,
  },
]

const AppRouter = () => {
  return (
    <DefaultLayout>
      <Routes>
        {APP_ROUTERS.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </DefaultLayout>
  )
}

const LoginRouter = () => {
  return (
    <DefaultLayout hasSideBar={false}>
      <LoginPage />
    </DefaultLayout>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginRouter />,
  },
  {
    path: '*',
    element: <AppRouter />,
  },
])

export { router }
