document.addEventListener('DOMContentLoaded', () => {
    
    const cartContainer = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('summary-subtotal');
    const totalEl = document.getElementById('summary-total');
    const checkoutButton = document.getElementById('checkout-button');
    const clearCartButton = document.getElementById('clear-cart-button');
    const emptyCartTemplate = document.getElementById('empty-cart-template');
    
    // Cache local do carrinho
    const CART_CACHE_KEY = 'techpoint_cart_cache';
    let selectedItems = new Set();

    // Funções de cache local
    function salvarCacheCarrinho(cartData) {
        try {
            localStorage.setItem(CART_CACHE_KEY, JSON.stringify(cartData));
        } catch (error) {
            // Erro silencioso ao salvar cache
        }
    }

    function carregarCacheCarrinho() {
        try {
            const cached = localStorage.getItem(CART_CACHE_KEY);
            return cached ? JSON.parse(cached) : null;
        } catch (error) {
            return null;
        }
    }

    function salvarSelecoes() {
        try {
            localStorage.setItem('techpoint_selected_items', JSON.stringify([...selectedItems]));
        } catch (error) {
            // Erro silencioso ao salvar seleções
        }
    }

    function carregarSelecoes() {
        try {
            const cached = localStorage.getItem('techpoint_selected_items');
            if (cached) {
                selectedItems = new Set(JSON.parse(cached));
            }
        } catch (error) {
            // Erro silencioso ao carregar seleções
        }
    }

    function formatarPrecoBRL(valueInCorrectFormat) {
        let valueAsNumber;
        if (typeof valueInCorrectFormat === 'string') {
            valueAsNumber = parseFloat(valueInCorrectFormat); 
        } else if (typeof valueInCorrectFormat === 'number') {
            valueAsNumber = valueInCorrectFormat / 100;
        } else {
            valueAsNumber = 0; 
        }

        return valueAsNumber.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
        }); 
    }

    async function carregarCarrinho() {
        try {
            // Primeiro tenta carregar do cache
            const cachedData = carregarCacheCarrinho();
            if (cachedData) {
                renderizarCarrinho(cachedData);
            }

            // Depois busca do servidor
            const response = await fetch('/cart', {
                credentials: 'include' // Importante: envia cookies
            }); 
            if (!response.ok) {
                throw new Error(`Erro na rede: ${response.statusText}`);
            }
            const data = await response.json();

            // Salva no cache
            salvarCacheCarrinho(data);
            
            // Renderiza o carrinho
            renderizarCarrinho(data);
            
        } catch (error) {
            // Se houver erro, tenta usar o cache
            const cachedData = carregarCacheCarrinho();
            if (cachedData) {
                renderizarCarrinho(cachedData);
            } else {
                cartContainer.innerHTML = "<p>Erro ao carregar o carrinho. Tente novamente.</p>";
            }
        }
    }

    function renderizarCarrinho(data) {
        cartContainer.innerHTML = '';

        if (data.items.length === 0) {
            mostrarCarrinhoVazio();
            atualizarResumo("0.00");
        } else {
            data.items.forEach(item => {
                const itemElement = criarElementoItem(item);
                cartContainer.appendChild(itemElement);
            });
            atualizarResumo(data.total_price_brl); 
        }
    }

    async function atualizarQuantidade(productId, quantity) {
        if (quantity <= 0) {
            removerItem(productId);
            return;
        }
        try {
            await fetch('/cart/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Importante: envia cookies
                body: JSON.stringify({ product_id: productId, quantity: quantity })
            });
            carregarCarrinho(); 
        } catch (error) {
            // Erro silencioso ao atualizar quantidade
        }
    }

    async function removerItem(productId) {
        try {
            await fetch('/cart/remove', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Importante: envia cookies
                body: JSON.stringify({ product_id: productId })
            });
            carregarCarrinho();
        } catch (error) {
            // Erro silencioso ao remover item
        }
    }

    async function esvaziarCarrinho() {
        if (!confirm('Tem certeza que deseja esvaziar o carrinho?')) {
            return;
        }
        try {
            await fetch('/cart/clear', { 
                method: 'POST',
                credentials: 'include' // Importante: envia cookies
            });
            carregarCarrinho();
        } catch (error) {
            // Erro silencioso ao esvaziar carrinho
        }
    }

    function criarElementoItem(item) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        
        const price = formatarPrecoBRL(item.price_brl);
        const totalPrice = formatarPrecoBRL(item.total_price_brl);
        const isSelected = selectedItems.has(item.product_id);

        itemDiv.innerHTML = `
            <div class="item-checkbox">
                <input type="checkbox" id="item-${item.product_id}" class="item-select-checkbox" ${isSelected ? 'checked' : ''}>
                <label for="item-${item.product_id}"></label>
            </div>
            
            <img src="${item.image}" alt="${item.name}" class="item-image">
            
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.description} - ${item.color}</p>
                <p class="item-unit-price">Preço unitário: ${price}</p> 
            </div>

            <div class="item-quantity">
                <button class="quantity-btn" data-id="${item.product_id}" data-action="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" data-id="${item.product_id}" data-action="increase">+</button>
            </div>

            <p class="item-total-price">${totalPrice}</p> 
            
            <button class="remove-btn" data-id="${item.product_id}">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        
        // Event listeners
        itemDiv.querySelector('.remove-btn').addEventListener('click', (e) => {
            removerItem(e.currentTarget.dataset.id); 
        });

        itemDiv.querySelector('[data-action="decrease"]').addEventListener('click', (e) => {
            atualizarQuantidade(e.currentTarget.dataset.id, item.quantity - 1);
        });

        itemDiv.querySelector('[data-action="increase"]').addEventListener('click', (e) => {
            atualizarQuantidade(e.currentTarget.dataset.id, item.quantity + 1);
        });

        // Checkbox event listener
        const checkbox = itemDiv.querySelector('.item-select-checkbox');
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedItems.add(item.product_id);
            } else {
                selectedItems.delete(item.product_id);
            }
            salvarSelecoes();
            atualizarResumoSelecionados();
        });

        return itemDiv;
    }

    function atualizarResumo(totalPriceBRL_string) { 
        const totalFormatado = formatarPrecoBRL(totalPriceBRL_string); 
        
        subtotalEl.textContent = totalFormatado;
        totalEl.textContent = totalFormatado;

        if (parseFloat(totalPriceBRL_string) === 0) { 
            checkoutButton.disabled = true;
        } else {
            checkoutButton.disabled = false;
        }
    }

    function atualizarResumoSelecionados() {
        const cartItems = document.querySelectorAll('.cart-item');
        let totalSelecionado = 0;
        let temItemSelecionado = false;

        cartItems.forEach(item => {
            const checkbox = item.querySelector('.item-select-checkbox');
            if (checkbox && checkbox.checked) {
                temItemSelecionado = true;
                const priceText = item.querySelector('.item-total-price').textContent;
                const price = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.')) * 100;
                totalSelecionado += price;
            }
        });

        if (temItemSelecionado) {
            const totalFormatado = formatarPrecoBRL(totalSelecionado);
            subtotalEl.textContent = totalFormatado;
            totalEl.textContent = totalFormatado;
            checkoutButton.disabled = false;
        } else {
            subtotalEl.textContent = 'R$ 0,00';
            totalEl.textContent = 'R$ 0,00';
            checkoutButton.disabled = true;
        }
    }

    function mostrarCarrinhoVazio() {
        const emptyCartNode = emptyCartTemplate.content.cloneNode(true);
        cartContainer.appendChild(emptyCartNode);
    }

    // Função para selecionar/deselecionar todos
    function toggleSelectAll() {
        const checkboxes = document.querySelectorAll('.item-select-checkbox');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = !allChecked;
            const productId = checkbox.id.replace('item-', '');
            if (!allChecked) {
                selectedItems.add(productId);
            } else {
                selectedItems.delete(productId);
            }
        });
        
        salvarSelecoes();
        atualizarResumoSelecionados();
    }

    // Adicionar botão "Selecionar Todos"
    function adicionarControlesSelecao() {
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'selection-controls';
        controlsDiv.innerHTML = `
            <button id="select-all-btn" class="select-all-btn">
                <span class="material-icons">check_box</span>
                Selecionar Todos
            </button>
            <span id="selected-count" class="selected-count">0 itens selecionados</span>
        `;
        
        cartContainer.parentNode.insertBefore(controlsDiv, cartContainer);
        
        document.getElementById('select-all-btn').addEventListener('click', toggleSelectAll);
    }

    clearCartButton.addEventListener('click', esvaziarCarrinho);
    
    // Carregar seleções salvas e inicializar
    carregarSelecoes();
    carregarCarrinho();
    adicionarControlesSelecao();

});