async function buildNavbar() {
    const currentPage = window.location.pathname

    // Navbar sofort anzeigen und Supabase gleichzeitig starten
    const [, { data }] = await Promise.all([
        // Navbar sofort rendern (kein await nötig)
        Promise.resolve(document.getElementById('navbar-placeholder').innerHTML = `
            <nav>
                <ul class="navbar">
                    <li class="nav-left"></li>
                    <li class="nav-center">
                        <a href="${base}/index.html">Home</a>
                        <a href="${base}/drivers.html">Drivers</a>
                        <a href="${base}/teams.html">Teams</a>
                        <a href="${base}/tracks.html">Tracks</a>
                    </li>
                    <li class="nav-right" id="nav-right-placeholder"></li>
                </ul>
            </nav>
        `),
        supabaseClient.auth.getSession()
    ])

    const session = data.session
    const navRight = document.getElementById('nav-right-placeholder')

    if (session) {
        const { data: profile } = await supabaseClient
            .from('profiles')
            .select('username')
            .eq('id', session.user.id)
            .single()

        const username = profile ? profile.username : 'User'
        navRight.innerHTML = `<a href="${base}/profile.html" class="nav-username">${username}</a>`

        const profileLink = document.querySelector('.nav-username')
        if (profileLink && currentPage.endsWith('profile.html')) {
            profileLink.style.textShadow = '0 8px 16px rgba(212, 175, 55, 1)'
            profileLink.style.color = '#D4AF37'
        }
    } else {
        navRight.innerHTML = `<a href="${base}/login.html">Register</a>`

        const registerLink = document.querySelector('.nav-right a')
        if (registerLink && currentPage.endsWith('login.html')) {
            registerLink.style.textShadow = '0 8px 16px rgba(212, 175, 55, 1)'
            registerLink.style.color = '#D4AF37'
        }
    }

    const navLinks = document.querySelectorAll('.nav-center a')
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href')
        if (currentPage.endsWith(linkPath) || (currentPage.endsWith('/') && linkPath === `${base}/index.html`)) {
            link.classList.add('active-navbar')
        }
    })
}

buildNavbar()
