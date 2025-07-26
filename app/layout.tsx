import './globals.css'
import React from 'react'
import { Inter } from 'next/font/google'
import { Navbar1 } from '@/components/ui/navbar'
import ErrorBoundary from '@/components/ErrorBoundary'
import StructuredData from '@/components/StructuredData'
import Script from 'next/script'
import { Toaster } from 'sonner'

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
    url: 'https://dreamfinityx.com/',
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
        
        {/* 处理URL参数的规范链接标签脚本 */}
        <Script id="canonical-control" strategy="beforeInteractive">
          {`
            // 检测URL是否包含参数，如果有就确保规范链接指向无参数版本
            (function() {
              if (window.location.search) {
                var canonicalURL = window.location.origin + window.location.pathname;
                
                // 等待DOM加载完成
                document.addEventListener('DOMContentLoaded', function() {
                  var links = document.querySelectorAll('link[rel="canonical"]');
                  
                  if (links.length > 0) {
                    // 更新已存在的规范链接
                    links[0].href = canonicalURL;
                  } else {
                    // 如果没有规范链接，创建一个
                    var link = document.createElement('link');
                    link.rel = 'canonical';
                    link.href = canonicalURL;
                    document.head.appendChild(link);
                  }
                  
                  // 同时更新og:url元标记
                  var ogUrl = document.querySelector('meta[property="og:url"]');
                  if (ogUrl) {
                    ogUrl.content = canonicalURL;
                  }
                });
              }
            })();
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
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  )
} 