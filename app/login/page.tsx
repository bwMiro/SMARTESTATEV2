'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2 } from 'lucide-react'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layouts/marketing-layout'
import { signIn } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: 'Erreur de connexion',
          description: 'Email ou mot de passe incorrect',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Connexion réussie',
          description: 'Redirection vers votre tableau de bord...',
        })
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la connexion',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MarketingLayout>
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="border-2">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <Building2 className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl">Bienvenue sur ESTATE SMART</CardTitle>
                <CardDescription className="mt-2">
                  Connectez-vous pour accéder à votre tableau de bord
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.fr"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-accent hover:underline"
                    >
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Pas encore de compte ?{' '}
                <Link href="/signup" className="text-accent hover:underline font-medium">
                  Créer un compte
                </Link>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-8">
            En vous connectant, vous acceptez nos{' '}
            <Link href="/legal" className="text-accent hover:underline">
              CGU
            </Link>{' '}
            et notre{' '}
            <Link href="/privacy" className="text-accent hover:underline">
              Politique de Confidentialité
            </Link>
          </p>
        </div>
      </main>
    </MarketingLayout>
  )
}
