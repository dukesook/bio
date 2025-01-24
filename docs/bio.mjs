console.log('loaded bio.mjs')

document.addEventListener('DOMContentLoaded', async () => {
  await loadNavbar();
  loadFooter();
});


async function loadNavbar() {
  const navbarContainer = document.querySelector('nav');
  if (navbarContainer == null)
    throw new Error('Navbar container not found');

  // Get Navbar HTML
  try {
    const response = await fetch('navbar.html');
    if (!response.ok)
      throw new Error('Failed to fetch navbar');
    const navbarHTML = await response.text();
    navbarContainer.innerHTML = navbarHTML;
  } catch (error) {
    console.error('Error loading navbar:', error);
    return;
  }

  // Highlight Current Page
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = navbarContainer.querySelectorAll('a');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('current_page');
    }
  });

}

async function loadFooter() {
  try {
    const footerContainer = document.querySelector('footer');
    if (footerContainer == null)
      throw new Error('Footer container not found');
    const response = await fetch('footer.html');
    if (!response.ok)
      throw new Error('Failed to fetch footer');
    const footerHTML = await response.text();
    footerContainer.innerHTML = footerHTML;
  } catch (error) {
    console.error('Error loading footer:', error);
    return;
  }
}


