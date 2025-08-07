'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [checkingConfig, setCheckingConfig] = useState(true);

  useEffect(() => {
    checkMaintenanceMode();
  }, []);

  useEffect(() => {
    if (!loading && !checkingConfig) {
      if (maintenanceMode) {
        // Em modo de manutenção, não redirecionar
        return;
      }
      
      if (user) {
        if (user.role === 'SUPER_ADMIN') {
          router.push('/dashboard/super-admin');
        } else {
          router.push('/dashboard');
        }
      } else {
        router.push('/auth/login');
      }
    }
  }, [user, loading, maintenanceMode, checkingConfig, router]);

  const checkMaintenanceMode = async () => {
    try {
      const response = await fetch('/api/config?key=maintenance_mode');
      if (response.ok) {
        const config = await response.json();
        setMaintenanceMode(config?.value === 'true');
      }
    } catch (error) {
      console.error('Erro ao verificar modo de manutenção:', error);
    } finally {
      setCheckingConfig(false);
    }
  };

  if (loading || checkingConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="text-white mt-4">Carregando...</p>
        </div>
      </div>
    );
  }

  if (maintenanceMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            🛠️ Manutenção
          </h1>
          <p className="text-gray-300 text-xl mb-8">
            O sistema está em manutenção
          </p>
          <p className="text-gray-400 text-lg">
            Estamos trabalhando para melhorar sua experiência.
            <br />
            Volte em alguns minutos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Barbearia Admin
        </h1>
        <p className="text-gray-300 text-xl">
          Plataforma de gerenciamento de barbearias
        </p>
      </div>
    </div>
  );
}
