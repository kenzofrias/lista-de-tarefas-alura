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
- [ ] Permite adicionar uma nova tarefa via clique no botão ou pressionando `Enter`.
- [ ] Impede a adição de tarefas vazias ou compostas apenas por espaços em branco.
- [ ] Permite alternar o estado de uma tarefa para concluída/pendente com indicação visual.
- [ ] Permite remover uma tarefa individual da lista.
- [ ] Interface funcional e acessível em navegadores modernos.

## Habilidades
- Para executar o passo a passo da construção da aplicação, consulte `.agents/skills/criar-app-tarefas/SKILL.md`.
