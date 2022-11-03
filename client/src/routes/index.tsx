import { Navigate, Route, Routes } from 'react-router-dom'

import HomePage from '@pages/Home'
import BooksPage from '@pages/Books/home'
import BookLoanPage from '@pages/BookLoan/home'
import AboutBook from '@pages/Books/about'
import AboutLoanedBook from '@pages/BookLoan/about'
import SettingsPage from '@pages/Settings'
import AccountSubPage from '@pages/Settings/subpages/Account'
import BackupSubPage from '@pages/Settings/subpages/Backup'
import ExportSubPage from '@pages/Settings/subpages/Import'
import ImportSubPage from '@pages/Settings/subpages/Export'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/books" element={<BooksPage />} />
      <Route path="/books/:id" element={<AboutBook />} />
      <Route path="/loans" element={<BookLoanPage/>} />
      <Route path="/loans/:id" element={<AboutLoanedBook />} />
      <Route path="/settings" element={<SettingsPage />}>
        <Route index element={<AccountSubPage />} />
        <Route path="backup" element={<BackupSubPage />} />
        <Route path="export" element={<ExportSubPage />} />
        <Route path="import" element={<ImportSubPage />} />
      </Route>
    </Routes>
  )
}
