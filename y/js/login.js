document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email === 'admin@admin.com' && password === 'admin') {
            alert('Login de administrador realizado com sucesso!');
            window.location.href = 'admin.html'; 
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html'; 
        } else {
            alert('Email ou senha incorretos.');
        }
    });
});