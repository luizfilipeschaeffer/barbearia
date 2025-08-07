import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST() {
  try {
    // Verificar se já existe um super admin
    const existingSuperAdmin = await prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' },
    });

    if (existingSuperAdmin) {
      return NextResponse.json(
        { message: 'Super admin já existe' },
        { status: 400 }
      );
    }

    // Criar super admin
    const hashedPassword = await hashPassword('admin123');
    
    const superAdmin = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: 'admin@barbearia.com',
        password: hashedPassword,
        role: 'SUPER_ADMIN',
      },
    });

    return NextResponse.json({
      message: 'Super admin criado com sucesso',
      user: {
        id: superAdmin.id,
        name: superAdmin.name,
        email: superAdmin.email,
        role: superAdmin.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
