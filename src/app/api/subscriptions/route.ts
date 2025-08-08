import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Listar todas as assinaturas
export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: {
        barbershop: true,
        subscriptionType: true
      },
      orderBy: {
        startDate: 'desc'
      }
    });

    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error('Erro ao buscar assinaturas:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// POST - Criar nova assinatura
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      barbershopId,
      subscriptionTypeId,
      startDate,
      nextBillingDate,
      blockDate,
      paymentMethod
    } = body;

    // Validações
    if (!barbershopId || !subscriptionTypeId || !startDate || !nextBillingDate || !blockDate || !paymentMethod) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se a barbearia existe
    const barbershop = await prisma.barbershop.findUnique({
      where: { id: barbershopId }
    });

    if (!barbershop) {
      return NextResponse.json(
        { error: 'Barbearia não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se o tipo de assinatura existe e está publicado
    const subscriptionType = await prisma.subscriptionType.findUnique({
      where: { id: subscriptionTypeId }
    });

    if (!subscriptionType) {
      return NextResponse.json(
        { error: 'Tipo de assinatura não encontrado' },
        { status: 404 }
      );
    }

    if (!subscriptionType.isPublished) {
      return NextResponse.json(
        { error: 'Tipo de assinatura não está publicado' },
        { status: 400 }
      );
    }

    // Verificar se já existe uma assinatura ativa para esta barbearia
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        barbershopId,
        blockDate: {
          gt: new Date()
        }
      }
    });

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'Barbearia já possui uma assinatura ativa' },
        { status: 400 }
      );
    }

    // Validar datas
    const startDateObj = new Date(startDate);
    const nextBillingDateObj = new Date(nextBillingDate);
    const blockDateObj = new Date(blockDate);

    if (startDateObj >= nextBillingDateObj) {
      return NextResponse.json(
        { error: 'Data de início deve ser anterior à data da próxima cobrança' },
        { status: 400 }
      );
    }

    if (nextBillingDateObj >= blockDateObj) {
      return NextResponse.json(
        { error: 'Data da próxima cobrança deve ser anterior à data de bloqueio' },
        { status: 400 }
      );
    }

    // Validar método de pagamento
    const validPaymentMethods = ['CREDIT_CARD', 'BOLETO', 'PIX'];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return NextResponse.json(
        { error: 'Método de pagamento inválido' },
        { status: 400 }
      );
    }

    const subscription = await prisma.subscription.create({
      data: {
        barbershopId,
        subscriptionTypeId,
        startDate: startDateObj,
        nextBillingDate: nextBillingDateObj,
        blockDate: blockDateObj,
        paymentMethod
      },
      include: {
        barbershop: true,
        subscriptionType: true
      }
    });

    return NextResponse.json(subscription, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
