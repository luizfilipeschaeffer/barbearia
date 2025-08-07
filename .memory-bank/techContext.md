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
