import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './components/layout/DefaultLayout'
import { DevicePage } from './components/pages/DevicePage'
import { LoginPage } from './components/pages/LoginPage'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/device' element={<DevicePage />} />
    </Routes>
  )
}

const App = () => {
  return (
    <DefaultLayout>
      <Router />
    </DefaultLayout>
  )
}

export default App
