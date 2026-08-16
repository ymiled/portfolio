import Link from "next/link"

export const metadata = {
  title: "Depth, dependency, and the cost of binary grading",
  description:
    "Verifier-reward RL for theorem proving in Lean 4: a dependency graph reconstructed by necessity, why all-or-nothing grading distorts a compositional difficulty curve, and what it costs to train a 7B prover through the full depth curriculum.",
}

// ---- chart geometry ----------------------------------------------------

const W = 640
const H = 260
const PAD = { l: 40, r: 12, t: 12, b: 26 }
const plotW = W - PAD.l - PAD.r
const plotH = H - PAD.t - PAD.b

function xAt(i: number, n: number) {
  return PAD.l + (i / (n - 1)) * plotW
}
function yAt(v: number, max: number) {
  return PAD.t + plotH - (v / max) * plotH
}
function linePath(values: number[], max: number) {
  return values.map((v, i) => `${i === 0 ? "M" : "L"}${xAt(i, values.length)},${yAt(v, max)}`).join(" ")
}

function GridY({ ticks, max, fmt }: { ticks: number[]; max: number; fmt: (v: number) => string }) {
  return (
    <>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD.l} x2={W - PAD.r} y1={yAt(t, max)} y2={yAt(t, max)} className="chart-grid" />
          <text x={PAD.l - 8} y={yAt(t, max) + 3} textAnchor="end" className="chart-tick">
            {fmt(t)}
          </text>
        </g>
      ))}
      <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + plotH} y2={PAD.t + plotH} className="chart-axis" />
    </>
  )
}

function XLabels({ labels }: { labels: string[] }) {
  return (
    <>
      {labels.map((l, i) => (
        <text key={l} x={xAt(i, labels.length)} y={H - 6} textAnchor="middle" className="chart-tick">
          {l}
        </text>
      ))}
    </>
  )
}

// depth 1-4 decay
const DECAY_DEPTHS = ["depth 1", "depth 2", "depth 3", "depth 4"]
const DECAY_BINARY = [1.0, 0.75, 0.33, 0.0]
const DECAY_TARGET = [1.0, 0.92, 0.73, 0.73]

// per-target score at three curriculum checkpoints, depth 1-5
const PROG_DEPTHS = ["1", "2", "3", "4", "5"]
const PROG_A = [0.688, 0.461, 0.29, 0.137, 0.03] // after (1,2)+(2,3)
const PROG_B = [0.779, 0.527, 0.307, 0.17, 0.041] // after +(3,4)
const PROG_C = [0.753, 0.51, 0.31, 0.171, 0.044] // final

// final checkpoint, pass@1 vs per-target
const FINAL_PASS1 = [0.221, 0, 0, 0, 0]
const FINAL_SCORE = PROG_C

// compositional vs monolithic success rate, depth 1-5
const SWEEP_DEPTHS = ["1", "2", "3", "4", "5"]
const SWEEP_SUPPLIED = [10 / 15, 4 / 9, 12 / 15, 6 / 10, 1 / 1]
const SWEEP_WITHHELD = [10 / 15, 3 / 10, 4 / 15, 2 / 8, 0 / 1]

