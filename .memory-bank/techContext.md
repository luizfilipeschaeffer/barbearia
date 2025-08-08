# Tech Context - Sistema de Barbearia

## Stack Tecnológica

### Frontend
- **Next.js 15**: Framework React com App Router
- **TypeScript 5**: Type safety e melhor DX
- **React 19**: Biblioteca de UI
- **Tailwind CSS 4**: Framework de estilização
- **Lucide React**: Biblioteca de ícones
- **Context API**: Gerenciamento de estado de autenticação

### Backend
- **Next.js API Routes**: Backend serverless
- **Prisma ORM**: Type-safe database queries
- **PostgreSQL**: Banco de dados relacional
- **Neon**: Hosting do PostgreSQL
- **JWT**: Autenticação stateless
- **bcryptjs**: Hash de senhas

### Ferramentas de Desenvolvimento
- **Turbopack**: Bundler rápido para desenvolvimento
- **ESLint**: Linting de código
- **Git**: Controle de versão

## Configurações Atuais

### Dependências Instaladas
```json
{
  "@prisma/client": "^6.13.0",
  "bcryptjs": "^3.0.2",
  "jsonwebtoken": "^9.0.2",
  "lucide-react": "^0.537.0",
  "next": "15.4.6",
  "prisma": "^6.13.0",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "tailwindcss": "^4"
}
```

### Dependências de Desenvolvimento
```json
{
  "@tailwindcss/postcss": "^4",
  "@types/bcryptjs": "^2.4.6",
  "@types/jsonwebtoken": "^9.0.10",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "9.32.0",
  "eslint-config-next": "15.4.6",
  "typescript": "^5"
}
```

## Configuração do Banco

### Schema Atual (Prisma)
```prisma
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
  logo        String?  // Base64 da imagem
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relacionamentos
  users User[]
  services Service[]
  subscriptions Subscription[]
}

// Serviços
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

// Tipos de Assinatura
model SubscriptionType {
  id            String   @id @default(cuid())
  name          String
  description   String?
  allowedUsers  Int
  allowedBranches Int
  isPublished   Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relacionamentos
  subscriptions Subscription[]
}

// Assinaturas das Barbearias
model Subscription {
  id                String        @id @default(cuid())
  barbershopId      String
  subscriptionTypeId String
  startDate         DateTime
  nextBillingDate   DateTime
  blockDate         DateTime
  paymentMethod     PaymentMethod
  
  // Relacionamentos
  barbershop        Barbershop        @relation(fields: [barbershopId], references: [id])
  subscriptionType  SubscriptionType  @relation(fields: [subscriptionTypeId], references: [id])
}

// Enum para Métodos de Pagamento
enum PaymentMethod {
  CREDIT_CARD
  BOLETO
  PIX
}

// Configurações do Sistema
model SystemConfig {
  id          String   @id @default(cuid())
  key         String   @unique
  value       String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Estrutura de Arquivos

### API Routes Implementadas
```
src/app/api/
├── auth/
│   ├── login/route.ts
│   ├── logout/route.ts
│   └── register/route.ts
├── barbershops/
│   ├── route.ts
│   ├── [id]/route.ts
│   └── seed/route.ts
├── users/
│   ├── route.ts
│   ├── [id]/route.ts
│   └── seed/route.ts
├── subscription-types/
│   ├── route.ts
│   ├── [id]/route.ts
│   └── published/route.ts
├── subscriptions/
│   ├── route.ts
│   └── [id]/route.ts
└── config/
    └── route.ts
```

### Componentes Implementados
```
src/components/
├── auth/
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
├── dashboard/
│   ├── DashboardStats.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
├── providers/
│   └── AuthProvider.tsx
└── ui/
    └── ImageUpload.tsx
```

## Ambiente de Desenvolvimento

### Variáveis de Ambiente Necessárias
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
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

## Configurações de UI/UX

### Cores e Tema
- **Background**: Branco (#ffffff) / Escuro (#0a0a0a)
- **Foreground**: Preto (#171717) / Branco (#ededed)
- **Fontes**: Geist Sans + Geist Mono
- **Gradientes**: Tons de cinza para loading e manutenção

### Componentes de Design
- **Cards**: Fundo branco, sombra, bordas arredondadas
- **Botões**: Estados hover, loading, disabled
- **Sidebar**: Fundo cinza escuro (#gray-800)
- **Header**: Fundo branco, sombra, borda inferior

## Configurações Pendentes
1. **shadcn/ui**: Para componentes mais avançados
2. **React Hook Form**: Para formulários complexos
3. **Zod**: Para validação de dados
4. **TanStack Query**: Para gerenciamento de estado do servidor
5. **Recharts**: Para gráficos e relatórios
6. **Testing**: Jest + Testing Library
