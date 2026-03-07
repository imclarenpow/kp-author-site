import { Route, Routes } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout'
import AboutPage from './pages/AboutPage'
import HomePage from './pages/HomePage'
import NewsPage from './pages/NewsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
