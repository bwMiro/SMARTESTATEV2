import { DashboardNav } from '@/components/dashboard-nav'
import { OnboardingModal } from '@/components/onboarding-modal'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, ImageIcon, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Tableau de bord - ESTATE SMART',
  description: 'Votre tableau de bord ESTATE SMART',
}

export default function DashboardPage() {
  // Simuler une première connexion - en production, cela viendrait d'une vérification serveur
  const isFirstLogin = true

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      
      <main className="flex-1 overflow-y-auto bg-background">
        {isFirstLogin && <OnboardingModal />}
        
        <div className="container mx-auto p-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Bienvenue sur votre espace ESTATE SMART
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Annonces générées</CardDescription>
                <CardTitle className="text-3xl">0</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent">+0%</span> ce mois
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Photos améliorées</CardDescription>
                <CardTitle className="text-3xl">0</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent">+0%</span> ce mois
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Prospects scorés</CardDescription>
                <CardTitle className="text-3xl">0</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  <span className="text-accent">+0%</span> ce mois
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Temps gagné</CardDescription>
                <CardTitle className="text-3xl">0h</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Ce mois-ci
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:border-accent/50 transition-all group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Créer une annonce</CardTitle>
                  <CardDescription>
                    Générez une annonce professionnelle en 3 versions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/dashboard/ad-generator">
                      Commencer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:border-accent/50 transition-all group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                    <ImageIcon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Améliorer des photos</CardTitle>
                  <CardDescription>
                    Optimisez vos photos immobilières avec l'IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/dashboard/photo-enhancer">
                      Commencer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:border-accent/50 transition-all group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Scorer un prospect</CardTitle>
                  <CardDescription>
                    Qualifiez et obtenez des messages personnalisés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/dashboard/prospect-scoring">
                      Commencer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="text-lg mb-2">Aucune activité pour le moment</p>
                  <p className="text-sm">
                    Commencez à utiliser ESTATE SMART pour voir votre activité ici
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
