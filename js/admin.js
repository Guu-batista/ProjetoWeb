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
                </div>
            `;
            productList.appendChild(productItem);
        });
    }

    displayProducts();
});