# System Patterns - Sistema de Barbearia

## Arquitetura Geral
```
┌─────────────────┐    ┌─────────────────────────┐    ┌─────────────────┐
│   Frontend      │    │         API Routes      │    │   Database      │
│   (Next.js)     │◄──►│         (Next.js)       │◄──►│   (PostgreSQL)  │
│                 │    │                         │    │                 │
│ - Pages         │    │ - /api/auth             │    │ - Users         │
│ - Components    │    │ - /api/users            │    │ - Barbershops   │
│ - Providers     │    │ - /api/barbershops      │    │ - Services      │
│ - Hooks         │    │ - /api/subscriptions    │    │ - Subscriptions │
└─────────────────┘    └─────────────────────────┘    └─────────────────┘
```

## Padrões de Design

### Estrutura de Pastas
```
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   │   └── super-admin/
│   │       ├── barbershops/
│   │       ├── users/
│   │       └── settings/
│   ├── api/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── barbershops/
│   │   ├── subscriptions/
│   │   └── config/
│   └── globals.css
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── providers/
│   └── ui/
├── lib/
│   ├── prisma.ts
│   └── auth.ts
└── types/
```

### Padrões de Autenticação
- **JWT Token**: Armazenado no localStorage
- **Context API**: AuthProvider para estado global
- **Route Protection**: Verificação de token em rotas protegidas
- **Role-based Access**: Controle por SUPER_ADMIN, ADMIN, BARBER, USER

### Padrões de Componentes
- **Atomic Design**: Atoms → Molecules → Organisms
- **Composition over Inheritance**
- **Custom Hooks**: useAuth para autenticação
- **TypeScript strict**: Type safety completo

### Padrões de API
- **RESTful**: Next.js API Routes
- **Error handling**: Respostas padronizadas
- **Authentication**: Middleware de verificação de token
- **Pagination**: Suporte a paginação em listagens

## Modelos de Dados

### Usuário (User)
```typescript
interface User {
  id: string
  email: string
  password: string
  name: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'BARBER' | 'USER'
  isActive: boolean
  barbershopId?: string
  createdAt: Date
  updatedAt: Date
}
```

### Barbearia (Barbershop)
```typescript
interface Barbershop {
  id: string
  name: string
  address: string
  phone: string
  email?: string
  logo?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  users: User[]
  services: Service[]
  subscriptions: Subscription[]
}
```

### Serviço (Service)
```typescript
interface Service {
  id: string
  name: string
  description?: string
  price: Decimal
  duration: number // em minutos
  barbershopId: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Assinatura (Subscription)
```typescript
interface Subscription {
  id: string
  barbershopId: string
  subscriptionTypeId: string
  startDate: Date
  nextBillingDate: Date
  blockDate: Date
  paymentMethod: 'CREDIT_CARD' | 'BOLETO' | 'PIX'
  barbershop: Barbershop
  subscriptionType: SubscriptionType
}
```

## Padrões de Estado
- **Authentication State**: Context API com AuthProvider
- **Server State**: Fetch direto (futuro: TanStack Query)
- **Form State**: useState (futuro: React Hook Form)
- **Loading States**: Estados de loading em componentes

## Padrões de Estilização
- **Tailwind CSS**: Utilitários para estilização
- **Lucide React**: Ícones consistentes
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Suporte a tema escuro

## Padrões de Navegação
- **App Router**: Next.js 15 App Router
- **Layouts**: Layouts aninhados para dashboard
- **Sidebar Navigation**: Navegação lateral fixa
- **Breadcrumbs**: Navegação hierárquica

## Padrões de Segurança
- **Password Hashing**: bcryptjs para senhas
- **JWT Tokens**: Autenticação stateless
- **Role-based Authorization**: Controle de acesso por perfil
- **Input Validation**: Validação de dados de entrada

## Padrões de Performance
- **Turbopack**: Bundler rápido para desenvolvimento
- **Code Splitting**: Carregamento sob demanda
- **Image Optimization**: Otimização automática de imagens
- **Caching**: Cache de dados e componentes

## Padrões de Error Handling
- **API Errors**: Respostas padronizadas de erro
- **Client Errors**: Tratamento de erros no frontend
- **Loading States**: Estados de carregamento
- **Fallback UI**: Interfaces de fallback

## Padrões de Testing (Futuro)
- **Unit Tests**: Jest + Testing Library
- **Integration Tests**: Testes de API
- **E2E Tests**: Playwright ou Cypress
- **Component Tests**: Testes de componentes isolados

## Padrões de Deployment
- **Environment Variables**: Configuração por ambiente
- **Database Migrations**: Prisma migrations
- **Build Optimization**: Next.js build otimizado
- **Monitoring**: Logs e métricas de performance
