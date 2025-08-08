import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Em uma implementação mais robusta, você poderia invalidar o token no servidor
    // Por enquanto, apenas retornamos sucesso
    return NextResponse.json({ message: 'Logout realizado com sucesso' });
  } catch {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
