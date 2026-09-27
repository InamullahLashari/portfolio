import { profile } from "../data/profileData.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {profile.name}. Built with React.</span>
        <div className="footer-links">
          <a href={profile.social.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}
