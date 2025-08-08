import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const barbershops = [
      {
        name: 'Barbearia Clássica',
        address: 'Rua das Flores, 123 - Centro',
        phone: '(11) 99999-1111',
        email: 'contato@barbeariaclassica.com',
      },
      {
        name: 'Studio Moderno',
        address: 'Av. Paulista, 456 - Bela Vista',
        phone: '(11) 99999-2222',
        email: 'contato@studiomoderno.com',
      },
      {
        name: 'Barbearia do João',
        address: 'Rua Augusta, 789 - Consolação',
        phone: '(11) 99999-3333',
        email: 'joao@barbearia.com',
      },
      {
        name: 'Corte & Estilo',
        address: 'Rua Oscar Freire, 321 - Jardins',
        phone: '(11) 99999-4444',
        email: 'contato@corteestilo.com',
      },
      {
        name: 'Barbearia Express',
        address: 'Rua 25 de Março, 654 - Sé',
        phone: '(11) 99999-5555',
        email: 'express@barbearia.com',
      },
    ];

    const createdBarbershops = [];

    for (const barbershop of barbershops) {
      const existingBarbershop = await prisma.barbershop.findFirst({
        where: { name: barbershop.name },
      });

      if (!existingBarbershop) {
        const createdBarbershop = await prisma.barbershop.create({
          data: barbershop,
        });
        createdBarbershops.push(createdBarbershop);
      }
    }

    return NextResponse.json({
      message: 'Barbearias de teste criadas com sucesso',
      barbershops: createdBarbershops,
    });
  } catch (error) {
    console.error('Erro ao criar barbearias de teste:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
