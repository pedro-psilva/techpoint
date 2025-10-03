// Arrays separados por categoria
const smartphones = [
  { 
    id: 1, 
    nome: "Galaxy S25 Ultra", 
    Cor: "Titânio Cinza",
    Memoria:  "512 GB",
    precoAvista: "R$10.799,10 à vista",
    precoParcelado: "R$11.999,00 em 18x R$666,61 sem juros",
    imagem: "src/GalaxyS25Ultra.png"
  },
  { 
    id: 2, 
    nome: "Galaxy S25", 
    Cor: "Verde",
    Memoria:  "256 GB",
    precoAvista: "R$6.299,10 à vista",
    precoParcelado: "R$6.999,00 em 18x R$ 388,83 sem juros",
    imagem: "src/GalaxyS25.png"
  },
  { 
    id: 3, 
    nome: "Galaxy Z Flip7", 
    Cor: "Azul",
    Memoria:  "512 GB",
    precoAvista: "R$8.279,10 à vista",
    precoParcelado: "R$9.199,00 em 18x R$ 511,05 sem juros",
    imagem: "src/GalaxyZFlip7.png"
  },
  { 
    id: 4, 
    nome: "Galaxy Z Fold7", 
    Cor: "Jetblack",
    Memoria:  "1 TB",
    precoAvista: "R$14.939,10 à vista",
    precoParcelado: "R$16.599,00 em 18x R$ 922,16 sem juros",
    imagem: "src/GalaxyZFold7.png"
  },
];


const notebooks = [
    { 
    id: 5, 
    nome: "Galaxy Book4 Ultra", 
    Cor: "Grafite",
    Memoria:  "1TB SSD",
    precoAvista: "R$18.049,05 à vista",
    precoParcelado: "R$18.999,00 em 18x R$ 1.055,50 sem juros",
    imagem: "src/GalaxyBook4Ultra2.png"
  },
];

const tablets = [

];

const acessorios = [

];

// Objeto para facilitar os filtros
const categorias = {
  todos: [...smartphones, ...notebooks, ...tablets, ...acessorios],
  smartphones,
  notebooks,
  tablets,
  acessorios
};

// Carrinho (simples)
let carrinho = [];

// Seleciona o container
const container = document.getElementById("produtos-container");

// Função para renderizar produtos
function renderizarProdutos(lista) {
  container.innerHTML = ""; 
  lista.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Clique no card -> página do produto
    card.addEventListener("click", () => {
      window.location.href = `produto.html?id=${produto.id}`;
    });

card.innerHTML = `
  <img src="${produto.imagem}" alt="${produto.nome}">
  <h2>${produto.nome}</h2>
  <p class="detalhe">Cor: ${produto.Cor}</p>
  <p class="detalhe">${produto.Memoria}</p>
  <p class="preco-avista">${produto.precoAvista}</p>
  <p class="preco-parcelado">${produto.precoParcelado}</p>
  <button class="btn-carrinho">ADICIONAR AO CARRINHO</button>
`;


    // Botão do carrinho (não deixa o card clicar)
    card.querySelector(".btn-carrinho").addEventListener("click", (e) => {
      e.stopPropagation();
      adicionarAoCarrinho(produto);
    });

    container.appendChild(card);
  });
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  alert(`${produto.nome} foi adicionado ao carrinho!`);
  console.log("Carrinho:", carrinho);
}

// Filtros do menu lateral
document.querySelectorAll(".filtro").forEach(botao => {
  botao.addEventListener("click", () => {
    const categoria = botao.dataset.cat;
    renderizarProdutos(categorias[categoria]);
  });
});

// Renderiza todos os produtos na primeira carga
renderizarProdutos(categorias.todos);
