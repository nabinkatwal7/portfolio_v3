import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import Navbar from "@/components/ui/Navbar";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nabin Katwal',
  description: 'Hello!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark"/>
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
            <div className="relative">
                <Navbar />
                {children}
            </div>
        </MantineProvider>
      </body>
      </html>
  )
}
