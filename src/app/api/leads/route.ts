import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, type, source, notes } = body;

    // Validações básicas
    if (!name || !email || !phone || !type) {
      return NextResponse.json(
        { error: 'Nome, email, telefone e tipo são obrigatórios' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Validar telefone (formato brasileiro)
    const phoneRegex = /^(\+55|55)?\s?\(?[1-9]{2}\)?\s?[9]?\s?[0-9]{4}-?[0-9]{4}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: 'Telefone inválido. Use formato brasileiro: (11) 99999-9999' },
        { status: 400 }
      );
    }

    // Validar tipo de lead
    const validTypes = ['BARBERSHOP_OWNER', 'INVESTOR', 'PARTNER', 'OTHER'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Tipo de lead inválido' },
        { status: 400 }
      );
    }

    // Verificar se já existe um lead com este email
    const existingLead = await prisma.lead.findFirst({
      where: { email }
    });

    if (existingLead) {
      return NextResponse.json(
        { error: 'Já existe um lead cadastrado com este email' },
        { status: 409 }
      );
    }

    // Criar o lead
    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        type,
        source: source || 'landing_page',
        notes: notes?.trim() || null,
        status: 'NEW'
      }
    });

    return NextResponse.json(
      { 
        message: 'Lead cadastrado com sucesso!',
        lead: {
          id: lead.id,
          name: lead.name,
          email: lead.email,
          type: lead.type,
          status: lead.status
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erro ao cadastrar lead:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    // Construir filtros
    const where: { status?: string; type?: string } = {};
    if (status) where.status = status;
    if (type) where.type = type;

    // Calcular offset
    const offset = (page - 1) * limit;

    // Buscar leads com paginação
    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          type: true,
          source: true,
          status: true,
          notes: true,
          createdAt: true
        }
      }),
      prisma.lead.count({ where })
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
