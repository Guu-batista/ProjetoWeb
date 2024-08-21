document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (email === 'admin@admin.com' && password === 'admin1234') {
                    alert('Login de administrador realizado com sucesso!');
                    window.location.href = 'admin.html';
                } else {
                    const db = firebase.firestore();
                    db.collection("Pessoas").where("email", "==", email).get()
                        .then((querySnapshot) => {
                            if (!querySnapshot.empty) {
                                alert('Login realizado com sucesso!');
                                window.location.href = 'index.html'; 
                            } else {
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
