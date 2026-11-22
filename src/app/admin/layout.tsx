import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | GTS TV',
  description: 'GTS TV admin.',
  alternates: { canonical: '/admin' },
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
