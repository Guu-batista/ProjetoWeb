// Inicializa o Firestore
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    productForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const productName = document.getElementById('product-name').value;
        const productPrice = parseFloat(document.getElementById('product-price').value);
        const productCategory = document.getElementById('product-category').value;
        const productImage = document.getElementById('product-image').value;

        // Cria um novo produto no Firestore
        db.collection('Produtos').add({
            name: productName,
            price: productPrice,
            category: productCategory,
            image: productImage,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert('Produto cadastrado com sucesso!');
            displayProducts();
            productForm.reset();
        })
        .catch((error) => {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto.');
        });
    });

    function displayProducts() {
        productList.innerHTML = ''; // Limpa a lista antes de carregá-la

        // Busca e exibe produtos do Firestore
        db.collection('Produtos').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const product = doc.data();
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h3>${product.name}</h3>
                        <p>R$${product.price.toFixed(2)}</p>
                        <p>Categoria: ${product.category}</p>
                        <button class="edit-product" data-id="${doc.id}">Editar</button>
                        <button class="delete-product" data-id="${doc.id}">Remover</button>
                    </div>
                `;
                productList.appendChild(productItem);
            });

            // Adiciona funcionalidade aos botões de editar e remover
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
        }).catch((error) => {
            console.error('Erro ao carregar produtos:', error);
        });
    }

    function editProduct(productId) {
        db.collection('Produtos').doc(productId).get().then((doc) => {
            if (doc.exists) {
                const product = doc.data();
                document.getElementById('product-name').value = product.name;
                document.getElementById('product-price').value = product.price;
                document.getElementById('product-category').value = product.category;
                document.getElementById('product-image').value = product.image;

                deleteProduct(productId);
            }
        }).catch((error) => {
            console.error('Erro ao editar produto:', error);
        });
    }

    function deleteProduct(productId) {
        db.collection('Produtos').doc(productId).delete().then(() => {
            displayProducts();
        }).catch((error) => {
            console.error('Erro ao remover produto:', error);
        });
    }

    displayProducts(); // Carrega os produtos ao iniciar a página
});
