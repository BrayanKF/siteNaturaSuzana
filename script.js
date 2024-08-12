// Classe Produto
class Produto {
  constructor(nome, preco, img) {
      this.nome = nome;
      this.preco = preco;
      this.img = img;
  }

  // Métodos Getter
  getnome() {
      return this.nome;
  }

  getpreco() {
      return this.preco;
  }

  getimg() {
      return this.img;
  }

  // Métodos Setter
  setnome(novoNome) {
      this.nome = novoNome;
  }

  setpreco(novoPreco) {
      this.preco = novoPreco;
  }

  setimg(novoImg) {
      this.img = novoImg;
  }

  // Método Exibir
  exibir() {
      return `Nome: ${this.nome}, Preço: ${this.preco}, img: ${this.img}`;
  }
}

// Evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  carregarPedidos('true');
});

// Função de exemplo para captura de dados
function res() {
  let nome = document.getElementById("nome").value;
  let telefone = document.getElementById("tel").value;
  let select = document.getElementById("cardapio").value;

  console.log("Nome: " + nome + " Telefone: " + telefone + " Produtos: " + select);
}

// Declarações iniciais de elementos DOM
let divPedidos = document.getElementById('divPedidos');
divPedidos.style.display = "none";

let produtosAdicionar = document.getElementById('divAdicionarProdutos');
produtosAdicionar.style.display = "none";

// Função para abrir a seção de pedidos
function abrirPedidos() {
  divPedidos.style.display = "block";
  divPedidos.classList.add("#divPedidos");
}

// Função para abrir a seção de adicionar produtos
function divAdicionarPedidos() {
    let senha = prompt("Insira a senha de acesso");
    
    // Verifica se a senha está vazia
    if (senha === "") {
        document.getElementById('divAdicionarProdutos').style.display = "block";
        
        // Manipula elementos para excluir
        let excluir = document.querySelectorAll('.excluir');
        for (let i = 0; i < excluir.length; i++) {
            excluir[i].style.display = "flex";
            excluir[i].addEventListener('click', (e) => {
                excluirProduto(e.target.name);
            });
        }
        
        // Manipula elementos para editar
        let editar = document.querySelectorAll('.editar');
        for (let i = 0; i < editar.length; i++) {
            editar[i].style.display = "flex";
            editar[i].addEventListener('click', (e) => {
                editarProduto(e.target.name);
            });
        }
    } else {
        alert("Você não está autorizado para executar essa função pois não é um desenvolvedor.");
    }
  }
  

// Variáveis relacionadas ao gerenciamento de imagem e produtos
let imagemProduto = document.getElementById('imagemProduto');
let adicionar = document.querySelector('.adicionar');
let cardapio2 = document.getElementById('divAdicionarProdutos');
let imgAdicionadaSrc = '';

// Função para adicionar produtos
function add() {
  let nomeProduto = document.getElementById("nomeProduto").value;
  let precoProduto = document.getElementById("precoProduto").value;

  const imgAdicionada = document.createElement("img");
  imgAdicionada.src = imgAdicionadaSrc;

  try {
      let produto = new Produto(nomeProduto, precoProduto, imgAdicionadaSrc);
      let listaProdutos = JSON.parse(localStorage.getItem('produtos'));
      if (!listaProdutos) {
          listaProdutos = [];
      }
      listaProdutos.push(produto);
      console.log(listaProdutos);
      localStorage.setItem('produtos', JSON.stringify(listaProdutos));
  } catch (error) {
      console.log(error);
  }

  carregarPedidos('false');
}

