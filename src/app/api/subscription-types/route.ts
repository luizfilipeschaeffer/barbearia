import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Listar todos os tipos de assinatura
export async function GET() {
  try {
    const subscriptionTypes = await prisma.subscriptionType.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(subscriptionTypes);
  } catch (error) {
    console.error('Erro ao buscar tipos de assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar novo tipo de assinatura
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, allowedUsers, allowedBranches, isPublished = false } = body;

    // Validações
    if (!name || !allowedUsers || !allowedBranches) {
      return NextResponse.json(
        { error: 'Nome, usuários permitidos e filiais permitidas são obrigatórios' },
        { status: 400 }
      );
    }

    if (allowedUsers < 1 || allowedBranches < 1) {
      return NextResponse.json(
        { error: 'Quantidade de usuários e filiais deve ser maior que zero' },
        { status: 400 }
      );
    }

    const subscriptionType = await prisma.subscriptionType.create({
      data: {
        name,
        description,
        allowedUsers,
        allowedBranches,
        isPublished
      }
    });

    return NextResponse.json(subscriptionType, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar tipo de assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

