/**
 * @file script.js
 * @description Lógica principal da aplicação Lista de Tarefas (Vanilla JS).
 * Inclui suporte a descrição opcional, edição inline, movimentação de tarefas
 * concluídas para o final da lista e exclusão automática de tarefas concluídas
 * após 30 dias sem interação.
 */

const campoTarefa = document.getElementById('campoTarefa');
const campoDescricao = document.getElementById('campoDescricao');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaTarefas = document.getElementById('listaTarefas');

/**
 * Tempo limite de inatividade para tarefas concluídas: 30 dias em milissegundos.
 * (30 dias * 24 horas * 60 minutos * 60 segundos * 1000 ms)
 */
const TRINTA_DIAS_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Intervalo de verificação automática de tarefas expiradas (1 minuto).
 */
const INTERVALO_VERIFICACAO_MS = 60 * 1000;

/**
 * Chave utilizada no localStorage para manter o histórico de timestamps entre sessões.
 */
const CHAVE_STORAGE = 'lista_tarefas_alura_v1';

/**
 * Salva o estado atual das tarefas da lista no localStorage para preservar
 * as tarefas e o timestamp de última interação (`ultimaInteracao`).
 */
function salvarEstadoTarefas() {
    try {
        const itens = Array.from(listaTarefas.querySelectorAll('.item-tarefa'));
        const dados = itens.map(function (li) {
            return {
                id: li.dataset.id,
                titulo: li.dataset.titulo,
                descricao: li.dataset.descricao || '',
                concluida: li.dataset.concluida === 'true',
                ultimaInteracao: Number(li.dataset.ultimaInteracao)
            };
        });
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(dados));
    } catch (erro) {
        // Fallback silencioso caso o navegador bloqueie localStorage
    }
}

/**
 * Atualiza o timestamp de última interação de uma tarefa específica.
 * Chamado ao criar, concluir/reabrir ou editar uma tarefa.
 *
 * @param {HTMLLIElement} itemElemento - Elemento <li> da tarefa.
 */
function registrarInteracao(itemElemento) {
    itemElemento.dataset.ultimaInteracao = String(Date.now());
    salvarEstadoTarefas();
}

/**
 * Verifica todas as tarefas concluídas e remove automaticamente aquelas que
 * estão há 30 dias ou mais sem qualquer interação.
 */
function limparTarefasExpiradas() {
    const agora = Date.now();
    const itens = Array.from(listaTarefas.querySelectorAll('.item-tarefa'));
    let houveRemocao = false;

    itens.forEach(function (li) {
        const estaConcluida = li.dataset.concluida === 'true';
        const ultimaInteracao = Number(li.dataset.ultimaInteracao || agora);

        if (estaConcluida && (agora - ultimaInteracao >= TRINTA_DIAS_MS)) {
            listaTarefas.removeChild(li);
            houveRemocao = true;
        }
    });

    if (houveRemocao) {
        salvarEstadoTarefas();
    }
}

/**
 * Posiciona a tarefa corretamente na lista:
 * - Se foi marcada como concluída, move para o final da lista (`appendChild`).
 * - Se está pendente, posiciona antes da primeira tarefa concluída.
 *
 * @param {HTMLLIElement} itemElemento - Elemento <li> da tarefa.
 */
function posicionarTarefaNaLista(itemElemento) {
    const estaConcluida = itemElemento.dataset.concluida === 'true';

    if (estaConcluida) {
        listaTarefas.appendChild(itemElemento);
    } else {
        const primeiraConcluida = listaTarefas.querySelector('.item-tarefa[data-concluida="true"]');
        if (primeiraConcluida && primeiraConcluida !== itemElemento) {
            listaTarefas.insertBefore(itemElemento, primeiraConcluida);
        } else if (!itemElemento.parentNode) {
            listaTarefas.appendChild(itemElemento);
        }
    }
}

/**
 * Alterna o estado de conclusão da tarefa, atualiza a estilização visual,
 * move a tarefa concluída para o final da lista e registra a interação.
 *
 * @param {HTMLLIElement} itemElemento - Elemento <li> da tarefa.
 * @param {HTMLSpanElement} spanTitulo - Elemento com o título da tarefa.
 * @param {HTMLParagraphElement} paragrafoDescricao - Elemento com a descrição opcional.
 */
