# Exercício CRUD – Lista (Parte 1)

**Disciplina:** Algoritmo e Estrutura de Dados  
**Objetivo:** implementar uma lista ligada simples com listagem, inserção no final e inserção por posição.

## Como executar

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` em um navegador atualizado.
3. Use as opções do menu inicial ou os botões da página.

Não é necessário instalar dependências.

## Operações implementadas

- `criarNo(dado)`: cria um nó com `dado` e referência `proximo`.
- `criarLista()`: cria uma lista vazia.
- `listarTodos(lista)`: percorre os nós e retorna um array auxiliar com posição e dado.
- `inserir(lista, dado)`: insere no final e retorna `true` ou `false`.
- `inserirNaPosicao(lista, dado, posicao)`: insere na posição indicada, aceita posição zero e posição igual ao tamanho atual; retorna `true` ou `false`.
- Menu com opções para listar, inserir no fim, inserir por posição e sair.

## Testes manuais

Abra as ferramentas de desenvolvedor do navegador (F12), na aba Console, e execute:

```javascript
const teste = criarLista();
inserir(teste, "Arroz");
inserir(teste, "Feijão");
inserir(teste, "Farinha");
console.table(listarTodos(teste));

inserirNaPosicao(teste, "Açúcar", 1);
console.table(listarTodos(teste));

inserirNaPosicao(teste, "Erro", -1);  // false
inserirNaPosicao(teste, "Erro", 99);  // false
inserirNaPosicao(teste, "Erro", 1.5); // false
```

## Publicar no GitHub

1. Entre em https://github.com/ e crie um repositório público chamado `exercicio-crud-lista-pt1`.
2. Não marque a opção de criar README, pois este projeto já possui um.
3. Extraia os arquivos deste pacote.
4. No repositório, escolha **Add file → Upload files**, arraste `index.html`, `script.js` e `README.md` (ou envie a pasta com Git).
5. Clique em **Commit changes**.
6. Para disponibilizar uma página de demonstração, abra **Settings → Pages**, selecione a branch `main` e a pasta `/ (root)`, salve e aguarde a publicação.

## Observação

A lista existe em memória durante a execução da página; ao recarregar o navegador, ela é reiniciada. Isso corresponde ao escopo desta primeira parte, que não solicita persistência em arquivo ou banco de dados.
