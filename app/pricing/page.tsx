import { MarketingLayout } from '@/components/layouts/marketing-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Tarifs - ESTATE SMART',
  description: 'Choisissez le plan ESTATE SMART qui correspond à vos besoins',
}

export default function PricingPage() {
  return (
    <MarketingLayout>
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tarifs simples et transparents
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tous nos plans incluent un essai gratuit de 14 jours. Aucune carte bancaire requise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <CardDescription>Pour les agents débutants</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold">29€</span>
                  <span className="text-muted-foreground text-lg">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>50 annonces générées par mois</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>100 photos améliorées par mois</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>20 scorings de prospects par mois</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>Historique de 30 jours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>Support par email</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/signup">Commencer l'essai gratuit</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-accent/50 border-2 relative shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground px-4 py-1">Populaire</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>Pour les professionnels actifs</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold">79€</span>
                  <span className="text-muted-foreground text-lg">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span className="font-medium">Annonces illimitées</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span className="font-medium">Photos illimitées</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span className="font-medium">Scorings illimités</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>Historique illimité</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>Support prioritaire</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>Exports avancés</span>
                  </li>
                </ul>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <Link href="/signup">Commencer l'essai gratuit</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Business</CardTitle>
                <CardDescription>Pour les agences immobilières</CardDescription>
                <div className="mt-6">
                  <span className="text-5xl font-bold">199€</span>
                  <span className="text-muted-foreground text-lg">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span className="font-medium">Tout illimité</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span className="font-medium">10 utilisateurs inclus</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>Utilisateurs supplémentaires : 15€/mois</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>Support dédié</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <span>Formation personnalisée</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link href="/signup">Nous contacter</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-20">
            <h2 className="text-3xl font-bold text-center mb-8">Questions fréquentes</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Puis-je changer de plan à tout moment ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oui, vous pouvez upgrader ou downgrader votre abonnement à tout moment. Les changements prennent effet immédiatement.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">L'essai gratuit nécessite-t-il une carte bancaire ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Non, vous pouvez profiter de 14 jours d'essai gratuit sans renseigner de carte bancaire. Aucun engagement.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Que se passe-t-il si je dépasse mes limites ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pour le plan Starter, vous serez notifié lorsque vous approchez de vos limites. Vous pourrez upgrader vers le plan Pro à tout moment pour un usage illimité.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Proposez-vous des réductions pour les associations ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Oui, nous offrons des tarifs préférentiels pour les associations professionnelles. Contactez-nous pour en savoir plus.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </MarketingLayout>
  )
}
