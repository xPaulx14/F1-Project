fetch('assets/data/driver-data.json')
    .then(response => response.json())
    .then(data => {
        const cards = document.querySelectorAll('.driver-card');

        cards.forEach(card => {
            const driverKey = card.getAttribute('data-driver');
            const driver = data[driverKey];

            if (driver) {
                const textDiv = card.querySelector('.driver-text');
                textDiv.innerHTML = `
                    <p>World Championships:</span><span>${driver.titles}</p>
                    <p>Races</span><span>${driver.races}</p>
                    <p>Race Wins:</span><span>${driver.wins}</p>
                    <p>Podiums:</span><span>${driver.podiums}</p>
                    <p>Pole Positions:</span><span>${driver.poles}</p>
                    <p>Career Points:</span><span>${driver.points}</p>
                    <p>DNFs:</span><span>${driver.dnf}</p>
                `;
            }
        });
    });