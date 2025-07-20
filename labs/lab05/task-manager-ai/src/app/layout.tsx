import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Task Manager',
  description: 'A smart task management application with AI suggestions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {children}
      </body>
    </html>
  )
}