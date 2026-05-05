import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Media from './pages/Media'
import Dates from './pages/Dates'

export default function App() {
  const location = useLocation()
  const resetScroll = () => {
    const html = document.documentElement
    const previousScrollBehavior = html.style.scrollBehavior

    html.style.scrollBehavior = 'auto'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    html.style.scrollBehavior = previousScrollBehavior
  }

  return (
    <div className="film-grain min-h-screen bg-motel-black">
      <Navbar />
      <main>
        <AnimatePresence mode="wait" onExitComplete={resetScroll}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"      element={<PageTransition><Home  /></PageTransition>} />
            <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
            <Route path="/dates" element={<PageTransition><Dates /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
