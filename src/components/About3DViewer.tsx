import { TiltCard3D } from './TiltCard3D'

export function About3DViewer() {
  return (
    <TiltCard3D className="about-portrait-card">
      <div className="about-portrait-wrapper">
        <img
          src="/rakesh-devarakonda.jpg"
          alt="Devarakonda Rakesh — Full Stack Developer & Backend Engineer"
          className="about-portrait-img"
        />
        <div className="about-portrait-caption">
          <strong>Devarakonda Rakesh</strong>
          <span>Full Stack Developer | Hyderabad, India</span>
        </div>
      </div>
    </TiltCard3D>
  )
}
