const experiences = [
  {
    title: "Graduate Research Assistant",
    date: "Sep 2025 – May 2026",
    org: "Satlyt (UC Berkeley MEng capstone)",
    location: "San Francisco, CA, USA",
    items: [
      "Owned the language-model side of an onboard satellite operations assistant running fully offline on an NVIDIA Jetson Orin Nano (8 GB, 7–15 W), working directly with the founder and CTO.",
      "Built the log summarization and troubleshooting tools behind a small-language-model orchestrator: chunked windows, a severity-keyword filter ahead of inference, and TF-IDF retrieval over a structured failure knowledge base.",
      "Built the evaluation harness the system was tuned against: 10 prompt configurations across 6 quantized models (1–4B) scored by an LLM judge on correctness, coverage, and actionability. Prompt framing outweighed model size, 7.81/10 against 3.73/10 on the same model.",
      "Served IBM Granite 4.0 (3B) as a 4-bit Q4_K_M GGUF through llama.cpp, tuning GPU layer offload, batch size, and context length to 62.6 tok/s inside the power envelope.",
    ],
    note:
      "Fung Institute MEng Technical Leadership Award for scoping and solution design on this project. Co-authored the 30-page capstone report on system design, evaluation methodology, and market analysis for space-edge AI.",
  },
  {
    title: "ML Research Intern",
    date: "May 2025 – Jul 2025",
    org: "CISPA Helmholtz Center",
    location: "Saarbrücken, Germany",
    items: [
      "Research intern in the SprintML group (Secure, Private, Robust, Interpretable, Trustworthy ML).",
      "Designed the switching policy for a cascade unlearning framework that escalates in-context to LoRA to full fine-tuning as the forget set grows, and found that the stage transitions themselves leak an attackable membership signal.",
      "Built the measurement side end to end: a cross-stage ForgetLiRA membership-inference audit reporting TPR@1%FPR on OLMo 2 1B across SST-2, AGNews, and MIT-Movies, with 10 shadow models trained concurrently on a SLURM and Docker cluster.",
      "Second project: ported UnitMem neuron-level memorization analysis to the RAR autoregressive image generator on ImageNet-1k, and traced top-memorizing units back to the exact training images driving them.",
    ],
  },
  {
    title: "Graduate Student Instructor",
    date: "Fall 2025 – Spring 2026",
    org: "UC Berkeley",
    location: "Berkeley, CA, USA",
    items: [
      "GSI for Physics 8A (Spring 2026): mechanics labs, discussions, problem-solving sessions, and exam prep.",
      "GSI for Computer Simulations with Jupyter Notebooks: notebook-based computational workflows and simulation assignments.",
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
