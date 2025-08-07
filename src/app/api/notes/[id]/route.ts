import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content } = await request.json()
    
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Título e conteúdo são obrigatórios' },
        { status: 400 }
      )
    }
    
    const note = await prisma.note.update({
      where: { id: params.id },
      data: { title, content }
    })
    
    return NextResponse.json(note)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar nota' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.note.delete({
      where: { id: params.id }
    })
    
    return NextResponse.json({ message: 'Nota deletada com sucesso' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar nota' },
      { status: 500 }
    )
  }
}
