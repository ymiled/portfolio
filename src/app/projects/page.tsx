const projects = [
  {
    title: "Small Language Models for Edge AI in Space",
    meta: "2025 · UC Berkeley × Satlyt",
    description:
      "Building an AI agent workflow with tool-calling for satellite edge computing — extracting actionable tasks from unstructured logs and routing them to specialized models.",
    href: "https://satlyt.ai/",
  },
  {
    title: "Vulcan OmniPro Assistant",
    meta: "2025",
    description:
      "Full-stack multimodal assistant for the Vulcan OmniPro 220 welder: five specialized agents (orchestrator, retrieval, vision, diagnostic, artifact) behind a central router with WebSocket streaming. The vision agent turns manual images into interactive React components, SVG diagrams, and Mermaid flowcharts; hybrid BM25 + semantic search with cross-encoder reranking. React / FastAPI / PostgreSQL on Fly.io.",
    href: "https://github.com/ymiled/vulcan-omnipro-assistant",
  },
  {
    title: "Voice AI Freight Platform",
    meta: "2025",
    description:
      "Freight brokerage platform with an autonomous voice agent handling 24/7 inbound carrier calls — FMCSA verification, fuzzy load matching, and a rule-based negotiation engine with margin protection. Real-time dashboard tracks booking rates, revenue, and carrier sentiment. Next.js / FastAPI on Fly.io.",
    href: "https://github.com/ymiled/happyrobot_challenge",
  },
  {
    title: "AgentProbe",
    meta: "2025",
    description:
      "A red-teaming framework for AI agent systems: a four-agent adversarial swarm (Recon, Attack, Evaluator, Reporter) that surfaces prompt injection, PII leakage, and policy violations. Hybrid evaluation combines deterministic rules, regex pipelines, and LLM scoring aligned with OWASP LLM risk categories.",
    href: "https://github.com/ymiled/AgentProbe",
  },
  {
    title: "Enterprise Nervous System",
    meta: "2025",
    description:
      "Multi-agent incident response using AG2 swarms and MCP — parallel retrieval across logs, GitHub, and Jira to automate root-cause analysis and postmortems in under 19 seconds per incident. Evaluated over 21 production-style failure scenarios with deterministic scoring.",
    href: "https://github.com/ymiled/enterprise_nervous_system",
  },
  {
    title: "CodeBase Agent",
    meta: "2025",
    description:
      "Agentic code-refactoring system: a multi-agent pipeline that analyzes Python code and validates its own changes.",
    href: "https://github.com/ymiled/codebase_agent",
  },
  {
    title: "Smooth Cascade Unlearning via Reversed Self-Distillation",
    meta: "2025 · CISPA",
    description:
      "Machine unlearning that escalates in-context → LoRA → full fine-tuning by forget-set size, using reversed self-distillation to align model versions and minimize membership inference risk. Validated on SST-2, AGNews, and MIT Movies with LiRA auditing on OLMo 2 1B.",
    href: null,
  },
  {
    title: "Data Analysis for Table Tennis Matches",
    meta: "2024 · Centrale Lyon",
    description:
      "Physics-based modeling of table tennis ball trajectories with player data to analyze bounce uncertainty zones and strike timing — feeding player classification and strategy.",
    href: "https://github.com/centralelyon/tt-perf",
  },
  {
    title: "Type System for Secure Information Flow",
    meta: "2023 · OCaml",
    description:
      "A type system and checker in OCaml that enforces the noninterference property.",
    href: "https://github.com/ymiled/type-system-for-noninterference",
  },
]

export default function Projects() {
  return (
    <section>
      <header className="page-head">
        <h1 className="page-title">Projects &amp; Research</h1>
        <p className="page-sub">Things I&apos;ve built and studied, most recent first.</p>
      </header>

      <div className="entries">
        {projects.map((project) => (
          <article key={project.title} className="entry">
            <div className="entry-meta">{project.meta}</div>
            <div>
              <h2 className="entry-title">
                {project.href ? (
                  <a href={project.href} target="_blank" rel="noopener noreferrer">
                    {project.title}
                    <span className="arrow">↗</span>
                  </a>
                ) : (
                  project.title
                )}
              </h2>
              <p className="entry-desc">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
