import { NextResponse } from 'next/server'
import { z } from 'zod'

import { auth } from '@/auth'
import { openai } from '@/lib/openai'
import { prisma } from '@/lib/prisma'

const prospectSchema = z.object({
  name: z.string().min(2),
  budget: z.union([z.number(), z.string()]).transform((value) => Number(value)).pipe(z.number().int().positive()),
  timeline: z.string().min(1),
  motivation: z.string().min(1),
  initialMessage: z.string().min(10),
})

const payloadSchema = z.object({
  prospects: z.array(prospectSchema).min(1),
})

type LeadResult = {
  name: string
  score: 'HOT' | 'WARM' | 'COLD'
  confidence: number
  reasons: string[]
  whatsappMessage: string
  callScript: string
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
      temperature: 0.4,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            "Tu es un coach en prospection immobilière. Pour chaque prospect, tu retournes un objet JSON contenant: name, score (HOT|WARM|COLD), confidence (0-100), reasons (array de phrases), whatsappMessage (message court prêt à envoyer) et callScript (script concis). Réponds en JSON strict: {\"leads\":[...]}",
        },
        {
          role: 'user',
          content: `Analyse ces prospects et fournis la structure demandée :\n${JSON.stringify(data.prospects, null, 2)}`,
        },
      ],
    })

    const rawContent = completion.choices[0]?.message?.content
    if (!rawContent) {
      throw new Error("Réponse vide de l'IA")
    }

    let leadsResult: { leads: LeadResult[] }
    try {
      leadsResult = JSON.parse(rawContent)
    } catch (error) {
      throw new Error("Impossible de parser la sortie de l'IA")
    }

    if (!Array.isArray(leadsResult.leads)) {
      throw new Error('Format de réponse invalide')
    }

    const originalProspects = new Map(
      data.prospects.map((prospect) => [prospect.name.toLowerCase(), prospect])
    )

    const savedLeads = await Promise.all(
      leadsResult.leads.map((lead: LeadResult) => {
        const normalizedScore =
          lead.score && ['HOT', 'WARM', 'COLD'].includes(lead.score.toUpperCase())
            ? (lead.score.toUpperCase() as 'HOT' | 'WARM' | 'COLD')
            : 'WARM'

        const original = originalProspects.get(lead.name.toLowerCase())

        return prisma.leadScore.create({
          data: {
            userId: session.user.id,
            prospectName: lead.name,
            budget: original?.budget ?? 0,
            timeline: original?.timeline ?? '',
            motivation: original?.motivation ?? '',
            initialMessage: original?.initialMessage ?? '',
            score: normalizedScore,
            confidence: lead.confidence,
            reasons: lead.reasons,
            whatsappMessages: [lead.whatsappMessage],
            callScript: lead.callScript,
          },
        })
      })
    )

    return NextResponse.json({
      leads: savedLeads.map((lead: Awaited<ReturnType<typeof prisma.leadScore.create>>, index: number) => ({
        id: lead.id,
        name: lead.prospectName,
        score: lead.score,
        confidence: lead.confidence,
        reasons: lead.reasons,
        whatsappMessages: Array.isArray(lead.whatsappMessages) 
          ? lead.whatsappMessages 
          : [leadsResult.leads[index]?.whatsappMessage || ''],
        whatsappMessage: leadsResult.leads[index]?.whatsappMessage,
        callScript: lead.callScript,
      })),
    })
  } catch (error) {
    console.error('[score-leads]', error)
    return NextResponse.json(
      {
        error: 'Impossible de scorer les prospects',
        details: error instanceof Error ? error.message : 'Erreur inconnue',
      },
      { status: 500 }
    )
  }
}

