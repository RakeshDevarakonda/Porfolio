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
        <div className="about-portrait-hud-overlay">
          <div className="hud-corner hud-corner--tl" />
          <div className="hud-corner hud-corner--tr" />
          <div className="hud-corner hud-corner--bl" />
          <div className="hud-corner hud-corner--br" />

          <div className="hud-status-badge">
            <span className="status-dot" />
            <span>DEVARAKONDA RAKESH</span>
          </div>

          <div className="hud-location-tag">
            <span>HYDERABAD, INDIA · BACKEND ENGINEER</span>
          </div>
        </div>
      </div>
    </TiltCard3D>
  )
}
