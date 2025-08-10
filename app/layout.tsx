import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { PollProvider } from "@/contexts/poll-context"
import { PoliticalProvider } from "@/contexts/political-context"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Vote - Democracy Made Digital",
  description: "A secure, transparent, and user-friendly voting platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <PollProvider>
            <PoliticalProvider>
              {children}
              <Toaster position="top-right" richColors />
            </PoliticalProvider>
          </PollProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
