# System Patterns - Sistema de Barbearia

## Arquitetura Geral
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Routes    │    │   Database      │
│   (Next.js)     │◄──►│   (Next.js)     │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ - Pages         │    │ - /api/clients  │    │ - Clients       │
│ - Components    │    │ - /api/services │    │ - Services      │
│ - Hooks         │    │ - /api/bookings │    │ - Bookings      │
│ - Utils         │    │ - /api/reports  │    │ - Payments      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Padrões de Design

### Estrutura de Pastas
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   │   ├── clients/
│   │   ├── services/
│   │   ├── bookings/
│   │   └── reports/
│   ├── api/
│   │   ├── clients/
│   │   ├── services/
│   │   ├── bookings/
│   │   └── reports/
│   └── globals.css
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── forms/        # Formulários específicos
│   ├── tables/       # Tabelas de dados
│   └── charts/       # Gráficos e relatórios
├── lib/
│   ├── prisma.ts
│   ├── utils.ts
│   └── validations.ts
└── types/
    └── index.ts
```

### Padrões de Componentes
- **Atomic Design**: Atoms → Molecules → Organisms
- **Composition over Inheritance**
- **Custom Hooks** para lógica reutilizável
- **TypeScript strict** para type safety

### Padrões de API
- **RESTful** com Next.js API Routes
- **Error handling** consistente
- **Validation** com Zod
- **Authentication** com NextAuth.js (futuro)

## Modelos de Dados

### Cliente (Client)
```typescript
interface Client {
  id: string
  name: string
  email: string
  phone: string
  birthDate?: Date
  preferences?: string
  createdAt: Date
  updatedAt: Date
}
```

### Serviço (Service)
```typescript
interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number // em minutos
  category: string
  isActive: boolean
}
```

### Agendamento (Booking)
```typescript
interface Booking {
  id: string
  clientId: string
  serviceId: string
  date: Date
  startTime: string
  endTime: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  createdAt: Date
}
```

## Padrões de Estado
- **Server State**: React Query/TanStack Query
- **Client State**: Zustand ou Context API
- **Form State**: React Hook Form + Zod

## Padrões de Estilização
- **Tailwind CSS** para utilitários
- **shadcn/ui** para componentes base
- **CSS Modules** para componentes específicos
- **Design System** consistente

## 4. techContext.md

```markdown
# Tech Context - Sistema de Barbearia

## Stack Tecnológica

### Frontend
- **Next.js 15**: Framework React com App Router
- **TypeScript 5**: Type safety e melhor DX
- **React 19**: Biblioteca de UI
- **Tailwind CSS 4**: Framework de estilização
- **shadcn/ui**: Componentes UI reutilizáveis
- **Lucide React**: Biblioteca de ícones

### Backend
- **Next.js API Routes**: Backend serverless
- **Prisma ORM**: Type-safe database queries
- **PostgreSQL**: Banco de dados relacional
- **Neon**: Hosting do PostgreSQL

### Ferramentas de Desenvolvimento
- **Turbopack**: Bundler rápido para desenvolvimento
- **ESLint**: Linting de código
- **Prettier**: Formatação de código
- **Git**: Controle de versão

## Configurações Atuais

### Dependências Instaladas
```json
{
  "@prisma/client": "^6.13.0",
  "lucide-react": "^0.537.0",
  "next": "15.4.6",
  "prisma": "^6.13.0",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "tailwindcss": "^4"
}
```

### Dependências Pendentes
- shadcn/ui (a ser configurado)
- React Hook Form
- Zod (validação)
- TanStack Query (server state)
- NextAuth.js (autenticação)
- Recharts (gráficos)

## Configuração do Banco

### Schema Atual (Prisma)
```prisma
model Note {
  id        String   @id @default(cuid())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Schema Futuro (Barbearia)
```prisma
model Client {
  id          String    @id @default(cuid())
  name        String
  email       String    @unique
  phone       String
  birthDate   DateTime?
  preferences String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  bookings    Booking[]
}

model Service {
  id          String    @id @default(cuid())
  name        String
  description String
  price       Decimal
  duration    Int       // em minutos
  category    String
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  bookings    Booking[]
}

model Booking {
  id        String   @id @default(cuid())
  clientId  String
  serviceId String
  date      DateTime
  startTime String
  endTime   String
  status    String   @default("pending")
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  client    Client   @relation(fields: [clientId], references: [id])
  service   Service  @relation(fields: [serviceId], references: [id])
}
```

## Ambiente de Desenvolvimento

### Variáveis de Ambiente
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
```

### Scripts Disponíveis
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Configurações Pendentes
1. **shadcn/ui**: `npx shadcn@latest init`
2. **ESLint**: Configurar regras específicas
3. **Prettier**: Configurar formatação
4. **Husky**: Git hooks para qualidade
5. **Testing**: Jest + Testing Library
```

## 5. activeContext.md

```markdown
# Active Context - Sistema de Barbearia

## Foco Atual
Transformar o projeto atual de "sistema de notas" em um sistema completo de gerenciamento de barbearia.

