document.body.style.visibility = 'hidden'

;(async () => {
    const base = '/F1-Project'
    const { data } = await supabaseClient.auth.getSession()

    if (!data.session) {
        const currentPage = window.location.pathname.split('/').pop()
        window.location.href = `${base}/login.html?redirect=${currentPage}`
    } else {
        document.body.style.visibility = 'visible'
    }
})()