import { skillGroups } from "../data/profileData.js";
import { useInView } from "../hooks/useInView.js";

// One icon per group (not per individual skill) — keeps this dependency-free
// and avoids trying to fake dozens of unofficial tech logos.
const GROUP_ICONS = {
  backend: <path d="M4 4h16v6H4V4Zm0 10h16v6H4v-6Zm3.5-7h.01M7.5 17h.01" />,
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </>
  ),
  infra: <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 0v20M3 7l9 5 9-5" />,
  frontend: <path d="M4 6h16M4 6l2 13h12l2-13M9 10v6M15 10v6" />,
};

function GroupIcon({ icon }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {GROUP_ICONS[icon]}
    </svg>
  );
}

export default function Skills() {
  const [ref, isVisible] = useInView();

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <div className="section-head">
          <h2>Skills</h2>
          <p>Technologies I work with regularly, grouped by area.</p>
        </div>

        <div className={`skills-groups ${isVisible ? "in-view" : ""}`}>
          {skillGroups.map((group, gi) => (
            <div
              className="skill-group-card"
              key={group.group}
              style={{ transitionDelay: `${gi * 90}ms` }}
            >
              <div className="skill-group-head">
                <span className="skill-group-icon">
                  <GroupIcon icon={group.icon} />
                </span>
                <h3>{group.group}</h3>
              </div>

              <div className="skill-chip-row">
                {group.items.map((name) => (
                  <span className="skill-chip" key={name}>{name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
