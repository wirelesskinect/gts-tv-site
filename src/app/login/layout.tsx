import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Member Login | GTS TV',
  description: 'Sign in to your GTS TV account to see your TV app login, plan, and expiration date.',
  alternates: { canonical: '/login' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
