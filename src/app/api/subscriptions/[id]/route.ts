import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Buscar assinatura por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const subscription = await prisma.subscription.findUnique({
      where: { id },
      include: {
        barbershop: true,
        subscriptionType: true
      }
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Assinatura não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Erro ao buscar assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar assinatura
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      subscriptionTypeId,
      nextBillingDate,
      blockDate,
      paymentMethod
    } = body;

    // Verificar se a assinatura existe
    const existingSubscription = await prisma.subscription.findUnique({
      where: { id }
    });

    if (!existingSubscription) {
      return NextResponse.json(
        { error: 'Assinatura não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se o tipo de assinatura existe e está publicado (se fornecido)
    if (subscriptionTypeId) {
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
    }

    // Validar datas se fornecidas
    let nextBillingDateObj, blockDateObj;
    
    if (nextBillingDate) {
      nextBillingDateObj = new Date(nextBillingDate);
      if (nextBillingDateObj <= existingSubscription.startDate) {
        return NextResponse.json(
          { error: 'Data da próxima cobrança deve ser posterior à data de início' },
          { status: 400 }
        );
      }
    }

    if (blockDate) {
      blockDateObj = new Date(blockDate);
      if (nextBillingDateObj && nextBillingDateObj >= blockDateObj) {
        return NextResponse.json(
          { error: 'Data da próxima cobrança deve ser anterior à data de bloqueio' },
          { status: 400 }
        );
      }
    }

    // Validar método de pagamento se fornecido
    if (paymentMethod) {
      const validPaymentMethods = ['CREDIT_CARD', 'BOLETO', 'PIX'];
      if (!validPaymentMethods.includes(paymentMethod)) {
        return NextResponse.json(
          { error: 'Método de pagamento inválido' },
          { status: 400 }
        );
      }
    }

    const updatedSubscription = await prisma.subscription.update({
      where: { id },
      data: {
        ...(subscriptionTypeId && { subscriptionTypeId }),
        ...(nextBillingDate && { nextBillingDate: nextBillingDateObj }),
        ...(blockDate && { blockDate: blockDateObj }),
        ...(paymentMethod && { paymentMethod })
      },
      include: {
        barbershop: true,
        subscriptionType: true
      }
    });

    return NextResponse.json(updatedSubscription);
  } catch (error) {
    console.error('Erro ao atualizar assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Excluir assinatura
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Verificar se a assinatura existe
    const existingSubscription = await prisma.subscription.findUnique({
      where: { id }
    });

    if (!existingSubscription) {
      return NextResponse.json(
        { error: 'Assinatura não encontrada' },
        { status: 404 }
      );
    }

    // Verificar se a assinatura está ativa (não bloqueada)
    if (existingSubscription.blockDate > new Date()) {
      return NextResponse.json(
        { error: 'Não é possível excluir uma assinatura ativa' },
        { status: 400 }
      );
    }

    await prisma.subscription.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'Assinatura excluída com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao excluir assinatura:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

