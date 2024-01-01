import type { Metadata } from 'next'
import './globals.css'
import {ThemeProvider} from "@/components/theme-provider";

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
