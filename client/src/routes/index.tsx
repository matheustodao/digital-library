import { Navigate, Route, Routes } from 'react-router-dom'

import HomePage from '@pages/Home'
import BooksPage from 'src/pages/Books/home'
import BookLoanPage from 'src/pages/BookLoan/home'
import AboutBook from 'src/pages/Books/about'
import AboutLoanedBook from 'src/pages/BookLoan/about'
import SettingsPage from 'src/pages/Settings'
import AccountSubPage from 'src/pages/Settings/subpages/Account'
import BackupSubPage from 'src/pages/Settings/subpages/Backup'
import ExportSubPage from 'src/pages/Settings/subpages/Import'
import ImportSubPage from 'src/pages/Settings/subpages/Export'

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
