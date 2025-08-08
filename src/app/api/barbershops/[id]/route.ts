import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const barbershop = await prisma.barbershop.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(barbershop);
  } catch {
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

    // Verificar se há usuários associados
    const usersCount = await prisma.user.count({
      where: { barbershopId: id },
    });

    if (usersCount > 0) {
      return NextResponse.json(
        { error: 'Não é possível excluir uma barbearia que possui funcionários associados' },
        { status: 400 }
      );
    }

    await prisma.barbershop.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Barbearia excluída com sucesso' });
  } catch {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const barbershop = await prisma.barbershop.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
          },
        },
        _count: {
          select: { users: true },
        },
      },
    });

    if (!barbershop) {
      return NextResponse.json(
        { error: 'Barbearia não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(barbershop);
  } catch {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
