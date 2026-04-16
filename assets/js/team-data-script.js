fetch(`${base}/assets/data/team-data.json`)
    .then(response => response.json())
    .then(data => {
        const cards = document.querySelectorAll('.team-card');

        cards.forEach(card => {
            const teamKey = card.getAttribute('data-team');
            const team = data[teamKey];

            if (team) {
                const textDiv = card.querySelector('.team-text');
                textDiv.innerHTML = `
                    <p>Constructors Championships:</span><span>${team.constructors_championships}</p>
                    <p>Driver Championsships:</span><span>${team.driver_championships}</p>
                    <p>Race Wins:</span><span>${team.wins}</p>
                    <p>Team Principal:</span><span>${team.team_principal}</p>
                <p><span>Drivers</span><span>${team.drivers[0]},<br>${team.drivers[1]}</span></p>
                `;
            }
        });
    });