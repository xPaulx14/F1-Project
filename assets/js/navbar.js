async function buildNavbar() {
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
            <a href="${base}/profile.html" class="nav-username">${username}</a>
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
                    <a href="${base}/teams.html">Teams</a>
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

    const profileLink = document.querySelector('.nav-username')
    if (profileLink && currentPage.endsWith('profile.html')) {
        profileLink.style.textShadow = '0 8px 16px rgba(212, 175, 55, 1)'
        profileLink.style.color = '#D4AF37'
    }

    const registerLink = document.querySelector('.nav-right a')
    if (registerLink && currentPage.endsWith('login.html')) {
    registerLink.style.textShadow = '0 8px 16px rgba(212, 175, 55, 1)'
    registerLink.style.color = '#D4AF37'
    }
}

buildNavbar()