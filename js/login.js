document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const emailLogin = "admin@admin.com"
        const senhaLogin = "admin"

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (email == emailLogin && password == senhaLogin) {
            alert('Login realizado com sucesso!');
            window.location.href = 'admin.html'; 
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});