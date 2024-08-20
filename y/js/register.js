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

    storeUser(email, password, name);
});

const storeUser = (email, password, name) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Usuário criado com sucesso!!!');
            console.log(user);
            cadastraPessoa(email, name); 
        })
        .catch((error) => {
            console.error('Problemas ao criar usuário:', error);
            alert('Erro ao criar usuário. Tente novamente.');
        });
}

const cadastraPessoa = (email, name) => {
    const db = firebase.firestore();
    db.collection("Pessoas").add({
        email: email,
        nome: name,
    })
    .then(() => {
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html';
    })
    .catch((error) => {
        console.error('Erro ao salvar no Firestore:', error);
        alert('Erro ao cadastrar no Firestore.');
    });
}

const authenticateUser = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Usuário Autenticado com sucesso!!!');
            console.log(user);
        })
        .catch((error) => {
            console.error('Problemas ao autenticar usuário:', error);
            alert('Erro ao autenticar usuário.');
        });
}

const logout = () => {
    firebase.auth().signOut().then(() => {
        console.log("Deslogado com sucesso.");
    }).catch((error) => {
        console.error("Erro ao deslogar:", error);
        alert('Erro ao deslogar.');
    });
}

function deleteUser() {
    const user = firebase.auth().currentUser;
    user.delete()
        .then(() => {
            console.log("Usuário deletado com sucesso.");
        })
        .catch((error) => {
            console.error("Erro ao deletar usuário:", error);
            alert('Erro ao deletar usuário.');
        });
}

const trocarSenha = () => {
    const emailAddress = document.getElementById('email').value;

    firebase.auth().sendPasswordResetEmail(emailAddress)
        .then(() => {
            console.log('E-mail de redefinição de senha enviado com sucesso!');
            alert('E-mail de redefinição de senha enviado.');
        })
        .catch((error) => {
            console.error('Erro ao enviar e-mail de redefinição de senha:', error);
            alert('Erro ao enviar e-mail de redefinição de senha.');
        });
}
