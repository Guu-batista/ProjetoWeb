document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Função para exibir os itens do carrinho
    function displayCartItems() {
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach((product, index) => {
            const item = document.createElement('div');
            item.className = 'cart-item';
            item.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="item-info">
                    <h3>${product.name}</h3>
                    <p>R$${product.price.toFixed(2)}</p>
                    <button class="remove-from-cart" data-index="${index}">Remover</button>
                </div>
            `;
            cartItems.appendChild(item);
            total += product.price;
        });

        totalPrice.textContent = `Total: R$${total.toFixed(2)}`;

        // Adicionar evento de clique para os botões de remover do carrinho
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    // Função para remover item do carrinho
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }

    // Evento para finalizar a compra
    checkoutButton.addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Compra finalizada com sucesso!');
            localStorage.removeItem('cart');
            displayCartItems();
        } else {
            alert('Seu carrinho está vazio!');
        }
    });

    // Inicialização
    displayCartItems();
});