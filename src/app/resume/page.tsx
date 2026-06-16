import Link from "next/link"

export default function Resume() {
  return (
    <section>
      <header className="page-head">
        <h1 className="page-title">Curriculum Vitae</h1>
        <p className="page-sub">A one-page summary of my background and work.</p>
      </header>

      <p className="resume-line">
        <Link
          href="/doc/resume_Youssef_Miled.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-link"
        >
          Open my CV (PDF)
        </Link>
        <span className="arrow">↗</span>
      </p>
    </section>
  )
}
