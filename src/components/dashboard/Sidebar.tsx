'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Users, 
  Building2, 
  BarChart3, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menuItems = [
    {
      href: '/dashboard/super-admin',
      label: 'Dashboard',
      icon: BarChart3,
    },
    {
      href: '/dashboard/super-admin/users',
      label: 'Usuários',
      icon: Users,
    },
    {
      href: '/dashboard/super-admin/barbershops',
      label: 'Barbearias',
      icon: Building2,
    },
    {
      href: '/dashboard/super-admin/settings',
      label: 'Configurações',
      icon: Settings,
    },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Barbearia Admin</h1>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-64 p-6">
        <button
          onClick={logout}
          className="flex items-center w-full px-6 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sair
        </button>
      </div>
    </div>
  );
}
