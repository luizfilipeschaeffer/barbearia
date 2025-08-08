import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    // Configurações padrão caso o banco não esteja disponível
    const defaultConfigs = {
      maintenance_mode: { key: 'maintenance_mode', value: 'false', description: 'Modo de manutenção' },
      system_version: { key: 'system_version', value: '1.0.0', description: 'Versão do sistema' }
    };

    try {
      if (key) {
        const config = await prisma.systemConfig.findUnique({
          where: { key },
        });
        
        if (config) {
          return NextResponse.json(config);
        } else {
          // Retornar configuração padrão se não encontrada
          return NextResponse.json(defaultConfigs[key as keyof typeof defaultConfigs] || { key, value: 'false' });
        }
      }

      const configs = await prisma.systemConfig.findMany({
        orderBy: { key: 'asc' },
      });

      return NextResponse.json(configs);
    } catch (dbError) {
      console.error('Erro de banco de dados:', dbError);
      
      // Retornar configurações padrão em caso de erro
      if (key) {
        return NextResponse.json(defaultConfigs[key as keyof typeof defaultConfigs] || { key, value: 'false' });
      }
      
      return NextResponse.json(Object.values(defaultConfigs));
    }
  } catch (error) {
    console.error('Erro na API de configuração:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key, value, description } = await request.json();

    if (!key || !value) {
      return NextResponse.json(
        { error: 'Chave e valor são obrigatórios' },
        { status: 400 }
      );
    }

    try {
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
    } catch (dbError) {
      console.error('Erro de banco de dados:', dbError);
      return NextResponse.json(
        { error: 'Erro ao acessar banco de dados' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro na API de configuração:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
