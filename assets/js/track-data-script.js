fetch('./assets/data/track-data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const cards = document.querySelectorAll('.track-card');

        cards.forEach(card => {
            const trackKey = card.getAttribute('data-track');
            const track = data[trackKey];

            if (track) {
                const textDiv = card.querySelector('.track-text');
                textDiv.innerHTML = `
                    <p><span>First Grand Prix</span><span>${track.first_gp}</span></p>
                    <p><span>Laps</span><span>${track.laps}</span></p>
                    <p><span>Lap Record</span><span>${track.lap_record}</span></p>
                    <p><span>Record Holder</span><span>${track.lap_record_driver}</span></p>
                    <p><span>Record Year</span><span>${track.lap_record_year ?? 'N/A'}</span></p>
                    <p><span>Sprint</span><span>${track.sprint ? 'Yes' : 'No'}</span></p>
                `;
            }
        });
    });