function concluirTarefa(itemElemento, spanTitulo, paragrafoDescricao) {
    limparTarefasExpiradas();

    const novoEstadoConcluida = itemElemento.dataset.concluida !== 'true';
    itemElemento.dataset.concluida = String(novoEstadoConcluida);

    itemElemento.classList.toggle('item-concluido', novoEstadoConcluida);
    spanTitulo.classList.toggle('concluida', novoEstadoConcluida);
    paragrafoDescricao.classList.toggle('concluida', novoEstadoConcluida);

    posicionarTarefaNaLista(itemElemento);
    registrarInteracao(itemElemento);
}

/**
 * Alterna entre o modo de visualização e o modo de edição inline de uma tarefa,
 * permitindo alterar tanto o título quanto a descrição opcional e atualizando
 * o timestamp de última interação.
 *
 * @param {HTMLLIElement} itemElemento - Elemento <li> da tarefa.
 * @param {HTMLDivElement} containerConteudo - Container de texto da tarefa.
 * @param {HTMLSpanElement} spanTitulo - Elemento com o título da tarefa.
 * @param {HTMLParagraphElement} paragrafoDescricao - Elemento com a descrição da tarefa.
 * @param {HTMLButtonElement} btnEditar - Botão de edição/salvamento.
 */
function editarTarefa(itemElemento, containerConteudo, spanTitulo, paragrafoDescricao, btnEditar) {
    limparTarefasExpiradas();

    const emEdicao = itemElemento.dataset.emEdicao === 'true';

    if (!emEdicao) {
        // Entra no modo de edição inline
        itemElemento.dataset.emEdicao = 'true';
        btnEditar.textContent = 'Salvar';
        btnEditar.classList.add('salvando');

        const formEdicao = document.createElement('div');
        formEdicao.className = 'form-edicao';

        const inputTitulo = document.createElement('input');
        inputTitulo.type = 'text';
        inputTitulo.className = 'input-edicao-titulo';
        inputTitulo.value = itemElemento.dataset.titulo || '';
        inputTitulo.placeholder = 'Título da tarefa...';
        inputTitulo.setAttribute('aria-label', 'Editar título da tarefa');

        const inputDescricao = document.createElement('textarea');
        inputDescricao.className = 'input-edicao-descricao';
        inputDescricao.rows = 2;
        inputDescricao.value = itemElemento.dataset.descricao || '';
        inputDescricao.placeholder = 'Descrição (opcional)...';
        inputDescricao.setAttribute('aria-label', 'Editar descrição da tarefa');

        // Permite salvar pressionando Enter no campo de título
        inputTitulo.addEventListener('keydown', function (evento) {
            if (evento.key === 'Enter') {
                evento.preventDefault();
                editarTarefa(itemElemento, containerConteudo, spanTitulo, paragrafoDescricao, btnEditar);
            }
        });

        formEdicao.appendChild(inputTitulo);
        formEdicao.appendChild(inputDescricao);

        spanTitulo.style.display = 'none';
        paragrafoDescricao.style.display = 'none';
        containerConteudo.appendChild(formEdicao);

        inputTitulo.focus();
        registrarInteracao(itemElemento);
        return;
    }

    // Salva as alterações do modo de edição
    const formEdicao = containerConteudo.querySelector('.form-edicao');
    const inputTitulo = formEdicao.querySelector('.input-edicao-titulo');
    const inputDescricao = formEdicao.querySelector('.input-edicao-descricao');

    const novoTitulo = inputTitulo.value.trim();
    const novaDescricao = inputDescricao.value.trim();

    if (novoTitulo === '') {
        inputTitulo.value = '';
        inputTitulo.focus();
        return;
    }

    itemElemento.dataset.titulo = novoTitulo;
    itemElemento.dataset.descricao = novaDescricao;
    itemElemento.dataset.emEdicao = 'false';

    spanTitulo.textContent = novoTitulo;
    spanTitulo.style.display = '';

    paragrafoDescricao.textContent = novaDescricao;
    paragrafoDescricao.style.display = novaDescricao ? '' : 'none';

    containerConteudo.removeChild(formEdicao);

    btnEditar.textContent = 'Editar';
    btnEditar.classList.remove('salvando');

    registrarInteracao(itemElemento);
}

/**
 * Remove uma tarefa individual da lista e atualiza o armazenamento.
 *
 * @param {HTMLLIElement} itemElemento - Elemento <li> da tarefa a ser removida.
 */
function removerTarefa(itemElemento) {
    limparTarefasExpiradas();
    listaTarefas.removeChild(itemElemento);
    salvarEstadoTarefas();
}

