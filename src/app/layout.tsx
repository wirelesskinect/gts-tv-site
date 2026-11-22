import type { Metadata, Viewport } from 'next'
import './globals.css'
import './theme-light.css'
import Script from 'next/script'
import { SiteHeader, SiteFooter } from '@/components/SiteChrome'

export const metadata: Metadata = {
  title: 'GTS TV — Your screen. Your way.',
  description: 'Live sports, TV, and movies. Stream anywhere in the USA on any device. Start with a free 24-hour trial.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  // Link previews in texts, Facebook, etc.
  metadataBase: new URL('https://gtstv.live'),
  openGraph: {
    type: 'website',
    siteName: 'GTS TV',
    title: 'GTS TV — Your screen. Your way.',
    description: 'Live sports, TV, and movies. Stream anywhere in the USA on any device. Start with a free 24-hour trial.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'GTS TV — Make tonight a GTS TV night', type: 'image/jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTS TV — Your screen. Your way.',
    description: 'Live sports, TV, and movies. Stream anywhere in the USA on any device. Start with a free 24-hour trial.',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0c',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply the saved light/dark choice before the page paints */}
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('gts-theme')==='light')document.documentElement.setAttribute('data-theme','light')}catch(e){}" }} />
      </head>
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <SiteHeader />
          <main style={{ flex: 1 }}>{children}</main>
          <SiteFooter />
        </div>
        <Script src="/theme.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