// mean reward per logged batch, 549 points across three curriculum stages
const REWARD_RAW = [0.24791666666666665, 0.20625, 0.25729166666666664, 0.24687499999999998, 0.22708333333333333, 0.228125, 0.41666666666666663, 0.078125, 0.05520833333333333, 0.3333333333333333, 0.18541666666666665, 0.3125, 0.0, 0.18645833333333334, 0.075, 0.35416666666666663, 0.3083333333333333, 0.24687499999999998, 0.5416666666666666, 0.3645833333333333, 0.24791666666666665, 0.35416666666666663, 0.45625, 0.41666666666666663, 0.41666666666666663, 0.165625, 0.14270833333333333, 0.375, 0.20729166666666665, 0.29166666666666663, 0.2677083333333333, 0.4375, 0.39375, 0.20625, 0.2708333333333333, 0.12291666666666666, 0.29062499999999997, 0.12291666666666666, 0.20729166666666665, 0.12291666666666666, 0.35416666666666663, 0.16666666666666666, 0.29062499999999997, 0.36874999999999997, 0.33125, 0.47916666666666663, 0.32708333333333334, 0.3125, 0.4583333333333333, 0.2895833333333333, 0.165625, 0.22916666666666666, 0.20520833333333333, 0.16354166666666667, 0.228125, 0.25, 0.16041666666666665, 0.125, 0.26875, 0.5416666666666666, 0.32708333333333334, 0.26979166666666665, 0.375, 0.20833333333333331, 0.1875, 0.41666666666666663, 0.29166666666666663, 0.25, 0.5833333333333333, 0.1875, 0.33229166666666665, 0.19895833333333332, 0.16666666666666666, 0.3125, -0.0020833333333333333, 0.47916666666666663, 0.3958333333333333, 0.3083333333333333, 0.41666666666666663, 0.125, 0.3958333333333333, 0.3958333333333333, 0.4375, 0.16666666666666666, 0.20520833333333333, 0.29166666666666663, 0.4583333333333333, 0.6041666666666666, 0.41562499999999997, 0.14583333333333331, 0.18541666666666665, 0.375, 0.25, 0.5833333333333333, 0.33229166666666665, 0.125, 0.41666666666666663, 0.3958333333333333, 0.29166666666666663, 0.41666666666666663, 0.375, 0.2708333333333333, 0.4375, 0.47916666666666663, 0.3520833333333333, 0.375, 0.41562499999999997, 0.29166666666666663, 0.47916666666666663, 0.3125, 0.5208333333333333, 0.3958333333333333, 0.3333333333333333, 0.47916666666666663, 0.3125, 0.47916666666666663, 0.5208333333333333, 0.41666666666666663, 0.375, 0.2708333333333333, 0.41666666666666663, 0.4145833333333333, 0.375, 0.3729166666666666, 0.35312499999999997, 0.35416666666666663, 0.22708333333333333, 0.125, 0.5625, 0.5208333333333333, 0.4375, 0.3333333333333333, 0.41666666666666663, 0.5, 0.3958333333333333, 0.29062499999999997, 0.08229166666666667, 0.3125, 0.41354166666666664, 0.47812499999999997, 0.625, 0.18437499999999998, 0.3333333333333333, 0.5625, 0.39375, 0.6041666666666666, 0.4375, 0.5, 0.6041666666666666, 0.47916666666666663, 0.5416666666666666, 0.3333333333333333, 0.14479166666666665, 0.3333333333333333, 0.3125, 0.39375, 0.5833333333333333, 0.41666666666666663, 0.41666666666666663, 0.3333333333333333, 0.4583333333333333, 0.5770833333333333, 0.3104166666666667, 0.5, 0.5625, 0.625, 0.3958333333333333, 0.4375, 0.5416666666666666, 0.41666666666666663, 0.47916666666666663, 0.47916666666666663, 0.16458333333333333, 0.5208333333333333, 0.3125, 0.5208333333333333, 0.41666666666666663, 0.31145833333333334, 0.5208333333333333, 0.45625, 0.5604166666666667, 0.4375, 0.3958333333333333, 0.16666666666666666, 0.3333333333333333, 0.5, 0.3333333333333333, 0.10208333333333333, 0.6041666666666666, 0.6666666666666666, 0.31145833333333334, 0.29166666666666663, 0.4145833333333333, 0.3333333333333333, 0.4375, 0.16666666666666666, 0.6458333333333333, 0.25, 0.5625, 0.47916666666666663, 0.25, 0.3125, 0.47916666666666663, 0.5, 0.4989583333333333, 0.47916666666666663, 0.2895833333333333, 0.5833333333333333, 0.20833333333333331, 0.375, 0.45729166666666665, 0.4583333333333333, 0.5, 0.6458333333333333, 0.47916666666666663, 0.31145833333333334, 0.41666666666666663, 0.47916666666666663, 0.4375, 0.4583333333333333, 0.4375, 0.3333333333333333, 0.5, 0.6041666666666666, 0.5625, 0.29166666666666663, 0.3333333333333333, 0.6239583333333333, 0.47916666666666663, 0.3958333333333333, 0.3333333333333333, 0.3125, 0.5, 0.43124999999999997, 0.41666666666666663, 0.6041666666666666, 0.31145833333333334, 0.3333333333333333, 0.47916666666666663, 0.4375, 0.47812499999999997, 0.35416666666666663, 0.6458333333333333, 0.16666666666666666, 0.5, 0.5, 0.4375, 0.5833333333333333, 0.6458333333333333, 0.625, 0.21796875, 0.203125, 0.24765625, 0.359375, 0.25, 0.234375, 0.28125, 0.10859375, 0.20078125, 0.109375, -0.0023437500000000003, 0.06015625, 0.234375, 0.1703125, 0.48359375, 0.32734375, 0.34296875, 0.23125, 0.23125, 0.109375, 0.25, 0.12421875, 0.21796875, 0.34375, 0.34296875, 0.2328125, 0.32734375, 0.21875, 0.31171875, 0.21796875, 0.109375, 0.246875, 0.1078125, 0.0625, 0.12265625, 0.109375, 0.20078125, 0.37421875, 0.25, 0.234375, 0.37421875, 0.10703125, 0.359375, 0.375, 0.2140625, 0.24921875, 0.1234375, 0.37421875, 0.20234375, 0.328125, 0.125, 0.25, 0.234375, 0.25, 0.121875, 0.35859375, 0.1046875, 0.23359375, 0.12421875, 0.359375, 0.359375, 0.34296875, 0.24921875, 0.25, 0.234375, 0.23203125, 0.34296875, 0.24921875, 0.37421875, 0.375, 0.2484375, 0.23046875, 0.234375, 0.375, 0.24921875, 0.24921875, 0.359375, 0.359375, 0.375, 0.12421875, 0.125, 0.10546875, 0.2, 0.2328125, 0.23359375, 0.25, 0.1234375, 0.37421875, 0.125, 0.359375, 0.359375, 0.34375, 0.25, 0.234375, 0.25, 0.2484375, 0.359375, 0.24765625, 0.24921875, 0.125, 0.1203125, 0.25, 0.2625, 0.2484375, 0.375, 0.1234375, 0.375, 0.24921875, 0.35859375, 0.375, 0.125, 0.25, 0.25, 0.34375, 0.25, 0.2484375, 0.20234375, 0.1078125, 0.25, 0.25, 0.25, 0.29453125, 0.375, 0.375, 0.23359375, 0.2015625, 0.25, 0.375, 0.23359375, 0.328125, 0.375, 0.5, 0.12265625, 0.359375, 0.375, 0.25, 0.125, 0.2484375, 0.21640625, 0.21875, 0.125, 0.171875, 0.234375, 0.234375, 0.25, 0.234375, 0.25, 0.25, 0.34375, 0.375, 0.125, 0.25, 0.24921875, 0.328125, 0.25, 0.375, 0.359375, 0.25, 0.375, 0.109375, 0.375, 0.5, 0.25, 0.359375, 0.25, 0.375, 0.25, 0.21875, 0.24921875, 0.12421875, 0.375, 0.234375, 0.25, 0.109375, 0.484375, 0.24921875, 0.25, 0.25, 0.375, 0.34375, 0.125, 0.25, 0.25, 0.25, 0.25, 0.24921875, 0.25, 0.25, 0.375, 0.35859375, 0.484375, 0.375, 0.15625, 0.359375, 0.37421875, 0.2328125, 0.125, 0.25, 0.375, 0.0, 0.25, 0.25, 0.3734375, 0.2484375, 0.25, 0.25, 0.25, 0.25, 0.484375, 0.375, 0.4375, 0.25, 0.25, 0.375, 0.24921875, 0.25, 0.5, 0.125, 0.375, 0.24921875, 0.25, 0.25, 0.25, 0.125, 0.24921875, 0.5, 0.234375, 0.359375, 0.25, 0.375, 0.25, 0.21796875, 0.375, 0.2484375, 0.2484375, 0.234375, 0.0, 0.125, 0.125, 0.375, 0.390625, 0.25, 0.375, 0.21875, 0.25, 0.25, 0.296875, 0.2328125, 0.171875, 0.265625, 0.484375, 0.10859375, 0.25, 0.25, 0.25, 0.25, 0.375, 0.359375, 0.34375, 0.375, 0.35859375, 0.24921875, 0.25, 0.2015625, 0.359375, 0.246875, 0.375, 0.140625, 0.25, 0.515625, 0.34375, 0.40625, 0.37421875, 0.24921875, 0.24921875, 0.875, 0.46796875, 0.8875, 0.928125, 1.0125, 0.625, 0.871875, 0.93125, 0.4828125, 0.73359375, 0.25, 0.5, 0.75, 0.359375, 0.696875, 0.8375, 0.8046875, 0.746875, 0.70625, 0.46875, 0.625, 0.5, 1.1156249999999999, 0.54375]

