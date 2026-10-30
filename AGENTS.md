# Diretrizes Gerais do Agente

## Objetivo
Orientar o agente de IA na criação de uma aplicação web básica de lista de tarefas (ToDo List).

## Contexto
A aplicação deve ser uma implementação web minimalista e direta, utilizando **HTML5, CSS3 e JavaScript (Vanilla)** em arquivos separados, sem abstrações ou bibliotecas adicionais.

## Restrições
- **Sem dependências externas:** Proibido o uso de frameworks ou bibliotecas (como React, Vue, Tailwind, Bootstrap, jQuery, etc.).
- **Separação de arquivos:** A estrutura deve manter o HTML (`index.html`), o estilo (`style.css`) e o script (`script.js`) em arquivos distintos.
- **Armazenamento:** Não utilizar banco de dados ou serviços externos.
- **Escopo:** Limitar a implementação estritamente às funcionalidades solicitadas (adicionar, concluir e remover).

## Critérios de Teste e Validação
- [x] **CT-01:** Permite adicionar uma nova tarefa via clique no botão ou pressionando `Enter`.
- [x] **CT-02:** Impede a adição de tarefas vazias ou compostas apenas por espaços em branco.
- [x] **CT-03:** Permite informar uma descrição opcional ao adicionar uma nova tarefa.
- [x] **CT-04:** Permite alternar o estado de uma tarefa para concluída/pendente com indicação visual (`line-through`).
- [x] **CT-05:** Move automaticamente a tarefa para o final da lista ao ser marcada como concluída.
- [x] **CT-06:** Exibe botão de edição ao lado dos botões de concluir e remover, permitindo editar o título e a descrição inline.
- [x] **CT-07:** Atualiza o registro de última interação da tarefa ao criá-la, concluí-la ou editá-la.
- [x] **CT-08:** Exclui automaticamente tarefas concluídas que permanecerem por 30 dias sem qualquer interação.
- [x] **CT-09:** Permite remover uma tarefa individual da lista.
- [x] **CT-10:** Interface funcional e acessível em navegadores modernos.

## Habilidades
- Para executar o passo a passo da construção da aplicação, consulte `.agents/skills/criar-app-tarefas/SKILL.md`.
