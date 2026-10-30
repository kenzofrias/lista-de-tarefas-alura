# Skill: Criar Aplicação de Lista de Tarefas

## Objetivo
Instruir o agente sobre o fluxo de geração dos arquivos da aplicação na pasta `src/`.

## Instruções de Execução

1. **Consultar Convenções:**
   - Leia `.agents/skills/criar-app-tarefas/references/guia-javascript.md` para garantir o padrão básico de implementação em JS.

2. **Estruturar o HTML (`src/index.html`):**
   - Utilize a estrutura contida em `.agents/skills/criar-app-tarefas/assets/index.html.template`.
   - Garanta a presenca do campo de texto, botão de adição e a lista não ordenada (`<ul>`).

3. **Estilizar a Interface (`src/style.css`):**
   - Aplique estilos essenciais para centralização do layout e legibilidade.
   - Inclua a classe visual para tarefas concluídas (`text-decoration: line-through`).

4. **Implementar a Lógica (`src/script.js`):**
   - Realize a manipulação do DOM para inserção, alteração e remoção de elementos `<li>`.
   - Mapeie os eventos de clique e teclado necessários.

5. **Validação:**
   - Execute a verificação de acordo com a checklist descrita no `AGENTS.md`.
