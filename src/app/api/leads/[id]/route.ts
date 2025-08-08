import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    // Validar se o lead existe
    const existingLead = await prisma.lead.findUnique({
      where: { id }
    });

    if (!existingLead) {
      return NextResponse.json(
        { error: 'Lead não encontrado' },
        { status: 404 }
      );
    }

    // Validar status
    const validStatuses = ['NEW', 'CONTACTED', 'INTERESTED', 'CONVERTED', 'LOST'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Status inválido' },
        { status: 400 }
      );
    }

    // Atualizar o lead
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        status: status || existingLead.status,
        notes: notes || existingLead.notes,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      message: 'Lead atualizado com sucesso',
      lead: {
        id: updatedLead.id,
        name: updatedLead.name,
        email: updatedLead.email,
        type: updatedLead.type,
        status: updatedLead.status,
        notes: updatedLead.notes
      }
    });

  } catch (error) {
    console.error('Erro ao atualizar lead:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validar se o lead existe
    const existingLead = await prisma.lead.findUnique({
      where: { id }
    });

    if (!existingLead) {
      return NextResponse.json(
        { error: 'Lead não encontrado' },
        { status: 404 }
      );
    }

    // Deletar o lead
    await prisma.lead.delete({
      where: { id }
    });

    return NextResponse.json({
      message: 'Lead deletado com sucesso'
    });

  } catch (error) {
    console.error('Erro ao deletar lead:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
