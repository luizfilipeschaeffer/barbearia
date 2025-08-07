import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(notes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar notas' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content } = await request.json()
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Título e conteúdo são obrigatórios' },
        { status: 400 }
      )
    }
    
    const note = await prisma.note.create({
      data: {
        title,
        content
      }
    })
    
    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar nota' },
      { status: 500 }
    )
  }
}
