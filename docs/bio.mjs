console.log('loaded bio.mjs')

document.addEventListener('DOMContentLoaded', async () => {
  await loadNavbar();
});

/*
<nav class="navbar">
  <a href="index.html">Home</a>
  <a href="bjj.html">Brazilian Jiu-Jitsu</a>
  <a href="bikes.html">Bikes</a>
  <a href="trade_skills.html">Trade Skills</a>
  <a href="cs532_assignment_1.html">Assignment Details</a>
  <a href="contact_info.html">Contact Info</a>
</nav>
*/

async function loadNavbar() {
  const navbarContainer = document.querySelector('nav');
  try {
    const response = await fetch('navbar.html');
    if (!response.ok)
      throw new Error('Failed to fetch navbar');
    const navbarHTML = await response.text();
    navbarContainer.innerHTML = navbarHTML;

    const currentPage = window.location.pathname.split('/').pop();
    console.log('Current page:', currentPage);

    // Get all anchor elements in the navbar
    const navLinks = navbarContainer.querySelectorAll('a');

    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage) {
        link.classList.add('current_page');
      }
    });


  } catch (error) {
    console.error('Error loading navbar:', error);
  }
}


