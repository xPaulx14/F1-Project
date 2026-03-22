document.getElementById('navbar-placeholder').innerHTML = `
  <nav>
    <ul class="navbar">
      <li><a href="./index.html">Home</a></li>
      <li><a href="./drivers.html">Drivers</a></li>
      <li><a href="./tracks.html">Tracks</a></li>
    </ul>
  </nav>
`;

const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll('.navbar li a');

navLinks.forEach(link => {
  const linkPath = link.getAttribute('href').replace('./', '/');
  if (currentPage.endsWith(linkPath) || (currentPage.endsWith('/') && linkPath === '/index.html')) {
    link.classList.add('active-navbar');
  }
});