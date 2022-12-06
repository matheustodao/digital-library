import { Navigate, Route, Routes } from 'react-router-dom'

import HomePage from '@pages/Home'
import BooksPage from '@pages/Books/home'
import BookLoanPage from '@pages/BookLoan/home'
import AboutBook from '@pages/Books/about'
import AboutLoanedBook from '@pages/BookLoan/about'
import SettingsPage from '@pages/Settings'
import AccountSubPage from '@pages/Settings/subpages/Account'
import BackupSubPage from '@pages/Settings/subpages/Backup'
import ImportSubPage from '@pages/Settings/subpages/Import'
import ExportSubPage from '@pages/Settings/subpages/Export'
import NewBookLoanPage from '@pages/BookLoan/new'
import Login from '@pages/Auth/Login'
import RegisterPage from '@pages/Auth/Register'
import { ProtectedRoute } from './components/ProtectedRoutes'
import LoggedLayout from '@components/Layouts/logged'
import NewBookPage from '@pages/Books/new'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute children={<LoggedLayout />} />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<AboutBook />} />
        <Route path="books/new" element={<NewBookPage />} />

        <Route path="/loans" element={<BookLoanPage/>} />
        <Route path="/loans/new" element={<NewBookLoanPage />} />
        <Route path="/loans/:id" element={<AboutLoanedBook />} />

        <Route path="/settings" element={<SettingsPage />}>
          <Route index element={<AccountSubPage />} />
          <Route path="backup" element={<BackupSubPage />} />
          <Route path="export" element={<ExportSubPage />} />
          <Route path="import" element={<ImportSubPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