// Função para carregar pedidos
function carregarPedidos(str) {
  adicionar.innerHTML = '';
  let pedidos = JSON.parse(localStorage.getItem('produtos'));
  if (pedidos) {
      pedidos.forEach((pedido) => {
          const btnExcluir = document.createElement("button");
          btnExcluir.name = pedido.nome;
          btnExcluir.textContent = "Excluir";
          const divExcluir = document.createElement("div");
          divExcluir.appendChild(btnExcluir);

          const btnEditar = document.createElement("button");
          btnEditar.name = pedido.nome;
          btnEditar.textContent = "Editar";
          const divEditar = document.createElement("div");
          divEditar.appendChild(btnEditar);

          if (str == 'true') {
              divExcluir.style.display = "none";
          } else {
              divExcluir.style.display = "flex";
          }
          if (str == 'true') {
            divEditar.style.display = "none";
        } else {
            divEditar.style.display = "flex";
        }

          btnExcluir.addEventListener('click', (e) => {
              excluirProduto(e.target.name);
          });
          btnEditar.addEventListener('click', (e) => {
            editarProduto(e.target.name);
        });

          divExcluir.style.justifyContent = "center";
          divExcluir.style.cursor = "pointer";
          divExcluir.style.flexDirection = "row";
          divExcluir.style.alignItems = "center";
          divExcluir.style.gap = "6px";
          divExcluir.className = 'excluir';

          divEditar.style.justifyContent = "center";
          divEditar.style.cursor = "pointer";
          divEditar.style.flexDirection = "row";
          divEditar.style.alignItems = "center";
          divEditar.style.gap = "6px";
          divEditar.className = 'editar';

          const img = document.createElement("img");
          img.src = pedido.img;
          let editar = document.createElement('button')
      
          let divDaProduto = document.createElement('div');
          divDaProduto.setAttribute('class', 'produto');
          let br = document.createElement('br');

          let h3 = document.createElement('h3');
          h3.appendChild(document.createTextNode(pedido.nome));

          let h4 = document.createElement('h4');
          let strong = document.createElement('strong');
          strong.appendChild(document.createTextNode("R$ "));
          strong.appendChild(document.createTextNode(pedido.preco));
          h4.appendChild(strong);

          let divDaImg = document.createElement('div');
          divDaImg.setAttribute('class', 'imagem-produto');
          divDaImg.appendChild(img);

          divDaProduto.appendChild(divDaImg);
          divDaProduto.appendChild(h3);
          divDaProduto.appendChild(h4);
          divDaProduto.appendChild(divExcluir);
          divDaProduto.appendChild(divEditar);
          divDaProduto.appendChild(editar);
          adicionar.appendChild(divDaProduto);
          adicionar.appendChild(br);
      });
  }
}

function editarProduto(nomeProduto) {
    let produtos = JSON.parse(localStorage.getItem('produtos'));

    if (!produtos) {
        alert("Nenhum produto encontrado no armazenamento.");
        return;
    }

    let produto = produtos.find((produto) => produto.nome === nomeProduto);

    if (produto) {
        // Obtém os valores dos campos de entrada
        let novoNome = document.getElementById('novoNomeProduto').value.trim();
        let novoPreco = document.getElementById('novoPrecoProduto').value.trim();
        let novaImg = document.getElementById('novoImgProduto').value.trim();

        // Atualizar os campos do produto com os valores inseridos, se não estiverem vazios
        if (novoNome) produto.nome = novoNome;
        if (novoPreco) produto.preco = novoPreco;
        if (novaImg) produto.img = novaImg;

        // Atualizar o localStorage com a lista de produtos atualizada
        localStorage.setItem('produtos', JSON.stringify(produtos));
        alert("Produto atualizado com sucesso.");
    } else {
        alert("Produto não encontrado.");
    }
}


// Evento para processar imagem do produto
imagemProduto.addEventListener('change', (e) => {
  const inputTarget = e.target;
  const file = inputTarget.files[0];
  if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', (e) => {
          imgAdicionadaSrc = e.target.result;
      });

      reader.readAsDataURL(file);
  }
});

// Função para excluir produtos
function excluirProduto(nomeProduto) {
  let produtos = JSON.parse(localStorage.getItem('produtos'));
  let index = produtos.findIndex((produto) => produto.nome === nomeProduto);
  produtos.splice(index, 1);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  carregarPedidos('false');
}
