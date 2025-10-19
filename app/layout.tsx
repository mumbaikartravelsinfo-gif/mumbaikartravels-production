import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mumbaikar Travels - Premium Cab & Travel Services",
  description:
    "Book premium cab services and travel packages in Mumbai. Reliable, comfortable, and affordable transportation solutions.",
  generator: "Mumbaikar Travels",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  icons: {
    icon: [
      { url: '/mumbai-kar-travels-logo.png', sizes: 'any', type: 'image/png' },
    ],
    apple: [
      { url: '/mumbai-kar-travels-logo.png' },
    ],
    shortcut: '/mumbai-kar-travels-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} overflow-x-hidden`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
