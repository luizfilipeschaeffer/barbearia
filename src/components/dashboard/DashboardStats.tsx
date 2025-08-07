'use client';

import { useEffect, useState } from 'react';
import { Users, Building2, Calendar, DollarSign } from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalBarbershops: number;
  totalAppointments: number;
  totalRevenue: number;
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalBarbershops: 0,
    totalAppointments: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aqui você faria a chamada para a API para buscar as estatísticas
    // Por enquanto, vamos usar dados mockados
    setTimeout(() => {
      setStats({
        totalUsers: 150,
        totalBarbershops: 25,
        totalAppointments: 89,
        totalRevenue: 15420,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Total de Usuários',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Barbearias',
      value: stats.totalBarbershops,
      icon: Building2,
      color: 'bg-green-500',
    },
    {
      title: 'Agendamentos Hoje',
      value: stats.totalAppointments,
      icon: Calendar,
      color: 'bg-yellow-500',
    },
    {
      title: 'Receita Total',
      value: `R$ ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-purple-500',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
