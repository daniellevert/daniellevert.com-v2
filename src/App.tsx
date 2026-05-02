import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './pages/Header'
import Landing from './pages/Landing'
import Photo from './pages/Photo'
import Video from './pages/Video'
import Design from './pages/Design'
import Code from './pages/Code'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  const loc = useLocation()
  const isLanding = loc.pathname === '/'

  return (
    <div className={`app-shell wrap ${isLanding ? 'app-shell--landing' : ''}`}>
      {!isLanding && <Header />}
      <main>
        <Routes>
          {/* Landing first */}
          <Route index element={<Landing />} />
          {/* Other pages */}
          <Route path="photo" element={<Photo />} />
          <Route path="video" element={<Video />} />
          <Route path="design" element={<Design />} />
          <Route path="code" element={<Code />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="site">
        <div className="wrap" style={{padding:0}}>
          <div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
            <a href="https://www.linkedin.com/in/daniellevert" target="_blank" rel="noreferrer">LinkedIn</a> •
            <a href="https://github.com/daniellevert" target="_blank" rel="noreferrer">GitHub</a> •
            <a href="mailto:daniel@daniellevert.com">daniel@daniellevert.com</a>
          </div>
          <div style={{marginTop:8}}>© {new Date().getFullYear()} Daniel LeVert. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
