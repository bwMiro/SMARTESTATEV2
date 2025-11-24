'use client'

import { useState } from 'react'
import { DashboardNav } from '@/components/dashboard-nav'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { User, Building2, CreditCard, FileText, CheckCircle2, ArrowRight } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function ProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.fr',
    company: 'Agence Immobilière Dupont',
    phone: '+33 6 12 34 56 78',
  })

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: 'Profil mis à jour',
      description: 'Vos informations ont été enregistrées avec succès.',
    })
  }

  const mockInvoices = [
    { id: '1', date: '2024-01-01', amount: 79, status: 'paid' },
    { id: '2', date: '2023-12-01', amount: 79, status: 'paid' },
    { id: '3', date: '2023-11-01', amount: 79, status: 'paid' },
  ]

  return (
    <div className="flex min-h-screen">
      <DashboardNav />
      
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto p-8 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mon Profil</h1>
            <p className="text-muted-foreground">
              Gérez vos informations personnelles et votre abonnement
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle>Informations personnelles</CardTitle>
                      <CardDescription>
                        Mettez à jour vos informations de compte
                      </CardDescription>
                    </div>
                  </div>
                  {!isEditing && (
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      Modifier
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({ ...profileData, firstName: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({ ...profileData, lastName: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Agence / Société</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) =>
                        setProfileData({ ...profileData, company: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave}>
                        Enregistrer les modifications
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Subscription */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Abonnement</CardTitle>
                    <CardDescription>
                      Gérez votre plan et votre facturation
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Current Plan */}
                  <div className="flex items-center justify-between p-4 border border-accent/20 bg-accent/5 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">Plan Pro</h3>
                        <Badge className="bg-accent text-accent-foreground">Actif</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        79€ / mois - Renouvelé le 15 février 2024
                      </p>
                      <ul className="mt-3 space-y-1">
                        <li className="text-sm flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          Annonces illimitées
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          Photos illimitées
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          Scorings illimités
                        </li>
                      </ul>
                    </div>
                    <div className="text-right space-y-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/pricing">
                          Changer de plan
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                      <br />
                      <Button variant="ghost" size="sm" className="text-destructive">
                        Résilier
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Usage Stats */}
                  <div>
                    <h4 className="font-semibold mb-4">Utilisation ce mois-ci</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="text-2xl font-bold text-accent">12</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Annonces générées
                        </div>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="text-2xl font-bold text-accent">45</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Photos améliorées
                        </div>
                      </div>
                      <div className="text-center p-4 border border-border rounded-lg">
                        <div className="text-2xl font-bold text-accent">8</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Prospects scorés
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Invoices */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Factures</CardTitle>
                    <CardDescription>
                      Téléchargez vos factures précédentes
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            Facture du {new Date(invoice.date).toLocaleDateString('fr-FR')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {invoice.amount}€ - {invoice.status === 'paid' ? 'Payée' : 'En attente'}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Télécharger
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
