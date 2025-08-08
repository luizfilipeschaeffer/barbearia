# 🪒 Sistema de Gestão de Barbearias

Uma plataforma completa para gestão de barbearias desenvolvida com Next.js 15, Prisma ORM e PostgreSQL (Neon), oferecendo funcionalidades avançadas de agendamento, gestão de clientes e integração com calendários externos.

## 🚀 Funcionalidades

### ✅ **Sistema de Autenticação Completo**
- JWT + bcryptjs para autenticação segura
- Controle de roles (SUPER_ADMIN, ADMIN, BARBER, USER)
- Context API para gerenciamento de estado
- Proteção de rotas por perfil

### ✅ **Gestão de Barbearias**
- CRUD completo de barbearias
- Upload de logo e identidade visual
- Configuração de horários de funcionamento
- Gestão de equipe e serviços

### ✅ **Sistema de Agendamentos**
- Interface de agendamentos responsiva
- Calendário visual interativo
- Sistema de horários disponíveis
- Validação de conflitos de horário
- Drag & drop para reagendamento

### ✅ **Gestão de Clientes**
- CRUD completo de clientes
- Histórico de agendamentos por cliente
- Busca e filtros avançados
- Criação rápida durante agendamento

### ✅ **Integração com Calendários**
- Sincronização com Google Calendar
- Integração com Apple Calendar
- OAuth2 para autenticação segura
- Sincronização bidirecional de eventos

### ✅ **Onboarding Interativo**
- Wizard multi-step para cadastro de barbearias
- Etapas obrigatórias e opcionais
- Sincronização de agenda durante onboarding
- Controle via configurações do sistema

### ✅ **Sistema de Notificações**
- Notificações de novos agendamentos
- Lembretes configuráveis
- Alertas de conflitos de agenda
- Histórico de notificações

### ✅ **Relatórios e Métricas**
- Relatórios de agendamentos por período
- Análise de clientes mais frequentes
- Relatórios de serviços mais solicitados
- Gráficos e exportação de dados

### ✅ **Interface Moderna**
- Design responsivo mobile-first
- Tailwind CSS para estilização
- Lucide React para ícones
- Loading states e feedback visual
- Dark mode support

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones

### **Backend**
- **Next.js API Routes** - APIs serverless
- **Prisma ORM** - ORM para banco de dados
- **PostgreSQL** - Banco de dados (Neon)
- **JWT** - Autenticação stateless
- **bcryptjs** - Hash de senhas

### **Desenvolvimento**
- **Turbopack** - Bundler rápido
- **ESLint** - Linting de código
- **TypeScript** - Verificação de tipos

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Neon (para banco PostgreSQL)

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd barbearia
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados

#### Opção A: Usar Neon (Recomendado)
1. Crie uma conta no [Neon](https://neon.tech)
2. Crie um novo projeto
3. Copie a URL de conexão
4. Configure o arquivo `.env`:

```env
DATABASE_URL="postgresql://usuario:senha@host/database?sslmode=require&channel_binding=require"
JWT_SECRET="sua-chave-secreta-jwt"
```

#### Opção B: Usar SQLite (Desenvolvimento local)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua-chave-secreta-jwt"
```

### 4. Configure o Prisma

#### Para PostgreSQL (Neon):
```bash
# Gera o cliente Prisma
npx prisma generate

# Sincroniza o schema com o banco
npx prisma db push
```

#### Para SQLite:
```bash
# Gera o cliente Prisma
npx prisma generate

# Executa as migrações
npx prisma migrate dev --name init
```

### 5. Execute o projeto
```bash
npm run dev
```

O sistema estará disponível em `http://localhost:3000` (ou porta disponível).

## 📁 Estrutura do Projeto

```
barbearia/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/              # Autenticação (login, register, logout)
│   │   │   ├── barbershops/       # Gestão de barbearias
│   │   │   ├── users/             # Gestão de usuários
│   │   │   ├── subscriptions/     # Sistema de assinaturas
│   │   │   └── config/            # Configurações do sistema
│   │   ├── auth/                  # Páginas de autenticação
│   │   ├── dashboard/             # Dashboard administrativo
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── auth/                  # Componentes de autenticação
│   │   ├── dashboard/             # Componentes do dashboard
│   │   ├── providers/             # Providers (AuthProvider)
│   │   └── ui/                    # Componentes de UI
│   ├── lib/
│   │   ├── auth.ts                # Utilitários de autenticação
│   │   ├── prisma.ts              # Cliente Prisma
│   │   └── imageUtils.ts          # Utilitários de imagem
│   └── types/                     # Tipos TypeScript
├── prisma/
│   └── schema.prisma              # Schema do banco
├── .memory-bank/                  # Documentação do projeto
│   ├── tasks/                     # Organização das sprints
│   └── ...                        # Outros arquivos de documentação
├── .env                           # Variáveis de ambiente
└── package.json
```

## 🗄️ Schema do Banco

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      UserRole @default(USER)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  barbershopId String?
  barbershop   Barbershop? @relation(fields: [barbershopId], references: [id])
}

