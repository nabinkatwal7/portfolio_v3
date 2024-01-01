import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nabin Katwal',
  description: 'Get to know me!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
