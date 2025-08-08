import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Buscar estatísticas gerais
    const [
      totalLeads,
      barbershopLeads,
      investorLeads,
      newLeads,
      contactedLeads,
      convertedLeads,
      leadsBySource,
      leadsByDay
    ] = await Promise.all([
      // Total de leads
      prisma.lead.count(),
      
      // Leads de barbearias
      prisma.lead.count({
        where: { type: 'BARBERSHOP_OWNER' }
      }),
      
      // Leads de investidores
      prisma.lead.count({
        where: { type: 'INVESTOR' }
      }),
      
      // Leads novos
      prisma.lead.count({
        where: { status: 'NEW' }
      }),
      
      // Leads contactados
      prisma.lead.count({
        where: { status: 'CONTACTED' }
      }),
      
      // Leads convertidos
      prisma.lead.count({
        where: { status: 'CONVERTED' }
      }),
      
      // Leads por fonte
      prisma.lead.groupBy({
        by: ['source'],
        _count: {
          source: true
        }
      }),
      
      // Leads dos últimos 7 dias
      prisma.lead.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ]);

    // Buscar leads por status
    const leadsByStatus = await prisma.lead.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });

    // Buscar leads por tipo
    const leadsByType = await prisma.lead.groupBy({
      by: ['type'],
      _count: {
        type: true
      }
    });

    return NextResponse.json({
      stats: {
        total: totalLeads,
        barbershopOwners: barbershopLeads,
        investors: investorLeads,
        new: newLeads,
        contacted: contactedLeads,
        converted: convertedLeads,
        last7Days: leadsByDay
      },
      bySource: leadsBySource.map(item => ({
        source: item.source,
        count: item._count.source
      })),
      byStatus: leadsByStatus.map(item => ({
        status: item.status,
        count: item._count.status
      })),
      byType: leadsByType.map(item => ({
        type: item.type,
        count: item._count.type
      }))
    });

  } catch (error) {
    console.error('Erro ao buscar estatísticas dos leads:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
