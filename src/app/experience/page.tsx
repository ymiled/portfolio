const experiences = [
  {
    title: "Research Assistant",
    date: "Sep 2025 – May 2026 · 9 mos",
    org: "Satlyt · Part-time",
    location: "San Francisco Bay Area, USA",
    items: [
      "Won the Fung Institute MEng Technical Leadership Award.",
      "Designed an agentic workflow with tool-calling capabilities that enable small language models to autonomously process real-time telemetry and log data under the strict compute constraints of space hardware.",
    ],
    link: {
      href: "https://funginstitute.berkeley.edu/news/the-future-of-intelligent-satellites",
      label: "The Future of Intelligent Satellites",
    },
  },
  {
    title: "ML Researcher",
    date: "May 2025 – Jul 2025 · 3 mos",
    org: "CISPA Helmholtz Center for Information Security · Internship",
    location: "Germany",
    items: [
      "Conducted research at CISPA, within the SprintML group, on private and trustworthy machine learning, with a focus on LLM unlearning.",
    ],
  },
  {
    title: "Mathematics Oral Examiner",
    date: "Sep 2024 – Apr 2025 · 8 mos",
    org: "Ministère de l'Enseignement supérieur, de la Recherche et de l'Espace · Part-time",
    location: "Lyon, France",
    items: [
      "Conducted and evaluated oral mathematics examinations for first and second-year undergraduate students preparing for competitive entrance examinations to France's top engineering schools.",
    ],
  },
]

export default function Experience() {
  return (
    <section>
      <header className="page-head">
        <h1 className="page-title">Experience</h1>
      </header>

      <div className="entries">
        {experiences.map((exp) => (
          <article key={exp.title} className="entry">
            <div className="entry-meta">
              {exp.date}
              <span className="org">{exp.org} · {exp.location}</span>
            </div>
            <div>
              <h2 className="entry-title">{exp.title}</h2>
              <ul className="entry-items">
                {exp.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {exp.link && (
                <p className="entry-note">
                  <a
                    href={exp.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-link"
                  >
                    {exp.link.label}
                  </a>
                  <span className="arrow">↗</span>
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
