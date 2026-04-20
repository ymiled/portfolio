import Link from "next/link"

export default function Resume() {
  return (
    <main className="page page-centered">
      <h1 className="section-heading">Youssef Miled — CV</h1>
      <div className="download-card">
        <Link
          href="/doc/resume_Youssef_Miled.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="download-link"
        >
          Click here to open my resume
        </Link>
      </div>
    </main>
  )
}
