'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { User } from 'lucide-react';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Painel de Controle
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-700">{user?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
