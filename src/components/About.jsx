import { about } from "../data/profileData.js";
import { useInView } from "../hooks/useInView.js";

// Small inline icons (no icon-library dependency) — one per row, purely
// decorative, so they're marked aria-hidden and the text alone carries
// the meaning for screen readers.
const ICONS = {
  "Who I am": (
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z" />
  ),
  "What I do": (
    <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
  ),
  "Experience": (
    <path d="M4 8h16v11H4V8Zm4 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  ),
  "Interested in": (
    <path d="M12 21s-7-4.35-9.5-8.5C.8 8.9 2.6 5.5 6 5c2-.3 3.6.7 6 3 2.4-2.3 4-3.3 6-3 3.4.5 5.2 3.9 3.5 7.5C19 16.65 12 21 12 21Z" />
  ),
  "Career goals": (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </>
  ),
};

function RowIcon({ label }) {
  return (
    <svg
      className="about-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[label]}
    </svg>
  );
}

const rows = [
  { label: "Who I am", value: about.whoIAm },
  { label: "What I do", value: about.whatIDo },
  { label: "Experience", value: about.experience },
  { label: "Interested in", value: about.interestedIn },
  { label: "Career goals", value: about.goals },
];

export default function About() {
  const [ref, isVisible] = useInView();

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <div className="section-head">
          <h2>About</h2>
          <p>A quick rundown before the details — who I am and what I'm looking for.</p>
        </div>

        <div className={`about-grid ${isVisible ? "in-view" : ""}`}>
          {rows.map((row, i) => (
            <div
              className="about-card"
              key={row.label}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="about-icon-wrap">
                <RowIcon label={row.label} />
              </div>
              <span className="about-label">{row.label}</span>
              <p className="about-value">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
