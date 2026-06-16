"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import DarkModeToggle from "./DarkModeToggle"

const links = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "experience" },
  { href: "/resume", label: "cv" },
]

export default function Navbar() {
  const pathname = usePathname()?.replace(/\/$/, "") || "/"

  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">Youssef Miled</Link>
      <div className="nav-links">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`nav-link${pathname === href ? " is-active" : ""}`}
          >
            {label}
          </Link>
        ))}
        <DarkModeToggle />
      </div>
    </nav>
  )
}
