document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const address = document.getElementById('address').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('address', address);

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'register.html';
});