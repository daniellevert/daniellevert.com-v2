import { SITE } from "../data/site";
import { SKILLS } from "../data/skills";

export default function About(){
  return (
    <section className="wrap">
      <div className="hero" style={{margin:'2rem 0 1rem'}}>
        <h1>about/me</h1>
        <h2>new york–based software engineer & multidisciplinary creative</h2>
      </div>
      <div style={{display:'grid', gap:'1.2rem', maxWidth:800}}>
        <img
          src="/about/portrait.jpg"
          alt="Daniel LeVert"
          style={{ width: '100%', borderRadius: 12, marginTop: 16 }}
        />
        <p>
          Daniel LeVert is a New York–based software engineer and multidisciplinary creative. He earned a Bachelor of Science in Computer Science from the University of Illinois Chicago (UIC) while continuing to develop his practice in photography, videography, design, and other art forms.
        </p>
        <p>
          On one hand, he ships and maintains large-scale applications for major companies and builds independent code projects. On the other, he uses creative tools and digital equipment to produce photo editorials, run social channels with hundreds of thousands of views, and explore acting, comedy, fashion, and new media art.
        </p>
        <section className="about-skills">
          <h3>Engineering Skills</h3>
          <div className="chips">
            {SKILLS.engineering.map(s => <span key={s} className="chip">{s}</span>)}
          </div>

          <h3>Creative Skills</h3>
          <div className="chips">
            {SKILLS.creative.map(s => <span key={s} className="chip">{s}</span>)}
          </div>

          <h3>Connect with Daniel</h3>
          <div>
            <a href={SITE.links.linkedin}><u>LinkedIn</u></a> •
            <a href={SITE.links.github}> <u>GitHub</u></a> •
            <a href={`mailto:${SITE.email}`}> <u>{SITE.email}</u></a>
          </div>
        </section>
      </div>
    </section>
  )
}
