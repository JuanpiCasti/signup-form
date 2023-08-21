

const usuario = document.getElementById("usuario")
const password = document.getElementById("password")
const passwordRepeat = document.getElementById("password-repeat")
const submit = document.getElementById("submit")
const formulario = document.getElementById("register-form")

const feedbackUsuario = document.getElementById("feedback-usuario")
const feedbackPassword = document.getElementById("feedback-password")
const feedbackPasswordRepeat = document.getElementById("feedback-password-repeat")

const usuariosProhibidos = ["admin"]

function fetchCommonPasswords() {
    return fetch("https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/Common-Credentials/10-million-password-list-top-10000.txt")
        .then(response => response.text())
        .then(data => {
            const passwords = data.trim().split('\n');
            return passwords; // devuelve el array de contraseñas
        })
        .catch(error => {
            console.error(error);
            return []; // devuelve un array vacío si hay un error
        });
}

function usuarioPermitido() {
    return !usuariosProhibidos.includes(usuario.value)
}

function checkBadPassword(badPasswords) {
    return badPasswords.includes(password.value)
}

function checkDifferentPasswords() {
    return password.value != passwordRepeat.value
}

function verificarCampoLleno(event, element, feedbackElement) {
    if (element.value.trim() == "") {
        event.preventDefault()
        element.classList.add("is-invalid")
        feedbackElement.innerText = "Por favor complete el campo."
    }
}

function cleanFeedback(event, feedback) {
    event.target.classList.remove("is-invalid")
    feedback.innerText = ""
}

formulario.addEventListener('submit', event => {
    verificarCampoLleno(event, usuario, feedbackUsuario)
    verificarCampoLleno(event, password, feedbackPassword)
    verificarCampoLleno(event, passwordRepeat, feedbackPasswordRepeat)

    if(!usuarioPermitido()) {
        event.preventDefault()
        usuario.classList.add("is-invalid")
        feedbackUsuario.innerText = "Ese usuario no esta permitido."
    }

    if(checkDifferentPasswords()) {
        event.preventDefault()
        passwordRepeat.classList.add("is-invalid")
        feedbackPasswordRepeat.innerHTML = "Por favor repita la contraseña."
    }

})

usuario.addEventListener("input", (event) => {
    cleanFeedback(event, feedbackUsuario)
})
password.addEventListener("input", (event) => {
    cleanFeedback(event, feedbackPassword)
})
passwordRepeat.addEventListener("input", (event) => {
    cleanFeedback(event, feedbackPasswordRepeat)
})

fetchCommonPasswords().then(passwords => {
    formulario.addEventListener('submit', event => {
        if(checkBadPassword(passwords)) {
            event.preventDefault()
            password.classList.add("is-invalid")
            passwordRepeat.classList.add("is-invalid")
            feedbackPassword.innerText = "Esa contraseña es insegura."
            feedbackPasswordRepeat.innerText = "Esa contraseña es insegura."
        }
    })
})

