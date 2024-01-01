import Image from 'next/image'
import ModeToggle from "@/components/ModeToggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
    </main>
  )
}