model Barbershop {
  id          String   @id @default(cuid())
  name        String
  address     String
  phone       String
  email       String?
  logo        String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  users User[]
  services Service[]
  subscriptions Subscription[]
}

model Service {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Decimal
  duration    Int      # em minutos
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  barbershopId String
  barbershop   Barbershop @relation(fields: [barbershopId], references: [id])
}

enum UserRole {
  SUPER_ADMIN
  ADMIN
  BARBER
  USER
}

enum PaymentMethod {
  CREDIT_CARD
  DEBIT_CARD
  PIX
  CASH
}
```

## 🔌 APIs Disponíveis

### **Autenticação**
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/logout` - Logout

### **Barbearias**
- `GET /api/barbershops` - Listar barbearias
- `POST /api/barbershops` - Criar barbearia
- `GET /api/barbershops/[id]` - Buscar barbearia específica
- `PUT /api/barbershops/[id]` - Atualizar barbearia
- `DELETE /api/barbershops/[id]` - Deletar barbearia

### **Usuários**
- `GET /api/users` - Listar usuários
- `POST /api/users` - Criar usuário
- `GET /api/users/[id]` - Buscar usuário específico
- `PUT /api/users/[id]` - Atualizar usuário
- `DELETE /api/users/[id]` - Deletar usuário

### **Assinaturas**
- `GET /api/subscriptions` - Listar assinaturas
- `POST /api/subscriptions` - Criar assinatura
- `GET /api/subscriptions/[id]` - Buscar assinatura específica
- `PUT /api/subscriptions/[id]` - Atualizar assinatura

### **Configurações**
- `GET /api/config` - Buscar configurações do sistema
- `PUT /api/config` - Atualizar configurações

## 🎨 Interface

### **Dashboard Super Admin**
- Visão geral do sistema
- Estatísticas de barbearias e usuários
- Gestão de configurações globais
- Controle de onboarding interativo

### **Dashboard de Barbearia**
- Gestão de agendamentos
- Calendário interativo
- Gestão de clientes
- Relatórios e métricas

### **Funcionalidades da UI**
- **Interface responsiva** mobile-first
- **Loading states** e feedback visual
- **Formulários validados** em tempo real
- **Navegação intuitiva** com sidebar
- **Design moderno** com Tailwind CSS

## 📊 Organização do Desenvolvimento

### **Sprints e Tasks**
O projeto está organizado em sprints com tasks detalhadas. Para acessar a documentação completa das sprints:

📋 **[Ver Organização das Tasks](.memory-bank/tasks/README.md)**

### **Sprints Disponíveis**
- **Sprint 1** - Prioridade Crítica (2 semanas): Sistema básico de agendamentos
- **Sprint 2** - Alta Prioridade (3 semanas): Interfaces básicas + preparação calendário
- **Sprint 3** - Média Prioridade (3 semanas): Funcionalidades avançadas + integração calendário
- **Sprint Onboarding** - Prioridade Alta (5 semanas): Onboarding interativo completo
- **Sprint 4** - Baixa Prioridade (4 semanas): Integrações externas
- **Sprint 5** - Melhorias de UX (2 semanas): shadcn/ui e responsividade

### **Progresso Atual**
- **Total de Tasks**: 36
- **Tempo Total**: 18 semanas
- **Progresso**: 0% (0/36 tasks concluídas)

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar em produção
npm start

# Linting
npm run lint

# Prisma Studio (visualizar banco)
npx prisma studio

# Reset do banco (cuidado!)
npx prisma db push --force-reset
```

## 🔧 Configurações do Prisma

### Para desenvolvimento:
```bash
# Visualizar dados no navegador
npx prisma studio
```

### Para produção:
```bash
# Gerar cliente otimizado
npx prisma generate

# Verificar conexão
npx prisma db pull
```

## 🚨 Troubleshooting

### Erro de conexão com banco:
1. Verifique se a URL no `.env` está correta
2. Teste a conexão: `npx prisma db pull`
3. Para Neon, verifique se o SSL está configurado

### Erro de build:
1. Execute `npx prisma generate`
2. Verifique se todas as dependências estão instaladas
3. Limpe o cache: `rm -rf .next`

### Problemas de autenticação:
1. Verifique se `JWT_SECRET` está configurado
2. Teste o login via API
3. Verifique se o bcryptjs está funcionando

## 📝 Próximos Passos

### **Em Desenvolvimento**
- [ ] Sistema de agendamentos completo
- [ ] Gestão de clientes
- [ ] Calendário interativo
- [ ] Integração com calendários externos

### **Planejado**
- [ ] Onboarding interativo
- [ ] Sistema de notificações
- [ ] Relatórios avançados
- [ ] Sistema de pagamentos
- [ ] shadcn/ui para melhor UX

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ para revolucionar a gestão de barbearias**

### 📞 **Contato e Suporte**

Para dúvidas sobre o desenvolvimento:
- Revisar documentação específica de cada sprint
- Consultar arquivos de design e arquitetura
- Verificar dependências entre tasks

Para mudanças no projeto:
- Documentar alterações nos arquivos
- Atualizar dependências conforme necessário
- Comunicar mudanças à equipe
