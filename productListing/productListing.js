// Arrays separados por categoria
const smartphones = [
  { 
    id: 1, 
    nome: "Galaxy S25 Ultra", 
    Cor: "Titânio Cinza",
    Descricao:  "512 GB",
    precoAvista: "R$10.799,10 à vista",
    precoParcelado: "R$11.999,00 em 18x R$666,61 sem juros",
    imagem: "../src/GalaxyS25Ultra3.png"
  },
  { 
    id: 2, 
    nome: "Galaxy S25", 
    Cor: "Verde",
    Descricao:  "256 GB",
    precoAvista: "R$6.299,10 à vista",
    precoParcelado: "R$6.999,00 em 18x R$ 388,83 sem juros",
    imagem: "../src/GalaxyS252.png"
  },
  { 
    id: 3, 
    nome: "Galaxy Z Flip7", 
    Cor: "Azul",
    Descricao:  "512 GB",
    precoAvista: "R$8.279,10 à vista",
    precoParcelado: "R$9.199,00 em 18x R$ 511,05 sem juros",
    imagem: "../src/GalaxyZFlip72.png"
  },
  { 
    id: 4, 
    nome: "Galaxy Z Fold7", 
    Cor: "Jetblack",
    Descricao:  "1 TB",
    precoAvista: "R$14.939,10 à vista",
    precoParcelado: "R$16.599,00 em 18x R$ 922,16 sem juros",
    imagem: "../src/GalaxyZFold72.png"
  },
];

const tablets = [
   { 
    id: 5, 
    nome: "Galaxy Tab S10 FE", 
    Cor: "Azul",
    Descricao:  "128 GB",
    precoAvista: "R$3.989,05 à vista",
    precoParcelado: "R$4.199,00 em 18x R$ 233,27 sem juros",
    imagem: "../src/10FE.webp"
  }, 
  { 
    id: 6, 
    nome: "Galaxy Tab A9+ 5G", 
    Cor: "Grafite",
    Descricao:  "64 GB",
    precoAvista: "R$1.899,05 à vista",
    precoParcelado: "R$1.999,00 em 18x R$ 111,50 sem juros",
    imagem: "../src/A9+5G.jpeg"
  }, 
  { 
    id: 7, 
    nome: "Galaxy Tab S11", 
    Cor: "Branco",
    Descricao:  "256 GB",
    precoAvista: "R$6.649,05 à vista",
    precoParcelado: "R$6.999,00 em 18x R$ 388,83 sem juros",
    imagem: "../src/s11.png"
  }, 
  { 
    id: 8, 
    nome: "Galaxy Tab S11 Ultra", 
    Cor: "Cinza",
    Descricao:  "512 GB",
    precoAvista: "R$9.999,00 à vista",
    precoParcelado: "R$11.999,00 em 18x R$ 666,61 sem juros",
    imagem: "../src/s11ultra1.png"
  },
];

const notebooks = [
    { 
    id: 9, 
    nome: "Galaxy Book4 Pro", 
    Cor: "Grafite",
    Descricao:  "512 GB SSD",
    precoAvista: "R$9.999,00 à vista",
    precoParcelado: "R$11.999,00 em 18x R$ 666,61 sem juros",
    imagem: "../src/4-pro.webp"
  },
  { 
    id: 10, 
    nome: "Galaxy Book4 Ultra", 
    Cor: "Grafite",
    Descricao:  "1TB SSD",
    precoAvista: "R$18.049,05 à vista",
    precoParcelado: "R$18.999,00 em 18x R$ 1.055,50 sem juros",
    imagem: "../src/GalaxyBook4Ultra2.png"
  },
  { 
    id: 11, 
    nome: "Galaxy Book3 360", 
    Cor: "Grafite",
    Descricao:  "256 GB",
    precoAvista: "R$5.794,05 à vista",
    precoParcelado: "R$6.099,00 em 18x R$ 338,83 sem juros",
    imagem: "../src/3-360.webp"
  },
  { 
    id: 12, 
    nome: "Galaxy Book4 360", 
    Cor: "Grafite",
    Descricao:  "256GB SSD",
    precoAvista: "R$8.549,05 à vista",
    precoParcelado: "R$8.999,00 em 18x R$ 499,94 sem juros",
    imagem: "../src/4-360.webp"
  },
];

const acessorios = [
  { 
    id: 13, 
    nome: "Galaxy Buds Core", 
    Cor: "Preto",
    Descricao: "Sem Fio",
    precoAvista: "R$314,10 à vista",
    precoParcelado: "R$349,00 em 5x R$ 69,80 sem juros",
    imagem: "../src/budscore.webp"
  },
  { 
    id: 14, 
    nome: "Galaxy Watch8 Classic", 
    Cor: "Preto",
    Descricao: "Galaxy AI",
    precoAvista: "R$4.049,10 à vista",
    precoParcelado: "R$4.499,00 em 18x R$ 249,94 sem juros",
    imagem: "../src/Watch8classic.webp"
  },
  { 
    id: 15, 
    nome: "Carregador Sem Fio Duo", 
    Cor: "Preto",
    Descricao:  "Rápido 15W",
    precoAvista: "R$284,05 à vista",
    precoParcelado: "R$299,00 em 4x R$ 74,75 sem juros",
    imagem: "../src/carregadorduo.webp"
  },
  { 
    id: 16, 
    nome: "Capa Smart Book Cover Galaxy Tab S11", 
    Cor: "Preto",
    Descricao:  "Tab Cover",
    precoAvista: "R$474,05 à vista",
    precoParcelado: "R$499,00 em 8x R$ 62,37 sem juros",
    imagem: "../src/s11capa.webp"
  },
];

// Objeto para facilitar os filtros
const categorias = {
  todos: [...smartphones, ...tablets, ...notebooks, ...acessorios],
  smartphones,
  tablets,
  notebooks,
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
  <p class="detalhe">${produto.Descricao}</p>
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

// Seleciona todos os botões de filtro
const filtros = document.querySelectorAll('.menu-lateral .filtro');

filtros.forEach(botao => {
  botao.addEventListener('click', () => {
    // Remove a classe ativo de todos
    filtros.forEach(b => b.classList.remove('ativo'));
    
    // Adiciona a classe ativo no botão clicado
    botao.classList.add('ativo');

    console.log('Categoria selecionada:', botao.textContent);
  });
});

// Filtros do menu lateral
document.querySelectorAll(".filtro").forEach(botao => {
  botao.addEventListener("click", () => {
    const categoria = botao.dataset.cat;
    renderizarProdutos(categorias[categoria]);
  });
});

// Renderiza todos os produtos na primeira carga
renderizarProdutos(categorias.todos);
