import { createBrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTER } from './common/const/ROUTER'
import { DefaultLayout } from './common/view/layout/DefaultLayout'
import { DevicePage } from '@/feature/DevicePage/view'
import { LoginPage } from '@/feature/LoginPage/view'
import { ChannelListener } from 'diagnostics_channel'

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
