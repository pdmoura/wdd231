document.addEventListener('DOMContentLoaded', () => {
    const acaiGrid = document.querySelector('.acai-menu-grid');
    const cartIcon = document.getElementById('cartIcon');
    const cartCountSpan = document.getElementById('cart-count');
    const cartModalOverlay = document.getElementById('cartModalOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartSubtotalSpan = document.getElementById('cartSubtotal');
    const cartTaxSpan = document.getElementById('cartTax');
    const cartTotalSpan = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');

    let acaiProducts = [];
    let cart = [];

    const TAX_RATE = 0.05; // 5% taxa

    // --- Cart Management Functions ---

    // Carrega carrinho do localStorage
    function loadCartFromLocalStorage() {
        const storedCart = localStorage.getItem('acaiCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            updateCartDisplay();
        }
    }

    // Salva carrinho no localStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('acaiCart', JSON.stringify(cart));
    }

    // Adiciona item ao carrinho
    function addToCart(productId) {
        const product = acaiProducts.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCartToLocalStorage();
        updateCartDisplay();
        showCartModal();
        
        // Animação no ícone do carrinho
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }

    // Atualiza quantidade do item
    function updateQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            saveCartToLocalStorage();
            updateCartDisplay();
        }
    }

    // Remove item do carrinho
    function removeItem(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCartToLocalStorage();
        updateCartDisplay();
    }

    // --- Cart Rendering Functions ---

    function updateCartDisplay() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountSpan.textContent = totalItems;
        renderCartItems();
        calculateCartTotals();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            // If cart is empty, insert the message directly into the container
            cartItemsContainer.innerHTML = `<p class="empty-cart-message">Your cart is empty. Add some delicious açaí bowls!</p>`;
            return; // Stop the function here
        }

        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$ ${item.price.toFixed(2)}</p>
                    <button class="remove-item-btn" data-id="${item.id}">Remove Item</button>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">−</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });

        // Event listeners para botões de quantidade
        document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
                updateQuantity(productId, parseInt(input.value) - 1);
            });
        });

        document.querySelectorAll('.quantity-btn.increase').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
                updateQuantity(productId, parseInt(input.value) + 1);
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = e.target.dataset.id;
                updateQuantity(productId, parseInt(e.target.value));
            });
        });

        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                removeItem(productId);
            });
        });
    }

    function calculateCartTotals() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax;

        cartSubtotalSpan.textContent = `R$ ${subtotal.toFixed(2)}`;
        cartTaxSpan.textContent = `R$ ${tax.toFixed(2)}`;
        cartTotalSpan.textContent = `R$ ${total.toFixed(2)}`;
    }

    // --- Cart Modal Functions ---

    function showCartModal() {
        cartModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideCartModal() {
        cartModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // --- Event Listeners ---

    if (cartIcon) {
        cartIcon.addEventListener('click', showCartModal);
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', hideCartModal);
    }

    if (cartModalOverlay) {
        cartModalOverlay.addEventListener('click', (e) => {
            if (e.target === cartModalOverlay) {
                hideCartModal();
            }
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                const total = cartTotalSpan.textContent;
                alert(`Processing your order! Total price is: ${total}\n\nThanks for choosing Purple Cream! 🍇`);
                cart = [];
                saveCartToLocalStorage();
                updateCartDisplay();
                hideCartModal();
            } else {
                alert('Your cart is empty. Please, add some items before checkout.');
            }
        });
    }

    // --- Product Loading ---

    async function fetchAcaiProducts() {
        try {
            const response = await fetch('data/acai.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            acaiProducts = await response.json();
            displayAcaiProducts(acaiProducts);
        } catch (error) {
            console.error('Erro ao carregar produtos de açaí:', error);
            if (acaiGrid) {
                acaiGrid.innerHTML = '<p style="text-align: center; padding: 2rem;">Falha ao carregar o menu. Por favor, tente novamente mais tarde.</p>';
            }
        }
    }

    function displayAcaiProducts(products) {
        if (!acaiGrid) return;
        
        acaiGrid.innerHTML = '';
        
        products.forEach((product, index) => {
            const card = document.createElement('div');
            card.classList.add('acai-card');

            // Check if it's the first image (our LCP element)
            const imageAttributes = index === 0
                ? 'fetchpriority="high"' // Prioritize the first image, no lazy loading
                : 'loading="lazy"';      // Lazy load all other images

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" ${imageAttributes}>
                <div class="acai-card-content">
                    <h2>${product.name}</h2>
                    <p class="ingredients">${product.ingredients}</p>
                    <p class="price">$ ${product.price.toFixed(2)}</p>
                    <button class="buy-button" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            acaiGrid.appendChild(card);
        });

        // Event listeners for "Adicionar ao Carrinho" buttons
        document.querySelectorAll('.buy-button').forEach(button => {
            button.addEventListener('click', (e) => {
                addToCart(e.target.dataset.id);
            });
        });
    }

    // --- Initialization ---
    fetchAcaiProducts();
    loadCartFromLocalStorage();
});