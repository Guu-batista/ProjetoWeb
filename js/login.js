document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        const emailLogin = "admin@admin.com"
        const senhaLogin = "admin"
        // Obtenha os valores dos campos do formulário
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Aqui você pode adicionar a lógica para verificar as credenciais
        // Exemplo simples: se o e-mail e a senha forem preenchidos
        if (email == emailLogin && password == senhaLogin) {
            alert('Login realizado com sucesso!');

            // Redireciona para outra página após o login
            window.location.href = 'index.html'; // Substitua 'welcome.html' pelo caminho da sua página de destino
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});