# Project Brief - Plataforma para Gestão de Barbearias

## Visão Geral
Estamos construindo uma plataforma digital voltada para donos de barbearia, cujo objetivo é oferecer um sistema robusto e moderno para que eles possam melhorar a gestão de seus negócios e, consequentemente, proporcionar uma experiência superior aos seus próprios clientes. Nosso produto é um sistema completo de gestão, pensado para atender as necessidades dos proprietários de barbearias, facilitando o controle do dia a dia e impulsionando o crescimento do negócio.

## Objetivos Principais
- Permitir que donos de barbearia gerenciem o cadastro de seus clientes
- Controlar e organizar os serviços e produtos oferecidos pela barbearia
- Disponibilizar um sistema de agendamento de horários integrado à agenda da barbearia
- Integrar a agenda Google e a agenda Apple do dono da barbearia ao sistema, permitindo sincronização bidirecional de compromissos
- Permitir que, ao criar um agendamento para um cliente (seja pelo gestor ou pelo próprio cliente via sistema público), o evento seja automaticamente criado no calendário Google/Apple do barbeiro responsável, evitando conflitos de horários
- Expor de forma clara e simplificada os horários disponíveis para o cliente no sistema de agendamento público, facilitando a escolha e reduzindo chances de sobreposição
- Gerenciar assinaturas das barbearias (planos, limites, status)
- Oferecer controle financeiro e relatórios detalhados para o dono da barbearia
- Proporcionar uma interface moderna, responsiva e intuitiva para o gestor
- Disponibilizar sistema de notificações para clientes e equipe da barbearia

## Escopo do Projeto
- Frontend: Next.js 15 + TypeScript + Tailwind CSS
- Backend: Next.js API Routes + Prisma ORM
- Banco: PostgreSQL (Neon)
- UI: Componentes customizados + Lucide React
- Autenticação: JWT + bcryptjs
- Integração com APIs do Google Calendar e Apple Calendar para sincronização de agendas do dono da barbearia e criação de eventos de agendamento

## Funcionalidades Core
1. **Sistema de Autenticação e Autorização**
   - Login/logout com JWT
   - Controle de roles (SUPER_ADMIN, ADMIN, BARBER, USER)
   - Proteção de rotas por perfil
   - Context API para gerenciamento de estado de autenticação

2. **Gestão de Usuários e Barbearias**
   - Cadastro e gestão de usuários
   - Cadastro e gestão de barbearias
   - Relacionamento usuário-barbearia
   - Controle de status ativo/inativo

3. **Sistema de Assinaturas**
   - Tipos de assinatura com limites (usuários, filiais)
   - Controle de assinaturas ativas
   - Métodos de pagamento (CREDIT_CARD, BOLETO, PIX)
   - Controle de datas de cobrança e bloqueio

4. **Gestão de Serviços**
   - Catálogo de serviços por barbearia
   - Definição de preços, duração e disponibilidade
   - Categorização e controle de status

5. **Sistema de Agendamento e Agenda**
   - Calendário interativo para cada barbearia
   - Gerenciamento de horários disponíveis por profissional e serviço
   - Confirmação, cancelamento e histórico de agendamentos
   - Visualização e controle da agenda diária, semanal e mensal
   - Integração e sincronização bidirecional com Google Calendar e Apple Calendar do dono da barbearia
   - Criação automática de eventos na agenda Google/Apple do barbeiro ao agendar um serviço para um cliente, seja pelo gestor ou pelo sistema público de agendamento
   - Exposição dos horários disponíveis de cada barbeiro de forma clara para o cliente, evitando conflitos e simplificando o processo de agendamento

6. **Dashboard Administrativo**
   - Visão geral do negócio e da assinatura para o dono da barbearia
   - Relatórios financeiros e de performance
   - Métricas de uso, agendamentos e faturamento
   - Estatísticas em tempo real

## Tecnologias Confirmadas
- Next.js 15 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- Tailwind CSS
- shadcn/ui (a ser configurado)
- Lucide React (ícones)
- JWT + bcryptjs (autenticação)
- Integração com Google Calendar API e Apple Calendar API

## Estado Atual
O projeto já possui uma base sólida implementada:

### ✅ Implementado
- Sistema de autenticação completo (JWT + bcryptjs)
- Estrutura de usuários e roles
- Schema de banco para barbearias, usuários, assinaturas
- APIs RESTful para usuários, barbearias, assinaturas
- Dashboard super-admin funcional
- Interface responsiva com Tailwind CSS
- Sistema de providers para autenticação
- Componentes de UI básicos (Header, Sidebar, DashboardStats)

### 🔄 Em Desenvolvimento
- Sistema de agendamentos
- Integração com calendários externos
- Relatórios e métricas avançadas
- Interface para clientes finais

### 📋 Próximos Passos
- Implementar sistema de agendamentos
- Criar interface para gestão de clientes
- Desenvolver integração com Google/Apple Calendar
- Implementar sistema de notificações
- Criar relatórios e dashboards avançados