import { NextResponse } from 'next/server'
import { z } from 'zod'

import { auth } from '@/auth'
import { openai } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

const numericField = z
  .union([z.number(), z.string()])
  .transform((value) => Number(value))
  .pipe(z.number().int().positive())

const payloadSchema = z.object({
  propertyType: z.string().min(2),
  surface: numericField,
  rooms: numericField,
  city: z.string().min(2),
  neighborhood: z.string().min(2),
  price: numericField,
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  photos: z.array(z.string().url()).optional(),
})

type ListingAIResult = {
  long: string
  short: string
  social: string
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const json = await request.json()
    const parsed = payloadSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Payload invalide', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.6,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            "Tu es un expert copywriter immobilier français. Tu génères trois versions d'annonce (longue, courte, social media) en respectant le tutoiement ou vouvoiement professionnel et en gardant un ton premium.",
        },
        {
          role: 'user',
          content: `Génère une sortie JSON STRICTE au format {"long":"...","short":"...","social":"..."} à partir de ces données:\n${JSON.stringify(
            data,
            null,
            2
          )}`,
        },
      ],
    })

    const rawContent = completion.choices[0]?.message?.content
    if (!rawContent) {
      throw new Error("Réponse vide de l'IA")
    }

    let aiResult: ListingAIResult
    try {
      aiResult = JSON.parse(rawContent)
    } catch (error) {
      throw new Error("Impossible de parser la sortie de l'IA")
    }

    const saved = await prisma.adGenerationRequest.create({
      data: {
        userId: session.user.id,
        propertyType: data.propertyType,
        surface: data.surface,
        rooms: data.rooms,
        city: data.city,
        neighborhood: data.neighborhood,
        price: data.price,
        description: data.description,
        highlights: data.highlights?.join(', '),
        status: 'COMPLETED',
        versions: aiResult,
      },
    })

    return NextResponse.json({
      requestId: saved.id,
      versions: aiResult,
    })
  } catch (error) {
    console.error('[generate-listing]', error)
    return NextResponse.json(
      {
        error: "Impossible de générer l'annonce",
        details: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 }
    )
  }
}

