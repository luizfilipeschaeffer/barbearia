# UI Patterns - Sistema de Barbearia

## Paleta de Cores

### Cores Principais
- **Background**: `#ffffff` (branco) / `#0a0a0a` (escuro)
- **Foreground**: `#171717` (preto) / `#ededed` (branco)
- **Primary**: Tons de cinza para elementos principais

### Cores de Status
- **Sucesso**: `bg-green-500` (#10b981)
- **Aviso**: `bg-yellow-500` (#f59e0b)
- **Erro**: `bg-red-500` (#ef4444)
- **Info**: `bg-blue-500` (#3b82f6)
- **Roxo**: `bg-purple-500` (#8b5cf6)

### Gradientes
- **Loading/Manutenção**: `bg-gradient-to-br from-gray-900 via-gray-800 to-black`
- **Cards**: Fundo branco com sombra sutil

## Tipografia

### Fontes
- **Sans**: Geist Sans (variável: `--font-geist-sans`)
- **Mono**: Geist Mono (variável: `--font-geist-mono`)
- **Fallback**: Arial, Helvetica, sans-serif

### Tamanhos
- **Títulos**: `text-3xl`, `text-2xl`, `text-xl`
- **Subtítulos**: `text-lg`
- **Corpo**: `text-base`, `text-sm`
- **Pequeno**: `text-xs`

## Componentes de Design

### Cards
```css
/* Padrão de card */
bg-white p-6 rounded-lg shadow
```

### Botões
```css
/* Botão primário */
px-6 py-3 text-sm font-medium transition-colors
bg-gray-700 text-white hover:bg-gray-600

/* Botão secundário */
text-gray-300 hover:bg-gray-700 hover:text-white
```

### Sidebar
```css
/* Sidebar principal */
w-64 bg-gray-800 text-white
```

### Header
```css
/* Header do dashboard */
bg-white shadow-sm border-b border-gray-200
```

## Estados de Interface

### Loading States
```jsx
// Spinner padrão
<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>

// Skeleton loading
<div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
```

### Estados de Botão
```jsx
// Botão com loading
disabled={isLoading}
className="disabled:opacity-50 disabled:cursor-not-allowed"

// Botão com spinner
{isLoading ? (
  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
) : (
  <Icon className="w-5 h-5 mr-3" />
)}
```

## Layout Patterns

### Dashboard Layout
```jsx
<div className="flex h-screen bg-gray-100">
  <Sidebar />
  <div className="flex-1 flex flex-col overflow-hidden">
    <Header />
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
      {children}
    </main>
  </div>
</div>
```

### Grid de Cards
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Cards de estatísticas */}
</div>
```

### Formulários
```jsx
// Container de formulário
<div className="space-y-6">
  <div>
    <h1 className="text-3xl font-bold text-gray-900">
      Título
    </h1>
    <p className="text-gray-600 mt-2">
      Descrição
    </p>
  </div>
  {/* Campos do formulário */}
</div>
```

## Responsividade

### Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### Grid Responsivo
```css
/* 1 coluna no mobile, 2 no tablet, 4 no desktop */
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

## Ícones

### Biblioteca
- **Lucide React**: Biblioteca principal de ícones
- **Tamanhos**: `w-5 h-5`, `w-6 h-6`
- **Cores**: `text-white`, `text-gray-500`, `text-gray-300`

### Ícones Comuns
- **Usuários**: `<Users />`
- **Barbearias**: `<Building2 />`
- **Calendário**: `<Calendar />`
- **Dinheiro**: `<DollarSign />`
- **Configurações**: `<Settings />`
- **Logout**: `<LogOut />`

## Animações

### Transições
```css
/* Transição suave */
transition-colors

/* Animação de loading */
animate-spin

/* Animação de pulse para skeleton */
animate-pulse
```

### Estados Hover
```css
/* Hover em links */
hover:bg-gray-700 hover:text-white

/* Hover em botões */
hover:bg-gray-600
```

## Acessibilidade

### Contraste
- **Texto sobre fundo claro**: Preto (#171717)
- **Texto sobre fundo escuro**: Branco (#ededed)
- **Texto secundário**: Cinza (#6b7280)

### Estados Interativos
- **Focus**: Bordas azuis para navegação por teclado
- **Disabled**: Opacidade reduzida e cursor not-allowed
- **Loading**: Spinner e texto indicativo

## Dark Mode

### Suporte
- **Detecção automática**: `prefers-color-scheme`
- **Variáveis CSS**: Para fácil troca de tema
- **Componentes**: Adaptáveis a ambos os temas

### Variáveis CSS
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

## Padrões de Espaçamento

### Margens e Padding
- **Container**: `p-6`
- **Seções**: `space-y-6`
- **Cards**: `p-6`
- **Botões**: `px-6 py-3`
- **Links**: `px-6 py-3`

### Gap
- **Grid**: `gap-6`
- **Flex**: `space-x-4`, `space-y-2`

## Consistência Visual

### Bordas
- **Cards**: `rounded-lg`
- **Botões**: `rounded`
- **Inputs**: `rounded`

### Sombras
- **Cards**: `shadow`
- **Header**: `shadow-sm`

### Cores de Texto
- **Primário**: `text-gray-900`
- **Secundário**: `text-gray-600`
- **Terciário**: `text-gray-500`
- **Invertido**: `text-white`
