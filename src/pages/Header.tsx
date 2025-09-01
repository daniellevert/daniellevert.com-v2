import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => { setOpen(false) }, [loc.pathname])               // close on route change
  useEffect(() => {                                                  // Esc to close
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {                                                  // lock scroll on overlay
    const prev = document.body.style.overflow
    document.body.style.overflow = open ? 'hidden' : prev
    return () => { document.body.style.overflow = prev }
  }, [open])

  return (
    <header className="site">
      <div className="header-row">
        <div className="brand-group">
          <div className="brand">
            <Link to="/">DANIELLEVERT.</Link>
          </div>
          <div className="tagline">ENGINEER + CREATIVE</div>
        </div>

        <div className="nav-area">
          {/* desktop inline nav */}
          <nav id="site-nav" className={`site-nav ${open ? 'open' : ''}`}>
            <NavLink to="/photo" end>photo</NavLink>
            <NavLink to="/video" end>video</NavLink>
            <NavLink to="/design">design</NavLink>
            <NavLink to="/code">code</NavLink>
            <NavLink to="/about">about/me</NavLink>
          </nav>

          {/* mobile toggle (right side) */}
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(v => !v)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
            <span className="sr-only">{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
