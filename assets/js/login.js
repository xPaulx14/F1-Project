// Die zwei Formulare und die Links holen
const registerForm = document.getElementById('register-form')
const loginForm = document.getElementById('login-form')
const showLogin = document.getElementById('show-login')
const showRegister = document.getElementById('show-register')

// Wenn man auf "Login Now!" klickt
showLogin.addEventListener('click', () => {
    registerForm.style.display = 'none'
    loginForm.style.display = 'flex'
})

// Wenn man auf "Register Now!" klickt
showRegister.addEventListener('click', () => {
    loginForm.style.display = 'none'
    registerForm.style.display = 'flex'
})

const registerBtn = document.getElementById('register-btn')
const registerMessage = document.getElementById('register-message')

registerBtn.addEventListener('click', async () => {
    // Werte aus den Feldern holen
    const username = document.getElementById('register-username').value
    const email = document.getElementById('register-email').value
    const password = document.getElementById('register-password').value

    // Bei supabaseClient registrieren
    const { data, error } = await supabaseClient.auth.signUp({ email, password })

    if (error) {
        // Fehler anzeigen
        registerMessage.textContent = error.message
        return
    }

    // Username in profiles Tabelle speichern
    await supabaseClient.from('profiles').insert({
        id: data.user.id,
        username: username
    })

    registerMessage.textContent = 'Account erstellt! Bitte Email bestätigen.'
})

const loginBtn = document.getElementById('login-btn')
const loginMessage = document.getElementById('login-message')

loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value

    const { error } = await supabaseClient.auth.signInWithPassword({ email, password })

    if (error) {
        loginMessage.textContent = error.message
        return
    }

    const base = '/F1-Project'
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get('redirect')
    window.location.href = redirect ? `${base}/${redirect}` : `${base}/index.html`
})