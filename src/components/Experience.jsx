import { useState } from "react";
import { experience } from "../data/profileData.js";
import { useInView } from "../hooks/useInView.js";

// Shows a company's real logo (via Clearbit's public logo API) when we know
// its domain; falls back to a gradient initials badge otherwise, or if the
// logo image fails to load — so the layout never breaks either way.
function CompanyLogo({ company, logoDomain }) {
  const [failed, setFailed] = useState(false);

  if (!logoDomain || failed) {
    return (
      <span className="exp-logo exp-logo-fallback">
        {company.charAt(0)}
      </span>
    );
  }

  return (
    <span className="exp-logo">
      <img
        src={`https://logo.clearbit.com/${logoDomain}`}
        alt={`${company} logo`}
        onError={() => setFailed(true)}
      />
    </span>
  );
}

export default function Experience() {
  const [ref, isVisible] = useInView();

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">
        <div className="section-head">
          <h2>Experience</h2>
          <p>Where I've worked and what I've built along the way.</p>
        </div>

        <div className={`exp-timeline ${isVisible ? "in-view" : ""}`}>
          {experience.map((job, i) => (
            <div
              className={`exp-item ${job.current ? "is-current" : ""}`}
              key={`${job.company}-${i}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="exp-dot-col">
                <span className="exp-dot" />
                {i !== experience.length - 1 && <span className="exp-line" />}
              </div>

              <div className="exp-card">
                <div className="exp-card-head">
                  <div className="exp-card-title">
                    <CompanyLogo company={job.company} logoDomain={job.logoDomain} />
                    <div>
                      <h3>{job.role}</h3>
                      <p className="exp-company">
                        {job.company}
                        {job.project && <span className="exp-project"> — {job.project}</span>}
                      </p>
                    </div>
                  </div>
                  <span className="exp-period mono-tag">{job.period}</span>
                </div>
                {job.detail && <p className="exp-detail">{job.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
