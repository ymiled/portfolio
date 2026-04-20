'use client'

import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

export default function TypedText() {
  const el = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'an Operations Research graduate student',
        'an ML systems builder',
        'an AI and optimization enthusiast',
      ],
      loop: true,
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 1500,
      cursorChar: '|',
    })
    return () => typed.destroy()
  }, [])

  return <span ref={el} />
}
