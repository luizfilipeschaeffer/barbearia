import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { UserRole } from '@prisma/client';

export async function POST() {
  try {
    const users = [
      {
        name: 'João Silva',
        email: 'joao@barbearia.com',
        password: '123456',
        role: 'BARBER',
      },
      {
        name: 'Maria Santos',
        email: 'maria@barbearia.com',
        password: '123456',
        role: 'ADMIN',
      },
      {
        name: 'Pedro Costa',
        email: 'pedro@barbearia.com',
        password: '123456',
        role: 'BARBER',
      },
      {
        name: 'Ana Oliveira',
        email: 'ana@barbearia.com',
        password: '123456',
        role: 'USER',
      },
      {
        name: 'Carlos Lima',
        email: 'carlos@barbearia.com',
        password: '123456',
        role: 'BARBER',
      },
    ];

    const createdUsers = [];

    for (const user of users) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        const hashedPassword = await hashPassword(user.password);
        const createdUser = await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            password: hashedPassword,
            role: user.role as UserRole,
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
          },
        });
        createdUsers.push(createdUser);
      }
    }

    return NextResponse.json({
      message: 'Usuários de teste criados com sucesso',
      users: createdUsers,
    });
  } catch (error) {
    console.error('Erro ao criar usuários de teste:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
