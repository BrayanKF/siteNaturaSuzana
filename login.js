


// Função para logar usuário
document.getElementById('sign').addEventListener ('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword (email, password)
    .then((userCredential) => {
    
    window.location.href = 'index.html';
    })
    .catch((error) => {
    alert('Erro ao logar: ' + error.message);
    });
    });