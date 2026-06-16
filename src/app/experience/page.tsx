const experiences = [
  {
    title: "Graduate Student Assistant",
    date: "Sep 2025 – May 2026",
    org: "Satlyt",
    location: "San Francisco, USA",
    items: [
      "Built an AI agent workflow with tool-calling for satellite edge computing, extracting actionable tasks from unstructured logs and routing them to specialized models.",
      "Developed an evaluation-driven telemetry workflow and tuned prompt templates for quality/speed trade-offs, with RAG integration to widen troubleshooting coverage.",
    ],
  },
  {
    title: "ML Research Intern",
    date: "May 2025 – Jul 2025",
    org: "CISPA Helmholtz Center",
    location: "Saarbrücken, Germany",
    items: [
      "Research intern in the SprintML group (Secure, Private, Robust, Interpretable, Trustworthy ML).",
      "Worked on unlearning for large language models.",
    ],
  },
  {
    title: "Teaching Assistant",
    date: "Fall 2025 – Spring 2026",
    org: "UC Berkeley",
    location: "Berkeley, CA, USA",
    items: [
      "TA for Physics 8A (Spring 2026): mechanics, problem-solving sessions, and exam prep.",
      "TA for Computer Simulations with Jupyter Notebooks: notebook-based computational workflows and simulation assignments.",
    ],
  },
  {
    title: "Oral Examiner in Mathematics",
    date: "Sep 2024 – Present",
    org: "Ministry of Higher Education",
    location: "France",
    items: [
      "Run weekly oral exams for first-year preparatory-class students preparing for the competitive entrance exams to France's Grandes Écoles.",
    ],
    note:
      "Combinatorics, probability, real analysis, complex numbers, differential equations, calculus, number theory, algebraic structures, linear algebra, symmetric groups, and determinants.",
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
              {"note" in exp && <p className="entry-note">{exp.note}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
