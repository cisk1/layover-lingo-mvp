import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "./components/language-context"
import { AuthProvider } from "./components/auth-context"
import { BookmarksProvider } from "./components/bookmarks-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LayoverLingo - Learn Local Phrases & Cultural Etiquette",
  description: "A quick reference guide for authentic phrases and local etiquette from around the world",
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
        <LanguageProvider>
          <AuthProvider>
            <BookmarksProvider>{children}</BookmarksProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
