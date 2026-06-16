"use client"

import { useEffect, useState } from "react"

const LINES = [
  "Operations Research grad student at UC Berkeley.",
  "Working on AI agents and applied machine learning.",
]

const TYPE_MS = 38
const DELETE_MS = 25
const HOLD_MS = 2200
const GAP_MS = 400

export default function TypedRole() {
  const [text, setText] = useState("")

  useEffect(() => {
    let line = 0
    let count = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const full = LINES[line]

      if (!deleting) {
        count++
        setText(full.slice(0, count))
        if (count === full.length) {
          deleting = true
          timer = setTimeout(tick, HOLD_MS)
        } else {
          timer = setTimeout(tick, TYPE_MS)
        }
      } else {
        count--
        setText(full.slice(0, count))
        if (count === 0) {
          deleting = false
          line = (line + 1) % LINES.length
          timer = setTimeout(tick, GAP_MS)
        } else {
          timer = setTimeout(tick, DELETE_MS)
        }
      }
    }

    timer = setTimeout(tick, TYPE_MS)
    return () => clearTimeout(timer)
  }, [])

  return (
    <span aria-label={LINES.join(" ")}>
      {text}
      <span className="type-caret" aria-hidden="true" />
    </span>
  )
}
