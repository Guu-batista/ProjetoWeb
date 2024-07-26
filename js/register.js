document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
});