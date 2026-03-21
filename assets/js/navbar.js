const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll('ul li a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active-navbar');
    }
});
