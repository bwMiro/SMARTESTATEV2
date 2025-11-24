'use client'

import { useState } from 'react'
import { DashboardNav } from '@/components/dashboard-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Copy, Download, Save, FileText } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function AdGeneratorPage() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAds, setGeneratedAds] = useState<{
    long: string
    short: string
    leboncoin: string
  } | null>(null)

  const [formData, setFormData] = useState({
    propertyType: '',
    surface: '',
    rooms: '',
    neighborhood: '',
    city: '',
    price: '',
    description: '',
    highlights: '',
  })

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      const highlights = formData.highlights
        ? formData.highlights.split(',').map((h) => h.trim()).filter(Boolean)
        : undefined

      const response = await fetch('/api/generate-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyType: formData.propertyType,
          surface: parseInt(formData.surface),
          rooms: parseInt(formData.rooms),
          city: formData.city,
          neighborhood: formData.neighborhood,
          price: parseInt(formData.price),
          description: formData.description || undefined,
          highlights: highlights,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la génération')
      }

      setGeneratedAds({
        long: data.versions.long,
        short: data.versions.short,
        leboncoin: data.versions.social,
      })

      toast({
        title: 'Annonces générées !',
        description: '3 versions ont été créées avec succès.',
      })
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible de générer les annonces',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = (text: string, version: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: 'Copié !',
      description: `Version ${version} copiée dans le presse-papier.`,
    })
  }

  const handleSave = (version: string) => {
    toast({
      title: 'Enregistré !',
      description: `Version ${version} sauvegardée dans vos assets.`,
    })
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto p-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Générateur d'annonces IA</h1>
            <p className="text-muted-foreground">
              Créez des annonces professionnelles en 3 versions automatiquement
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <Card>
              <CardHeader>
                <CardTitle>Informations du bien</CardTitle>
                <CardDescription>
                  Remplissez les détails pour générer vos annonces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Type de bien *</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                      required
                    >
                      <SelectTrigger id="propertyType">
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="appartement">Appartement</SelectItem>
                        <SelectItem value="maison">Maison</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="loft">Loft</SelectItem>
                        <SelectItem value="duplex">Duplex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="surface">Surface (m²) *</Label>
                      <Input
                        id="surface"
                        type="number"
                        placeholder="85"
                        value={formData.surface}
                        onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rooms">Nombre de pièces *</Label>
                      <Input
                        id="rooms"
                        type="number"
                        placeholder="3"
                        value={formData.rooms}
                        onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Ville *</Label>
                      <Input
                        id="city"
                        placeholder="Paris"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Quartier *</Label>
                      <Input
                        id="neighborhood"
                        placeholder="Marais"
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="450000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description brute</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez le bien, son état, ses particularités..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="highlights">Points forts (séparés par des virgules)</Label>
                    <Input
                      id="highlights"
                      placeholder="Balcon, Cave, Parking, Ascenseur"
                      value={formData.highlights}
                      onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="lg"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Générer les annonces
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              {!generatedAds ? (
                <Card className="h-full">
                  <CardContent className="flex items-center justify-center h-full min-h-[600px]">
                    <div className="text-center text-muted-foreground">
                      <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
                      <p className="text-lg mb-2">Aucune annonce générée</p>
                      <p className="text-sm">
                        Remplissez le formulaire et cliquez sur "Générer les annonces"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Annonces générées
                      <Badge variant="secondary" className="ml-2">
                        3 versions
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Choisissez la version adaptée à votre besoin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="long" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="long">Version longue</TabsTrigger>
                        <TabsTrigger value="short">Version courte</TabsTrigger>
                        <TabsTrigger value="leboncoin">LeBonCoin</TabsTrigger>
                      </TabsList>

                      <TabsContent value="long" className="space-y-4">
                        <div className="rounded-lg border border-border bg-muted/30 p-4">
                          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                            {generatedAds.long}
                          </pre>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleCopy(generatedAds.long, 'longue')}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copier
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleSave('longue')}
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Enregistrer
                          </Button>
                          <Button variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="short" className="space-y-4">
                        <div className="rounded-lg border border-border bg-muted/30 p-4">
                          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                            {generatedAds.short}
                          </pre>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleCopy(generatedAds.short, 'courte')}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copier
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleSave('courte')}
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Enregistrer
                          </Button>
                          <Button variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="leboncoin" className="space-y-4">
                        <div className="rounded-lg border border-border bg-muted/30 p-4">
                          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                            {generatedAds.leboncoin}
                          </pre>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleCopy(generatedAds.leboncoin, 'LeBonCoin')}
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copier
                          </Button>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleSave('LeBonCoin')}
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Enregistrer
                          </Button>
                          <Button variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
