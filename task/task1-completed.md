# 📄 Instruções Detalhadas para Implementação do Módulo de Controle de Assinaturas das Barbearias

## Objetivo

Desenvolver um módulo de **controle de assinaturas** para barbearias, garantindo o gerenciamento completo das informações relacionadas à assinatura de cada barbearia e a administração dos tipos de assinatura disponíveis no sistema.

---

## Funcionalidades a serem contempladas

O módulo deve permitir:

- **Gerenciar os tipos de assinatura disponíveis no sistema** (ex: Básico, Profissional, Premium, Sob Encomenda), incluindo a possibilidade de criar, editar, publicar/despublicar e excluir tipos de assinatura.
- **Definir se um tipo de assinatura está publicado** (campo booleano `isPublished`), controlando quais tipos ficam visíveis e disponíveis para seleção pelas barbearias.
- **Vincular cada assinatura de barbearia a um tipo de assinatura cadastrado**.
- **Controlar e armazenar as seguintes informações para cada assinatura ativa de barbearia:**
  - Tipo de assinatura selecionado (`subscriptionTypeId` ou similar, referenciando o tipo de assinatura)
  - Quantidade máxima de funcionários permitidos (`allowedUsers`)
  - Quantidade máxima de filiais permitidas (`allowedBranches`)
  - Data de início da assinatura (`startDate`)
  - Data da próxima cobrança/fatura (`nextBillingDate`)
  - Data de bloqueio da assinatura (`blockDate`)
  - Forma de pagamento utilizada (`paymentMethod`), como cartão de crédito, boleto ou pix

---

## 1. Atualização do Schema Prisma

### a) Modelo de Tipos de Assinatura

Crie um novo modelo `SubscriptionType` no arquivo `prisma/schema.prisma` com os seguintes campos obrigatórios:

- `id` (`String`, @id, @default(cuid()))
- `name` (`String`): nome do tipo de assinatura (ex: Básico, Profissional, Premium)
- `description` (`String?`): descrição opcional do tipo de assinatura
- `allowedUsers` (`Int`): quantidade máxima de funcionários permitidos
- `allowedBranches` (`Int`): quantidade máxima de filiais permitidas
- `isPublished` (`Boolean`, @default(false)): define se o tipo de assinatura está publicado e disponível para seleção
- `createdAt` (`DateTime`, @default(now()))
- `updatedAt` (`DateTime`, @updatedAt)

### b) Modelo de Assinatura da Barbearia

Crie um modelo `Subscription` com os seguintes campos obrigatórios:

- `id` (`String`, @id, @default(cuid()))
- `barbershopId` (`String`): referência à barbearia assinante
- `subscriptionTypeId` (`String`): referência ao tipo de assinatura selecionado
- `startDate` (`DateTime`): data de início da assinatura
- `nextBillingDate` (`DateTime`): data da próxima cobrança
- `blockDate` (`DateTime`): data de bloqueio da assinatura
- `paymentMethod` (`String` ou enum): forma de pagamento utilizada

**Relacionamentos:**
- Relacione `Subscription` com `Barbershop` e `SubscriptionType` via foreign keys.

### c) Enum para Métodos de Pagamento (opcional, recomendado)

Para padronizar os métodos de pagamento, crie um enum `PaymentMethod` com valores como: `CREDIT_CARD`, `BOLETO`, `PIX`. Utilize esse enum no campo `paymentMethod` do modelo `Subscription`.

### d) Armazenamento seguro de dados de cartão de crédito (se necessário)

- Nunca armazene dados sensíveis de cartão em texto puro.
- Caso necessário, crie campos como `cardToken` ou `encryptedCardData` para armazenar apenas tokens ou dados criptografados.
- Utilize sempre bibliotecas ou serviços de tokenização e criptografia adequados.

---

## Resumo das ações obrigatórias

- Adicionar o modelo `SubscriptionType` para gerenciar e publicar tipos de assinatura.
- Adicionar o campo `isPublished` em `SubscriptionType` para controlar a publicação.
- Adicionar o modelo `Subscription` para registrar as assinaturas das barbearias, referenciando o tipo de assinatura.
- Incluir o campo `paymentMethod` como `String` ou enum padronizado.
- Criar o enum `PaymentMethod` se optar por padronizar.
- Garantir segurança no armazenamento de dados sensíveis, se necessário.

Essas orientações garantem clareza, padronização e flexibilidade para gerenciar tanto os tipos de assinatura disponíveis quanto as assinaturas ativas das barbearias, evitando ambiguidades e erros de interpretação.