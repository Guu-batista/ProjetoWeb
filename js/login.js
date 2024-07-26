document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Verifica se é o administrador
        if (email === 'admin@admin.com' && password === 'admin') {
            alert('Login de administrador realizado com sucesso!');
            window.location.href = 'admin.html'; 
            return;
        }

        // Verifica se é um usuário comum
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');

        if (email === storedEmail && password === storedPassword) {
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html'; 
        } else {
            alert('Email ou senha incorretos.');
        }
    });
});