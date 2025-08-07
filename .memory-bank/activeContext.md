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
