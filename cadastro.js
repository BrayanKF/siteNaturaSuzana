// Função para registrar novo usuário
document.getElementById('signup-btn').addEventListener ('click', () =>
    {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword (email, password)
    .then((userCredential) => {
    alert('Usuario cadastrado com sucesso!' );
    })
    .catch((error) => {
    alert('Erro ao cadastrar usuario: ' + error.message);
    });
    });