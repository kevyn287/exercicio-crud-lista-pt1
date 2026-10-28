"use strict";

/*
 * Exercício CRUD – Lista Pt1
 * A lógica da lista fica separada da interface/menu.
 */

function criarNo(dado) {
  return {
    dado: dado,
    proximo: null
  };
}

function criarLista() {
  return {
    inicio: null
  };
}

function lerDado(mensagem) {
  const entrada = window.prompt(mensagem);

  if (entrada === null) {
    return null;
  }

  const dado = entrada.trim();

  if (dado === "") {
    window.alert("O valor não pode ficar vazio.");
    return null;
  }

  return dado;
}

function lerPosicao(mensagem) {
  const entrada = window.prompt(
    mensagem + "\nAs posições começam em 0."
  );

  if (entrada === null) {
    return null;
  }

  const posicao = Number(entrada.trim());

  if (!Number.isInteger(posicao) || posicao < 0) {
    window.alert("Informe uma posição inteira não negativa.");
    return null;
  }

  return posicao;
}

/**
 * Retorna os elementos em um array auxiliar com posição e dado.
 * A lista ligada continua sendo a estrutura principal.
 */
function listarTodos(lista) {
  const elementos = [];
  let atual = lista.inicio;
  let posicao = 0;

  while (atual !== null) {
    elementos.push({ posicao: posicao, dado: atual.dado });
    atual = atual.proximo;
    posicao++;
  }

  return elementos;
}

/**
 * Insere um dado no final da lista.
 * Retorna true se inserir.
 */
function inserir(lista, dado) {
  if (dado === null || dado === undefined || String(dado).trim() === "") {
    return false;
  }

  const novo = criarNo(String(dado).trim());

  if (lista.inicio === null) {
    lista.inicio = novo;
    return true;
  }

  let atual = lista.inicio;
  while (atual.proximo !== null) {
    atual = atual.proximo;
  }

  atual.proximo = novo;
  return true;
}

/**
 * Insere antes do nó que ocupa a posição indicada.
 * A posição igual ao tamanho atual insere no final.
 */
function inserirNaPosicao(lista, dado, posicao) {
  if (
    dado === null ||
    dado === undefined ||
    String(dado).trim() === "" ||
    !Number.isInteger(posicao) ||
    posicao < 0
  ) {
    return false;
  }

  const novo = criarNo(String(dado).trim());

  if (posicao === 0) {
    novo.proximo = lista.inicio;
    lista.inicio = novo;
    return true;
  }

  let anterior = lista.inicio;
  let indice = 0;

  while (anterior !== null && indice < posicao - 1) {
    anterior = anterior.proximo;
    indice++;
  }

  // Se anterior for null, a posição ultrapassa o tamanho da lista.
  if (anterior === null) {
    return false;
  }

  novo.proximo = anterior.proximo;
  anterior.proximo = novo;
  return true;
}

// Funções da interface: exibem resultados sem manipular diretamente os nós.
const lista = criarLista();
const elementoStatus = document.getElementById("status");
const elementoResultado = document.getElementById("resultado");

function informar(mensagem, tipo) {
  elementoStatus.textContent = mensagem;
  elementoStatus.className = "status" + (tipo ? " " + tipo : "");
}

function exibirLista(listaAtual) {
  const elementos = listarTodos(listaAtual);
  elementoResultado.replaceChildren();

  if (elementos.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "empty";
    vazio.textContent = "A lista está vazia.";
    elementoResultado.appendChild(vazio);
    informar("Listagem concluída: nenhum elemento encontrado.");
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "list";

  elementos.forEach(function (elemento) {
    const li = document.createElement("li");
    const posicao = document.createElement("span");
    posicao.className = "position";
    posicao.textContent = "[" + elemento.posicao + "]";
    li.append(posicao, document.createTextNode(" " + elemento.dado));
    ul.appendChild(li);
  });

  elementoResultado.appendChild(ul);
  informar("Listagem concluída: " + elementos.length + " elemento(s).", "success");
}

function menuInserirNoFim() {
  const dado = lerDado("Qual valor deseja inserir?");
  if (dado === null) return;

  if (inserir(lista, dado)) {
    exibirLista(lista);
    informar('"' + dado + '" foi inserido no final da lista.', "success");
  } else {
    informar("Não foi possível inserir o valor.", "error");
  }
}

function menuInserirNaPosicao() {
  const dado = lerDado("Qual valor deseja inserir?");
  if (dado === null) return;

  const posicao = lerPosicao("Em qual posição deseja inserir?");
  if (posicao === null) return;

  if (inserirNaPosicao(lista, dado, posicao)) {
    exibirLista(lista);
    informar('"' + dado + '" foi inserido na posição ' + posicao + ".", "success");
  } else {
    informar("Posição inválida. A lista não foi alterada.", "error");
    window.alert("Posição inválida. Informe uma posição entre 0 e o tamanho atual da lista.");
  }
}

function menu() {
  while (true) {
    const opcao = window.prompt(
      "LISTA LIGADA SIMPLES\n\n" +
      "[1] Listar todos\n" +
      "[2] Inserir no fim\n" +
      "[3] Inserir na posição\n" +
      "[4] Sair\n\n" +
      "Digite a opção desejada:"
    );

    if (opcao === null || opcao.trim() === "4") {
      informar("Menu encerrado. A lista permanece na memória enquanto esta página estiver aberta.");
      return;
    }

    switch (opcao.trim()) {
      case "1":
        exibirLista(lista);
        break;
      case "2":
        menuInserirNoFim();
        break;
      case "3":
        menuInserirNaPosicao();
        break;
      default:
        informar("Opção inválida. Escolha uma opção de 1 a 4.", "error");
        window.alert("Opção inválida.");
    }
  }
}

// Interface com botões e menu por prompt, conforme o enunciado.
document.getElementById("btn-listar").addEventListener("click", function () {
  exibirLista(lista);
});
document.getElementById("btn-fim").addEventListener("click", menuInserirNoFim);
document.getElementById("btn-posicao").addEventListener("click", menuInserirNaPosicao);
document.getElementById("btn-sair").addEventListener("click", function () {
  informar("Menu encerrado. A lista permanece na memória enquanto esta página estiver aberta.");
  window.alert("Menu encerrado.");
});

// Abre o menu solicitado no enunciado ao iniciar. Se cancelar, a interface continua disponível.
window.addEventListener("DOMContentLoaded", function () {
  menu();
});

// Exporta funções para testes manuais no console do navegador.
if (typeof window !== "undefined") {
  window.criarNo = criarNo;
  window.criarLista = criarLista;
  window.listarTodos = listarTodos;
  window.inserir = inserir;
  window.inserirNaPosicao = inserirNaPosicao;
}
