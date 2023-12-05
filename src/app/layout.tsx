import '@/styles/style.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "kuroco Trip",
  description: "Let's Travel and Enjoy!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  )
}
