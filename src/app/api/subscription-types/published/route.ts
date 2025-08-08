import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Listar apenas tipos de assinatura publicados
export async function GET() {
  try {
    const publishedSubscriptionTypes = await prisma.subscriptionType.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(publishedSubscriptionTypes);
  } catch (error) {
    console.error('Erro ao buscar tipos de assinatura publicados:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

