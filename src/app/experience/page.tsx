const experiences = [
  {
    title: "Graduate Student Assistant",
    date: "September 2025 - May 2026",
    org: "Satlyt",
    location: "San Francisco, USA",
    items: [
      "Built an AI agent workflow with tool-calling capabilities for satellite edge computing, extracting actionable tasks from unstructured logs and routing them to specialized models.",
      "Developed an evaluation-driven telemetry workflow and optimized prompt templates for quality and speed trade-offs, including RAG integration to improve troubleshooting coverage.",
    ],
  },
  {
    title: "ML Research Intern",
    date: "May 2025 - July 2025",
    org: "CISPA Helmholtz Center for Information Security",
    location: "Saarbrücken, Germany",
    items: [
      "Machine learning research intern in the SprintML Group (Secure, Private, Robust, Interpretable, and Trustworthy Machine Learning).",
      "Working on unlearning for LLMs.",
    ],
  },
  {
    title: "Teaching Assistant",
    date: "Fall 2025 - Spring 2026",
    org: "UC Berkeley",
    location: "Berkeley, CA, USA",
    items: [
      "TA for Physics 8A (Spring 2026), supporting students in mechanics, problem-solving sessions, and exam preparation.",
      "TA for Computer Simulations with Jupyter Notebooks, guiding students on notebook-based computational workflows and simulation assignments.",
    ],
  },
  {
    title: "Oral Examiner",
    date: "September 2024 - Present",
    org: "Ministry of Higher Education and Scientific Research",
    location: "France",
    items: [
      "Oral examiner in mathematics for first-year preparatory class undergraduates. Conducting weekly sessions to prepare students for the competitive entrance exams to France's top-tier engineering schools (Grandes Écoles).",
    ],
    topics: "Topics covered: Combinatorics, Probability, Real Analysis, Complex numbers, Differential equations, Calculus, Number Theory, Algebraic Structures, Linear Algebra, Symmetric Groups and Determinants.",
  },
]

export default function Experience() {
  return (
    <main className="page">
      <h1 className="section-heading">Experience</h1>
      <div className="cards-list">
        {experiences.map((exp) => (
          <div key={exp.title} className="card">
            <div className="exp-header">
              <span className="exp-title">{exp.title}</span>
              <span className="exp-date">{exp.date}</span>
            </div>
            <div className="exp-org">{exp.org}</div>
            <div className="exp-location">{exp.location}</div>
            <ul className="exp-items">
              {exp.items.map((item, i) => (
                <li key={i} className="exp-item">{item}</li>
              ))}
            </ul>
            {"topics" in exp && <p className="exp-topics">{exp.topics}</p>}
          </div>
        ))}
      </div>
    </main>
  )
}
