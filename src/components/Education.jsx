import { education } from "../data/profileData.js";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-head">
          <h2>Education</h2>
        </div>

        <div className="edu-list">
          {education.map((item, i) => (
            <div className="edu-item" key={i}>
              <div className="edu-period mono-tag">{item.period}</div>
              <div>
                <h3 className="edu-degree">{item.degree}</h3>
                <p className="edu-institution">{item.institution}</p>
                {item.detail && <p className="edu-detail">{item.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
