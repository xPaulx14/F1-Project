const driverNumberMap = {
    16: 'leclerc', 44: 'hamilton', 3: 'verstappen', 6: 'hadjar',
    1: 'norris', 81: 'piastri', 63: 'russell', 12: 'antonelli',
    14: 'alonso', 18: 'stroll', 23: 'albon', 55: 'sainz',
    10: 'gasly', 43: 'colapinto', 31: 'ocon', 87: 'bearman',
    27: 'hulkenberg', 5: 'bortoleto', 30: 'lawson', 41: 'lindblad',
    11: 'perez', 77: 'bottas'
};

fetch('https://api.openf1.org/v1/sessions?session_type=Race&year=2026')
    .then(response => response.json())
    .then(sessions => {
        const now = new Date()
        const past = sessions.filter(s => new Date(s.date_end) < new Date(Date.now() - 24 * 60 * 60 * 1000))
        const latest = past[past.length - 1]
        return fetch(`https://api.openf1.org/v1/championship_drivers?session_key=${latest.session_key}`)
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(entry => {
            const driverKey = driverNumberMap[entry.driver_number];
            const card = document.querySelector(`[data-driver="${driverKey}"]`);
            if (card) {
                const rankSpan = card.querySelector('.ranking-number');
                if (rankSpan) {
                    rankSpan.textContent = `#${entry.position_current}`;
                    card.setAttribute('data-rank', entry.position_current);
                    if (entry.position_current === 1) rankSpan.classList.add('rank-gold');
                    else if (entry.position_current === 2) rankSpan.classList.add('rank-silver');
                    else if (entry.position_current === 3) rankSpan.classList.add('rank-bronze');
                    else rankSpan.classList.add('rank');
                }
            }
        });

        const grid = document.querySelector('.grid-container');
        const cards = Array.from(document.querySelectorAll('.driver-card'));

        cards.sort((a, b) => {
            return a.getAttribute('data-rank') - b.getAttribute('data-rank');
        });

        cards.forEach(card => grid.appendChild(card));
        grid.classList.add('loaded');
    });