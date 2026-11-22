import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Your Account | GTS TV',
  description: 'Create a GTS TV account to start a free 24-hour trial or choose a monthly, annual, or lifetime plan.',
  alternates: { canonical: '/signup' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
