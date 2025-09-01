import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <section className="wrap">
      <h1 style={{marginTop:'10vh'}}>404</h1>
      <p style={{color:'var(--muted)', marginTop:8}}>Page not found.</p>
      <p style={{marginTop:16}}><Link to="/">Go home</Link></p>
    </section>
  )
}
