import Link from "next/link"

const posts = [
  {
    slug: "depth-dependency-binary-grading",
    title: "Depth, dependency, and the cost of binary grading",
    meta: "2026 · Lean 4",
    blurb:
      "Verifier-reward RL for theorem proving: a dependency graph reconstructed by necessity, why all-or-nothing grading distorts a compositional difficulty curve, and what it costs to train a 7B prover through the full depth curriculum.",
  },
  {
    slug: "smooth-cascade-unlearning",
    title: "Unlearning is a sequence",
    meta: "2025 · CISPA",
    blurb:
      "What happens to privacy when a model provider switches unlearning mechanism mid-stream. The cross-stage leak, how we measured it, and the alignment objective that removes it.",
  },
]

export default function Blog() {
  return (
    <section>
      <header className="page-head">
        <h1 className="page-title">Blog</h1>
        <p className="page-sub">Notes on things I have worked on, most recent first.</p>
      </header>

      <div className="entries">
        {posts.map((post) => (
          <article key={post.slug} className="entry">
            <div className="entry-meta">{post.meta}</div>
            <div>
              <h2 className="entry-title">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="entry-desc">{post.blurb}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
