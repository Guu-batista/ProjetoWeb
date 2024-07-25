function addFruit() {
    const fruitInput = document.getElementById('fruit');
    const fruitList = document.getElementById('fruitList');
    const newFruit = fruitInput.value.trim();

    if (newFruit) {
        const listItem = document.createElement('li');
        listItem.textContent = newFruit;
        fruitList.appendChild(listItem);
        fruitInput.value = '';
    }
}

function removeFruit() {
    const fruitInput = document.getElementById('fruit');
    const fruitList = document.getElementById('fruitList');
    const fruitToRemove = fruitInput.value.trim();
    const items = fruitList.getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        if (items[i].textContent === fruitToRemove) {
            fruitList.removeChild(items[i]);
            fruitInput.value = '';
            break;
        }
    }
}
