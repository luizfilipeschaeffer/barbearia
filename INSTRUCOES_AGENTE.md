# �� Instruções para Agente - Plataforma de Gerenciamento de Barbearias

## 📋 Contexto do Projeto

Você está trabalhando em um projeto Next.js 15 com TypeScript, Prisma ORM e PostgreSQL (Neon). O projeto atual é um app de notas que precisa ser transformado em uma **plataforma de gerenciamento de barbearias** com sistema de super admin.

### ��️ Stack Tecnológica Atual
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Estilização**: Tailwind CSS
- **Backend**: Next.js API Routes
- **ORM**: Prisma
- **Banco**: PostgreSQL (Neon)
- **Ícones**: Lucide React

## �� Objetivo Principal

Criar uma plataforma onde **super admins** podem gerenciar:
- Usuários (criar, editar, deletar, gerenciar permissões)
- Barbearias (cadastrar, configurar, monitorar)
- Dashboard com métricas e relatórios
- Sistema de autenticação e autorização

## �� Estrutura Atual do Projeto

```
barbearia/
├── src/
│   ├── app/
│   │   ├── api/notes/          # APIs de notas (serão removidas)
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Página inicial
│   │   └── globals.css
│   ├── components/
│   │   ├── NoteCard.tsx        # Será removido
│   │   └── NoteForm.tsx        # Será removido
│   └── lib/
│       └── prisma.ts
├── prisma/
│   └── schema.prisma           # Schema atual (será modificado)
└── package.json
```

##  Plano de Implementação

### **FASE 1: Preparação e Estrutura Base**

#### 1.1 Atualizar Schema do Prisma
**Arquivo**: `prisma/schema.prisma`

```prisma
// Remover o modelo Note e adicionar os novos modelos:

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Sistema de Autenticação
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      UserRole @default(USER)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relacionamentos
  barbershopId String?
  barbershop   Barbershop? @relation(fields: [barbershopId], references: [id])
}

enum UserRole {
  SUPER_ADMIN
  ADMIN
  BARBER
  USER
}

// Barbearias
model Barbershop {
  id          String   @id @default(cuid())
  name        String
  address     String
  phone       String
  email       String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relacionamentos
  users User[]
}

// Serviços (para futuras implementações)
model Service {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Decimal
  duration    Int      // em minutos
  barbershopId String
  barbershop   Barbershop @relation(fields: [barbershopId], references: [id])
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### 1.2 Criar Estrutura de Pastas
```
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── dashboard/
│   │   └── super-admin/
│   │       ├── page.tsx
│   │       ├── users/
│   │       │   └── page.tsx
│   │       └── barbershops/
│   │           └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── register/
│   │   │   │   └── route.ts
│   │   │   └── logout/
│   │   │       └── route.ts
│   │   ├── users/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── barbershops/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   └── layout.tsx
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── dashboard/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── DashboardStats.tsx
│   │   └── DataTable.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── LoadingSpinner.tsx
│   └── providers/
│       └── AuthProvider.tsx
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── utils.ts
│   └── constants.ts
└── types/
    └── index.ts
```

### **FASE 2: Sistema de Autenticação**

#### 2.1 Instalar Dependências
```bash
npm install bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

#### 2.2 Criar Utilitários de Autenticação
**Arquivo**: `src/lib/auth.ts`

```typescript
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};
```

#### 2.3 Criar Contexto de Autenticação
**Arquivo**: `src/components/providers/AuthProvider.tsx`

