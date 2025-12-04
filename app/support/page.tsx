import { MarketingLayout } from '@/components/layouts/marketing-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { MessageSquare } from 'lucide-react'

export const metadata = {
  title: 'Support - ESTATE SMART',
  description: 'Centre d\'aide et support ESTATE SMART',
}

export default function SupportPage() {
  return (
    <MarketingLayout>
      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Centre d'aide
            </h1>
            <p className="text-lg text-muted-foreground">
              Nous sommes là pour vous aider
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Questions fréquentes</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Comment générer ma première annonce ?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Rendez-vous dans le module "Générateur d'annonces" depuis votre tableau de bord. 
                  Remplissez les informations sur votre bien (type, surface, quartier, etc.) et cliquez sur "Générer". 
                  L'IA créera automatiquement 3 versions d'annonces adaptées.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Puis-je modifier les annonces générées ?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Oui, toutes les annonces générées sont modifiables. Vous pouvez les ajuster selon vos besoins 
                  avant de les copier ou télécharger.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Comment fonctionne l'amélioration photo ?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Notre IA analyse automatiquement vos photos et améliore la luminosité, les couleurs et la netteté. 
                  Vous pouvez uploader jusqu'à 10 photos simultanément et obtenir un aperçu avant/après en temps réel.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Comment est calculé le score prospect ?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Le score est basé sur plusieurs critères : budget, délai d'achat, motivation et cohérence du message initial. 
                  L'IA analyse ces éléments et attribue un score "chaud", "tiède" ou "froid" pour vous aider à prioriser.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Mes données sont-elles sécurisées ?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Oui, toutes vos données sont chiffrées et stockées de manière sécurisée. Nous sommes conformes au RGPD 
                  et ne partageons jamais vos données avec des tiers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Comment résilier mon abonnement ?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Vous pouvez résilier à tout moment depuis votre page Profil, section "Abonnement". 
                  La résiliation prend effet à la fin de votre période d'abonnement en cours.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <CardTitle>Vous ne trouvez pas votre réponse ?</CardTitle>
                  <CardDescription>Contactez notre équipe support</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" placeholder="Votre nom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="votre@email.fr" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input id="subject" placeholder="Comment pouvons-nous vous aider ?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Décrivez votre problème ou question..."
                    rows={6}
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Envoyer le message
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Vous pouvez aussi nous contacter par email à{' '}
                  <a href="mailto:support@estatesmart.fr" className="text-accent hover:underline">
                    support@estatesmart.fr
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </MarketingLayout>
  )
}
