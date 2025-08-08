import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Popular banco com tipos de assinatura de exemplo
export async function POST() {
  try {
    // Verificar se já existem tipos de assinatura
    const existingTypes = await prisma.subscriptionType.count();
    
    if (existingTypes > 0) {
      return NextResponse.json(
        { message: 'Tipos de assinatura já existem no banco de dados' },
        { status: 200 }
      );
    }

    // Criar tipos de assinatura de exemplo
    const subscriptionTypes = await prisma.subscriptionType.createMany({
      data: [
        {
          name: 'Básico',
          description: 'Plano ideal para barbearias iniciantes',
          allowedUsers: 3,
          allowedBranches: 1,
          isPublished: true
        },
        {
          name: 'Profissional',
          description: 'Plano para barbearias em crescimento',
          allowedUsers: 10,
          allowedBranches: 3,
          isPublished: true
        },
        {
          name: 'Premium',
          description: 'Plano completo para barbearias estabelecidas',
          allowedUsers: 25,
          allowedBranches: 10,
          isPublished: true
        },
        {
          name: 'Sob Encomenda',
          description: 'Plano personalizado para grandes redes',
          allowedUsers: 100,
          allowedBranches: 50,
          isPublished: false
        }
      ]
    });

    return NextResponse.json(
      { 
        message: 'Tipos de assinatura criados com sucesso',
        count: subscriptionTypes.count
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao popular tipos de assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