```typescript
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar token no localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Validar token com API
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const { token, user: userData } = await response.json();
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### **FASE 3: APIs de Autenticação**

#### 3.1 API de Login
**Arquivo**: `src/app/api/auth/login/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const token = generateToken(user.id, user.role);

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
```

#### 3.2 API de Registro (apenas para super admin)
**Arquivo**: `src/app/api/auth/register/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role = 'USER' } = await request.json();

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
```

### **FASE 4: Componentes de UI**

#### 4.1 Componente de Login
**Arquivo**: `src/components/auth/LoginForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/dashboard/super-admin');
    } catch (error) {
      setError('Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Login - Super Admin
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

### **FASE 5: Dashboard Super Admin**

#### 5.1 Layout do Dashboard
**Arquivo**: `src/app/dashboard/super-admin/layout.tsx`

```typescript
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

#### 5.2 Página Principal do Dashboard
**Arquivo**: `src/app/dashboard/super-admin/page.tsx`

```typescript
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
```

### **FASE 6: Componentes do Dashboard**

#### 6.1 Sidebar
**Arquivo**: `src/components/dashboard/Sidebar.tsx`

```typescript
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
```

#### 6.2 Header
**Arquivo**: `src/components/dashboard/Header.tsx`

```typescript
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
```

#### 6.3 DashboardStats
**Arquivo**: `src/components/dashboard/DashboardStats.tsx`

```typescript
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
```

### **FASE 7: APIs de Gerenciamento**

#### 7.1 API de Usuários
**Arquivo**: `src/app/api/users/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const role = searchParams.get('role');
    const search = searchParams.get('search');

    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    const total = await prisma.user.count({ where });

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
```

#### 7.2 API de Barbearias
**Arquivo**: `src/app/api/barbershops/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }

    const barbershops = await prisma.barbershop.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { users: true },
        },
      },
    });

    const total = await prisma.barbershop.count({ where });

    return NextResponse.json({
      barbershops,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, address, phone, email } = await request.json();

    const barbershop = await prisma.barbershop.create({
      data: {
        name,
        address,
        phone,
        email,
      },
    });

    return NextResponse.json(barbershop);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
```

### **FASE 8: Páginas de Gerenciamento**

#### 8.1 Página de Usuários
**Arquivo**: `src/app/dashboard/super-admin/users/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usuários</h1>
          <p className="text-gray-600 mt-2">
            Gerencie todos os usuários da plataforma
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Novo Usuário
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar usuários..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Função
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```

### **FASE 9: Configurações Finais**

#### 9.1 Atualizar Layout Principal
**Arquivo**: `src/app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barbearia Admin",
  description: "Plataforma de gerenciamento de barbearias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

#### 9.2 Atualizar Página Inicial
**Arquivo**: `src/app/page.tsx`

```typescript
'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
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
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
          <p className="text-white mt-4">Carregando...</p>
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
```

##  Comandos para Executar

### 1. Instalar Dependências
```bash
npm install bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

### 2. Atualizar Schema do Prisma
```bash
npx prisma generate
npx prisma db push
```

### 3. Criar Super Admin Inicial
```bash
# Usar o Prisma Studio para criar o primeiro super admin
npx prisma studio
```

### 4. Executar o Projeto
```bash
npm run dev
```

## 📝 Variáveis de Ambiente

Criar arquivo `.env`:
```env
DATABASE_URL="sua_url_do_neon"
JWT_SECRET="sua_chave_secreta_jwt"
```

##  Próximos Passos

1. **Implementar as APIs** seguindo o código fornecido
2. **Criar os componentes** de UI
3. **Configurar as rotas** do dashboard
4. **Testar a autenticação** e autorização
5. **Adicionar funcionalidades** de CRUD completas
6. **Implementar relatórios** e métricas
7. **Adicionar validações** e tratamento de erros
8. **Otimizar performance** e UX

## ⚠️ Observações Importantes

- **Segurança**: Implementar middleware de autenticação para proteger rotas
- **Validação**: Adicionar validação de dados com Zod ou Yup
- **Error Handling**: Implementar tratamento de erros global
- **Loading States**: Adicionar estados de carregamento em todas as operações
- **Responsividade**: Garantir que a interface funcione em dispositivos móveis
- **Acessibilidade**: Seguir padrões de acessibilidade web

## 🔧 Troubleshooting

### Problemas Comuns:
1. **Erro de conexão com banco**: Verificar DATABASE_URL no .env
2. **Erro de JWT**: Verificar JWT_SECRET no .env
3. **Erro de build**: Executar `npx prisma generate`
4. **Erro de tipos**: Verificar se todas as dependências estão instaladas

### Comandos Úteis:
```bash
# Reset do banco (cuidado!)
npx prisma db push --force-reset

# Visualizar dados
npx prisma studio

# Verificar conexão
npx prisma db pull
```

---

**Este arquivo contém todas as instruções necessárias para transformar o projeto atual em uma plataforma completa de gerenciamento de barbearias com sistema de super admin.**


