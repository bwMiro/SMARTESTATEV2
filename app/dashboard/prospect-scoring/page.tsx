'use client'

import { useState } from 'react'
import { DashboardNav } from '@/components/dashboard-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Copy, Phone, MessageCircle, TrendingUp, TrendingDown, Minus, AlertCircle, Download } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type ScoreResult = {
  score: 'hot' | 'warm' | 'cold'
  confidence: number
  reasons: string[]
  whatsappMessages: string[]
  callScript: string
}

export default function ProspectScoringPage() {
  const { toast } = useToast()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<ScoreResult | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    timeline: '',
    motivation: '',
    initialMessage: '',
  })

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)

    try {
      const response = await fetch('/api/score-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prospects: [
            {
              name: formData.name,
              budget: parseInt(formData.budget),
              timeline: formData.timeline,
              motivation: formData.motivation,
              initialMessage: formData.initialMessage,
            },
          ],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'analyse')
      }

      if (data.leads && data.leads.length > 0) {
        const lead = data.leads[0]
        const scoreMap: Record<string, 'hot' | 'warm' | 'cold'> = {
          HOT: 'hot',
          WARM: 'warm',
          COLD: 'cold',
        }

        setResult({
          score: scoreMap[lead.score] || 'warm',
          confidence: lead.confidence,
          reasons: Array.isArray(lead.reasons) ? lead.reasons : [],
          whatsappMessages: Array.isArray(lead.whatsappMessages) 
            ? lead.whatsappMessages 
            : [lead.whatsappMessage || ''],
          callScript: lead.callScript || '',
        })

        toast({
          title: 'Analyse terminée !',
          description: 'Le prospect a été qualifié avec succès.',
        })
      }
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible d\'analyser le prospect',
        variant: 'destructive',
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copié !',
      description: `${type} copié dans le presse-papier.`,
    })
  }

  const getScoreIcon = (score: 'hot' | 'warm' | 'cold') => {
    switch (score) {
      case 'hot':
        return <TrendingUp className="h-5 w-5" />
      case 'warm':
        return <Minus className="h-5 w-5" />
      case 'cold':
        return <TrendingDown className="h-5 w-5" />
    }
  }

  const getScoreColor = (score: 'hot' | 'warm' | 'cold') => {
    switch (score) {
      case 'hot':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'warm':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      case 'cold':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    }
  }

  const getScoreLabel = (score: 'hot' | 'warm' | 'cold') => {
    switch (score) {
      case 'hot':
        return 'CHAUD'
      case 'warm':
        return 'TIÈDE'
      case 'cold':
        return 'FROID'
    }
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto p-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Scoring de prospects IA</h1>
            <p className="text-muted-foreground">
              Qualifiez vos prospects et obtenez des messages personnalisés
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <Card>
              <CardHeader>
                <CardTitle>Informations du prospect</CardTitle>
                <CardDescription>
                  Renseignez les détails pour obtenir une analyse complète
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAnalyze} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du prospect *</Label>
                    <Input
                      id="name"
                      placeholder="Jean Dupont"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (€) *</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="300000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Délai d'achat *</Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                      required
                    >
                      <SelectTrigger id="timeline">
                        <SelectValue placeholder="Sélectionner un délai" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immédiat</SelectItem>
                        <SelectItem value="1-3">1 à 3 mois</SelectItem>
                        <SelectItem value="3-6">3 à 6 mois</SelectItem>
                        <SelectItem value="6+">Plus de 6 mois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Motivation d'achat *</Label>
                    <Select
                      value={formData.motivation}
                      onValueChange={(value) => setFormData({ ...formData, motivation: value })}
                      required
                    >
                      <SelectTrigger id="motivation">
                        <SelectValue placeholder="Sélectionner une motivation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="achat-urgent">Achat urgent (déménagement, divorce, etc.)</SelectItem>
                        <SelectItem value="investissement">Investissement locatif</SelectItem>
                        <SelectItem value="residence-principale">Résidence principale</SelectItem>
                        <SelectItem value="residence-secondaire">Résidence secondaire</SelectItem>
                        <SelectItem value="curiosite">Simple curiosité</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="initialMessage">Message initial du prospect *</Label>
                    <Textarea
                      id="initialMessage"
                      placeholder="Copiez ici le message que vous avez reçu du prospect..."
                      rows={5}
                      value={formData.initialMessage}
                      onChange={(e) => setFormData({ ...formData, initialMessage: e.target.value })}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="lg"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Analyse en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Analyser le prospect
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              {!result ? (
                <Card className="h-full">
                  <CardContent className="flex items-center justify-center h-full min-h-[600px]">
                    <div className="text-center text-muted-foreground">
                      <AlertCircle className="h-16 w-16 mx-auto mb-4 opacity-20" />
                      <p className="text-lg mb-2">Aucune analyse effectuée</p>
                      <p className="text-sm">
                        Remplissez le formulaire pour obtenir le scoring du prospect
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Score Card */}
                  <Card className={`border-2 ${getScoreColor(result.score)}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Score du prospect</CardTitle>
                        <Badge variant="secondary">
                          {result.confidence}% de confiance
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`h-16 w-16 rounded-full flex items-center justify-center ${getScoreColor(result.score)}`}>
                          {getScoreIcon(result.score)}
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold">{getScoreLabel(result.score)}</h3>
                          <p className="text-sm text-muted-foreground">
                            {result.score === 'hot' && 'Priorité haute - Contacter immédiatement'}
                            {result.score === 'warm' && 'Priorité moyenne - Relancer sous 24-48h'}
                            {result.score === 'cold' && 'Priorité basse - Qualifier davantage'}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Raisons du score :</h4>
                        <ul className="space-y-2">
                          {result.reasons.map((reason, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-accent mt-0.5">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* WhatsApp Messages */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-accent" />
                        <CardTitle>Messages WhatsApp pré-écrits</CardTitle>
                      </div>
                      <CardDescription>
                        3 messages personnalisés prêts à envoyer
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {result.whatsappMessages.map((message, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Version {index + 1}</Label>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCopy(message, 'Message WhatsApp')}
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              Copier
                            </Button>
                          </div>
                          <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
                            <pre className="whitespace-pre-wrap font-sans">{message}</pre>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Call Script */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-accent" />
                        <CardTitle>Script d'appel téléphonique</CardTitle>
                      </div>
                      <CardDescription>
                        Guide complet pour votre appel
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border border-border bg-muted/30 p-4 max-h-[600px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-xs font-mono leading-relaxed">
                          {result.callScript}
                        </pre>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          variant="outline"
                          onClick={() => handleCopy(result.callScript, 'Script d\'appel')}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copier le script
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
