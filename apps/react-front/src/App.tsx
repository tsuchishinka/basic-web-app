import { Route, Routes } from 'react-router-dom'
import DevicePage from './pages/device'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/device' element={<DevicePage />} />
      </Routes>
    </div>
  )
}

export default App
