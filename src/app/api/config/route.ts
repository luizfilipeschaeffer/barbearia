import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key) {
      const config = await prisma.systemConfig.findUnique({
        where: { key },
      });
      return NextResponse.json(config);
    }

    const configs = await prisma.systemConfig.findMany({
      orderBy: { key: 'asc' },
    });

    return NextResponse.json(configs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key, value, description } = await request.json();

    const existingConfig = await prisma.systemConfig.findUnique({
      where: { key },
    });

    if (existingConfig) {
      // Atualizar configuração existente
      const config = await prisma.systemConfig.update({
        where: { key },
        data: { value, description },
      });
      return NextResponse.json(config);
    } else {
      // Criar nova configuração
      const config = await prisma.systemConfig.create({
        data: { key, value, description },
      });
      return NextResponse.json(config);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
