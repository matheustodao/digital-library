import { Route, Routes } from 'react-router-dom'

import HomePage from '@pages/Home'
import BooksPage from 'src/pages/Books'
import LoansBooksPage from 'src/pages/LoansBooks'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
      <Route path="/books" element={<BooksPage />} />
      <Route path="/loans" element={<LoansBooksPage/>} />
    </Routes>
  )
}
