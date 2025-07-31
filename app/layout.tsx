import type React from "react"
import type { Metadata } from "next"
import { Inter, Crimson_Text } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })
const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
})

export const metadata: Metadata = {
  title: "Kotha.blog - Where Stories Come Alive",
  description: "A community-driven blog platform where anyone can share their thoughts and stories.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${crimsonText.variable}`}>
        <Header />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
