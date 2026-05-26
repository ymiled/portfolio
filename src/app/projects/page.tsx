const projects = [
  {
    title: "Small Language Models for Edge AI in Space",
    description: "Ongoing project with UC Berkeley and Satlyt, focusing on building an AI agent workflow with tool-calling capabilities for satellite edge computing.",
    href: "https://satlyt.ai/",
  },
  {
    title: "Vulcan OmniPro Assistant",
    description: "Full-stack multimodal assistant for the Vulcan OmniPro 220 welder — five specialized agents (orchestrator, retrieval, vision, diagnostic, artifact) orchestrated through a central router with WebSocket streaming and LRU caching. Vision agent parses product manual images to generate interactive React components, SVG diagrams, and Mermaid flowcharts; hybrid BM25 + semantic search with cross-encoder reranking. Deployed on Fly.io via Docker (React 18 / TypeScript frontend, FastAPI + PostgreSQL backend).",
    href: "https://github.com/ymiled/vulcan-omnipro-assistant",
  },
  {
    title: "Voice AI Freight Platform",
    description: "End-to-end freight brokerage platform with an autonomous voice agent handling 24/7 inbound carrier calls — FMCSA verification, fuzzy load matching, and rule-based negotiation engine with margin protection. Real-time metrics dashboard tracks booking rates, revenue, and carrier sentiment. Built with Next.js / TypeScript frontend and FastAPI + SQLite backend; containerized via Docker multi-stage builds and deployed to Fly.io.",
    href: "https://github.com/ymiled/happyrobot_challenge",
  },
  {
    title: "AgentProbe",
    description: "Built a red-teaming framework for AI agent systems deploying a four-agent adversarial swarm (Recon, Attack, Evaluator, Reporter) to identify prompt injection, PII leakage, and policy violations. Hybrid evaluation engine combines deterministic rules, regex pipelines, and LLM-based scoring aligned with OWASP LLM risk categories.",
    href: "https://github.com/ymiled/AgentProbe",
  },
  {
    title: "Enterprise Nervous System",
    description: "Multi-agent incident response platform using AG2 swarms and MCP, orchestrating parallel retrieval across logs, GitHub, and Jira to automate root-cause analysis and postmortem generation in under 19 seconds per incident. Evaluation pipeline spans 21 production-style failure scenarios with deterministic scoring achieving 80% performance.",
    href: "https://github.com/ymiled/enterprise_nervous_system",
  },
  {
    title: "CodeBase Agent",
    description: "Agentic AI code refactoring system using a multi-agent pipeline that analyzes Python code and validates changes.",
    href: "https://github.com/ymiled/codebase_agent",
  },
  {
    title: "Smooth Cascade Unlearning through Reversed Self-Distillation",
    description: "Machine unlearning framework (CISPA Helmholtz Center) escalating in-context → LoRA → full fine-tuning by forget-set size; applied reversed self-distillation to align model versions and minimize membership inference risk. Validated on SST-2, AGNews, and MIT Movies with LiRA membership inference auditing on OLMo 2 1B.",
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
