const activeFilters = [];
const filterButtons = document.querySelectorAll('[data-filter]');
const driverCards = document.querySelectorAll('[data-team]');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const team = button.getAttribute('data-filter');
        
        if (activeFilters.includes(team)) {
            activeFilters.splice(activeFilters.indexOf(team), 1);
            button.classList.remove('active-filter');
        } else {
            activeFilters.push(team);
            button.classList.add('active-filter');
        }

        driverCards.forEach(card => {
            if (activeFilters.length === 0 || activeFilters.includes(card.getAttribute('data-team'))) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});