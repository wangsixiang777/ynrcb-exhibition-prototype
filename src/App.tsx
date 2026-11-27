import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScreenA } from './pages/ScreenA'
import { ScreenB } from './pages/ScreenB'
import { ScreenC } from './pages/ScreenC'
import { ScreenD } from './pages/ScreenD'
import { ScreenSmile } from './pages/ScreenSmile'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/screen-a" replace />} />
          <Route path="screen-a" element={<ScreenA />} />
          <Route path="screen-b" element={<ScreenB />} />
          <Route path="screen-c" element={<ScreenC />} />
          <Route path="screen-smile" element={<ScreenSmile />} />
          <Route path="screen-d" element={<ScreenD />} />
          <Route path="*" element={<Navigate to="/screen-a" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
