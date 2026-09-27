import { profile } from "../data/profileData.js";
import { useInView } from "../hooks/useInView.js";

const LINKS = [
  {
    key: "email",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: <path d="M3 6h18v12H3V6Zm0 0 9 7 9-7" />,
  },
  {
    key: "phone",
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s+/g, "")}`,
    icon: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: profile.social.linkedin.replace("https://", ""),
    href: profile.social.linkedin,
    icon: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 10v7M7 7v.01M11 17v-4.5a2 2 0 0 1 4 0V17M11 12.5V17" /></>,
  },
  {
    key: "github",
    label: "GitHub",
    value: profile.social.github.replace("https://", ""),
    href: profile.social.github,
    icon: <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2-.2 4.5-1 4.5-4.5a3.5 3.5 0 0 0-1-2.5c.1-.5.5-2-.1-3 0 0-1.5 0-3 1.5-1.2-.4-2.9-.4-4 0-1.5-1.5-3-1.5-3-1.5-.6 1-.2 2.5-.1 3a3.5 3.5 0 0 0-1 2.5c0 3.5 2.5 4.3 4.5 4.5-.4.4-.5.9-.5 1.5V19" />,
  },
];

export default function Contact() {
  const [ref, isVisible] = useInView();

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <div className="section-head">
          <h2>Get in touch</h2>
          <p>Reach me directly through whichever works best for you.</p>
        </div>

        <div className={`contact-grid ${isVisible ? "in-view" : ""}`}>
          {LINKS.map((link, i) => (
            <a
              key={link.key}
              href={link.href}
              target={link.key === "linkedin" || link.key === "github" ? "_blank" : undefined}
              rel={link.key === "linkedin" || link.key === "github" ? "noreferrer" : undefined}
              className="contact-card"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="contact-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {link.icon}
                </svg>
              </span>
              <span className="contact-card-label">{link.label}</span>
              <span className="contact-card-value">{link.value}</span>
            </a>
          ))}
        </div>

        <a href={`mailto:${profile.email}`} className="btn btn-primary contact-cta">
          Let's work together
        </a>
      </div>
    </section>
  );
}
