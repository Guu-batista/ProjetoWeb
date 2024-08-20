document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Autentica com Firebase
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Verifica se o usuário é um administrador
                if (email === 'admin@admin.com' && password === 'admin1234') {
                    // Redireciona para a página de administração
                    alert('Login de administrador realizado com sucesso!');
                    window.location.href = 'admin.html';
                } else {
                    // Verifica se o usuário existe no Firestore
                    const db = firebase.firestore();
                    db.collection("Pessoas").where("email", "==", email).get()
                        .then((querySnapshot) => {
                            if (!querySnapshot.empty) {
                                // Usuário encontrado no Firestore
                                alert('Login realizado com sucesso!');
                                window.location.href = 'index.html'; // Redireciona para a página principal
                            } else {
                                // Usuário não encontrado no Firestore
                                alert('Usuário não encontrado no Firestore.');
                            }
                        })
                        .catch((error) => {
                            console.error('Erro ao verificar o usuário no Firestore:', error);
                            alert('Erro ao verificar o usuário. Tente novamente.');
                        });
                }
            })
            .catch((error) => {
                console.error('Erro ao fazer login:', error);
                alert('Email ou senha incorretos.');
            });
    });
});
