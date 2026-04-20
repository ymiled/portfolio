const projects = [
  {
    title: "Small Language Models for Edge AI in Space",
    description: "Ongoing project with UC Berkeley and Satlyt, focusing on building an AI agent workflow with tool-calling capabilities for satellite edge computing.",
    href: "https://satlyt.ai/",
  },
  {
    title: "AgentProbe",
    description: "Built a red-teaming framework for AI agent systems deploying a four-agent adversarial swarm.",
    href: "https://github.com/ymiled/AgentProbe",
  },
  {
    title: "Enterprise Nervous System",
    description: "Cross-silo incident-resolution swarm that queries logs, GitHub, and Jira to automate root-cause analysis.",
    href: "https://github.com/ymiled/enterprise_nervous_system",
  },
  {
    title: "CodeBase Agent",
    description: "Agentic AI code refactoring system using a multi-agent pipeline that analyzes Python code and validates changes.",
    href: "https://github.com/ymiled/codebase_agent",
  },
  {
    title: "Smooth Cascade Unlearning through Reversed Self-Distillation",
    description: "Researched in-context unlearning and parameter-efficient fine-tuning to make LLMs forget private data.",
    href: null,
  },
  {
    title: "Data Analysis for Table Tennis Matches",
    description: "Conducted a study on table tennis ball trajectories, utilizing physics-based modeling and player data to analyze bounce uncertainty zones and strike timing, contributing to player classification and strategy development.",
    href: "https://github.com/centralelyon/tt-perf",
  },
  {
    title: "Type System for Secure Information Flow",
    description: "Implemented a type system and checker in OCaml to ensure the noninterference property.",
    href: "https://github.com/ymiled/type-system-for-noninterference",
  },
]

export default function Projects() {
  return (
    <main className="page">
      <h1 className="section-heading">Projects &amp; Research</h1>
      <div className="cards-list">
        {projects.map((project) => (
          <div key={project.title} className="card">
            <h2 className="project-title">
              {project.href
                ? <a href={project.href} target="_blank" rel="noopener noreferrer">{project.title}</a>
                : project.title}
            </h2>
            <p className="project-description">{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
