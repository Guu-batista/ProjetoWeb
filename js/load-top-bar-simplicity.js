document.addEventListener("DOMContentLoaded", function() {
    fetch('partials/top-bar-simplicity.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById("top-bar-container").innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar a top bar simplificada:', error));
});