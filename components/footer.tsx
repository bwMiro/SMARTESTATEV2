import Link from 'next/link'
import { Building2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                ESTATE<span className="text-accent">SMART</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              L'IA qui automatise votre prospection immobilière en France
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produit</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#fonctionnalites" className="text-muted-foreground hover:text-foreground transition-colors">
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#temoignages" className="text-muted-foreground hover:text-foreground transition-colors">
                  Témoignages
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Légal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/legal" className="text-muted-foreground hover:text-foreground transition-colors">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ESTATE SMART. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
