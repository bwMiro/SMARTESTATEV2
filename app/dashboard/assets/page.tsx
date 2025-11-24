import { DashboardNav } from '@/components/dashboard-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { FileText, ImageIcon, MessageSquare, Download, Trash2, Eye, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Mes Assets - ESTATE SMART',
  description: 'Historique de vos annonces, photos et analyses',
}

export default function AssetsPage() {
  // Données d'exemple - en production, ces données viendraient d'une base de données
  const mockAds = [
    {
      id: '1',
      title: 'Appartement 85m² - Le Marais',
      type: 'Appartement',
      createdAt: '2024-01-15',
      versions: 3,
    },
    {
      id: '2',
      title: 'Maison 120m² - Neuilly',
      type: 'Maison',
      createdAt: '2024-01-14',
      versions: 3,
    },
    {
      id: '3',
      title: 'Studio 35m² - Bastille',
      type: 'Studio',
      createdAt: '2024-01-12',
      versions: 3,
    },
  ]

  const mockPhotos = [
    {
      id: '1',
      name: 'salon_appartement_marais.jpg',
      property: 'Appartement Le Marais',
      processedAt: '2024-01-15',
      thumbnail: '/placeholder.svg',
    },
    {
      id: '2',
      name: 'cuisine_moderne.jpg',
      property: 'Maison Neuilly',
      processedAt: '2024-01-14',
      thumbnail: '/placeholder.svg',
    },
    {
      id: '3',
      name: 'chambre_lumineuse.jpg',
      property: 'Studio Bastille',
      processedAt: '2024-01-12',
      thumbnail: '/placeholder.svg',
    },
  ]

  const mockScorings = [
    {
      id: '1',
      prospectName: 'Jean Dupont',
      score: 'hot',
      confidence: 85,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      prospectName: 'Marie Martin',
      score: 'warm',
      confidence: 72,
      createdAt: '2024-01-14',
    },
    {
      id: '3',
      prospectName: 'Pierre Lefebvre',
      score: 'cold',
      confidence: 68,
      createdAt: '2024-01-13',
    },
  ]

  const getScoreBadge = (score: string) => {
    switch (score) {
      case 'hot':
        return <Badge className="bg-green-500">Chaud</Badge>
      case 'warm':
        return <Badge className="bg-orange-500">Tiède</Badge>
      case 'cold':
        return <Badge className="bg-blue-500">Froid</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto p-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mes Assets</h1>
            <p className="text-muted-foreground">
              Retrouvez l'historique de toutes vos créations
            </p>
          </div>

          <Tabs defaultValue="ads" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="ads">
                <FileText className="h-4 w-4 mr-2" />
                Annonces
              </TabsTrigger>
              <TabsTrigger value="photos">
                <ImageIcon className="h-4 w-4 mr-2" />
                Photos
              </TabsTrigger>
              <TabsTrigger value="scorings">
                <MessageSquare className="h-4 w-4 mr-2" />
                Scorings
              </TabsTrigger>
            </TabsList>

            {/* Ads Tab */}
            <TabsContent value="ads" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Annonces générées</CardTitle>
                  <CardDescription>
                    {mockAds.length} annonce(s) créée(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAds.map((ad) => (
                      <div
                        key={ad.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{ad.title}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(ad.createdAt).toLocaleDateString('fr-FR')}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {ad.versions} versions
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Photos améliorées</CardTitle>
                  <CardDescription>
                    {mockPhotos.length} photo(s) traitée(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockPhotos.map((photo) => (
                      <Card key={photo.id} className="overflow-hidden">
                        <div className="aspect-video bg-muted">
                          <img
                            src={photo.thumbnail || "/placeholder.svg"}
                            alt={photo.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-sm mb-1 truncate">
                            {photo.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {photo.property}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                            <Calendar className="h-3 w-3" />
                            {new Date(photo.processedAt).toLocaleDateString('fr-FR')}
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="h-3 w-3 mr-1" />
                              Voir
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Scorings Tab */}
            <TabsContent value="scorings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prospects analysés</CardTitle>
                  <CardDescription>
                    {mockScorings.length} prospect(s) qualifié(s)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockScorings.map((scoring) => (
                      <div
                        key={scoring.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                            <MessageSquare className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{scoring.prospectName}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(scoring.createdAt).toLocaleDateString('fr-FR')}
                              </span>
                              {getScoreBadge(scoring.score)}
                              <Badge variant="secondary" className="text-xs">
                                {scoring.confidence}% confiance
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
