console.log('loaded bio.mjs')

document.addEventListener('DOMContentLoaded', async () => {
  await loadNavbar();
});


async function loadNavbar() {
  const navbarContainer = document.querySelector('nav');
  try {
    // Get Navbar HTML
    const response = await fetch('navbar.html');
    if (!response.ok)
      throw new Error('Failed to fetch navbar');
    const navbarHTML = await response.text();
    navbarContainer.innerHTML = navbarHTML;

    // Highlight Current Page
    const currentPage = window.location.pathname.split('/').pop();
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


