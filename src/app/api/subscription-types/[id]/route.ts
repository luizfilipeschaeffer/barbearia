import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Buscar tipo de assinatura por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const subscriptionType = await prisma.subscriptionType.findUnique({
      where: { id },
      include: {
        subscriptions: {
          include: {
            barbershop: true
          }
        }
      }
    });

    if (!subscriptionType) {
      return NextResponse.json(
        { error: 'Tipo de assinatura não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(subscriptionType);
  } catch (error) {
    console.error('Erro ao buscar tipo de assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar tipo de assinatura
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, description, allowedUsers, allowedBranches, isPublished } = body;

    // Verificar se o tipo de assinatura existe
    const existingType = await prisma.subscriptionType.findUnique({
      where: { id }
    });

    if (!existingType) {
      return NextResponse.json(
        { error: 'Tipo de assinatura não encontrado' },
        { status: 404 }
      );
    }

    // Validações
    if (name && name.trim() === '') {
      return NextResponse.json(
        { error: 'Nome não pode estar vazio' },
        { status: 400 }
      );
    }

    if (allowedUsers !== undefined && allowedUsers < 1) {
      return NextResponse.json(
        { error: 'Quantidade de usuários deve ser maior que zero' },
        { status: 400 }
      );
    }

    if (allowedBranches !== undefined && allowedBranches < 1) {
      return NextResponse.json(
        { error: 'Quantidade de filiais deve ser maior que zero' },
        { status: 400 }
      );
    }

    const updatedType = await prisma.subscriptionType.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(allowedUsers !== undefined && { allowedUsers }),
        ...(allowedBranches !== undefined && { allowedBranches }),
        ...(isPublished !== undefined && { isPublished })
      }
    });

    return NextResponse.json(updatedType);
  } catch (error) {
    console.error('Erro ao atualizar tipo de assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir tipo de assinatura
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verificar se o tipo de assinatura existe
    const existingType = await prisma.subscriptionType.findUnique({
      where: { id },
      include: {
        subscriptions: true
      }
    });

    if (!existingType) {
      return NextResponse.json(
        { error: 'Tipo de assinatura não encontrado' },
        { status: 404 }
      );
    }

    // Verificar se há assinaturas ativas usando este tipo
    if (existingType.subscriptions.length > 0) {
      return NextResponse.json(
        { error: 'Não é possível excluir um tipo de assinatura que possui assinaturas ativas' },
        { status: 400 }
      );
    }

    await prisma.subscriptionType.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'Tipo de assinatura excluído com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao excluir tipo de assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

