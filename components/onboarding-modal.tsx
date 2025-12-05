'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, ImageIcon, MessageSquare, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function OnboardingModal() {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-accent" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Bienvenue chez ESTATE SMART !
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Choisissez un module pour commencer à automatiser votre prospection immobilière
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
        <Card className="hover:border-accent/50 transition-colors cursor-pointer">
            <Link href="/dashboard/ad-generator" onClick={() => setOpen(false)}>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Générateur d'annonces</CardTitle>
                <CardDescription>
                  Créez des descriptions professionnelles en 3 versions
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:border-accent/50 transition-colors cursor-pointer">
            <Link href="/dashboard/photo-enhancer" onClick={() => setOpen(false)}>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <ImageIcon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Amélioration photo</CardTitle>
                <CardDescription>
                  Sublimez vos photos avec l'IA
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:border-accent/50 transition-colors cursor-pointer">
            <Link href="/dashboard/prospect-scoring" onClick={() => setOpen(false)}>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <MessageSquare className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-lg">Scoring prospects</CardTitle>
                <CardDescription>
                  Qualifiez et contactez intelligemment
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>

        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Je découvrirai plus tard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
