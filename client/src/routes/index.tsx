import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/Home'

export default function Router () {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  )
}
