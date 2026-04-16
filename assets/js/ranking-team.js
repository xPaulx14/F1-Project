const teamNameMap = {
    'Ferrari': 'ferrari',
    'Red Bull Racing': 'red-bull',
    'McLaren': 'mclaren',
    'Mercedes': 'mercedes',
    'Aston Martin': 'aston-martin',
    'Williams': 'williams',
    'Alpine': 'alpine',
    'Haas F1 Team': 'haas',
    'Audi': 'audi',
    'Racing Bulls': 'vcarb',
    'Cadillac': 'caddilac'
}

fetch('https://api.openf1.org/v1/sessions?session_type=Race&year=2026')
    .then(response => response.json())
    .then(sessions => {
        const now = new Date()
        const past = sessions.filter(s => new Date(s.date_end) < now)
        const latest = past[past.length - 1]
        return fetch(`https://api.openf1.org/v1/championship_teams?session_key=${latest.session_key}`)
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(entry => {
            const teamKey = teamNameMap[entry.team_name]
            const card = document.querySelector(`[data-team="${teamKey}"]`)
            if (card) {
            const rankSpan = card.querySelector('.team-ranking-number')
                if (rankSpan) {
                    rankSpan.textContent = `#${entry.position_current}`
                    card.setAttribute('data-rank', entry.position_current)
                    if (entry.position_current === 1) rankSpan.classList.add('rank-gold')
                    else if (entry.position_current === 2) rankSpan.classList.add('rank-silver')
                    else if (entry.position_current === 3) rankSpan.classList.add('rank-bronze')
                    else rankSpan.classList.add('rank')
                }
            }
        })

        const grid = document.querySelector('.grid-container')
        const cards = Array.from(document.querySelectorAll('.team-card'))

        cards.sort((a, b) => {
            return a.getAttribute('data-rank') - b.getAttribute('data-rank')
        })

        cards.forEach(card => grid.appendChild(card))
        grid.classList.add('loaded')
    })