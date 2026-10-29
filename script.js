
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

function listarTodos(lista) {
  const elementos = [];
  let atual = lista.inicio;
  let posicao = 0;

  while (atual !== null) {
    elementos.push({
      posicao: posicao,
      dado: atual.dado
    });

    atual = atual.proximo;
    posicao++;
  }

  return elementos;
}

function inserir(lista, dado) {
  if (dado === null || dado === undefined || dado.trim() === "") {
    return false;
  }

  const novo = criarNo(dado);

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

function inserirNaPosicao(lista, dado, posicao) {
  if (
    dado === null ||
    dado === undefined ||
    dado.trim() === "" ||
    !Number.isInteger(posicao) ||
    posicao < 0
  ) {
    return false;
  }

  const novo = criarNo(dado);

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

  if (anterior === null) {
    return false;
  }

  novo.proximo = anterior.proximo;
  anterior.proximo = novo;

  return true;
}

function menu(lista) {
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
      return;
    }

    switch (opcao.trim()) {
      case "1":
        const elementos = listarTodos(lista);

        if (elementos.length === 0) {
          window.alert("A lista está vazia.");
        } else {
          let texto = "";

          for (let i = 0; i < elementos.length; i++) {
            texto += "[" + elementos[i].posicao + "] " +
              elementos[i].dado + "\n";
          }

          window.alert(texto);
        }
        break;

      case "2":
        const dado = lerDado("Qual valor deseja inserir?");

        if (dado !== null) {
          inserir(lista, dado);
          window.alert("Elemento inserido no final da lista.");
        }
        break;

      case "3":
        const valor = lerDado("Qual valor deseja inserir?");

        if (valor !== null) {
          const posicao = lerPosicao("Em qual posição deseja inserir?");

          if (posicao !== null) {
            if (inserirNaPosicao(lista, valor, posicao)) {
              window.alert("Elemento inserido com sucesso.");
            } else {
              window.alert("Posição inválida.");
            }
          }
        }
        break;

      default:
        window.alert("Opção inválida.");
    }
  }
}

const lista = criarLista();
menu(lista);
