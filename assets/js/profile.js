async function loadProfile() {
    const { data: { user } } = await supabaseClient.auth.getUser()
    
    const { data: profile } = await supabaseClient
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

    document.getElementById('current-username').textContent = profile.username
    document.getElementById('current-email').textContent = user.email
}

loadProfile()

document.getElementById('update-username-btn').addEventListener('click', async () => {
    const newUsername = document.getElementById('new-username').value
    
    const { error } = await supabaseClient
        .from('profiles')
        .update({ username: newUsername })
        .eq('id', (await supabaseClient.auth.getUser()).data.user.id)

    if (error) {
        document.getElementById('username-message').textContent = error.message
    } else {
        document.getElementById('username-message').textContent = 'Username updated!'
    }
})

document.getElementById('update-email-btn').addEventListener('click', async () => {
    const newEmail = document.getElementById('new-email').value

    const { error } = await supabaseClient.auth.updateUser({ email: newEmail })

    if (error) {
        document.getElementById('email-message').textContent = error.message
    } else {
        document.getElementById('email-message').textContent = 'Email updated!'
    }
})

document.getElementById('update-password-btn').addEventListener('click', async () => {
    const newPassword = document.getElementById('new-password').value

    const { error } = await supabaseClient.auth.updateUser({ password: newPassword })

    if (error) {
        document.getElementById('password-message').textContent = error.message
    } else {
        document.getElementById('password-message').textContent = 'Password updated!'
    }
})

document.getElementById('logout-btn').addEventListener('click', async () => {
    await supabaseClient.auth.signOut()
    window.location.href = `${base}/index.html`
})

let deleteConfirmed = false

document.getElementById('delete-btn').addEventListener('click', async () => {
    if (!deleteConfirmed) {
        deleteConfirmed = true
        document.getElementById('delete-message').textContent = 'Are you sure you want to delete your account? This action cannot be undone.'
        document.getElementById('delete-btn').textContent = 'Yes, delete my account'
        return
    }

    const { error } = await supabaseClient.rpc('delete_user')

    if (error) {
        document.getElementById('delete-message').textContent = error.message
    } else {
        await supabaseClient.auth.signOut()
        window.location.href = `${base}/login.html`
    }
})