import OpenAI from 'openai'
import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import { openai } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('image')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Aucune image fournie (champ "image")' }, { status: 400 })
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "Le fichier d'image est vide" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const originalDataUrl = `data:${file.type || 'image/jpeg'};base64,${buffer.toString('base64')}`

    const openAiFile = await OpenAI.toFile(buffer, file.name || 'photo.jpg')

    const edit = await openai.images.edit({
      image: openAiFile,
      prompt:
        "Améliore cette photo immobilière : corrige la luminosité, les couleurs et la netteté tout en conservant un rendu naturel et réaliste.",
      size: '1024x1024',
      n: 1,
    })

    const enhancedBase64 = edit.data[0]?.b64_json

    if (!enhancedBase64) {
      throw new Error("La génération d'image a échoué")
    }

    const enhancedDataUrl = `data:image/png;base64,${enhancedBase64}`

    const saved = await prisma.photoEnhancementJob.create({
      data: {
        userId: session.user.id,
        originalName: file.name || 'photo',
        status: 'COMPLETED',
        originalUrl: originalDataUrl,
        enhancedUrl: enhancedDataUrl,
        notes: 'Traitement automatique via OpenAI',
      },
    })

    return NextResponse.json({
      jobId: saved.id,
      enhancedImage: enhancedDataUrl,
    })
  } catch (error) {
    console.error('[enhance-photo]', error)
    return NextResponse.json(
      {
        error: 'Impossible d’améliorer la photo',
        details: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 }
    )
  }
}

