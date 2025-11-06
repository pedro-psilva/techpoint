document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM carregado, iniciando script...');

    const container = document.getElementById("produtos-container");
    const filtros = document.querySelectorAll('.menu-lateral .filtro');
    const cartIcon = document.querySelector('.cart-icon-product');
    
    console.log('Container encontrado:', container);
    console.log('Filtros encontrados:', filtros);
    console.log('Cart icon encontrado:', cartIcon);

    let allProducts = {};
    let productsArray = [];
    let cartCount = 0;

    // Criar a bolinha vermelha no ícone do carrinho
    const badge = document.createElement('span');
    badge.classList.add('cart-badge');
    badge.textContent = '0';
    cartIcon.appendChild(badge);

    function atualizarBadge() {
        badge.textContent = cartCount;
        badge.style.display = cartCount > 0 ? 'flex' : 'none';
    }

    function formatarPrecoBRL(cents) {
        const value = cents / 100;
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    async function fetchProducts() {
        try {
            console.log('Buscando produtos...');
            const response = await fetch('/products');
            if (!response.ok) throw new Error('Erro ao buscar produtos');
            allProducts = await response.json();
            console.log('Produtos carregados:', allProducts);

            productsArray = Object.keys(allProducts).map(key => ({
                id: key,
                ...allProducts[key]
            }));

            console.log('Array de produtos:', productsArray);
            renderizarProdutos(productsArray);

        } catch (error) {
            console.error("Erro:", error);
            container.innerHTML = "<p>Erro ao carregar produtos.</p>";
        }
    }

    function renderizarProdutos(lista) {
        console.log('Renderizando produtos:', lista);
        console.log('Container:', container);
        container.innerHTML = "";
        lista.forEach(produto => {
            const card = document.createElement("div");
            card.classList.add("card");

            const precoFormatado = formatarPrecoBRL(produto.price);

            card.innerHTML = `
                <img src="${produto.image}" alt="${produto.name}" class="produto-img">
                <h2>${produto.name}</h2>
                <p class="detalhe">Cor: ${produto.color || ''}</p>
                <p class="detalhe">${produto.description}</p>
                <p class="preco">${precoFormatado}</p>
                <button class="btn-carrinho" data-id="${produto.id}">ADICIONAR AO CARRINHO</button>
            `;

            const imgProduto = card.querySelector('.produto-img');

            card.querySelector(".btn-carrinho").addEventListener("click", (e) => {
                e.stopPropagation();
                adicionarAoCarrinho(produto.id, produto, imgProduto);
            });

            // Adicionar clique no card para ir para página do produto
            card.addEventListener("click", (e) => {
                if (!e.target.classList.contains('btn-carrinho')) {
                    window.location.href = `/produto/${produto.id}`;
                }
            });

            // Adicionar cursor pointer ao card
            card.style.cursor = 'pointer';

            container.appendChild(card);
        });
    }

    async function adicionarAoCarrinho(productId, produto, imgProduto) {
        try {
            const response = await fetch('/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product_id: productId, quantity: 1 })
            });
            const result = await response.json();

            if (response.ok) {
                cartCount++;
                atualizarBadge();
                animarCarrinho();
                animarProdutoAoCarrinho(imgProduto); // 👈 animação adicionada aqui
            } else {
                alert(`Erro: ${result.error || 'Não foi possível adicionar ao carrinho.'}`);
            }
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
            alert('Erro de conexão ao adicionar ao carrinho.');
        }
    }

    function animarCarrinho() {
        cartIcon.classList.add('cart-bounce');
        setTimeout(() => {
            cartIcon.classList.remove('cart-bounce');
        }, 400);
    }

    // 🔴 Função adicionada: produto "voando" até o carrinho
    function animarProdutoAoCarrinho(img) {
        const imgClone = img.cloneNode(true);
        const imgRect = img.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        imgClone.style.position = 'fixed';
        imgClone.style.top = imgRect.top + 'px';
        imgClone.style.left = imgRect.left + 'px';
        imgClone.style.width = imgRect.width + 'px';
        imgClone.style.height = imgRect.height + 'px';
        imgClone.style.transition = 'all 0.8s ease-in-out';
        imgClone.style.zIndex = '9999';
        imgClone.style.borderRadius = '8px';
        imgClone.style.opacity = '1';
        document.body.appendChild(imgClone);

        requestAnimationFrame(() => {
            imgClone.style.top = cartRect.top + 'px';
            imgClone.style.left = cartRect.left + 'px';
            imgClone.style.width = '25px';
            imgClone.style.height = '25px';
            imgClone.style.borderRadius = '50%';
            imgClone.style.opacity = '0.3';
        });

        imgClone.addEventListener('transitionend', () => imgClone.remove());
    }

    filtros.forEach(botao => {
        botao.addEventListener('click', () => {
            filtros.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');
            const categoria = botao.dataset.cat;

            if (categoria === 'todos') {
                renderizarProdutos(productsArray);
            } else {
                const filteredProducts = productsArray.filter(p => p.category === categoria);
                renderizarProdutos(filteredProducts);
            }
        });
    });

    atualizarBadge();
    fetchProducts();
});
