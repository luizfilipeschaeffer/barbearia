# 📝 App de Notas - Next.js + Prisma + PostgreSQL

Um aplicativo simples de notas desenvolvido com Next.js 15, Prisma ORM e PostgreSQL (Neon), com interface moderna e funcionalidades completas de CRUD.

## 🚀 Funcionalidades

- ✅ **Criar notas** com título e conteúdo
- ✅ **Listar notas** em ordem cronológica
- ✅ **Editar notas** existentes
- ✅ **Deletar notas** com confirmação
- ✅ **Interface responsiva** com Tailwind CSS
- ✅ **Banco PostgreSQL** hospedado no Neon
- ✅ **APIs RESTful** completas

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Estilização**: Tailwind CSS
- **Ícones**: Lucide React
- **Backend**: Next.js API Routes
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL (Neon)
- **Desenvolvimento**: Turbopack

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Neon (para banco PostgreSQL)

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd nextjs-prisma
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
```

#### Opção B: Usar SQLite (Desenvolvimento local)
```env
DATABASE_URL="file:./dev.db"
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

O app estará disponível em `http://localhost:3000` (ou porta disponível).

## 📁 Estrutura do Projeto

```
nextjs-prisma/
├── src/
│   ├── app/
│   │   ├── api/notes/
│   │   │   ├── route.ts          # GET/POST notas
│   │   │   └── [id]/route.ts     # PUT/DELETE nota específica
│   │   ├── layout.tsx
│   │   └── page.tsx              # Interface principal
│   ├── components/
│   │   ├── NoteForm.tsx          # Formulário de notas
│   │   └── NoteCard.tsx          # Card de exibição
│   └── lib/
│       └── prisma.ts             # Configuração do Prisma
├── prisma/
│   └── schema.prisma             # Schema do banco
├── .env                          # Variáveis de ambiente
└── package.json
```

## 🗄️ Schema do Banco

```prisma
model Note {
  id        String   @id @default(cuid())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔌 APIs Disponíveis

### GET `/api/notes`
Lista todas as notas ordenadas por data de criação.

**Resposta:**
```json
[
  {
    "id": "clx123...",
    "title": "Minha Nota",
    "content": "Conteúdo da nota",
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-01T10:00:00Z"
  }
]
```

### POST `/api/notes`
Cria uma nova nota.

**Body:**
```json
{
  "title": "Título da nota",
  "content": "Conteúdo da nota"
}
```

### PUT `/api/notes/[id]`
Atualiza uma nota existente.

**Body:**
```json
{
  "title": "Novo título",
  "content": "Novo conteúdo"
}
```

### DELETE `/api/notes/[id]`
Deleta uma nota.

## 🎨 Interface

### Funcionalidades da UI:
- **Formulário responsivo** para criar/editar notas
- **Cards de notas** com design moderno
- **Botões de ação** (editar/deletar) em cada nota
- **Loading states** e feedback visual
- **Confirmação** antes de deletar
- **Formatação de data** em português

### Componentes:
- `NoteForm`: Formulário de criação/edição
- `NoteCard`: Exibição individual de cada nota
- `page.tsx`: Interface principal com lógica de estado

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

### Problemas de performance:
1. Use `npx prisma studio` para verificar queries
2. Considere usar Prisma Accelerate para produção
3. Otimize queries com `select` e `include`

## 📝 Próximos Passos

- [ ] Adicionar autenticação
- [ ] Implementar categorias/tags
- [ ] Adicionar busca e filtros
- [ ] Implementar markdown no conteúdo
- [ ] Adicionar upload de imagens
- [ ] Implementar compartilhamento de notas

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ usando Next.js + Prisma + PostgreSQL**
