import { ReactNode } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

type MarketingLayoutProps = {
  children: ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

