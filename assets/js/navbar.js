async function buildNavbar() {
    const base = '/F1-Project'
    const { data } = await supabaseClient.auth.getSession()
    const session = data.session

    let rightSide = ''

    if (session) {
        const { data: profile } = await supabaseClient
            .from('profiles')
            .select('username')
            .eq('id', session.user.id)
            .single()

        const username = profile ? profile.username : 'User'

        rightSide = `
            <span class="nav-username"> ${username}</span>
            <button id="logout-btn">Logout</button>
        `
    } else {
        rightSide = `<a href="${base}/login.html">Register</a>`
    }

    document.getElementById('navbar-placeholder').innerHTML = `
        <nav>
            <ul class="navbar">
                <li class="nav-left"></li>
                <li class="nav-center">
                    <a href="${base}/index.html">Home</a>
                    <a href="${base}/drivers.html">Drivers</a>
                    <a href="${base}/tracks.html">Tracks</a>
                </li>
                <li class="nav-right">
                    ${rightSide}
                </li>
            </ul>
        </nav>
    `

    const currentPage = window.location.pathname
    const navLinks = document.querySelectorAll('.nav-center a')
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href')
        if (currentPage.endsWith(linkPath) || (currentPage.endsWith('/') && linkPath === `${base}/index.html`)) {
            link.classList.add('active-navbar')
        }
    })

    const logoutBtn = document.getElementById('logout-btn')
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await supabaseClient.auth.signOut()
            window.location.href = `${base}/index.html`
        })
    }
}

buildNavbar()