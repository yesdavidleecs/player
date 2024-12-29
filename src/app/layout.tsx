import { Providers } from '@/app/providers'
import { Navbar } from './components/Navbar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="max-w-4xl mx-auto p-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
