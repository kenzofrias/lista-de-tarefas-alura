# Lista de Tarefas (To-Do List)

Aplicação web minimalista de gerenciamento de tarefas desenvolvida com **HTML5, CSS3 e JavaScript (Vanilla)**.

## Funcionalidades

1. **Adição de Tarefas com Descrição Opcional:**
   - Permite informar o título obrigatório (`#campoTarefa`) e uma descrição opcional (`#campoDescricao`).
   - Suporta adição via clique no botão **Adicionar** ou pressionando a tecla `Enter` no campo de título.
   - Bloqueia a criação de tarefas com título vazio ou composto apenas por espaços em branco.

2. **Edição Inline de Tarefas (`Editar` / `Salvar`):**
   - Cada item possui um botão **Editar** posicionado ao lado dos botões **Concluir** e **Remover**.
   - Permite editar tanto o título quanto a descrição opcional diretamente no item da lista.

3. **Conclusão e Reordenação Automática (`Concluir`):**
   - Ao marcar uma tarefa como concluída, ela recebe estilização visual (`line-through`) e é movida automaticamente para o **final da lista**.
   - Ao desmarcar uma tarefa concluída, ela retorna para a seção de tarefas pendentes (antes da primeira tarefa concluída).

4. **Expiração Automática de Concluídas após 30 Dias sem Interação:**
   - Cada tarefa armazena o timestamp da sua última interação (`data-ultima-interacao`).
   - Qualquer ação na tarefa (criar, concluir/reabrir ou editar) atualiza o timestamp de interação.
   - Tarefas concluídas que permanecerem por **30 dias** (`TRINTA_DIAS_MS`) sem nenhuma interação são excluídas automaticamente (verificação na inicialização, em cada ação e periodicamente a cada minuto).

5. **Remoção Individual (`Remover`):**
   - Permite excluir imediatamente qualquer tarefa da lista.

## Estrutura do Projeto

- [`src/index.html`](src/index.html): Estrutura semântica com campos de título, descrição opcional e container da lista.
- [`src/style.css`](src/style.css): Estilização do card centralizado, estados de conclusão, modo de edição inline e botões de ação.
- [`src/script.js`](src/script.js): Lógica de manipulação do DOM, eventos, ordenação de tarefas concluídas e controle de expiração de 30 dias.

## Critérios de Teste e Validação

- [x] **CT-01:** Adição de nova tarefa via clique em `#btnAdicionar` ou tecla `Enter`.
- [x] **CT-02:** Bloqueio de adição de tarefas vazias ou apenas com espaços em branco.
- [x] **CT-03:** Suporte a descrição opcional (`#campoDescricao`) na criação da tarefa.
- [x] **CT-04:** Alternância do estado concluída/pendente com indicação visual (`.concluida`).
- [x] **CT-05:** Movimentação imediata da tarefa para o final da lista ao ser concluída.
- [x] **CT-06:** Botão **Editar** ao lado de **Concluir** e **Remover** com edição inline de título e descrição.
- [x] **CT-07:** Atualização de timestamp de última interação (`data-ultima-interacao`) ao criar, concluir ou editar.
- [x] **CT-08:** Exclusão automática de tarefas concluídas após 30 dias sem qualquer interação.
- [x] **CT-09:** Remoção individual de tarefas da lista.
- [x] **CT-10:** Carregamento dos arquivos estáticos e resposta HTTP 200 no servidor local.
