document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const categoryList = document.getElementById('category-list');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const categories = [...new Set(products.map(product => product.category))];

    // Função para exibir produtos
    function displayProducts(filteredProducts) {
        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>R$${product.price.toFixed(2)}</p>
                    <div class="rating">★★★★☆</div>
                    <button class="add-to-cart" data-product='${JSON.stringify(product)}'>Adicionar ao Carrinho</button>
                </div>
            `;
            productList.appendChild(productItem);
        });

        // Adicionar evento de clique para os botões de adicionar ao carrinho
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const product = JSON.parse(this.getAttribute('data-product'));
                addToCart(product);
            });
        });
    }

    // Função para exibir categorias
    function displayCategories() {
        categories.forEach(category => {
            const categoryItem = document.createElement('li');
            categoryItem.textContent = category;
            categoryItem.addEventListener('click', function() {
                const filteredProducts = products.filter(product => product.category === category);
                displayProducts(filteredProducts);
            });
            categoryList.appendChild(categoryItem);
        });
    }

    // Função para adicionar produto ao carrinho
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produto adicionado ao carrinho!');
    }

    // Inicialização
    displayCategories();
    displayProducts(products); // Exibe todos os produtos inicialmente
});