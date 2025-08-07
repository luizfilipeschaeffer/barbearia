import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    const defaultConfigs = [
      {
        key: 'allow_super_admin_registration',
        value: 'false',
        description: 'Permite criar novos super admins através da tela de registro',
      },
      {
        key: 'maintenance_mode',
        value: 'false',
        description: 'Ativa o modo de manutenção, bloqueando acesso de usuários',
      },
      {
        key: 'audit_logs_enabled',
        value: 'true',
        description: 'Registra todas as ações dos usuários para auditoria',
      },
    ];

    const createdConfigs = [];

    for (const config of defaultConfigs) {
      const existingConfig = await prisma.systemConfig.findUnique({
        where: { key: config.key },
      });

      if (!existingConfig) {
        const createdConfig = await prisma.systemConfig.create({
          data: config,
        });
        createdConfigs.push(createdConfig);
      }
    }

    return NextResponse.json({
      message: 'Configurações inicializadas com sucesso',
      configs: createdConfigs,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
