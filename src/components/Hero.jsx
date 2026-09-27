import { profile, availability } from "../data/profileData.js";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">Welcome, I'm {profile.name}</p>
          <h1>{profile.role}.</h1>
          <p className="hero-tagline">{profile.tagline}</p>
          <p className="hero-intro">{profile.intro}</p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Contact Me</a>
            <a href="#skills" className="btn btn-ghost">View My Skills</a>
          </div>
        </div>

        <div className="hero-card card">
          <div className="hero-avatar-ring">
            {profile.photoUrl ? (
              <img className="hero-avatar-photo" src={profile.photoUrl} alt={profile.name} />
            ) : (
              <div className="hero-avatar" aria-hidden="true">
                {profile.name.charAt(0)}
              </div>
            )}
          </div>
          <h3>{profile.name}</h3>
          <p className="hero-role-tag">{profile.role}</p>

          <ul className="hero-meta">
            <li><span>Location</span><span>{profile.location}</span></li>
            <li><span>Email</span><span className="hero-meta-value">{profile.email}</span></li>
            <li><span>Status</span><span className="hero-status">● {availability.options.find((o) => o.available)?.label} available</span></li>
          </ul>

          <div className="hero-social">
            <a href={profile.social.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
}
