import Link from "next/link"
import DarkModeToggle from "./DarkModeToggle"

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link href="/" className="nav-link">Home</Link></li>
        <li><Link href="/projects" className="nav-link">Projects</Link></li>
        <li><Link href="/experience" className="nav-link">Experience</Link></li>
        <li><Link href="/resume" className="nav-link">CV</Link></li>
        <li><DarkModeToggle /></li>
      </ul>
    </nav>
  )
}
