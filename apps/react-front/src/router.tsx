import { Route, Routes } from 'react-router-dom'
import { DevicePage } from './components/pages/DevicePage'

const App = () => {
  return (
    <Routes>
      <Route path='/device' element={<DevicePage />} />
    </Routes>
  )
}

export default App