function rollingMean(values: number[], win: number) {
  return values.map((_, i) => {
    const lo = Math.max(0, i - win)
    const hi = Math.min(values.length, i + win + 1)
    const slice = values.slice(lo, hi)
    return slice.reduce((a, b) => a + b, 0) / slice.length
  })
}
const REWARD_SMOOTH = rollingMean(REWARD_RAW, 15)
const REWARD_MAX = Math.max(...REWARD_RAW) * 1.05
const REWARD_MIN = Math.min(0, Math.min(...REWARD_RAW))
function rY(v: number) {
  return PAD.t + plotH - ((v - REWARD_MIN) / (REWARD_MAX - REWARD_MIN)) * plotH
}
function rX(i: number) {
  return PAD.l + (i / (REWARD_RAW.length - 1)) * plotW
}

export default function DepthDependencyBinaryGrading() {
  return (
    <article className="post">
      <p className="post-back">
        <Link href="/blog">← blog</Link>
      </p>

      <header className="post-head">
        <p className="post-meta">2026 · Lean 4 · information-flow security</p>
        <h1 className="post-title">Depth, dependency, and the cost of binary grading</h1>
        <p className="post-standfirst">
          A proof kernel is an unusually truthful reward function: it is either correct or not,
          and there is no way to manipulate the evaluation from the perspective of logic, so the
          reward is not gameable. It seems tempting to assume that the kernel represents the
          entire environment. It doesn&apos;t. The kernel evaluates a candidate; it has no
          information on which problems to solve or how difficult they are. That missing layer is
          what this is about.
        </p>
      </header>

      <div className="post-body">
        <h2>What the kernel doesn&apos;t tell you</h2>
        <p>
          A reinforcement learning algorithm against a proof kernel is a good idea because the
          reward is not a proxy. A unit test will be satisfied by code that satisfies the test and
          nothing more; a proof kernel will not be satisfied by anything that is not a valid proof.
          That is the case for verifier-reward RL as a way around reward hacking.
        </p>
        <p>
          What is left unsaid is the task itself, how difficult it is, and whether the number the
          verifier returns is the number to be optimized. A kernel is a function mapping
          (statement, candidate) to accept/reject. Building an environment on top of it means
          answering all three.
        </p>

        <h2>The corpus</h2>
        <p>
          The corpus is built around a 784-line, <span className="post-code">sorry</span>-free type
          soundness theorem for the Volpano&ndash;Smith&ndash;Irvine information-flow security
          system, extended with{" "}
          <a href="https://github.com/ymiled/type-system-for-noninterference" className="inline-link">
            function calls
          </a>{" "}
          and proven to still satisfy noninterference, in Lean&nbsp;4, whose only non-constructive
          dependencies, per{" "}
          <span className="post-code">#print axioms</span>, are{" "}
          <span className="post-code">propext</span> and{" "}
          <span className="post-code">Quot.sound</span>. Around it, 12 information-flow-control
          theories are generated automatically over a small parameter space, from public agreement
          up to the soundness theorem, plus a synthetic <span className="post-code">noninterference</span>{" "}
          control family used to check that extraction and calibration aren&apos;t an artifact of
          the one proof done by hand. In total: 14 theories, 158 lemmas, 2,607 distinct task
          instances, 158 shapes, where a shape is a (target, withheld set) pair.
        </p>
        <p>
          A lemma&apos;s <strong>depth</strong> is the length of the longest dependency chain
          ending at it: 1 if it depends on nothing else in the theory, otherwise one more than the
          deepest lemma it needs. Reward is kernel acceptance plus an axiom audit, which is not
          redundant with compilation: a lemma can fail to compile for one reason while still being
          declared, with every citation of it still compiling, if the failure is captured by{" "}
          <span className="post-code">sorryAx</span>{" "}
          or an accidental axiom, so no proof is accepted whose axiom set exceeds the family&apos;s
          allowed set.
        </p>

        <h2>Dependencies, measured by necessity</h2>
        <p>
          In Lean&nbsp;4.32 a theorem&apos;s proof term is elaborated asynchronously, and the
          environment does not retain it once the declaration is checked. Every way of
          reconstructing the dependency graph via{" "}
          <span className="post-code">ConstantInfo.value?</span> applied to compiled theorems
          yields <span className="post-code">none</span>, and an extractor built on it would claim
          every theorem is dependency-free.
        </p>
        <p>
          The graph is reconstructed with <em>necessity</em> instead: there is an edge{" "}
          <span className="post-code">T → A</span> if removing <span className="post-code">A</span>{" "}
          from the file breaks <span className="post-code">T</span>&apos;s proof term
          compilation. This is strictly more powerful than parsing proof terms even where that is
          possible, since a name can appear in a proof term without being load-bearing to it.
          Handling rungs in source order lets a full transitive cone of each ancestor be deleted at
          once, and a subsequent transitive reduction removes edges implied by other edges.
        </p>

        <h2>Binary grading distorts a compositional difficulty curve</h2>
        <p>
          All-or-nothing grading of a multi-lemma problem is the obvious choice when using a
          kernel, but a bad one for assessing the difficulty of composition. If a policy proves
          each required lemma of a depth-<em>d</em> task independently with fixed probability{" "}
          <em>q</em>, and the number of required lemmas <em>k</em> grows with <em>d</em>, then
          binary pass rate is <em>q</em><sup>k</sup>, decaying geometrically even when per-lemma
          competence does not decay with depth at all. Per-target score, the fraction of
          required lemmas individually accepted, has expectation <em>q</em>, invariant to{" "}
          <em>k</em>. The kernel had this information the whole time; the binary reward discarded
          it.
        </p>

        <figure className="post-figure">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Binary pass rate versus per-target score across depths 1 to 4">
            <GridY ticks={[0, 0.25, 0.5, 0.75, 1]} max={1} fmt={(v) => v.toFixed(2)} />
            <XLabels labels={DECAY_DEPTHS} />
            <path d={linePath(DECAY_BINARY, 1)} className="chart-line chart-line-a" />
            {DECAY_BINARY.map((v, i) => (
              <circle key={i} cx={xAt(i, 4)} cy={yAt(v, 1)} r={2.5} style={{ fill: "var(--text)" }} />
            ))}
            <path d={linePath(DECAY_TARGET, 1)} className="chart-line chart-line-c" />
            {DECAY_TARGET.map((v, i) => (
              <circle key={i} cx={xAt(i, 4)} cy={yAt(v, 1)} r={2.5} style={{ fill: "var(--accent-soft)" }} />
            ))}
          </svg>
          <figcaption className="post-caption">
            <span className="chart-em">Binary pass rate</span> falls 1.74&times; per depth; per-target
            score, the same responses regraded, falls only 1.12&times;.
          </figcaption>
        </figure>

        <h2>The compositional claim at scale</h2>
        <p>
          If per-target credit really corresponds to policy competence, then supplying the
          dependency cone for a task should help, since the lemmas no longer need to be
          recomputed. For each task between depths 2 and 4, two arms were run:{" "}
          <em>supplied</em>, where the ancestors of the lemma being proved are provided along with
          their correct proofs, and <em>withheld</em>, where they are not. Across depths 2 to 4: 23
          of 35 successes for supplied, 9 of 34 for withheld. Fisher&apos;s exact test gives{" "}
          <em>p</em> = 1.6&times;10<sup>&minus;3</sup> with duplicate removal, and{" "}
          <em>p</em> = 5.2&times;10<sup>&minus;4</sup> without, so the choice of analysis no
          longer changes the conclusion at this sample size.
        </p>

        <figure className="post-figure">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Success rate by depth, compositional versus monolithic">
            <GridY ticks={[0, 0.25, 0.5, 0.75, 1]} max={1} fmt={(v) => v.toFixed(2)} />
            <XLabels labels={SWEEP_DEPTHS} />
            {SWEEP_SUPPLIED.map((v, i) => {
              const gw = plotW / 5
              const bw = gw * 0.28
              const cx = PAD.l + gw * i + gw / 2
              const y = yAt(v, 1)
              return <rect key={i} x={cx - bw - 2} y={y} width={bw} height={PAD.t + plotH - y} className="chart-bar-text" rx={1.5} />
            })}
            {SWEEP_WITHHELD.map((v, i) => {
              const gw = plotW / 5
              const bw = gw * 0.28
              const cx = PAD.l + gw * i + gw / 2
              const y = yAt(v, 1)
              return <rect key={i} x={cx + 2} y={y} width={bw} height={PAD.t + plotH - y} className="chart-bar-accent" rx={1.5} />
            })}
          </svg>
          <figcaption className="post-caption">
            <span className="chart-em">Withheld</span> dependencies against supplied, by depth. Pooled
            over depth &ge;2: 23/35 versus 9/34.
          </figcaption>
        </figure>

        <h2>Why the first training run stalls</h2>
        <p>
          The initial GRPO run on the kernel raised pass@1 from 0.005 to 0.021 within roughly four
          hours, then stopped. GRPO&apos;s advantage is calculated from the variance of the reward{" "}
          <em>inside</em> one set of rollouts from the same prompt; at a 0.5% success rate, the
          probability of getting both successes and failures in an 8-rollout set is low enough that
          96% of such sets give exactly the same reward value, so the advantage is always zero. The
          model was getting a gradient update for only 4% of its samples, and nothing shows up in
          the loss chart, since a flat advantage produces a well-defined, differentiable, and
          entirely uninformative loss.
        </p>
        <p>Five interventions, all aimed at the same quantity, the probability that a sampled group contains two different outcomes, move a run off this floor:</p>
        <ul className="post-list">
          <li>
            <strong>Expert-iteration cold start.</strong> Sample/grade/mine/fine-tune iterations on
            the kernel before GRPO starts, limited to depths 1&ndash;2: a cold policy that
            can&apos;t reach depth-4 problems produces nothing, at the same grading cost as if it
            could solve them.
          </li>
          <li>
            <strong>Per-target credit assignment.</strong> One advantage per graded item in a
            compositional task rather than one scalar per rollout. At group 8, depth 3, this
            is 24 advantages per group instead of 8.
          </li>
          <li>
            <strong>A dynamic, difficulty-ledger-driven sampler.</strong> Prompts are tracked as
            informative, trivial, or hopeless from their observed reward history, with a fixed
            share reserved for prompts the ledger hasn&apos;t seen yet.
          </li>
          <li>
            <strong>Between-stage distillation.</strong> Every kernel-verified proof produced
            during a stage is banked and used for a short supervised pass before the next stage
            begins, free to collect since the rollouts are already graded.
          </li>
          <li>
            <strong>Automatic stall detection with expert-iteration rescue.</strong> When a
            stage&apos;s groups go stale, one expert-iteration round runs at that stage&apos;s
            depths and the stage retries, up to a fixed retry budget.
          </li>
        </ul>

        <figure className="post-figure">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Mean reward per logged batch across the training run">
            <GridY
              ticks={[0, 0.25, 0.5, 0.75, 1].map((f) => REWARD_MIN + f * (REWARD_MAX - REWARD_MIN))}
              max={REWARD_MAX - REWARD_MIN}
              fmt={(v) => v.toFixed(2)}
            />
            <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + plotH} y2={PAD.t + plotH} className="chart-axis" />
            {[0, 137, 274, 411, 548].map((i) => (
              <text key={i} x={rX(i)} y={H - 6} textAnchor="middle" className="chart-tick">
                step {i}
              </text>
            ))}
            <path
              d={REWARD_SMOOTH.map((v, i) => `${i === 0 ? "M" : "L"}${rX(i)},${rY(v)}`).join(" ")}
              className="chart-line chart-line-a"
            />
          </svg>
          <figcaption className="post-caption">
            Rolling mean reward, 549 logged batches, one continuous run across depths (2,3){" "}
            &rarr; (3,4) &rarr; all. The late climb is the final, depth-unconstrained stage.
          </figcaption>
        </figure>

        <h2>Results</h2>
        <p>
          A domain-specialized 7B prover (DeepSeek-Prover-V2-7B), carried through the full
          curriculum (depths (1,2) &rarr; (2,3) &rarr; (3,4) &rarr; all, each stage measured
          by held-out evaluation before the next begins) reaches, on the same{" "}
          <span className="post-code">vsi</span> held-out split:
        </p>

        <div className="post-table-wrap">
          <table className="post-table">
            <thead>
              <tr>
                <th>depth</th>
                <th>tasks</th>
                <th>pass@1</th>
                <th>per-target score</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>48</td><td>0.221</td><td>0.753</td></tr>
              <tr><td>2</td><td>48</td><td>0.000</td><td>0.510</td></tr>
              <tr><td>3</td><td>48</td><td>0.000</td><td>0.310</td></tr>
              <tr><td>4</td><td>48</td><td>0.000</td><td>0.171</td></tr>
              <tr><td>5</td><td>48</td><td>0.000</td><td>0.044</td></tr>
              <tr><td>all</td><td>240</td><td>0.044</td><td>0.358</td></tr>
            </tbody>
          </table>
        </div>

        <p>
          Binary pass@1 is exactly zero at every depth past 1: a curve indistinguishable, on
          its face, from a model that has proven nothing past the easiest tier of the corpus.
          Per-target score decays smoothly instead, a policy visibly and gradually running out of
          ability rather than falling off a cliff at depth 2.
        </p>

        <figure className="post-figure">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Pass@1 versus per-target score at the final checkpoint, depths 1 to 5">
            <GridY ticks={[0, 0.2, 0.4, 0.6, 0.8]} max={0.8} fmt={(v) => v.toFixed(1)} />
            <XLabels labels={["depth 1", "depth 2", "depth 3", "depth 4", "depth 5"]} />
            {FINAL_PASS1.map((v, i) => {
              const gw = plotW / 5
              const bw = gw * 0.28
              const cx = PAD.l + gw * i + gw / 2
              const y = yAt(v, 0.8)
              return <rect key={i} x={cx - bw - 2} y={y} width={bw} height={PAD.t + plotH - y} className="chart-bar-accent" rx={1.5} />
            })}
            {FINAL_SCORE.map((v, i) => {
              const gw = plotW / 5
              const bw = gw * 0.28
              const cx = PAD.l + gw * i + gw / 2
              const y = yAt(v, 0.8)
              return <rect key={i} x={cx + 2} y={y} width={bw} height={PAD.t + plotH - y} className="chart-bar-text" rx={1.5} />
            })}
          </svg>
          <figcaption className="post-caption">
            <span className="chart-em">Pass@1</span> against per-target score, same policy, same
            held-out tasks. Pass@1 reaches zero past depth 1; per-target score never does.
          </figcaption>
        </figure>

        <p>
          Depth-(2,3) trains cleanly once given adequate memory headroom, and the checkpoint after
          it already improves on every metric over the depth-(1,2)-only checkpoint before it. The
          curriculum keeps improving through depth-(3,4) before a small, within-confidence-interval
          dip at the final all-depths stage, read as a plateau: the 95% confidence intervals
          on the pooled score overlap between the two final stages, and 48 tasks per depth at group
          8 still isn&apos;t enough to tell a true plateau from measurement noise at this
          resolution.
        </p>

        <figure className="post-figure">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Per-target score by depth at three curriculum checkpoints">
            <GridY ticks={[0, 0.2, 0.4, 0.6, 0.8]} max={0.8} fmt={(v) => v.toFixed(1)} />
            <XLabels labels={PROG_DEPTHS} />
            <path d={linePath(PROG_A, 0.8)} className="chart-line chart-line-c" />
            <path d={linePath(PROG_B, 0.8)} className="chart-line" stroke="var(--muted)" />
            <path d={linePath(PROG_C, 0.8)} className="chart-line chart-line-a" />
          </svg>
          <figcaption className="post-caption">
            Per-target score by depth after each curriculum stage: depths (1,2)+(2,3), then +(3,4),
            then <span className="chart-em">the final checkpoint</span>, all depths.
          </figcaption>
        </figure>

        <h2>Summary</h2>
        <p>
          An environment for information-flow security verification in Lean&nbsp;4, where the
          difficulty control is a dependency cone obtained via necessity and not an assumption,
          where the reward is kernel acceptance plus an axiom audit, and where the primary
          formalization is machine-verified without <span className="post-code">sorry</span>{" "}
          constructs. First with a hand-curated dataset, then pooling across 134 examples, binary
          assessment of a compositional task skews the difficulty curve it supposedly measures, in a
          way per-target regrading of the same responses fixes. The first attempt to train on this
          reward fails because rollout groups get stuck at a success rate where policy-gradient
          advantage is zero by construction; five interventions fix that, and the full curriculum
          result on a specialized 7B prover follows: pass@1 zero beyond depth 1, per-target
          score a smooth curve through depth 4.
        </p>

        <p className="post-footnote">
          RL environment and training code:{" "}
          <a href="https://github.com/ymiled/lean-proof-environments" className="inline-link">
            lean-proof-environments
          </a>
          . Source type system:{" "}
          <a href="https://github.com/ymiled/type-system-for-noninterference" className="inline-link">
            type-system-for-noninterference
          </a>
          .
        </p>
      </div>
    </article>
  )
}
