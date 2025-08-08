# Manual de Desenvolvimento: Onboarding de Cadastro da Barbearia (Etapas Interativas + Sincronização de Agenda)

## Objetivo

Desenvolver um fluxo de onboarding para cadastro de barbearias na plataforma, utilizando um formato de etapas (wizard/multistep form). O objetivo é garantir que o usuário compreenda a importância de cada informação solicitada, promovendo uma experiência interativa, clara e educativa, resultando em dados de alta qualidade para a operação da plataforma.

**Novos requisitos:**
- Adicionar etapa para sincronizar a agenda do dono da barbearia com o calendário Google ou Apple.
- Permitir habilitar ou desabilitar o onboarding interativo pelo painel do super admin nas configurações do sistema.

---

## Segmentação em Subtarefas

Para garantir uma implementação robusta, organizada e evitar falhas, o desenvolvimento deste fluxo de onboarding deve ser segmentado nas seguintes subtarefas:

### 1. Levantamento e Validação de Requisitos
- Revisar todos os requisitos funcionais e não funcionais do onboarding.
- Validar com o Product Owner as regras de negócio, especialmente sobre etapas puláveis e obrigatórias.
- Confirmar endpoints e contratos de API necessários (criação de barbearia, upload de logo, integração de calendário, configuração do onboarding).

### 2. Estruturação do Fluxo de Etapas (Wizard)
- Definir a estrutura dos componentes React para cada etapa.
- Implementar navegação entre etapas, controle de progresso e lógica para etapas obrigatórias e puláveis.
- Garantir que etapas puláveis estejam claramente identificadas no código e na interface, com instruções para o usuário e comentários para desenvolvedores.

### 3. Implementação de Componentes de UI/UX
- Criar componentes reutilizáveis: barra de progresso, inputs, upload de imagem, seleção de horários, lista de serviços, lista de equipe, botões de sincronização de agenda, etc.
- Garantir responsividade e acessibilidade (uso de ARIA labels, navegação por teclado).
- Adicionar tooltips, cards explicativos e feedback visual (erros, sucesso, loading).

### 4. Validação e Persistência de Dados
- Implementar validação de campos obrigatórios e formatos em cada etapa.
- Adicionar máscaras para telefone, CEP e preço.
- Salvar dados temporariamente (useState/useReducer/localStorage) para evitar perda de informações.

### 5. Integração com Backend
- Integrar com API para criação de barbearia, upload de logo e integração de calendário.
- Implementar endpoints para OAuth2 (Google/Apple Calendar), incluindo armazenamento seguro de tokens e revogação.
- Validar duplicidade de email/telefone no backend, se aplicável.
- Consultar configuração de onboarding interativo antes de exibir o fluxo.

### 6. Implementação da Sincronização de Agenda
- Implementar fluxo OAuth2 para Google e Apple Calendar.
- Exibir status da sincronização (conectado/desconectado).
- Garantir segurança e privacidade dos dados do usuário.
- Adicionar opção clara para pular a etapa, explicando benefícios e possibilidade de configurar depois.

### 7. Revisão, Edição e Finalização
- Implementar etapa de revisão dos dados preenchidos, com possibilidade de editar etapas anteriores.
- Exibir mensagem de sucesso e orientações para próximos passos ao finalizar o onboarding.

### 8. Configuração e Controle do Onboarding Interativo
- Implementar lógica para habilitar/desabilitar o onboarding interativo conforme configuração do sistema (consultar via API).
- Garantir que, se desabilitado, o usuário seja redirecionado para o cadastro tradicional.

### 9. Testes e Validação Final
- Testar o fluxo completo em diferentes dispositivos e navegadores.
- Validar textos de ajuda, mensagens de erro e sucesso.
- Garantir que etapas puláveis estejam documentadas no código e na interface.

### 10. Documentação e Comentários no Código
- Adicionar comentários claros nos componentes das etapas puláveis, indicando que podem ser puladas e completadas depois pelo usuário.
- Documentar pontos customizados e decisões técnicas.

---

## Visão Geral do Fluxo (Resumo das Etapas)

1. **Boas-vindas e Introdução** (obrigatória)
2. **Dados Básicos da Barbearia** (obrigatória)
3. **Logo e Identidade Visual** (pode ser pulada)
4. **Configurações de Funcionamento** (pode ser pulada)
5. **Equipe** (opcional, pode ser pulada)
6. **Sincronização de Agenda (Google/Apple)** (pode ser pulada)
7. **Revisão e Confirmação**
8. **Finalização**

---

## Checklist para o Desenvolvedor (Organizado por Subtarefas)

### 1. Estruturação e UI
- [ ] Estruturar componentes do wizard conforme etapas.
- [ ] Implementar barra de progresso e navegação.
- [ ] Adicionar explicações/contexto em cada etapa.
- [ ] Garantir responsividade e acessibilidade.

### 2. Validação e Persistência
- [ ] Validar campos obrigatórios e formatos.
- [ ] Implementar feedback visual (erros, sucesso, loading).
- [ ] Salvar dados temporariamente para evitar perda.

### 3. Integração e Sincronização
- [ ] Integrar com API para criação de barbearia, upload de logo e integração de calendário.
- [ ] Implementar fluxo OAuth2 para Google e Apple Calendar.
- [ ] Exibir status da sincronização e permitir revogação.

### 4. Controle de Onboarding Interativo
- [ ] Consultar configuração de onboarding interativo antes de exibir o fluxo.
- [ ] Redirecionar para cadastro tradicional se onboarding interativo estiver desabilitado.

### 5. Experiência do Usuário e Documentação
- [ ] Testar fluxo completo e revisar textos de ajuda.
- [ ] Adicionar comentários/instruções nos componentes das etapas puláveis indicando que podem ser puladas e preenchidas depois pelo usuário.
- [ ] Documentar pontos customizados no código.

---

## Pontos de Atenção

- Dividir o fluxo em etapas curtas e objetivas para não sobrecarregar o usuário.
- Garantir explicações claras sobre o motivo de cada dado solicitado.
- Sempre informar ao usuário e documentar no código as etapas que podem ser puladas e completadas depois.
- Seguir as melhores práticas de segurança e privacidade, especialmente na integração OAuth2.
- Validar a configuração do onboarding interativo antes de iniciar o fluxo.
- Testar em diferentes dispositivos e navegadores.

---

## Observações Finais

- Consulte o arquivo `projectbrief.md` e demais arquivos do Memory Bank para entender o contexto do produto e requisitos de negócio.
- Mantenha o código limpo, documentado e reutilizável.
- Em caso de dúvidas sobre regras de negócio, consulte o Product Owner ou revise os arquivos de contexto do projeto.
- A integração de calendário é um diferencial importante para a plataforma, garanta que a experiência seja fluida, segura e bem explicada ao usuário.
- A configuração de habilitar/desabilitar o onboarding interativo deve ser facilmente acessível e editável pelo super admin no painel de configurações.
- Para etapas puláveis, sempre documente no código/componentes que podem ser puladas e completadas depois pelo usuário.
- **Ao finalizar a implementação de qualquer funcionalidade ou ajuste descrito neste manual, lembre-se de atualizar o memory-bank do projeto, garantindo que toda nova funcionalidade, solução técnica ou decisão relevante esteja devidamente documentada. O memory-bank deve sempre refletir o estado atual e detalhado da plataforma, facilitando o entendimento e a continuidade do desenvolvimento por toda a equipe.**
