import { DashboardStats } from '@/components/dashboard/DashboardStats';

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard Super Admin
        </h1>
        <p className="text-gray-600 mt-2">
          Gerencie usuários, barbearias e monitore a plataforma
        </p>
      </div>
      
      <DashboardStats />
      
      {/* Adicionar mais componentes conforme necessário */}
    </div>
  );
}
