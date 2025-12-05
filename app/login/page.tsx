'use client'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-bold">Page de connexion temporaire</h1>
        <p className="text-muted-foreground">
          Le déploiement est en cours de stabilisation. Cette page est un placeholder.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent/10"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  )
}
