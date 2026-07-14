import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CausePage from './pages/CausePage'
import ScrollStoryPage from './pages/ScrollStoryPage'
import GalleryPage from './pages/GalleryPage'
import MemoriesPage from './pages/MemoriesPage'
import BentoPage from './pages/BentoPage'
import LetterPage from './pages/LetterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cause" element={<CausePage />} />
      <Route path="/scroll" element={<ScrollStoryPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/memories" element={<MemoriesPage />} />
      <Route path="/bento" element={<BentoPage />} />
      <Route path="/letter" element={<LetterPage />} />
    </Routes>
  )
}

export default App

