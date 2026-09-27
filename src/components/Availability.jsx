import { availability } from "../data/profileData.js";
import { useInView } from "../hooks/useInView.js";

// Small inline icons — a check for open options, a cross for closed ones —
// so status reads at a glance instead of relying on strikethrough text.
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function Availability() {
  const [ref, isVisible] = useInView();

  return (
    <section id="availability" className="section" ref={ref}>
      <div className="container">
        <div className="section-head">
          <h2>Availability</h2>
        </div>

        <div className={`availability-card ${isVisible ? "in-view" : ""}`}>
          <div className="availability-status">
            <span className="availability-dot" aria-hidden="true">
              <span className="availability-dot-ping" />
            </span>
            <div>
              <h3>{availability.status}</h3>
              <p>{availability.note}</p>
            </div>
          </div>

          <div className="availability-options">
            {availability.options.map((opt, i) => (
              <span
                key={opt.label}
                className={`availability-pill ${opt.available ? "is-open" : "is-closed"}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="availability-pill-icon">
                  {opt.available ? <CheckIcon /> : <CrossIcon />}
                </span>
                {opt.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
