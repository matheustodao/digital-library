import { Navigate, Route, Routes } from 'react-router-dom'

import HomePage from '@pages/Home'
import BooksPage from 'src/pages/Books/home'
import LoansBooksPage from 'src/pages/LoansBooks/home'
import AboutBook from 'src/pages/Books/about'
import AboutLoanedBook from 'src/pages/LoansBooks/about'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:id" element={<AboutBook />} />
      <Route path="/loans" element={<LoansBooksPage/>} />
      <Route path="/loans/:id" element={<AboutLoanedBook />} />
    </Routes>
  )
}
