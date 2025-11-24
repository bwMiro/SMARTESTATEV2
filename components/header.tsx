import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Building2 } from 'lucide-react'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              ESTATE<span className="text-accent">SMART</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#fonctionnalites"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Tarifs
            </Link>
            <Link
              href="/#temoignages"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Témoignages
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Connexion</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/signup">Commencer</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
