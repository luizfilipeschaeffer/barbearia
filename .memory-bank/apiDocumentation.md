# API Documentation - Sistema de Barbearia

## Autenticação

### POST `/api/auth/login`
**Descrição**: Autentica um usuário e retorna um token JWT

**Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response** (200):
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "SUPER_ADMIN|ADMIN|BARBER|USER"
  }
}
```

**Response** (401):
```json
{
  "error": "Credenciais inválidas"
}
```

### POST `/api/auth/logout`
**Descrição**: Faz logout do usuário (limpa token no cliente)

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "message": "Logout realizado com sucesso"
}
```

### POST `/api/auth/register`
**Descrição**: Registra um novo usuário

**Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "SUPER_ADMIN|ADMIN|BARBER|USER"
}
```

**Response** (201):
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "createdAt": "string"
}
```

## Usuários

### GET `/api/users`
**Descrição**: Lista todos os usuários com paginação

**Query Parameters**:
- `page` (number): Página atual (default: 1)
- `limit` (number): Itens por página (default: 10)
- `search` (string): Busca por nome ou email

**Response** (200):
```json
{
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "isActive": "boolean",
      "barbershopId": "string|null",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "pages": "number"
  }
}
```

### POST `/api/users`
**Descrição**: Cria um novo usuário

**Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "barbershopId": "string|null"
}
```

**Response** (201):
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "isActive": "boolean",
  "barbershopId": "string|null",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### GET `/api/users/[id]`
**Descrição**: Busca um usuário específico

**Response** (200):
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "isActive": "boolean",
  "barbershopId": "string|null",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### PUT `/api/users/[id]`
**Descrição**: Atualiza um usuário

**Body**:
```json
{
  "name": "string",
  "email": "string",
  "role": "string",
  "isActive": "boolean",
  "barbershopId": "string|null"
}
```

**Response** (200):
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "isActive": "boolean",
  "barbershopId": "string|null",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### DELETE `/api/users/[id]`
**Descrição**: Remove um usuário

**Response** (200):
```json
{
  "message": "Usuário removido com sucesso"
}
```

## Barbearias

### GET `/api/barbershops`
**Descrição**: Lista todas as barbearias com paginação

**Query Parameters**:
- `page` (number): Página atual (default: 1)
- `limit` (number): Itens por página (default: 10)
- `search` (string): Busca por nome ou endereço

**Response** (200):
```json
{
  "barbershops": [
    {
      "id": "string",
      "name": "string",
      "address": "string",
      "phone": "string",
      "email": "string|null",
      "logo": "string|null",
      "isActive": "boolean",
      "createdAt": "string",
      "updatedAt": "string",
      "_count": {
        "users": "number"
      }
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "pages": "number"
  }
}
```

### POST `/api/barbershops`
**Descrição**: Cria uma nova barbearia

**Body**:
```json
{
  "name": "string",
  "address": "string",
  "phone": "string",
  "email": "string|null",
  "logo": "string|null"
}
```

**Response** (201):
```json
{
  "id": "string",
  "name": "string",
  "address": "string",
  "phone": "string",
  "email": "string|null",
  "logo": "string|null",
  "isActive": "boolean",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### GET `/api/barbershops/[id]`
**Descrição**: Busca uma barbearia específica

**Response** (200):
```json
{
  "id": "string",
  "name": "string",
  "address": "string",
  "phone": "string",
  "email": "string|null",
  "logo": "string|null",
  "isActive": "boolean",
  "createdAt": "string",
  "updatedAt": "string",
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string"
    }
  ]
}
```

### PUT `/api/barbershops/[id]`
**Descrição**: Atualiza uma barbearia

**Body**:
```json
{
  "name": "string",
  "address": "string",
  "phone": "string",
  "email": "string|null",
  "logo": "string|null",
  "isActive": "boolean"
}
```

**Response** (200):
```json
{
  "id": "string",
  "name": "string",
  "address": "string",
  "phone": "string",
  "email": "string|null",
  "logo": "string|null",
  "isActive": "boolean",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### DELETE `/api/barbershops/[id]`
**Descrição**: Remove uma barbearia

**Response** (200):
```json
{
  "message": "Barbearia removida com sucesso"
}
```

## Assinaturas

### GET `/api/subscriptions`
**Descrição**: Lista todas as assinaturas

**Response** (200):
```json
[
  {
    "id": "string",
    "barbershopId": "string",
    "subscriptionTypeId": "string",
    "startDate": "string",
    "nextBillingDate": "string",
    "blockDate": "string",
    "paymentMethod": "CREDIT_CARD|BOLETO|PIX",
    "barbershop": {
      "id": "string",
      "name": "string"
    },
    "subscriptionType": {
      "id": "string",
      "name": "string",
      "allowedUsers": "number",
      "allowedBranches": "number"
    }
  }
]
```

### POST `/api/subscriptions`
**Descrição**: Cria uma nova assinatura

**Body**:
```json
{
  "barbershopId": "string",
  "subscriptionTypeId": "string",
  "startDate": "string",
  "nextBillingDate": "string",
  "blockDate": "string",
  "paymentMethod": "CREDIT_CARD|BOLETO|PIX"
}
```

**Response** (201):
```json
{
  "id": "string",
  "barbershopId": "string",
  "subscriptionTypeId": "string",
  "startDate": "string",
  "nextBillingDate": "string",
  "blockDate": "string",
  "paymentMethod": "string"
}
```

### GET `/api/subscriptions/[id]`
**Descrição**: Busca uma assinatura específica

**Response** (200):
```json
{
  "id": "string",
  "barbershopId": "string",
  "subscriptionTypeId": "string",
  "startDate": "string",
  "nextBillingDate": "string",
  "blockDate": "string",
  "paymentMethod": "string",
  "barbershop": {
    "id": "string",
    "name": "string"
  },
  "subscriptionType": {
    "id": "string",
    "name": "string"
  }
}
```

## Tipos de Assinatura

### GET `/api/subscription-types`
**Descrição**: Lista todos os tipos de assinatura

**Response** (200):
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string|null",
    "allowedUsers": "number",
    "allowedBranches": "number",
    "isPublished": "boolean",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

### GET `/api/subscription-types/published`
**Descrição**: Lista apenas tipos de assinatura publicados

**Response** (200):
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string|null",
    "allowedUsers": "number",
    "allowedBranches": "number",
    "isPublished": "boolean"
  }
]
```

### POST `/api/subscription-types`
**Descrição**: Cria um novo tipo de assinatura

**Body**:
```json
{
  "name": "string",
  "description": "string|null",
  "allowedUsers": "number",
  "allowedBranches": "number",
  "isPublished": "boolean"
}
```

**Response** (201):
```json
{
  "id": "string",
  "name": "string",
  "description": "string|null",
  "allowedUsers": "number",
  "allowedBranches": "number",
  "isPublished": "boolean",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### GET `/api/subscription-types/[id]`
**Descrição**: Busca um tipo de assinatura específico

**Response** (200):
```json
{
  "id": "string",
  "name": "string",
  "description": "string|null",
  "allowedUsers": "number",
  "allowedBranches": "number",
  "isPublished": "boolean",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### PUT `/api/subscription-types/[id]`
**Descrição**: Atualiza um tipo de assinatura

**Body**:
```json
{
  "name": "string",
  "description": "string|null",
  "allowedUsers": "number",
  "allowedBranches": "number",
  "isPublished": "boolean"
}
```

**Response** (200):
```json
{
  "id": "string",
  "name": "string",
  "description": "string|null",
  "allowedUsers": "number",
  "allowedBranches": "number",
  "isPublished": "boolean",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## Configurações do Sistema

### GET `/api/config`
**Descrição**: Busca configurações do sistema

**Query Parameters**:
- `key` (string): Chave da configuração

**Response** (200):
```json
{
  "id": "string",
  "key": "string",
  "value": "string",
  "description": "string|null",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## Códigos de Status HTTP

- **200**: Sucesso
- **201**: Criado com sucesso
- **400**: Bad Request (dados inválidos)
- **401**: Unauthorized (credenciais inválidas)
- **404**: Not Found (recurso não encontrado)
- **500**: Internal Server Error (erro interno)

## Headers Comuns

### Autenticação
```
Authorization: Bearer <jwt_token>
```

### Content-Type
```
Content-Type: application/json
```

## Tratamento de Erros

### Formato de Erro
```json
{
  "error": "Mensagem de erro descritiva"
}
```

### Exemplos de Erro
```json
{
  "error": "Credenciais inválidas"
}
```

```json
{
  "error": "Usuário não encontrado"
}
```

```json
{
  "error": "Erro interno do servidor"
}
```

