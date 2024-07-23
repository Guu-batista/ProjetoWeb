document.addEventListener('DOMContentLoaded', function() {
    const topBarContainer = document.getElementById('top-bar-container');
    if (topBarContainer) {
        fetch('partials/top-bar.html')
            .then(response => response.text())
            .then(data => {
                topBarContainer.innerHTML = data;
            })
            .catch(error => console.error('Error loading top-bar:', error));
    }
})