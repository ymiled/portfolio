const projects = [
  {
    title: "Proof-Depth Decay: a Lean 4 RL environment for program verification",
    meta: "2026 · Lean 4, GRPO, LoRA",
    description:
      "A reinforcement learning environment where the reward is the Lean kernel: a candidate proof either type-checks or it does not, so the signal cannot be gamed. Difficulty is set by how much of a lemma's dependency cone is withheld, and dependency edges are measured by necessity (removing a candidate parent and seeing the proof fail) rather than declared, since parsing proof terms is impossible in Lean 4 due to asynchronous elaboration. The corpus is a 784-line Volpano–Smith–Irvine information-flow type system written from scratch, no sorry, soundness audited under #print axioms to depend only on propext and Quot.sound: 14 theories, 158 lemmas, 2,607 tasks. All-or-nothing grading distorts the difficulty curve it's meant to measure: binary pass rate decays 1.74x per depth level, but regrading the same responses by how many lemmas individually check decays only 1.12x, a pattern confirmed at scale (p = 1.6×10⁻³, 134 tasks). Training against the corrected reward stalls at first, since 96% of rollouts land on the same reward at 0.5% accuracy and GRPO's advantage is zero by construction, until five interventions (expert-iteration cold start, per-target credit assignment, a difficulty-ledger sampler, between-stage distillation, stall detection with expert-iteration rescue) carry a domain-specialized DeepSeek-Prover-V2-7B through the full depth curriculum: per-target score 0.75 → 0.51 → 0.31 → 0.17 → 0.04 across depths 1–5, while its own pass@1 drops to zero past depth 1.",
    href: "https://github.com/ymiled/lean-proof-environments",
  },
  {
    title: "Small Language Models for Edge AI in Space",
    meta: "2025–2026 · UC Berkeley × Satlyt",
    description:
      "Onboard satellite operations assistant running fully offline on a Jetson Orin Nano. A small language model orchestrates deterministic tools rather than computing anything itself: I built the log summarization and troubleshooting side (severity filtering ahead of inference, TF-IDF retrieval over a failure knowledge base) and the evaluation harness of 10 prompt configurations across 6 quantized models judged on correctness, coverage, and actionability.",
    href: "https://satlyt.ai/",
  },
  {
    title: "Enterprise Nervous System",
    meta: "2025",
    description:
      "Multi-agent incident response using AG2 swarms and MCP: parallel retrieval across logs, GitHub, and Jira producing a schema-validated postmortem in under 19 seconds. The interesting part was the benchmark, which argued against my own design. Against a single-call baseline with an independent judge, aggregate quality was a statistical tie (+0.077, p = 0.26) while the swarm cost roughly 18x the tokens, but it won multi-source CVE incidents (+0.447, p = 0.031) and lost single-source ones. So I trained a logistic-regression router that sends simple incidents down the cheap path. Ablations also killed two of my own components: the critic's rule prompt and the self-correction loop both scored negative.",
    href: "https://github.com/ymiled/enterprise_nervous_system",
  },
  {
    title: "AgentProbe",
    meta: "2025",
    description:
      "A red-teaming framework for AI agent systems: a four-agent adversarial swarm (Recon, Attack, Evaluator, Reporter) that surfaces prompt injection, PII leakage, and policy violations. Hybrid evaluation combines deterministic rules, regex pipelines, and LLM scoring aligned with OWASP LLM risk categories.",
    href: "https://github.com/ymiled/AgentProbe",
  },
  {
    title: "Smooth Cascade Unlearning via Reversed Self-Distillation",
    meta: "2025 · CISPA",
    description:
      "Machine unlearning that escalates in-context → LoRA → full fine-tuning as the cumulative forget set grows, so a stream of deletion requests can be served without retraining from scratch. The finding is that chaining stages leaks: each mechanism displaces a forgotten sample's confidence differently, and that displacement is attackable across a stage transition even when no single stage looks unsafe. Formalized as a paired-score cross-stage extension of the ForgetLiRA attack (AUC 0.5334, +0.0074 excess over the better single-stage audit), then fixed with reversed self-distillation, which aligns only the per-sample forget and retain losses to the previous stage's cached losses: excess falls to about zero with no utility cost. Audited on SST-2, AGNews, and MIT-Movies with OLMo 2 1B and 10 concurrent shadow models on SLURM.",
    href: null,
  },
  {
    title: "Memorization in Autoregressive Image Generators",
    meta: "2025 · CISPA",
    description:
      "Ported UnitMem neuron-level memorization analysis from SSL encoders to the RAR masked-autoregressive generator with a MaskGIT-VQ tokenizer on ImageNet-1k-256, across four scales. Instrumented the transformer forward pass to extract per-layer activations and compute per-unit selectivity: memorization scales with model size, concentrates in early layers (peak ≈ 0.96), and is driven by a small dominant subset of training samples, which I traced back to the exact images behind the top-memorizing units.",
    href: "https://github.com/ymiled/Memorization-analysis-RAR",
  },
  {
    title: "Type System for Secure Information Flow",
    meta: "2023 · OCaml",
    description:
      "The source theory the Lean corpus above formalizes. Started from the Volpano–Smith–Irvine typing rules for a simple imperative language and extended them to function calls, then proved from scratch that the extended system still upholds noninterference: two runs differing only in private data stay indistinguishable on public variables. Implemented in OCaml as an n-ary proof-tree structure over the judgment Γ ⊢ p : τ plus a checker that mechanically verifies a tree really derives what it claims. Functions are the hard case, since a call opens an inbound and an outbound channel at once and the argument restriction has to close both without rejecting everything useful.",
    href: "https://github.com/ymiled/type-system-for-noninterference",
  },
  {
    title: "Removing Clipping Bias in DP-SGD: a critical assessment of DiceSGD",
    meta: "2026 · IEOR 290",
    description:
      "DiceSGD adds an error-feedback residual to drop the clipping-bias constant from the DP-SGD convergence bound while preserving (ε, δ)-differential privacy. I worked through the Rényi and PRV accounting and the Poisson-subsampling amplification argument, reproduced the experiments with Opacus on MNIST and a ViT-small on CIFAR-10, surfaced an unstated two-threshold (C₂ ≥ C₁) sensitivity requirement, and found DiceSGD underperforming DPSGD-GC by up to 19.6 points at clip C = 0.1.",
    href: null,
  },
  {
    title: "Multi-Stage Playlist Continuation System",
    meta: "2026 · IEOR 242B",
    description:
      "Playlist continuation over a 2.26M-track music playlist dataset: implicit-feedback ALS candidate generation, SASRec transformer re-ranking that uses playlist order, then MMR diversity re-ranking. Recall@100 rose from 0.151 to 0.236 and NDCG@10 from 0.018 to 0.046 over the ALS baseline; MMR at λ = 0.5 buys 18% more intra-list diversity for a 4% recall cost. SASRec trained on Modal serverless GPU in BF16, checkpoints served from S3.",
    href: "https://github.com/ymiled/spotify_recommender",
  },
  {
    title: "Data Analysis for Table Tennis Matches",
    meta: "2024 · Centrale Lyon",
    description:
      "Physics-based modeling of table tennis ball trajectories with player data to analyze bounce uncertainty zones and strike timing, feeding player classification and strategy.",
    href: "https://github.com/centralelyon/tt-perf",
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