/**
 * Constrói e insere no DOM o elemento `<li>` de uma tarefa com seus botões
 * de ação (Concluir, Editar e Remover).
 *
 * @param {Object} dados - Dados da tarefa.
 * @param {string} dados.id - Identificador único da tarefa.
 * @param {string} dados.titulo - Título obrigatório da tarefa.
 * @param {string} [dados.descricao] - Descrição opcional da tarefa.
 * @param {boolean} [dados.concluida] - Estado inicial de conclusão.
 * @param {number} [dados.ultimaInteracao] - Timestamp em ms da última interação.
 */
function criarElementoTarefa(dados) {
    const li = document.createElement('li');
    li.className = 'item-tarefa';
    li.dataset.id = dados.id;
    li.dataset.titulo = dados.titulo;
    li.dataset.descricao = dados.descricao || '';
    li.dataset.concluida = String(Boolean(dados.concluida));
    li.dataset.ultimaInteracao = String(dados.ultimaInteracao || Date.now());
    li.dataset.emEdicao = 'false';

    const containerConteudo = document.createElement('div');
    containerConteudo.className = 'conteudo-tarefa';

    const spanTitulo = document.createElement('span');
    spanTitulo.className = 'texto-tarefa';
    spanTitulo.textContent = dados.titulo;

    const paragrafoDescricao = document.createElement('p');
    paragrafoDescricao.className = 'descricao-tarefa';
    paragrafoDescricao.textContent = dados.descricao || '';
    if (!dados.descricao) {
        paragrafoDescricao.style.display = 'none';
    }

    if (dados.concluida) {
        li.classList.add('item-concluido');
        spanTitulo.classList.add('concluida');
        paragrafoDescricao.classList.add('concluida');
    }

    containerConteudo.appendChild(spanTitulo);
    containerConteudo.appendChild(paragrafoDescricao);

    const divAcoes = document.createElement('div');
    divAcoes.className = 'acoes-tarefa';

    const btnConcluir = document.createElement('button');
    btnConcluir.type = 'button';
    btnConcluir.className = 'btn-concluir';
    btnConcluir.textContent = 'Concluir';
    btnConcluir.addEventListener('click', function () {
        concluirTarefa(li, spanTitulo, paragrafoDescricao);
    });

    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.className = 'btn-editar';
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', function () {
        editarTarefa(li, containerConteudo, spanTitulo, paragrafoDescricao, btnEditar);
    });

    const btnRemover = document.createElement('button');
    btnRemover.type = 'button';
    btnRemover.className = 'btn-remover';
    btnRemover.textContent = 'Remover';
    btnRemover.addEventListener('click', function () {
        removerTarefa(li);
    });

    divAcoes.appendChild(btnConcluir);
    divAcoes.appendChild(btnEditar);
    divAcoes.appendChild(btnRemover);

    li.appendChild(containerConteudo);
    li.appendChild(divAcoes);

    posicionarTarefaNaLista(li);
}

/**
 * Valida os campos de entrada e adiciona uma nova tarefa com título obrigatório
 * e descrição opcional.
 */
function adicionarTarefa() {
    limparTarefasExpiradas();

    const titulo = campoTarefa.value.trim();
    const descricao = campoDescricao.value.trim();

    if (titulo === '') {
        campoTarefa.value = '';
        campoTarefa.focus();
        return;
    }

    criarElementoTarefa({
        id: String(Date.now()) + '-' + Math.random().toString(36).substring(2, 7),
        titulo: titulo,
        descricao: descricao,
        concluida: false,
        ultimaInteracao: Date.now()
    });

    salvarEstadoTarefas();

    campoTarefa.value = '';
    campoDescricao.value = '';
    campoTarefa.focus();
}

/**
 * Carrega as tarefas salvas anteriormente e executa a limpeza de tarefas
 * concluídas que ultrapassaram 30 dias de inatividade.
 */
function inicializarAplicacao() {
    try {
        const salvo = localStorage.getItem(CHAVE_STORAGE);
        if (salvo) {
            const listaSalva = JSON.parse(salvo);
            if (Array.isArray(listaSalva)) {
                listaSalva.forEach(function (dadosTarefa) {
                    criarElementoTarefa(dadosTarefa);
                });
            }
        }
    } catch (erro) {
        // Ignora erro caso o JSON esteja inválido ou localStorage indisponível
    }

    limparTarefasExpiradas();
    setInterval(limparTarefasExpiradas, INTERVALO_VERIFICACAO_MS);
}

btnAdicionar.addEventListener('click', adicionarTarefa);

campoTarefa.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
        adicionarTarefa();
    }
});

inicializarAplicacao();