## Estado Atual do Projeto
- ✅ Next.js 15 configurado com TypeScript
- ✅ Prisma ORM conectado ao PostgreSQL (Neon)
- ✅ Tailwind CSS configurado
- ✅ API Routes funcionais (CRUD básico)
- ✅ Componentes React básicos
- 🔄 **PENDENTE**: Configurar shadcn/ui
- 🔄 **PENDENTE**: Transformar schema do banco
- 🔄 **PENDENTE**: Criar interfaces específicas

## Próximas Ações Imediatas

### 1. Configurar shadcn/ui
```bash
npx shadcn@latest init
```
- Configurar tema e componentes base
- Implementar design system consistente

### 2. Transformar Schema do Banco
- Criar modelos: Client, Service, Booking
- Migrar dados existentes (se necessário)
- Atualizar Prisma schema

### 3. Criar Estrutura de Páginas
- Dashboard principal
- Gestão de clientes
- Gestão de serviços
- Sistema de agendamento

### 4. Implementar Componentes Base
- Formulários de cadastro
- Tabelas de dados
- Calendário de agendamentos
- Gráficos de relatórios

## Decisões Pendentes
1. **Autenticação**: NextAuth.js vs Clerk vs Auth0
2. **Estado Global**: Zustand vs Context API
3. **Formulários**: React Hook Form vs Formik
4. **Gráficos**: Recharts vs Chart.js
5. **Notificações**: Email vs SMS vs Push

## Desafios Identificados
- Migração de dados existentes
- Design responsivo para mobile
- Performance com muitos agendamentos
- Integração com sistemas externos

## Métricas de Progresso
- [ ] shadcn/ui configurado
- [ ] Schema do banco atualizado
- [ ] Dashboard básico implementado
- [ ] CRUD de clientes funcionando
- [ ] CRUD de serviços funcionando
- [ ] Sistema de agendamento básico
- [ ] Relatórios básicos
```

## 6. progress.md

```markdown
# Progress - Sistema de Barbearia

## ✅ O que está funcionando

### Infraestrutura
- ✅ Next.js 15 com App Router
- ✅ TypeScript configurado
- ✅ Prisma ORM conectado ao PostgreSQL
- ✅ Tailwind CSS funcionando
- ✅ API Routes básicas (CRUD de notas)
- ✅ Componentes React básicos

### Funcionalidades Implementadas
- ✅ Estrutura de projeto organizada
- ✅ Banco de dados configurado
- ✅ APIs RESTful básicas
- ✅ Interface responsiva básica

## 🔄 Em Progresso
- 🔄 Análise e planejamento da transformação
- 🔄 Definição da arquitetura do sistema
- 🔄 Criação do memory-bank

## ❌ O que precisa ser feito

### Prioridade Alta
1. **Configurar shadcn/ui**
   - Inicializar componentes base
   - Configurar tema e design system

2. **Transformar Schema do Banco**
   - Criar modelo Client
   - Criar modelo Service  
   - Criar modelo Booking
   - Executar migrações

3. **Criar Estrutura de Páginas**
   - Dashboard principal
   - Página de clientes
   - Página de serviços
   - Página de agendamentos

### Prioridade Média
4. **Implementar CRUDs**
   - Gestão de clientes
   - Gestão de serviços
   - Sistema de agendamento

5. **Criar Componentes Específicos**
   - Formulários de cadastro
   - Tabelas de dados
   - Calendário interativo

### Prioridade Baixa
6. **Funcionalidades Avançadas**
   - Sistema de autenticação
   - Relatórios e gráficos
   - Notificações
   - Integrações externas

## 📊 Métricas de Progresso
- **Infraestrutura**: 80% completo
- **Backend**: 20% completo (APIs básicas)
- **Frontend**: 10% completo (página inicial)
- **Banco de Dados**: 5% completo (schema básico)
- **UI/UX**: 0% completo (precisa shadcn/ui)

## 🐛 Problemas Conhecidos
- Projeto ainda tem estrutura de "sistema de notas"
- Falta configuração de shadcn/ui
- Schema do banco não reflete domínio da barbearia
- Componentes não são específicos para barbearia

##  Próximos Marcos
1. **Marco 1**: shadcn/ui configurado + schema atualizado
2. **Marco 2**: Dashboard básico + CRUD de clientes
3. **Marco 3**: Sistema de agendamento básico
4. **Marco 4**: Relatórios e métricas básicas
```

---

## 📋 Resumo da Análise

Baseado na análise do projeto, identifiquei que:

1. **Estado Atual**: Projeto tem estrutura sólida de Next.js + Prisma + PostgreSQL, mas ainda é um "sistema de notas"
2. **Transformação Necessária**: Converter para sistema completo de barbearia
3. **Próximos Passos**: Configurar shadcn/ui, transformar schema do banco, criar interfaces específicas

O memory-bank está criado e documenta todo o contexto necessário para continuarmos o desenvolvimento. Agora você pode me direcionar sobre como quer prosseguir com a transformação do projeto!
