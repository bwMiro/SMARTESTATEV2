'use client'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function LoginPage() {
  const params = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const callbackUrl = params?.get('callbackUrl') || '/dashboard'

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl,
    })

    // Avec redirect: true, NextAuth gère la redirection.
    // Si une erreur survient, NextAuth redirigera vers /api/auth/error
    // que l'on pourra gérer plus tard.
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-center">Connexion</h1>

        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="vous@email.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black text-white py-2 text-sm font-medium hover:bg-black/90 disabled:opacity-60"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Pas encore de compte ?{' '}
          <Link href="/signup" className="text-accent hover:underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  )
}
