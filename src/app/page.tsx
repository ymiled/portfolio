import Image from "next/image"
import TypedRole from "@/components/TypedRole"

const imageBasePath = process.env.NODE_ENV === "production" ? "/portfolio" : ""

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-top">
        <div>
          <h1 className="hero-name">Youssef Miled</h1>
          <p className="hero-role">
            <TypedRole />
          </p>
        </div>
        <Image
          src={`${imageBasePath}/images/my_photo.jpg`}
          alt="Youssef Miled"
          width={96}
          height={96}
          className="hero-photo"
          priority
        />
      </div>

      <div className="prose">
        <p>
          Hi, I&apos;m Youssef. I study Operations Research at UC Berkeley, and I care most
          about the place where mathematics, algorithms, and machine learning meet
          real decisions. Lately that means building AI agents and systems that turn
          messy, unstructured information into something a machine can act on.
        </p>
        <p>
          I was a research intern in the{" "}
          <a href="https://cispa.de" target="_blank" rel="noopener">SprintML lab</a> at
          CISPA Helmholtz Center for Information Security, working on unlearning for
          large language models. Before Berkeley I studied at{" "}
          <a href="https://www.ec-lyon.fr/" target="_blank" rel="noopener">Centrale Lyon</a>,
          and before that in the MP2I/MPI preparatory classes at Lycée Champollion, where I
          built a foundation in pure mathematics, computer science, and physics.
        </p>
        <p>
          I still teach: I run weekly oral exams in mathematics for students preparing for
          France&apos;s Grandes Écoles, and I TA at Berkeley.
        </p>
      </div>

      <div className="tools">
        <p className="eyebrow">Tools I reach for</p>
        <p className="tools-list">
          Python · C / C++ · OCaml · SQL · PyTorch · TypeScript · React · Next.js
        </p>
      </div>

      <div className="social">
        <a href="https://linkedin.com/in/youssef-miled" target="_blank" rel="noopener" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21H9z"/></svg>
        </a>
        <a href="https://github.com/ymiled" target="_blank" rel="noopener" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>
        </a>
        <a href="mailto:youssef_miled@berkeley.edu" aria-label="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
        </a>
      </div>
    </section>
  )
}
