document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    productForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('product-name').value;
        const productPrice = document.getElementById('product-price').value;
        const productCategory = document.getElementById('product-category').value;
        const productImage = document.getElementById('product-image').value;

        const product = {
            id: Date.now(), // ID unico para cada produto
            name: productName,
            price: parseFloat(productPrice),
            category: productCategory,
            image: productImage
        };

        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));

        alert('Produto cadastrado com sucesso!');
        displayProducts();
        productForm.reset();
    });

    function displayProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productList.innerHTML = '';

        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h3>${product.name}</h3>
                    <p>R$${product.price.toFixed(2)}</p>
                    <p>Categoria: ${product.category}</p>
                    <button class="edit-product" data-id="${product.id}">Editar</button>
                    <button class="delete-product" data-id="${product.id}">Remover</button>
                </div>
            `;
            productList.appendChild(productItem);
        });

        document.querySelectorAll('.edit-product').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                editProduct(productId);
            });
        });

        document.querySelectorAll('.delete-product').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                deleteProduct(productId);
            });
        });
    }

    function editProduct(productId) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const product = products.find(p => p.id == productId);

        if (product) {
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-image').value = product.image;

            deleteProduct(productId);
        }
    }

    function deleteProduct(productId) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(product => product.id != productId);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    }

    // Load products when the admin page is loaded
    displayProducts();
});