import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Sundays Wallet',
  description: 'Sundays Wallet',
  generator: 'paulsundays.com',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
