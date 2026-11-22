import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout | GTS TV',
  description: 'Complete your GTS TV order.',
  alternates: { canonical: '/pay' },
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
