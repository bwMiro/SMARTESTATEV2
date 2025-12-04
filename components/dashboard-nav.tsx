'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Building2, FileText, ImageIcon, MessageSquare, FolderOpen, User, HelpCircle, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', icon: Building2, label: 'Tableau de bord' },
    { href: '/dashboard/ad-generator', icon: FileText, label: 'Générateur annonces' },
    { href: '/dashboard/photo-enhancer', icon: ImageIcon, label: 'Amélioration photo' },
    { href: '/dashboard/prospect-scoring', icon: MessageSquare, label: 'Scoring prospects' },
    { href: '/dashboard/assets', icon: FolderOpen, label: 'Mes assets' },
  ]

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            ESTATE<span className="text-accent">smart</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="space-y-1 border-t border-border p-4">
        <Link
          href="/dashboard/profile"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            pathname === '/dashboard/profile'
              ? 'bg-accent/10 text-accent'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <User className="h-4 w-4" />
          Profil
        </Link>
        <Link
          href="/support"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <HelpCircle className="h-4 w-4" />
          Support
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href="/login">
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Link>
        </Button>
      </div>
    </div>
  )
}
