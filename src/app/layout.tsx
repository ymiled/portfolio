import Navbar from "@/components/Navbar"
import { ThemeProvider } from "@/components/ThemeProvider"
import type { Metadata } from "next"
import { Newsreader } from "next/font/google"
import "./globals.css"

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Youssef Miled",
  description:
    "Youssef Miled — Operations Research graduate student at UC Berkeley working on machine learning, optimization, and AI agents.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={serif.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="content">{children}</main>
          <footer className="site-footer">
            <span>Youssef Miled</span>
            <span>Berkeley, CA</span>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
