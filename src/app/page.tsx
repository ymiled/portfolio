import TypedText from '@/components/TypedText'
import Image from 'next/image'

export default function Home() {
  return (
    <section className="hero-section">
      <div className="container-typewriter">
        <h1 className="hero-name">Youssef Miled</h1>
        <p className="hero-tagline">I'm <TypedText /></p>
      </div>

      <div className="container-me">
        <p className="hero-bio">
          Hi, I'm Youssef, a Master's student in Operations Research at UC Berkeley, with a deep passion
          for mathematics and computer science. I was previously a research intern in the SprintML lab at{' '}
          <a href="https://cispa.de" target="_blank" rel="noopener">
            CISPA Helmholtz Center for Information Security
          </a>. Throughout my academic and research experiences, I've cultivated skills in pure mathematics,
          algorithms, programming, and machine learning. I am interested in building AI agents, machine learning
          systems, and automation tools for real-world decision-making.
          <br /><br />
          I was previously a student at{' '}
          <a href="https://www.ec-lyon.fr/" target="_blank" rel="noopener">
            Centrale Lyon
          </a>
          , and in the MP2I/MPI preparatory classes at Lycée Champollion (a program designed to prepare students
          for the entrance to the top French 'Grandes Ecoles') where I developed a strong foundation in
          pure mathematics, computer science, and physics.
        </p>
        <Image
          src="/images/my_photo.jpg"
          alt="Youssef Miled"
          width={210}
          height={310}
          className="hero-photo"
        />
      </div>

      <div className="programming-languages">
        <h3>My skills</h3>
        <div className="skills-grid">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg" alt="C" className="skill-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" alt="C++" className="skill-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" className="skill-logo" />
          <Image src="/images/ocaml_logo.webp" alt="OCaml" width={40} height={40} className="skill-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png" alt="SQL" className="skill-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/fr/2/2e/Java_Logo.svg" alt="Java" className="skill-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png" alt="Matlab" className="skill-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" className="skill-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="HTML" className="skill-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS" className="skill-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" className="skill-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" className="skill-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="skill-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" alt="Next.js" className="skill-logo" />
        </div>
      </div>

      <div className="social-icons">
        <a href="https://linkedin.com/in/youssef-miled" target="_blank" rel="noopener" className="social-link">
          <i className="fab fa-linkedin" />
        </a>
        <a href="https://github.com/ymiled" target="_blank" rel="noopener" className="social-link">
          <i className="fab fa-github" />
        </a>
        <a href="mailto:youssef_miled@berkeley.edu" className="social-link">
          <i className="fas fa-envelope" />
        </a>
      </div>
    </section>
  )
}
