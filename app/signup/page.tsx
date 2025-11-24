'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { MarketingLayout } from '@/components/layouts/marketing-layout'
import { useToast } from '@/hooks/use-toast'
import { signIn } from 'next-auth/react'

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Erreur',
        description: 'Les mots de passe ne correspondent pas',
        variant: 'destructive',
      })
      return
    }

    if (formData.password.length < 8) {
      toast({
        title: 'Erreur',
        description: 'Le mot de passe doit contenir au moins 8 caractères',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          company: formData.company || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création du compte')
      }

      toast({
        title: 'Compte créé avec succès !',
        description: 'Connexion en cours...',
      })

      // Connecter automatiquement l'utilisateur
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        router.push('/login')
        toast({
          title: 'Compte créé',
          description: 'Veuillez vous connecter avec vos identifiants',
        })
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MarketingLayout>
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Form Column */}
            <Card className="border-2">
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <Building2 className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl">Créer votre compte</CardTitle>
                  <CardDescription className="mt-2">
                    Commencez votre essai gratuit de 14 jours
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Jean"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Dupont"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email professionnel</Label>
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
                    <Label htmlFor="company">Agence / Société</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Nom de votre agence"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum 8 caractères
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                    {isLoading ? 'Création du compte...' : 'Créer mon compte gratuitement'}
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Vous avez déjà un compte ?{' '}
                  <Link href="/login" className="text-accent hover:underline font-medium">
                    Se connecter
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Column */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Pourquoi ESTATE SMART ?</h2>
                <p className="text-muted-foreground">
                  Rejoignez des centaines d'agents qui automatisent leur prospection
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="shrink-0">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Essai gratuit de 14 jours</h3>
                    <p className="text-sm text-muted-foreground">
                      Testez toutes les fonctionnalités sans carte bancaire
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="shrink-0">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Gagnez des heures chaque jour</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatisez la création d'annonces, l'optimisation de photos et la qualification de prospects
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="shrink-0">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">IA spécialisée immobilier</h3>
                    <p className="text-sm text-muted-foreground">
                      Technologie conçue spécifiquement pour le marché français
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="shrink-0">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Support en français</h3>
                    <p className="text-sm text-muted-foreground">
                      Notre équipe vous accompagne dans votre réussite
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="shrink-0">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Sans engagement</h3>
                    <p className="text-sm text-muted-foreground">
                      Résiliez à tout moment, aucun engagement de durée
                    </p>
                  </div>
                </div>
              </div>

              <Card className="bg-muted/30 border-accent/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent/10 shrink-0" />
                    <div>
                      <p className="text-sm leading-relaxed italic">
                        "ESTATE SMART m'a permis de doubler mon nombre d'annonces publiées tout en gardant une qualité professionnelle. Un vrai gain de temps !"
                      </p>
                      <p className="text-sm font-semibold mt-2">Sophie M.</p>
                      <p className="text-xs text-muted-foreground">Agent immobilier, Paris</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
            En créant un compte, vous acceptez nos{' '}
            <Link href="/legal" className="text-accent hover:underline">
              Conditions Générales d'Utilisation
            </Link>{' '}
            et notre{' '}
            <Link href="/privacy" className="text-accent hover:underline">
              Politique de Confidentialité
            </Link>
            . Aucune carte bancaire n'est requise pendant la période d'essai.
          </p>
        </div>
      </main>
    </MarketingLayout>
  )
}
