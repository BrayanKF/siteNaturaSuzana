// Classe Produto representa um produto com nome, preço e imagem
class Produto {
    constructor(nome, preco, img) {
        this.nome = nome;   // Nome do produto
        this.preco = preco; // Preço do produto
        this.img = img;     // URL da imagem do produto
    }
  
    // Métodos Getter: retornam o valor das propriedades
    getnome() {
        return this.nome;  // Retorna o nome do produto
    }
  
    getpreco() {
        return this.preco; // Retorna o preço do produto
    }
  
    getimg() {
        return this.img;   // Retorna a imagem do produto
    }
  
    // Métodos Setter: permitem alterar o valor das propriedades
    setnome(novoNome) {
        this.nome = novoNome; // Define um novo nome para o produto
    }
  
    setpreco(novoPreco) {
        this.preco = novoPreco; // Define um novo preço para o produto
    }
  
    setimg(novoImg) {
        this.img = novoImg; // Define uma nova imagem para o produto
    }
  
    // Método que exibe informações sobre o produto
    exibir() {
        return `Nome: ${this.nome}, Preço: ${this.preco}, img: ${this.img}`;
    }
  }
  
  // Evento DOMContentLoaded: executa quando o DOM é totalmente carregado
  document.addEventListener('DOMContentLoaded', () => {
    carregarPedidos('true'); // Carrega os pedidos com a configuração inicial (somente visualização)
  });
  
  // Função de exemplo para captura de dados do formulário
  function res() {
    let nome = document.getElementById("nome").value;           // Obtém o valor do input com id "nome"
    let telefone = document.getElementById("tel").value;       // Obtém o valor do input com id "tel"
    let select = document.getElementById("cardapio").value;    // Obtém o valor selecionado no select com id "cardapio"
  
    // Exibe os valores capturados no console
    console.log("Nome: " + nome + " Telefone: " + telefone + " Produtos: " + select);
  }
  
  // Inicializa e oculta as seções de pedidos e adição de produtos
  let divPedidos = document.getElementById('divPedidos');
  divPedidos.style.display = "none"; // Oculta a seção de pedidos inicialmente
  
  let produtosAdicionar = document.getElementById('divAdicionarProdutos');
  produtosAdicionar.style.display = "none"; // Oculta a seção de adicionar produtos inicialmente
  
  // Função para abrir a seção de pedidos
  function abrirPedidos() {
    divPedidos.style.display = "block"; // Torna visível a seção de pedidos
    divPedidos.classList.add("#divPedidos"); // Adiciona uma classe CSS (não é necessário se a classe já estiver definida no CSS)
  }
  
  // Função para abrir a seção de adicionar produtos após verificar a senha
  function divAdicionarPedidos() {
      let senha = prompt("Insira a senha de acesso"); // Solicita a senha ao usuário
      
      // Verifica se a senha fornecida é correta
      if (senha === "naturashop") {
          document.getElementById('divAdicionarProdutos').style.display = "block"; // Exibe a seção de adicionar produtos
          
          // Manipula elementos para excluir produtos
          let excluir = document.querySelectorAll('.excluir');
          for (let i = 0; i < excluir.length; i++) {
              excluir[i].style.display = "flex"; // Torna visível o botão de excluir
              excluir[i].addEventListener('click', (e) => {
                  excluirProduto(e.target.name); // Adiciona evento de clique para excluir produto
              });
          }
          
          // Manipula elementos para editar produtos
          let editar = document.querySelectorAll('.editar');
          for (let i = 0; i < editar.length; i++) {
              editar[i].style.display = "flex"; // Torna visível o botão de editar
              editar[i].addEventListener('click', (e) => {
                  editarProduto(e.target.name); // Adiciona evento de clique para editar produto
              });
          }
      } else {
          alert("Você não está autorizado para executar essa função pois não é um desenvolvedor."); // Alerta de não autorização
      }
  }
  
  // Variáveis para manipular imagens e produtos
  let imagemProduto = document.getElementById('imagemProduto'); // Input para selecionar imagem
  let adicionar = document.querySelector('.adicionar'); // Botão de adicionar
  let cardapio2 = document.getElementById('divAdicionarProdutos'); // Div de adicionar produtos
  let imgAdicionadaSrc = ''; // URL da imagem selecionada
  
  // Função para adicionar um produto
  function add() {
    let nomeProduto = document.getElementById("nomeProduto").value; // Obtém o nome do produto
    let precoProduto = document.getElementById("precoProduto").value; // Obtém o preço do produto
  
    const imgAdicionada = document.createElement("img");
    imgAdicionada.src = imgAdicionadaSrc; // Define a URL da imagem
  
    try {
        let produto = new Produto(nomeProduto, precoProduto, imgAdicionadaSrc); // Cria um novo objeto Produto
        let listaProdutos = JSON.parse(localStorage.getItem('produtos')); // Obtém a lista de produtos do localStorage
        if (!listaProdutos) {
            listaProdutos = []; // Inicializa a lista se não existir
        }
        listaProdutos.push(produto); // Adiciona o novo produto à lista
        console.log(listaProdutos); // Exibe a lista no console
        localStorage.setItem('produtos', JSON.stringify(listaProdutos)); // Atualiza o localStorage com a lista de produtos
    } catch (error) {
        console.log(error); // Exibe erros no console
    }
  
    carregarPedidos('false'); // Recarrega os pedidos sem a visualização inicial
  }
  
  // Função para carregar e exibir pedidos
  function carregarPedidos(str) {
    adicionar.innerHTML = ''; // Limpa a seção de produtos
    let pedidos = JSON.parse(localStorage.getItem('produtos')); // Obtém a lista de pedidos do localStorage
    if (pedidos) {
        pedidos.forEach((pedido) => {
            // Cria botões para excluir e editar
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
  
            // Define a visibilidade dos botões com base na string 'str'
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
  
            // Adiciona eventos de clique para excluir e editar
            btnExcluir.addEventListener('click', (e) => {
                excluirProduto(e.target.name); // Remove o produto da lista
            });
            btnEditar.addEventListener('click', (e) => {
              editarProduto(e.target.name); // Edita o produto na lista
          });
  
            // Estilos para os botões de excluir e editar
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
  
            // Cria e adiciona a imagem do produto
            const img = document.createElement("img");
            img.src = pedido.img;
            let editar = document.createElement('button')
        
            let divDaProduto = document.createElement('div');
            divDaProduto.setAttribute('class', 'produto');
            let br = document.createElement('br');
  
            // Adiciona nome e preço do produto
            let h3 = document.createElement('h3');
            h3.appendChild(document.createTextNode(pedido.nome));
  
            let h4 = document.createElement('h4');
            let strong = document.createElement('strong');
            strong.appendChild(document.createTextNode("R$ "));
            strong.appendChild(document.createTextNode(pedido.preco));
            h4.appendChild(strong);
  
            // Adiciona a imagem e os detalhes do produto
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
  
  // Função para editar um produto
  function editarProduto(nomeProduto) {
      let produtos = JSON.parse(localStorage.getItem('produtos')); // Obtém a lista de produtos
  
      if (!produtos) {
          alert("Nenhum produto encontrado no armazenamento."); // Alerta se não houver produtos
          return;
      }
  
      // Encontra o produto com o nome fornecido
      let produto = produtos.find((produto) => produto.nome === nomeProduto);
  
      if (produto) {
          // Obtém os novos valores dos campos de entrada
          let novoNome = document.getElementById('novoNomeProduto').value.trim();
          let novoPreco = document.getElementById('novoPrecoProduto').value.trim();
          let novaImg = document.getElementById('novoImgProduto').value.trim();
  
          // Atualiza as propriedades do produto com os novos valores
          if (novoNome) produto.nome = novoNome;
          if (novoPreco) produto.preco = novoPreco;
          if (novaImg) produto.img = novaImg;
  
          // Atualiza o localStorage com a lista de produtos atualizada
          localStorage.setItem('produtos', JSON.stringify(produtos));
          alert("Produto atualizado com sucesso."); // Alerta de sucesso
      } else {
          alert("Produto não encontrado."); // Alerta de erro se o produto não for encontrado
      }
  }
  
  // Evento que processa a imagem do produto quando o input de imagem muda
  imagemProduto.addEventListener('change', (e) => {
    const inputTarget = e.target;
    const file = inputTarget.files[0];
    if (file) {
        const reader = new FileReader();
  
        // Quando o arquivo for carregado, define a URL da imagem
        reader.addEventListener('load', (e) => {
            imgAdicionadaSrc = e.target.result;
        });
  
        reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
    }
  });
  
  // Função para excluir um produto da lista
  function excluirProduto(nomeProduto) {
    let produtos = JSON.parse(localStorage.getItem('produtos')); // Obtém a lista de produtos
    let index = produtos.findIndex((produto) => produto.nome === nomeProduto); // Encontra o índice do produto a ser excluído
    if (index !== -1) {
        produtos.splice(index, 1); // Remove o produto da lista
        localStorage.setItem('produtos', JSON.stringify(produtos)); // Atualiza o localStorage
        carregarPedidos('false'); // Recarrega a lista de pedidos
    }
  }
  