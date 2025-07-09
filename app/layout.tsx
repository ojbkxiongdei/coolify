import './globals.css'
import React from 'react'
import { Inter } from 'next/font/google'
import { Navbar1 } from '@/components/ui/navbar'
import ErrorBoundary from '@/components/ErrorBoundary'
import StructuredData from '@/components/StructuredData'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://dreamfinityx.com'),
  title: 'DreamfinityX - AI Creative Platform',
  description: 'Professional AI platform for text and image generation. Create stunning visuals from text descriptions, edit images with AI, and unleash your creativity.',
  keywords: 'AI image generation, AI text generation, image editing, creative tools, AIGC, artificial intelligence, creative platform',
  robots: 'index, follow',
  openGraph: {
    title: 'DreamfinityX - AI Creative Platform',
    description: 'Professional AI platform for text and image generation and editing',
    type: 'website',
    locale: 'en_US',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ]
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-091QZWWQXS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-091QZWWQXS');
          `}
        </Script>
        
        {/* Structured Data */}
        <StructuredData type="website" />
        <StructuredData type="software" />
        <StructuredData type="service" />
        <StructuredData type="faq" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <Navbar1 />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
} 