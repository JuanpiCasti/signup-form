

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

    
fetchCommonPasswords().then(passwords => {
    formulario.addEventListener('submit', event => {
        if(checkBadPassword(passwords, password.value)) {
            event.preventDefault()
            password.classList.add("is-invalid")
            feedbackPassword.innerText = "Esa contraseña es insegura."
        }
    })
})

function usuarioPermitido(usuarioIngresado) {
    return !usuariosProhibidos.includes(usuarioIngresado)
}

function checkBadPassword(badPasswords, passwordIngresada) {
    return badPasswords.includes(passwordIngresada)
}

function checkDifferent(passwordIngresada, passwordRepeatIngresada) {
    return passwordIngresada != passwordRepeatIngresada
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

formulario.addEventListener("submit", (event) => {
    verificarCampoLleno(event, usuario, feedbackUsuario)
})

formulario.addEventListener("submit", (event) => {
    verificarCampoLleno(event, password, feedbackPassword)
})

formulario.addEventListener("submit", (event) => {
    verificarCampoLleno(event, passwordRepeat, feedbackPasswordRepeat)
})

formulario.addEventListener('submit', event => {
    if(!usuarioPermitido(usuario.value)) {
        event.preventDefault()
        usuario.classList.add("is-invalid")
        feedbackUsuario.innerText = "Ese usuario no esta permitido."
    }
})

formulario.addEventListener('submit', event => {
    if(checkDifferent(password.value, passwordRepeat.value)) {
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


