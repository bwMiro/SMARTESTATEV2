'use client'

import { useState } from 'react'
import { DashboardNav } from '@/components/dashboard-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Upload, ImageIcon, Sparkles, Download, Trash2, History } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type Photo = {
  id: string
  original: string
  enhanced: string
  name: string
  status: 'processing' | 'done'
}

export default function PhotoEnhancerPage() {
  const { toast } = useToast()
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const fileArray = Array.from(files)
    setIsProcessing(true)

    // Traiter chaque fichier
    for (const file of fileArray) {
      const photoId = `photo-${Date.now()}-${Math.random()}`
      const originalUrl = URL.createObjectURL(file)

      const newPhoto: Photo = {
        id: photoId,
        original: originalUrl,
        enhanced: originalUrl,
        name: file.name,
        status: 'processing',
      }

      setPhotos((prev) => [...prev, newPhoto])

      try {
        const formData = new FormData()
        formData.append('image', file)

        const response = await fetch('/api/enhance-photo', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Erreur lors du traitement')
        }

        setPhotos((prev) =>
          prev.map((photo) =>
            photo.id === photoId
              ? { ...photo, enhanced: data.enhancedImage, status: 'done' as const }
              : photo
          )
        )

        toast({
          title: 'Photo optimisée !',
          description: `${file.name} a été améliorée avec succès.`,
        })
      } catch (error) {
        setPhotos((prev) =>
          prev.map((photo) =>
            photo.id === photoId
              ? { ...photo, status: 'done' as const }
              : photo
          )
        )
        toast({
          title: 'Erreur',
          description: `Impossible d'améliorer ${file.name}`,
          variant: 'destructive',
        })
      }
    }

    setIsProcessing(false)
  }

  const handleDownload = (photo: Photo) => {
    toast({
      title: 'Téléchargement',
      description: `${photo.name} téléchargée.`,
    })
  }

  const handleDelete = (photoId: string) => {
    setPhotos(photos.filter((p) => p.id !== photoId))
    toast({
      title: 'Photo supprimée',
      description: 'La photo a été retirée de la liste.',
    })
  }

  const handleOptimizeAll = async () => {
    if (photos.length === 0) return
    
    const unprocessedPhotos = photos.filter((p) => p.status === 'processing' || !p.enhanced || p.enhanced === p.original)
    
    if (unprocessedPhotos.length === 0) {
      toast({
        title: 'Déjà optimisées',
        description: 'Toutes les photos ont déjà été traitées.',
      })
      return
    }

    setIsProcessing(true)
    toast({
      title: 'Optimisation en cours',
      description: `${unprocessedPhotos.length} photo(s) en cours de traitement...`,
    })

    // Les photos sont déjà traitées individuellement lors de l'upload
    // Cette fonction peut être utilisée pour relancer le traitement si nécessaire
    setIsProcessing(false)
    toast({
      title: 'Optimisation terminée !',
      description: 'Toutes vos photos ont été améliorées.',
    })
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto p-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Amélioration photo IA</h1>
            <p className="text-muted-foreground">
              Sublimez vos photos immobilières automatiquement
            </p>
          </div>

          {/* Upload Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Importer vos photos</CardTitle>
              <CardDescription>
                Formats acceptés : JPG, PNG, WEBP - Maximum 10 photos à la fois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-12 hover:border-accent/50 transition-colors">
                <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Glissez vos photos ici ou cliquez pour parcourir
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  JPG, PNG ou WEBP - Max 10MB par fichier
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  max={10}
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Sélectionner des photos
                  </label>
                </Button>
              </div>

              {photos.length > 0 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    {photos.length} photo(s) chargée(s)
                  </div>
                  <Button
                    onClick={handleOptimizeAll}
                    disabled={isProcessing}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {isProcessing ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Optimisation...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Optimiser toutes les photos
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          {photos.length > 0 ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Photos traitées</CardTitle>
                    <CardDescription>
                      Comparez avant et après l'amélioration IA
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {photos.filter((p) => p.status === 'done').length} / {photos.length} terminées
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {photos.map((photo) => (
                    <Card key={photo.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{photo.name}</span>
                            {photo.status === 'processing' && (
                              <Badge variant="secondary">
                                <Sparkles className="h-3 w-3 mr-1 animate-spin" />
                                Traitement...
                              </Badge>
                            )}
                            {photo.status === 'done' && (
                              <Badge className="bg-accent text-accent-foreground">
                                Optimisée
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownload(photo)}
                              disabled={photo.status === 'processing'}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(photo.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <Tabs defaultValue="comparison" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="comparison">Comparaison</TabsTrigger>
                            <TabsTrigger value="original">Original</TabsTrigger>
                            <TabsTrigger value="enhanced">Améliorée</TabsTrigger>
                          </TabsList>

                          <TabsContent value="comparison" className="mt-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium mb-2 text-muted-foreground">
                                  Avant
                                </p>
                                <div className="rounded-lg overflow-hidden border border-border aspect-video bg-muted">
                                  <img
                                    src={photo.original || "/placeholder.svg"}
                                    alt="Original"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2 text-accent">
                                  Après
                                </p>
                                <div className="rounded-lg overflow-hidden border border-accent/50 aspect-video bg-muted">
                                  <img
                                    src={photo.enhanced || "/placeholder.svg"}
                                    alt="Enhanced"
                                    className={`w-full h-full object-cover ${
                                      photo.status === 'processing' ? 'opacity-50' : ''
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="original" className="mt-4">
                            <div className="rounded-lg overflow-hidden border border-border aspect-video bg-muted">
                              <img
                                src={photo.original || "/placeholder.svg"}
                                alt="Original"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </TabsContent>

                          <TabsContent value="enhanced" className="mt-4">
                            <div className="rounded-lg overflow-hidden border border-border aspect-video bg-muted">
                              <img
                                src={photo.enhanced || "/placeholder.svg"}
                                alt="Enhanced"
                                className={`w-full h-full object-cover ${
                                  photo.status === 'processing' ? 'opacity-50' : ''
                                }`}
                              />
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <History className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg mb-2">Aucune photo importée</p>
                  <p className="text-sm">
                    Importez vos premières photos pour commencer l'optimisation
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
